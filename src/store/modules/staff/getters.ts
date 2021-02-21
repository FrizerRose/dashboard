// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import Staff from '@/types/staff';
import { State } from './state';

export type Getters = {
  getStaff(state: State): Staff[];
}

export const getters: GetterTree<State, RootState> & Getters = {
  getStaff: (state) => state.allStaff,
};
