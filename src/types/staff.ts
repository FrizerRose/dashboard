import Break from './break';
import { WorkingHours } from './workingHours';

type Staff = {
  id: number;
  name: string;
  email: string;
  company: number;
  hours: WorkingHours;
  breaks: Break[];
}

export default Staff;
