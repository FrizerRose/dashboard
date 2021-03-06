// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { CompanyService } from '@/api';
import { ApiError } from '@/types/customError';
import Company from '@/types/company';
import LocalActionTypes from './action-types';
import SharedMutationTypes from '../shared/mutation-types';
import { Mutations as SharedMutations } from '../shared/mutations';
import { State } from './state';

// Constraints commit to mutations from the right module
type AugmentedSharedActionContext = {
  commit<K extends keyof SharedMutations>(
    key: K,
    payload: Parameters<SharedMutations[K]>[1],
  ): ReturnType<SharedMutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [LocalActionTypes.FETCH_COMPANY](
    { commit }: AugmentedSharedActionContext,
    id: number | string
  ): void;
  [LocalActionTypes.UPDATE_COMPANY](
    { commit }: AugmentedSharedActionContext,
    company: Company
  ): Promise<unknown>;
}

// API access.
const companyService = new CompanyService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_COMPANY]({ commit }, id: number | string) {
    let response;
    if (typeof id === 'number') {
      response = await companyService.get(id);
    } else {
      response = await companyService.getBySlug(id);
    }
    if (response.status === 200 && response.data) {
      commit(SharedMutationTypes.CHANGE_SELECTED_COMPANY, response.data);
      // commit(ServiceMutationTypes.CHANGE_SERVICES, response.data.services);
      // commit(StaffMutationTypes.CHANGE_STAFF, response.data.staff);
    } else {
      throw new ApiError('No company by this ID.');
    }
  },
  async [LocalActionTypes.UPDATE_COMPANY]({ commit }, company: Company): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      const response = await companyService.update(company);
      if (response.status === 200 && response.data) {
        commit(SharedMutationTypes.CHANGE_SELECTED_COMPANY, response.data);
        resolve(true);
      } else {
        reject(new ApiError('Updating company failed.'));
      }
    })());
  },
};
