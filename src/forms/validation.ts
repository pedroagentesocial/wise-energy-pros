import { hasValidUSPhoneDigits } from './phone';
import type { LeadFormErrors, LeadFormStrings, LeadFormValues } from './types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLeadForm = (
  values: LeadFormValues,
  requiredConsent: boolean,
  strings: LeadFormStrings,
  showProjectType: boolean,
  showService: boolean,
  showMessage: boolean
): LeadFormErrors => {
  const errors: LeadFormErrors = {};

  if (!values.name.trim()) errors.name = strings.errors.required;
  if (!values.email.trim()) errors.email = strings.errors.required;
  else if (!emailRegex.test(values.email.trim())) errors.email = strings.errors.invalidEmail;
  if (!values.phone.trim()) errors.phone = strings.errors.required;
  else if (!hasValidUSPhoneDigits(values.phone)) errors.phone = strings.errors.invalidPhone;
  if (showProjectType && !values.projectType.trim()) errors.projectType = strings.errors.required;
  if (showService && !values.service.trim()) errors.service = strings.errors.required;
  if (showMessage && !values.message.trim()) errors.message = strings.errors.required;
  if (!requiredConsent) errors.requiredConsent = strings.errors.requiredConsent;

  return errors;
};
