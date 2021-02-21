import Customer from '@/types/customer';

export interface State {
  customer: Customer | null;
}

const state: State = {
  customer: null,
};

export default state;
