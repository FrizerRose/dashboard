// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { ActionContext, ActionTree } from 'vuex';
import { AuthService } from '@/api';
import { ApiError } from '@/types/customError';
import LocalActionTypes from './action-types';
import LocalMutationTypes from './mutation-types';
import { Mutations } from './mutations';
import { State } from './state';

// Constraints commit to mutations from the right module
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
  [LocalActionTypes.FETCH_USER](
    { commit }: AugmentedActionContext,
    token: string
  ): Promise<unknown>;
  [LocalActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    payload: {email: string; password: string; company: number}
  ): Promise<unknown>;
  [LocalActionTypes.RESET_PASSWORD](
    { commit }: AugmentedActionContext,
    email: string
  ): Promise<unknown>;
  [LocalActionTypes.CHANGE_PASSWORD](
    { commit }: AugmentedActionContext,
    payload: {oldPassword: string; password: string; token: string}
  ): Promise<unknown>;
}

// API access.
const authService = new AuthService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_USER]({ getters, commit }, token: string): Promise<unknown> {
    try {
      authService.setAuthHeader(token);
      const response = await authService.get('me');
      authService.removeAuthHeader();

      if (response.status === 200 && response.data && response.data.company.id === getters.getUser.company.id) {
        commit(LocalMutationTypes.CHANGE_IS_AUTHORIZED, true);
        return Promise.resolve(true);
      }
      commit(LocalMutationTypes.CHANGE_IS_AUTHORIZED, false);
      return Promise.reject(new ApiError('Not logged in.'));
    } catch {
      commit(LocalMutationTypes.CHANGE_IS_AUTHORIZED, false);
      return Promise.reject(new ApiError('Not logged in.'));
    }
  },
  async [LocalActionTypes.LOGIN]({ commit }, payload: {email: string; password: string; company: number}): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await authService.login(payload);
        if (response.status === 200 && response.data) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('expiration', (Date.now() + parseInt(response.data.expiresIn, 10) - 5).toString());
          commit(LocalMutationTypes.CHANGE_IS_AUTHORIZED, true);
          resolve(true);
        } else {
          reject(new ApiError('Credentials dont match.'));
        }
      } catch {
        reject(new ApiError('Credentials dont match.'));
      }
    })());
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.RESET_PASSWORD]({ commit }, email: string): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await authService.resetPassword({ email });
        if (response.status === 201) {
          resolve(true);
        } else {
          reject(new ApiError('Credentials dont match.'));
        }
      } catch {
        reject(new ApiError('Credentials dont match.'));
      }
    })());
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async [LocalActionTypes.CHANGE_PASSWORD]({ commit }, payload: {oldPassword: string; password: string; token: string}): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await authService.changePassword(payload);
        if (response.status === 200 && response.data) {
          resolve(true);
        } else {
          reject(new ApiError('Credentials dont match.'));
        }
      } catch {
        reject(new ApiError('Credentials dont match.'));
      }
    })());
  },
};
