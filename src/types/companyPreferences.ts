type CompanyPreferences = {
  id?: number;
  leadTimeWindow: number;
  schedulingWindow: number;
  cancellationWindow: number;
  facebookLink: string;
  instagramLink: string;
  websiteLink: string;
  termsLink: string;
  hasStaffPick: boolean;
  colorVariant: string;
  canCancel: boolean;
  clientReminderEmail: boolean;
  staffReminderEmail: boolean;
  staffCancellationNotice: boolean;
  isTutorialFinished: boolean;
  clientReminderTime: number;
  staffReminderTime: number;
  showRules: boolean;
  rules: string;
}

export default CompanyPreferences;
