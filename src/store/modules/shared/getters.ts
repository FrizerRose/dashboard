// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  getNumber(state: State): number | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getNumber: (state) => state.number,
};
