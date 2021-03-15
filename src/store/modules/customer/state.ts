import Customer from '@/types/customer';

export interface State {
  customer: Customer | null;
  customers: Customer[];
}

const state: State = {
  customer: null,
  customers: [],
};

export default state;
