import { useMemo, useState } from 'react';
import { formatUSPhone } from './phone';
import { validateLeadForm } from './validation';
import type { LeadFormStrings, LeadFormSubmitHandler, LeadFormValues } from './types';

type UseLeadFormValidationParams = {
  strings: LeadFormStrings;
  showProjectType: boolean;
  showService: boolean;
  showMessage: boolean;
  submitHandler?: LeadFormSubmitHandler;
};

const initialValues: LeadFormValues = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  service: '',
  message: '',
};

export const useLeadFormValidation = ({
  strings,
  showProjectType,
  showService,
  showMessage,
  submitHandler,
}: UseLeadFormValidationParams) => {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [requiredConsent, setRequiredConsent] = useState(false);
  const [optionalConsent, setOptionalConsent] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = useMemo(
    () => validateLeadForm(values, requiredConsent, strings, showProjectType, showService, showMessage),
    [requiredConsent, showMessage, showProjectType, showService, strings, values]
  );

  const isValid = Object.keys(errors).length === 0;

  const setFieldValue = (field: keyof LeadFormValues, value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: field === 'phone' ? formatUSPhone(value) : value,
    }));
  };

  const setFieldTouched = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const touchAll = () => {
    setTouched({
      name: true,
      email: true,
      phone: true,
      projectType: true,
      service: true,
      message: true,
      requiredConsent: true,
    });
  };

  const showError = (field: string) => Boolean(touched[field] && errors[field as keyof typeof errors]);

  const submit = async () => {
    touchAll();
    const strictErrors = validateLeadForm(values, requiredConsent, strings, showProjectType, showService, showMessage);
    if (Object.keys(strictErrors).length > 0 || submitting) {
      return false;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      if (submitHandler) {
        await submitHandler({
          ...values,
          requiredConsent,
          optionalConsent,
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
      setSubmitted(true);
      setValues(initialValues);
      setRequiredConsent(false);
      setOptionalConsent(false);
      setTouched({});
      return true;
    } catch {
      setSubmitError(strings.errors.submitFailed);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    values,
    requiredConsent,
    optionalConsent,
    touched,
    submitting,
    submitted,
    submitError,
    errors,
    isValid,
    setFieldValue,
    setFieldTouched,
    setRequiredConsent,
    setOptionalConsent,
    showError,
    submit,
  };
};
