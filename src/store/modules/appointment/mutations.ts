import Appointment from '@/types/appointment';
import { MutationTree } from 'vuex';
import LocalMutationTypes from './mutation-types';
import { State } from './state';

// Blueprint for mutations. All of them have to be implemented.
export type Mutations<S = State> = {
  [LocalMutationTypes.CHANGE_APPOINTMENT](state: S, payload: Appointment): void;
}

// Mutuation implementation.
export const mutations: MutationTree<State> & Mutations = {
  [LocalMutationTypes.CHANGE_APPOINTMENT](state, payload: Appointment) {
    state.appointment = payload;
  },
};
