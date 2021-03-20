// Cyclical dependency needed to make vuex fully typed.
// eslint-disable-next-line import/no-cycle
import { RootState } from '@/store';
import { GetterTree } from 'vuex';
import Faq from '@/types/faq';
import { State } from './state';

export type Getters = {
  getOrderedFaq(state: State): Faq[] | null;
}

export const getters: GetterTree<State, RootState> & Getters = {
  getOrderedFaq: (state) => (state.faq ? state.faq.sort((a, b) => a.order - b.order) : null),
};
