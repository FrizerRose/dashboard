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
    id: number
  ): void;
  [LocalActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    payload: {email: string; password: string}
  ): Promise<unknown>;
}

// API access.
const authService = new AuthService();

// Action implementation.
export const actions: ActionTree<State, RootState> & Actions = {
  async [LocalActionTypes.FETCH_USER]({ commit }, id: number) {
    const response = await authService.get(id);
    if (response.status === 200 && response.data) {
      commit(LocalMutationTypes.CHANGE_USER, response.data);
    } else {
      throw new ApiError('No auth by this ID.');
    }
  },
  async [LocalActionTypes.LOGIN]({ commit }, payload: {email: string; password: string}): Promise<unknown> {
    return new Promise((resolve, reject) => (async () => {
      try {
        const response = await authService.login(payload);
        if (response.status === 201 && response.data) {
          commit(LocalMutationTypes.CHANGE_USER, response.data.user);
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
