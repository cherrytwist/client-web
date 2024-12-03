import { ChangeEvent, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FormControl, FormHelperText, InputLabel, InputProps, OutlinedInput, useFormControl } from '@mui/material';
import { useField } from 'formik';
import CharacterCounter from '../characterCounter/CharacterCounter';
import TranslationKey from '@/core/i18n/utils/TranslationKey';
import { useValidationMessageTranslation } from '@/domain/shared/i18n/ValidationMessageTranslation';
import MarkdownInput, { MarkdownInputRefApi } from './MarkdownInput';
import { CharacterCountContainer, CharacterCountContextProvider } from './CharacterCountContext';
import { gutters } from '@/core/ui/grid/utils';
import { MarkdownTextMaxLength } from '../field-length.constants';
import { error as logError } from '@/core/logging/sentry/log';
import { isMarkdownMaxLengthError } from './MarkdownValidator';
import { useTranslation } from 'react-i18next';

interface MarkdownFieldProps extends InputProps {
  title: string;
  name: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: MarkdownTextMaxLength;
  counterDisabled?: boolean;
  helperText?: string;
  loading?: boolean; // TODO make use of
  hideImageOptions?: boolean;
  temporaryLocation?: boolean;
}

const FilledDetector = ({ value }: { value: string | undefined }) => {
  const formControl = useFormControl();

  useLayoutEffect(() => {
    if (!formControl) {
      throw new Error('Must be wrapped in FormControl');
    }
    const { onFilled, onEmpty } = formControl;
    if (value) {
      onFilled();
    } else {
      onEmpty();
    }
  }, [value, formControl]);

  return null;
};

export const FormikMarkdownField = ({
  title,
  name,
  required = false,
  readOnly = false,
  disabled = false,
  placeholder,
  maxLength,
  counterDisabled = false,
  helperText: validInputHelperText,
  hideImageOptions,
  temporaryLocation = false,
}: MarkdownFieldProps) => {
  const tErr = useValidationMessageTranslation();
  const { t } = useTranslation();
  const validate = () => {
    const characterCount = inputElementRef.current?.value?.length ?? 0;
    const isAboveCharacterLimit = maxLength && characterCount > maxLength;
    if (isAboveCharacterLimit) {
      return isAboveCharacterLimit ? t('forms.validations.maxLength', { max: maxLength }) : undefined;
    }
  };

  const [field, meta, helper] = useField({
    name,
    validate,
  });

  const isError = Boolean(meta.error) && meta.touched;

  useEffect(() => {
    if (meta.error && isMarkdownMaxLengthError(meta.error)) {
      const { path, max } = meta.error;
      logError(new TypeError(`${path} exceeded the length limit of ${max} chars.`));
    }
  }, [meta.error]);

  const helperText = useMemo(() => {
    if (!isError) {
      return validInputHelperText;
    }
    return tErr(meta.error as TranslationKey, { field: title });
  }, [isError, meta.error, validInputHelperText, tErr, title]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const trimmedValue = event.target.value.trim();
      const newValue = trimmedValue === '<br>' ? '' : event.target.value;
      helper.setValue(newValue);
    },
    [helper]
  );

  const handleBlur = useCallback(() => {
    helper.setTouched(true);
  }, [helper]);

  // Usually store a reference to the child in a Ref, but in this case we need state
  // cause label's presence/position depends on the presence of this ref.
  const [inputElement, setInputElement] = useState<MarkdownInputRefApi | null>(null);
  const inputElementRef = useRef<MarkdownInputRefApi | null>(null);

  const inputRef = useCallback((nextInputElement: MarkdownInputRefApi | null) => {
    inputElementRef.current = nextInputElement;
    setInputElement(nextInputElement);
  }, []);

  const focusInput = () => {
    inputElement?.focus();
  };

  const labelOffset = inputElement?.getLabelOffset();

  return (
    <FormControl required={required} disabled={disabled} error={isError} fullWidth>
      <CharacterCountContextProvider>
        <FilledDetector value={inputElement?.value} />
        {labelOffset && (
          <InputLabel
            onClick={focusInput}
            sx={{
              ':not(.MuiInputLabel-shrink)': {
                transform: `translate(${labelOffset.x}, ${labelOffset.y}) scale(1)`,
              },
            }}
          >
            {title}
          </InputLabel>
        )}
        <OutlinedInput
          value={field.value}
          onChange={handleChange}
          onBlur={handleBlur}
          label={title}
          inputComponent={MarkdownInput}
          inputRef={inputRef}
          inputProps={{
            controlsVisible: 'always',
            maxLength,
            hideImageOptions,
            temporaryLocation,
          }}
          readOnly={readOnly}
          placeholder={placeholder}
          multiline
          sx={{
            '&.MuiOutlinedInput-root': {
              padding: gutters(0.5),
            },
          }}
        />
        <CharacterCountContainer>
          {({ characterCount }) => (
            <CharacterCounter count={characterCount} maxLength={maxLength} disabled={counterDisabled || !maxLength}>
              <FormHelperText error={isError}>{helperText}</FormHelperText>
            </CharacterCounter>
          )}
        </CharacterCountContainer>
      </CharacterCountContextProvider>
    </FormControl>
  );
};

export default FormikMarkdownField;
