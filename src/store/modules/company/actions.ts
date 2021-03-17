// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { CompanyService, ImageService } from '@/api';
import { ApiError } from '@/types/customError';
import Company from '@/types/company';
import Image from '@/types/image';
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
  ): Promise<unknown>;
  [LocalActionTypes.UPDATE_COMPANY](
    { commit }: AugmentedSharedActionContext,
    company: Company
  ): Promise<unknown>;
  [LocalActionTypes.UPLOAD_IMAGE](
    { commit }: AugmentedSharedActionContext,
    image: object
  ): Promise<Image>;
  [LocalActionTypes.DELETE_IMAGE](
    { commit }: AugmentedSharedActionContext,
    id: number
  ): Promise<Image>;
}

// API access.
const companyService = new CompanyService();
const imageService = new ImageService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_COMPANY]({ commit }, id: number | string): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      let response;
      if (typeof id === 'number') {
        response = await companyService.get(id);
      } else {
        response = await companyService.getBySlug(id);
      }
      if (response.status === 200 && response.data) {
        commit(SharedMutationTypes.CHANGE_SELECTED_COMPANY, response.data);
        resolve(true);
      } else {
        reject(new ApiError('No company by this ID.'));
      }
    })());
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.UPLOAD_IMAGE]({ commit }, image: object): Promise<Image> {
    return new Promise((resolve, reject) => (async () => {
      const response = await imageService.create(image);
      if (response.status === 201 && response.data) {
        resolve(response.data);
      } else {
        reject(new ApiError('Uploading image failed.'));
      }
    })());
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.DELETE_IMAGE]({ commit }, id: number): Promise<Image> {
    return new Promise((resolve, reject) => (async () => {
      const response = await imageService.destroy(id);
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(new ApiError('Uploading image failed.'));
      }
    })());
  },
};
