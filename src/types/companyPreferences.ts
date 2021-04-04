type CompanyPreferences = {
  id?: number;
  leadTimeWindow: number;
  schedulingWindow: number;
  cancellationWindow: number;
  facebookLink: string;
  instagramLink: string;
  websiteLink: string;
  termsText: string;
  showTerms: boolean;
  hasSexPick: boolean;
  hasStaffPick: boolean;
  colorVariant: string;
  hasPattern: boolean;
  hasDarkTheme: boolean;
  hasBorders: boolean;
  canCancel: boolean;
  clientReminderEmail: boolean;
  staffReminderEmail: boolean;
  staffCancellationNotice: boolean;
  isTutorialFinished: boolean;
  clientReminderTime: number;
  staffReminderTime: number;
  showRules: boolean;
  rules: string;
  showCoronaRules: boolean;
  coronaRules: string;
}

export default CompanyPreferences;
