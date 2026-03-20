export type LeadFormStrings = {
  fields: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  };
  phoneHelper: string;
  requiredConsentPrefix: string;
  consentJoiner: string;
  privacyPolicy: string;
  termsAndConditions: string;
  optionalConsent: string;
  errors: {
    required: string;
    invalidEmail: string;
    invalidPhone: string;
    requiredConsent: string;
    submitFailed: string;
  };
  submitLoading: string;
  submitSuccess: string;
};

export type LeadFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type LeadFormErrors = Partial<Record<keyof LeadFormValues | 'requiredConsent', string>>;

export type LeadFormSubmission = LeadFormValues & {
  requiredConsent: boolean;
  optionalConsent: boolean;
};

export type LeadFormSubmitHandler = (payload: LeadFormSubmission) => Promise<void> | void;
