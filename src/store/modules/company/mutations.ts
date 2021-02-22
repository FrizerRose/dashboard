import Company from '@/types/company';
import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_COMPANY](state: S, payload: Company): void;
}

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_COMPANY](state, payload: Company) {
    state.company = payload;
  },
};
