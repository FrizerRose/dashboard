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
}

export default CompanyPreferences;
