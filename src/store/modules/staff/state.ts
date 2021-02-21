import Staff from '@/types/staff';

export interface State {
  allStaff: Staff[];
}

const state: State = {
  allStaff: [],
};

export default state;
