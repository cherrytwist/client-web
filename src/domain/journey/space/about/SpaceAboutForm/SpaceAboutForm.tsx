import { Formik } from 'formik';
import { ElementType } from 'react';
import * as yup from 'yup';
import { ContextSegmentProps, spaceAboutSegmentSchema } from '@/domain/platform/admin/components/Common/ContextSegment';
import { SpaceAboutDetailsFragment } from '@/core/apollo/generated/graphql-schema';

export interface SpaceAboutFormValues {
  description: string;
  when: string;
  why: string;
  who: string;
}

type SpaceAboutFormProps = {
  about?: SpaceAboutDetailsFragment;
  onSubmit: (formData: SpaceAboutFormValues) => void;
  wireSubmit: (setter: () => void) => void;
  contextSegment: ElementType<ContextSegmentProps>;
  loading: boolean;
};

export const SpaceAboutForm = ({
  about,
  onSubmit,
  wireSubmit,
  loading,
  contextSegment: ContextSegment,
}: SpaceAboutFormProps) => {
  const initialValues: SpaceAboutFormValues = {
    description: about?.profile?.description || '',
    when: about?.when || '',
    why: about?.why || '',
    who: about?.who || '',
  };

  const validationSchema = yup.object().shape({
    description: spaceAboutSegmentSchema.fields?.description || yup.string(),
    when: spaceAboutSegmentSchema.fields?.when || yup.string(),
    why: spaceAboutSegmentSchema.fields?.why || yup.string(),
    who: spaceAboutSegmentSchema.fields?.who || yup.string(),
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
