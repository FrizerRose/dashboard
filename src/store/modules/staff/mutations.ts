import Staff from '@/types/staff';
import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_STAFF](state: S, payload: Staff[]): void;
  [LocalMutationTypes.UPDATE_STAFF_BY_ID](state: S, payload: Staff): void;
  [LocalMutationTypes.REMOVE_STAFF_BY_ID](state: S, payload: Staff): void;
}

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_STAFF](state, payload: Staff[]) {
    state.allStaff = payload;
  },
  [LocalMutationTypes.UPDATE_STAFF_BY_ID](state, payload: Staff) {
    const oldStaff = state.allStaff;
    const staffToUpdateIndex = oldStaff.findIndex((worker) => worker.id === payload.id);
    if (staffToUpdateIndex > 0) {
      state.allStaff[staffToUpdateIndex] = payload;
    }
  },
  [LocalMutationTypes.REMOVE_STAFF_BY_ID](state, payload: Staff) {
    const oldStaff = state.allStaff;
    const staffToUpdateIndex = oldStaff.findIndex((worker) => worker.id === payload.id);
    if (staffToUpdateIndex > 0) {
      state.allStaff.splice(staffToUpdateIndex, 1);
    }
  },
};
