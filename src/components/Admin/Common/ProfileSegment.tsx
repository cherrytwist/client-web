import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import InputField from './InputField';
import { LONG_TEXT_LENGTH, MID_TEXT_LENGTH } from '../../../models/constants/field-length.constants';

export const profileSegmentSchema = yup.object().shape({
  avatar: yup.string().max(MID_TEXT_LENGTH),
  description: yup.string().max(LONG_TEXT_LENGTH),
});

interface ProfileSegmentProps {
  disabled?: boolean;
  required?: boolean;
}

export const ProfileSegment: FC<ProfileSegmentProps> = ({ disabled = false, required = false }) => {
  const { t } = useTranslation();

  return (
    <>
      <InputField
        name="avatar"
        label={t('components.profileSegment.avatar.name')}
        placeholder={t('components.profileSegment.avatar.placeholder')}
        disabled={disabled}
        required={required}
      />
      <InputField
        name="description"
        label={t('components.profileSegment.description.name')}
        placeholder={t('components.profileSegment.description.placeholder')}
        disabled={disabled}
        required={required}
      />
    </>
  );
};
