// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import Appointment from '@/types/appointment';
import { State } from './state';

export type Getters = {
  getAppointment(state: State): Appointment | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getAppointment: (state) => state.appointment,
};
