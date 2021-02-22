import Appointment from '@/types/appointment';

export interface State {
  appointment: Appointment | null;
}

const state: State = {
  appointment: null,
};

export default state;
