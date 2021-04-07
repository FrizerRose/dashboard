import Company from '@/types/company';

export interface State {
  isAuthorized: boolean;
  user: string | null;
  accessToken: string | null;
  expiration: string | null;
  userCompany: Company | null;
}

const state: State = {
  isAuthorized: false,
  user: localStorage.getItem('user'),
  accessToken: localStorage.getItem('accessToken'),
  expiration: localStorage.getItem('expiration'),
  userCompany: null,
};

export default state;
