export type StartEnd = {
  start: string;
  end: string;
};

export type Day = {
  active: boolean;
  shifts: StartEnd[];
};

export type WorkingHours = {
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
};
