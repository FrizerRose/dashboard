import User from '@/types/user';

export interface State {
  user: User | null;
}

const state: State = {
  user: null,
};

export default state;
