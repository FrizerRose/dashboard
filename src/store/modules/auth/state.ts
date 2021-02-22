export interface State {
  isAuthorized: boolean;
  user: string | null;
  accessToken: string | null;
  expiration: string | null;
}

const state: State = {
  isAuthorized: false,
  user: localStorage.getItem('user'),
  accessToken: localStorage.getItem('accessToken'),
  expiration: localStorage.getItem('expiration'),
};

export default state;
