// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import Company from '@/types/company';
import { State } from './state';

export type Getters = {
  getCompany(state: State): Company | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getCompany: (state) => state.company,
};
