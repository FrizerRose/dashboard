import Company from './company';

type Customer = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  company: Company | unknown;
}

export default Customer;
