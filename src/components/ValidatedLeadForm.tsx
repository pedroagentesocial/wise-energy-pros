import { useId } from 'react';
import { ConsentCheckbox } from './forms/ConsentCheckbox';
import { FormField } from './forms/FormField';
import { useLeadFormValidation } from '../forms/useLeadFormValidation';
import type { LeadFormStrings, LeadFormSubmitHandler } from '../forms/types';

type ValidatedLeadFormProps = {
  strings: LeadFormStrings;
  submitLabel: string;
  showService?: boolean;
  showMessage?: boolean;
  compact?: boolean;
  submitHandler?: LeadFormSubmitHandler;
  privacyHref?: string;
  termsHref?: string;
};

const ValidatedLeadForm = ({
  strings,
  submitLabel,
  showService = true,
  showMessage = true,
  compact = false,
  submitHandler,
  privacyHref = '/privacy-policy',
  termsHref = '/terms-and-conditions',
}: ValidatedLeadFormProps) => {
  const {
    values,
    requiredConsent,
    optionalConsent,
    submitting,
    submitted,
    errors,
    isValid,
    setFieldValue,
    setFieldTouched,
    setRequiredConsent,
    setOptionalConsent,
    showError,
    submit,
    submitError,
  } = useLeadFormValidation({
    strings,
    showService,
    showMessage,
    submitHandler,
  });

  const formId = useId().replace(/:/g, '');

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await submit();
  };

  return (
    <form onSubmit={onSubmit} noValidate className={compact ? 'grid gap-3.5' : 'grid gap-5'} aria-live="polite">
      <div className={compact ? 'grid gap-3.5' : 'grid gap-5 sm:grid-cols-2'}>
        <div className={compact ? '' : 'sm:col-span-1'}>
          <FormField
            id={`${formId}-name`}
            label={strings.fields.name}
            value={values.name}
            onBlur={() => setFieldTouched('name')}
            onChange={(value) => setFieldValue('name', value)}
            placeholder={strings.fields.name}
            error={showError('name') ? errors.name : undefined}
            autoComplete="name"
            disabled={submitting}
            required
          />
        </div>

        <div className={compact ? '' : 'sm:col-span-1'}>
          <FormField
            id={`${formId}-email`}
            label={strings.fields.email}
            value={values.email}
            onBlur={() => setFieldTouched('email')}
            onChange={(value) => {
              setFieldValue('email', value);
              if (value.length > 0) setFieldTouched('email');
            }}
            placeholder={strings.fields.email}
            type="email"
            inputMode="email"
            error={showError('email') ? errors.email : undefined}
            successText={values.email && !errors.email ? '✓ Valid email' : undefined}
            autoComplete="email"
            disabled={submitting}
            required
          />
        </div>

        <div className={compact ? '' : 'sm:col-span-2'}>
          <FormField
            id={`${formId}-phone`}
            label={strings.fields.phone}
            value={values.phone}
            onBlur={() => setFieldTouched('phone')}
            onChange={(value) => {
              setFieldValue('phone', value);
              if (value.length > 0) setFieldTouched('phone');
            }}
            placeholder={strings.fields.phone}
            type="tel"
            inputMode="numeric"
            helperText={strings.phoneHelper}
            error={showError('phone') ? errors.phone : undefined}
            successText={values.phone && !errors.phone ? '✓ Valid phone' : undefined}
            autoComplete="tel"
            maxLength={14}
            disabled={submitting}
            required
          />
        </div>

        {showService && (
          <div className={compact ? '' : 'sm:col-span-2'}>
            <FormField
              id={`${formId}-service`}
              label={strings.fields.service}
              value={values.service}
              onBlur={() => setFieldTouched('service')}
              onChange={(value) => setFieldValue('service', value)}
              placeholder={strings.fields.service}
              error={showError('service') ? errors.service : undefined}
              autoComplete="organization-title"
              disabled={submitting}
              required
            />
          </div>
        )}

        {showMessage && (
          <div className={compact ? '' : 'sm:col-span-2'}>
            <FormField
              id={`${formId}-message`}
              label={strings.fields.message}
              value={values.message}
              onBlur={() => setFieldTouched('message')}
              onChange={(value) => setFieldValue('message', value)}
              placeholder={strings.fields.message}
              textarea
              rows={compact ? 3 : 5}
              error={showError('message') ? errors.message : undefined}
              autoComplete="off"
              disabled={submitting}
              required
            />
          </div>
        )}
      </div>

      <div className="space-y-2.5">
        <ConsentCheckbox
          checked={requiredConsent}
          onChange={(checked) => {
            setRequiredConsent(checked);
            setFieldTouched('requiredConsent');
          }}
          disabled={submitting}
          required
          error={showError('requiredConsent') ? errors.requiredConsent : undefined}
        >
          <span>
            {strings.requiredConsentPrefix}{' '}
            <a href={privacyHref} className="text-cyan-400 hover:text-cyan-300"> {strings.privacyPolicy} </a>
            {` ${strings.consentJoiner} `}
            <a href={termsHref} className="text-cyan-400 hover:text-cyan-300">{strings.termsAndConditions}</a>
          </span>
        </ConsentCheckbox>
        {showError('requiredConsent') && <p className="text-xs text-red-300">{errors.requiredConsent}</p>}
        <ConsentCheckbox checked={optionalConsent} onChange={setOptionalConsent} tone="muted" disabled={submitting}>
          {strings.optionalConsent}
        </ConsentCheckbox>
      </div>

      <button
        type="submit"
        disabled={!isValid || submitting}
          className={`rounded-full bg-blue-600 px-6 py-3 font-bold text-slate-50 shadow-[0_0_18px_rgba(37,99,235,0.35)] transition-all duration-300 ${
          !isValid || submitting ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]'
        }`}
      >
        {submitting ? strings.submitLoading : submitLabel}
      </button>

      {submitted && <p className="text-sm font-semibold text-cyan-400">{strings.submitSuccess}</p>}
      {submitError && <p className="text-sm font-semibold text-red-300">{submitError}</p>}
    </form>
  );
};

export default ValidatedLeadForm;
