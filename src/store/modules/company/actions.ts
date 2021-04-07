// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { CompanyService, ImageService, ContactService } from '@/api';
import { ApiError } from '@/types/customError';
import Company from '@/types/company';
import Image from '@/types/image';
import LocalActionTypes from './action-types';
import AuthMutationTypes from '../auth/mutation-types';
import SharedMutationTypes from '../shared/mutation-types';
import { Mutations as AuthMutations } from '../auth/mutations';
import { Mutations as SharedMutations } from '../shared/mutations';
import { State } from './state';

// Constraints commit to mutations from the right module
type AugmentedSharedActionContext = {
  commit<K extends keyof SharedMutations>(
    key: K,
    payload: Parameters<SharedMutations[K]>[1],
  ): ReturnType<SharedMutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

type AugmentedAuthActionContext = {
  commit<K extends keyof AuthMutations>(
    key: K,
    payload: Parameters<AuthMutations[K]>[1],
  ): ReturnType<AuthMutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [LocalActionTypes.FETCH_COMPANY](
    { commit }: AugmentedSharedActionContext & AugmentedAuthActionContext,
    id: number | string
  ): Promise<unknown>;
  [LocalActionTypes.FETCH_STATS](
    { commit }: AugmentedSharedActionContext,
    companyID: number
  ): Promise<unknown>;
  [LocalActionTypes.UPDATE_COMPANY](
    { commit }: AugmentedSharedActionContext,
    company: Company
  ): Promise<unknown>;
  [LocalActionTypes.UPLOAD_IMAGE](
    { commit }: AugmentedSharedActionContext,
    image: object
  ): Promise<Image>;
  [LocalActionTypes.SEND_CONTACT](
    { commit }: AugmentedSharedActionContext,
    image: object
  ): Promise<unknown>;
  [LocalActionTypes.DELETE_IMAGE](
    { commit }: AugmentedSharedActionContext,
    id: number
  ): Promise<Image>;
}

// API access.
const companyService = new CompanyService();
const imageService = new ImageService();
const contactService = new ContactService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_COMPANY]({ commit }, id: number | string): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        let response;
        if (typeof id === 'number') {
          response = await companyService.get(id);
        } else {
          response = await companyService.getBySlug(id);
        }
        if (response.status === 200 && response.data) {
          commit(SharedMutationTypes.CHANGE_SELECTED_COMPANY, response.data);
          commit(AuthMutationTypes.CHANGE_USER_COMPANY, response.data);
          resolve(true);
        } else {
          reject(new ApiError('No company by this ID.'));
        }
      } catch {
        reject(new ApiError('No company by this ID.'));
      }
    })());
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.FETCH_STATS]({ commit }, companyID: number): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await companyService.get(`stats/${companyID.toString()}`);
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(new ApiError('API returned error.'));
        }
      } catch {
        reject(new ApiError('API returned error.'));
      }
    })());
  },
  async [LocalActionTypes.UPDATE_COMPANY]({ commit }, company: Company): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await companyService.update(company);
        if (response.status === 200 && response.data) {
          commit(SharedMutationTypes.CHANGE_SELECTED_COMPANY, response.data);
          resolve(true);
        } else {
          reject(new ApiError('Updating company failed.'));
        }
      } catch {
        reject(new ApiError('Updating company failed.'));
      }
    })());
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.UPLOAD_IMAGE]({ commit }, image: object): Promise<Image> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await imageService.create(image);
        if (response.status === 201 && response.data) {
          resolve(response.data);
        } else {
          reject(new ApiError('Uploading image failed.'));
        }
      } catch {
        reject(new ApiError('Uploading image failed.'));
      }
    })());
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.SEND_CONTACT]({ commit }, formData: object): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await contactService.create(formData);
        if (response.status === 201 && response.data) {
          resolve(response.data);
        } else {
          reject(new ApiError('Creating contact failed.'));
        }
      } catch {
        reject(new ApiError('Deleting staff failed.'));
      }
    })());
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.DELETE_IMAGE]({ commit }, id: number): Promise<Image> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await imageService.destroy(id);
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new ApiError('Uploading image failed.'));
        }
      } catch {
        reject(new ApiError('Uploading image failed.'));
      }
    })());
  },
};
