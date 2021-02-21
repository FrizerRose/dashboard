// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import Customer from '@/types/customer';
import { State } from './state';

export type Getters = {
  getCustomer(state: State): Customer | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getCustomer: (state) => state.customer,
};
