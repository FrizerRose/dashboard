import Break from './break';
import Image from './image';
import Service from './service';
import User from './user';
import { WorkingHours } from './workingHours';

type Staff = {
  id: number;
  name: string;
  isPublic: boolean;
  email: string;
  company: number;
  hours: WorkingHours;
  breaks: Break[];
  services: Service[];
  image: Image;
  user?: User;
}

export default Staff;
