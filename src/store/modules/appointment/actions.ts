// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { AppointmentService } from '@/api';
import { ApiError, ValidationError } from '@/types/customError';
import { AxiosResponse } from 'axios';
import LocalActionTypes from './action-types';
import LocalMutationTypes from './mutation-types';
import SharedMutationTypes from '../shared/mutation-types';
import StaffMutationTypes from '../staff/mutation-types';
import { Mutations } from './mutations';
import { Mutations as SharedMutations } from '../shared/mutations';
import { Mutations as StaffMutations } from '../staff/mutations';
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

type AugmentedStaffActionContext = {
  commit<K extends keyof StaffMutations>(
    key: K,
    payload: Parameters<StaffMutations[K]>[1],
  ): ReturnType<StaffMutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [LocalActionTypes.FETCH_APPOINTMENT](
    { commit }: AugmentedActionContext & AugmentedSharedActionContext & AugmentedStaffActionContext,
    id: number
  ): Promise<AxiosResponse>;
  [LocalActionTypes.CREATE_APPOINTMENT](
    { commit }: AugmentedSharedActionContext,
    payload: object
  ): Promise<unknown>;
  [LocalActionTypes.CANCEL_APPOINTMENT](
    { commit }: AugmentedSharedActionContext,
    id: number | undefined
  ): Promise<unknown>;
}

// API access.
const appointmentService = new AppointmentService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_APPOINTMENT]({ commit }, id: number): Promise<AxiosResponse> {
    const response = await appointmentService.get(id);
    if (response.status === 200 && response.data) {
      commit(LocalMutationTypes.CHANGE_APPOINTMENT, response.data);
      commit(SharedMutationTypes.CHANGE_SELECTED_SERVICE, response.data.service);
      commit(SharedMutationTypes.CHANGE_SELECTED_CUSTOMER, response.data.customer);
      if (response.data.service.staff[0] === undefined) {
        commit(StaffMutationTypes.CHANGE_STAFF, [response.data.service.staff]);
      } else {
        commit(StaffMutationTypes.CHANGE_STAFF, response.data.service.staff);
      }
    } else {
      throw new ApiError('No appointment by this ID.');
    }

    return response;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.CREATE_APPOINTMENT]({ commit }, payload): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      const response = await appointmentService.create(payload);
      if (response.status === 201) {
        resolve(true);
      } else {
        reject(new ApiError('Could not create an appointment.'));
      }
    })());
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.CANCEL_APPOINTMENT]({ commit }, id: number | undefined): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      if (id !== undefined) {
        const response = await appointmentService.destroy(id.toString());
        if (response.status === 200) {
          resolve(true);
        } else {
          reject(new ApiError('Could not delete an appointment.'));
        }
      } else {
        reject(new ValidationError('ID not a number'));
      }
    })());
  },
};
