import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_USER](state: S, payload: string | null): void;
  [LocalMutationTypes.CHANGE_IS_AUTHORIZED](state: S, payload: boolean): void;
  [LocalMutationTypes.LOGOUT](state: S, payload: boolean): void;
}

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_USER](state, payload: string | null) {
    state.user = payload;
  },
  [LocalMutationTypes.CHANGE_IS_AUTHORIZED](state, payload: boolean) {
    state.isAuthorized = payload;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [LocalMutationTypes.LOGOUT](state, payload: boolean) {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiration');
    state.isAuthorized = false;
  },
};
