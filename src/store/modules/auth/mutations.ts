import User from '@/types/user';
import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_USER](state: S, payload: User): void;
}

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_USER](state, payload: User) {
    state.user = payload;
  },
};
