import Staff from '@/types/staff';
import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_STAFF](state: S, payload: Staff[]): void;
}

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_STAFF](state, payload: Staff[]) {
    state.allStaff = payload;
  },
};
