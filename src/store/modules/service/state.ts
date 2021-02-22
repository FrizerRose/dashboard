import Service from '@/types/service';

export interface State {
  services: Service[];
}

const state: State = {
  services: [],
};

export default state;
