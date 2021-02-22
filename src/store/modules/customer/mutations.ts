import Customer from '@/types/customer';
import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_CUSTOMER](state: S, payload: Customer): void;
}

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_CUSTOMER](state, payload: Customer) {
    state.customer = payload;
  },
};
