// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import Faq from '@/types/faq';
import { State } from './state';

export type Getters = {
  getFaq(state: State): Faq[] | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getFaq: (state) => state.faq,
};
