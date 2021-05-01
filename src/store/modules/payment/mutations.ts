import Payment from '@/types/payment';
import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_PAYMENT](state: S, payload: Payment): void;
  [LocalMutationTypes.CHANGE_PAYMENTS](state: S, payload: Payment[]): void;
};

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_PAYMENT](state, payload: Payment) {
    state.payment = payload;
  },
  [LocalMutationTypes.CHANGE_PAYMENTS](state, payload: Payment[]) {
    state.payments = payload;
  },
};
