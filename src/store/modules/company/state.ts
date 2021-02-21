import Company from '@/types/company';

export interface State {
  company: Company | null;
}

const state: State = {
  company: null,
};

export default state;
