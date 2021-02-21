// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import Service from '@/types/service';
import { State } from './state';

export type Getters = {
  getServices(state: State): Service[] | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getServices: (state) => state.services,
};
