import Payment from '@/types/payment';

export interface State {
  payment: Payment | null;
  payments: Payment[];
}

const state: State = {
  payment: null,
  payments: [],
};

export default state;
