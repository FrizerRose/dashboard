// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { ServicesService } from '@/api';
import { ApiError } from '@/types/customError';
import Service from '@/types/service';
import LocalActionTypes from './action-types';
import LocalMutationTypes from './mutation-types';
import { Mutations } from './mutations';
import { Mutations as SharedMutations } from '../shared/mutations';
import { State } from './state';

// Constraints commit to mutations from the right module
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

type AugmentedSharedActionContext = {
  commit<K extends keyof SharedMutations>(
    key: K,
    payload: Parameters<SharedMutations[K]>[1],
  ): ReturnType<SharedMutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [LocalActionTypes.FETCH_SERVICES](
    { commit }: AugmentedActionContext,
    id: number
  ): void;
  [LocalActionTypes.CREATE_SERVICE](
    { commit }: AugmentedActionContext,
    staff: Service
  ): Promise<unknown>;
  [LocalActionTypes.UPDATE_SERVICE](
    { commit }: AugmentedActionContext,
    staff: Service
  ): Promise<unknown>;
  [LocalActionTypes.DELETE_SERVICE](
    { commit }: AugmentedActionContext,
    staff: Service
  ): Promise<unknown>;
}

// API access.
const servicesService = new ServicesService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_SERVICES]({ commit }, id: number) {
    const response = await servicesService.get(id);
    if (response.data.message === undefined) {
      commit(LocalMutationTypes.CHANGE_SERVICES, response.data);
    } else {
      throw new ApiError('No company by this ID.');
    }
  },
  async [LocalActionTypes.CREATE_SERVICE]({ commit }, staff: Service): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      const response = await servicesService.create(staff);
      if (response.status === 201 && response.data) {
        commit(LocalMutationTypes.ADD_SERVICE, { id: staff.id, ...response.data } as Service);
        resolve(true);
      } else {
        reject(new ApiError('Creating staff failed.'));
      }
    })());
  },
  async [LocalActionTypes.UPDATE_SERVICE]({ commit }, staff: Service): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      const response = await servicesService.update(staff);
      if (response.status === 200 && response.data) {
        commit(LocalMutationTypes.UPDATE_SERVICE_BY_ID, response.data as Service);
        resolve(true);
      } else {
        reject(new ApiError('Updating staff failed.'));
      }
    })());
  },
  async [LocalActionTypes.DELETE_SERVICE]({ commit }, staff: Service): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      const response = await servicesService.destroy(staff.id);
      if (response.status === 200 && response.data) {
        commit(LocalMutationTypes.REMOVE_SERVICE_BY_ID, { id: staff.id, ...response.data } as Service);
        resolve(true);
      } else {
        reject(new ApiError('Deleting staff failed.'));
      }
    })());
  },
};
