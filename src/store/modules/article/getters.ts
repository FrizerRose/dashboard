// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  getListName(state: State): string | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getListName: (state) => state.listName,
};
