import React, { ReactNode } from 'react';
import * as yup from 'yup';
import { FormikProps } from 'formik';
import { CreateTemplateInfoInput, Visual } from '../../../../models/graphql-schema';
import TemplateFormRows from '../TemplateFormRows';
import TemplateForm from '../TemplateForm';
import CanvasFormikSelectInput, { Canvas } from './CanvasFormikSelectInput';
import { useTranslation } from 'react-i18next';

export interface CanvasTemplateFormValues {
  title: string;
  description: string;
  tags: string[];
  value: string;
}

export interface CanvasTemplateFormSubmittedValues {
  value: string;
  info: CreateTemplateInfoInput;
}

interface CanvasTemplateFormProps {
  title: ReactNode;
  initialValues: Partial<CanvasTemplateFormValues>;
  visual?: Visual;
  onSubmit: (values: CanvasTemplateFormSubmittedValues) => void;
  actions: ReactNode | ((formState: FormikProps<CanvasTemplateFormValues>) => ReactNode);
  canvases: Canvas[] | undefined;
  calloutId: string | undefined;
}

const validator = {
  value: yup.string().required(),
};

const CanvasTemplateForm = ({
  title,
  initialValues,
  visual,
  onSubmit,
  actions,
  canvases,
  calloutId,
}: CanvasTemplateFormProps) => {
  const { t } = useTranslation();

  return (
    <TemplateForm
      title={title}
      initialValues={initialValues}
      visual={visual}
      onSubmit={onSubmit}
      actions={actions}
      validator={validator}
    >
      <TemplateFormRows>
        <CanvasFormikSelectInput label={t('common.canvas')} name="value" canvases={canvases} calloutId={calloutId} />
      </TemplateFormRows>
    </TemplateForm>
  );
};

export default CanvasTemplateForm;
