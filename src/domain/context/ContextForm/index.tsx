import { Formik } from 'formik';
import React, { ElementType, FC } from 'react';
import * as yup from 'yup';
import { Context, Profile } from '../../../core/apollo/generated/graphql-schema';
import { ContextSegmentProps, contextSegmentSchema } from '../../platform/admin/components/Common/ContextSegment';

export interface ContextFormValues {
  background: string;
  impact: string;
  vision: string;
  who: string;
}

interface ContextFormProps {
  context?: Context;
  profile?: Omit<Profile, 'storageBucket'>;
  onSubmit: (formData: ContextFormValues) => void;
  wireSubmit: (setter: () => void) => void;
  contextSegment: ElementType<ContextSegmentProps>;
  loading: boolean;
}

export const ContextForm: FC<ContextFormProps> = ({
  context,
  profile,
  onSubmit,
  wireSubmit,
  loading,
  contextSegment: ContextSegment,
}) => {
  const initialValues: ContextFormValues = {
    background: profile?.description || '',
    impact: context?.impact || '',
    vision: context?.vision || '',
    who: context?.who || '',
  };

  const validationSchema = yup.object().shape({
    background: contextSegmentSchema.fields?.background || yup.string(),
    impact: contextSegmentSchema.fields?.impact || yup.string(),
    vision: contextSegmentSchema.fields?.vision || yup.string(),
    who: contextSegmentSchema.fields?.who || yup.string(),
  });

  let isSubmitWired = false;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async values => {
        onSubmit(values);
      }}
    >
      {({ handleSubmit }) => {
        // TODO [ATS]: Research useImperativeHandle and useRef to achieve this.
        if (!isSubmitWired) {
          wireSubmit(handleSubmit);
          isSubmitWired = true;
        }

        return <ContextSegment loading={loading} />;
      }}
    </Formik>
  );
};
