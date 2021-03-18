import Faq from '@/types/faq';

export interface State {
  faq: Faq[] | null;
}

const state: State = {
  faq: null,
};

export default state;
