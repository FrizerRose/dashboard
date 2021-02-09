import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_NUMBER](state: S, payload: number): void;
  [LocalMutationTypes.CHANGE_ADVICE](state: S, payload: string): void;
}

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_NUMBER](state, payload: number) {
    state.number = payload;
  },
  [LocalMutationTypes.CHANGE_ADVICE](state, payload: string) {
    state.advice = payload;
  },
};
