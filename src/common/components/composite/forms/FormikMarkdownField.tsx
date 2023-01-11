import clsx from 'clsx';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  BoxProps,
  FormControl,
  FormGroup,
  FormHelperText,
  InputLabel,
  InputProps,
  Skeleton,
  styled,
} from '@mui/material';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useField } from 'formik';
import CharacterCounter from '../common/CharacterCounter/CharacterCounter';
import hexToRGBA from '../../../utils/hexToRGBA';
import { useTranslation } from 'react-i18next';
import { ToolbarConfiguration, ToolbarTranslationKeys } from './FormikMarkdownField/toolbar.configuration';
import { mdToDraftjs, draftjsToMd } from '@alkemio/draftjs-md-converter';

const EditorWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  // Editor styles:
  '& .rdw-editor-main': {
    padding: theme.spacing(0, 2),
    minHeight: theme.spacing(30),
    '& > div': {
      marginTop: theme.spacing(-2),
    },
  },
  // Toolbar styles:
  '& .rdw-editor-toolbar': {
    width: '100%',
    padding: theme.spacing(2, 0.5, 1, 0.5),
    '& .rdw-option-wrapper': {
      height: theme.spacing(4),
      width: theme.spacing(4),
    },
    '& .rdw-dropdown-wrapper': {
      height: theme.spacing(4),
    },
    '& .rdw-emoji-modal': {
      width: 280,
    },
    '& .rdw-emoji-icon': {
      fontSize: 24,
      margin: 4,
    },
    // Unsupported by Markdown:
    '& .rdw-link-modal-target-option': {
      // Links target
      display: 'none',
    },
    '& .rdw-image-modal-size': {
      // Image size
      display: 'none',
    },
  },
}));

/**
 * Outlined field styles.
 * This makes that nice effect of the label moving up in an animation on focus
 */
interface FieldContainerProps extends BoxProps {
  isFocused: boolean;
}
const FieldContainer = styled(({ isFocused, ...rest }: FieldContainerProps) => <Box {...rest} />)`
  position: relative;
  border-style: solid;
  border-radius: ${props => props.theme.spacing(0.5)};
  border-color: ${props => (props.isFocused ? props.theme.palette.primary.main : props.theme.palette.grey[400])};
  border-width: ${props => (props.isFocused ? '2px' : '1px')};
  margin: ${props => (props.isFocused ? '-1px' : '0')};

  & .MuiInputLabel-root.MuiInputLabel-outlined.MuiFormLabel-root {
    padding: ${props => props.theme.spacing(0, 1)};
    transform: translate(${props => props.theme.spacing(1)}, ${props => props.theme.spacing(8.5)}) scale(1);
  }
  /* This breakpoint on SM is because the toolbar collapses to two lines of buttons on XS screens
   * so it is higher and the placeholder needs to go lower. */
  ${props => props.theme.breakpoints.down('sm')} {
    & .MuiInputLabel-root.MuiInputLabel-outlined.MuiFormLabel-root {
      transform: translate(${props => props.theme.spacing(1)}, ${props => props.theme.spacing(14)}) scale(1);
    }
  }
  /* This is the style of the shrunk label, small and translated to the top left and blue if focused */
  & .MuiInputLabel-root.MuiInputLabel-outlined.MuiFormLabel-root.MuiInputLabel-shrink {
    color: ${props => (props.isFocused ? props.theme.palette.primary.main : props.theme.palette.grey[800])};
    background: ${props => props.theme.palette.common.white};
    transform: translate(14px, -9px) scale(0.75);
  }
`;

// Helper overlays to show that the editor is disabled or loading
const DisabledOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: hexToRGBA(theme.palette.grey[400], 0.2),
  zIndex: 1,
}));

const LoadingOverlay = styled(Skeleton)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  transform: 'none',
  zIndex: 1,
}));

interface MarkdownFieldProps extends InputProps {
  title?: string;
  name: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  withCounter?: boolean;
  helperText?: string;
  loading?: boolean;
}

export const FormikMarkdownField: FC<MarkdownFieldProps> = ({
  title,
  name,
  required = false,
  readOnly = false,
  disabled = false,
  placeholder,
  maxLength,
  withCounter = false,
  helperText: _helperText,
  loading,
}) => {
  const { t, i18n } = useTranslation();
  const [field, meta, helper] = useField(name);
  const isError = Boolean(meta.error) && meta.touched;

  const validClass = useMemo(() => (!isError && meta.touched ? 'is-valid' : undefined), [meta, isError]);
  const invalidClass = useMemo(
    () => (required && isError && meta.touched ? 'is-invalid' : undefined),
    [meta, required, isError]
  );

  const helperText = useMemo(() => {
    if (!isError) {
      return _helperText;
    }

    return meta.error;
  }, [isError, meta.error, _helperText]);

  // Handle editor state and sync with formik field:
  const [editorState, setEditorState] = useState(() => {
    if (!field?.value) return EditorState.createEmpty();
    return EditorState.createWithContent(convertFromRaw(mdToDraftjs(field.value)));
  });

  const textLength = editorState.getCurrentContent().getPlainText().length;

  useEffect(() => {
    if (!meta?.initialValue) {
      setEditorState(EditorState.createEmpty());
    } else {
      const editorState = EditorState.createWithContent(convertFromRaw(mdToDraftjs(meta.initialValue)));
      setEditorState(EditorState.moveSelectionToEnd(editorState));
    }
  }, [meta.initialValue]);

  // Reset the form if value comes empty
  useEffect(() => {
    if (field.value === '') {
      setEditorState(EditorState.createEmpty());
    }
  }, [field.value]);

  const onEditorStateChange = newEditorState => {
    setEditorState(newEditorState);
    const currentMd = draftjsToMd(convertToRaw(newEditorState.getCurrentContent()));
    helper.setValue(currentMd);
  };

  // Toolbar translations:
  // See https://jpuri.github.io/react-draft-wysiwyg/#/docs
  // And https://github.com/jpuri/react-draft-wysiwyg/blob/master/src/i18n/en.js
  const toolbarTranslations = useMemo(() => {
    const initialValue = {};
    const toolbarTranslated = ToolbarTranslationKeys.reduce((obj, item) => {
      return {
        ...obj,
        [`components.controls.${item}`]: t(`common.wysiwyg-editor.toolbar.${item}` as const),
      };
    }, initialValue);

    return {
      ...toolbarTranslated,
      'generic.add': t('common.wysiwyg-editor.generic.add'),
      'generic.cancel': t('common.wysiwyg-editor.generic.cancel'),
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, i18n.language]);

  // TODO: implement maxLength
  // https://github.com/facebook/draft-js/issues/119
  // https://github.com/jpuri/react-draft-wysiwyg/issues/782

  const [isFocused, setFocus] = useState(false);

  const handleOnFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = () => {
    setFocus(false);
    field.onBlur(name);
    setEditorState(state => EditorState.moveSelectionToEnd(state));
  };

  // TODO: Image Upload
  const handleImageUpload = useCallback(() => {
    let promise = new Promise(function (resolve, _reject) {
      setTimeout(() => {
        resolve({
          // Url returned by the image storage service:
          data: { link: 'https://alkem.io/alkemio-banner/alkemio-banner-xl.png' },
        });
      }, 1000);
    });
    return promise;
  }, []);

  const toolbar = {
    ...ToolbarConfiguration,
    image: {
      ...ToolbarConfiguration.image,
      uploadCallback: handleImageUpload,
    },
  };

  return (
    <FormGroup>
      <FormControl required={required} disabled={disabled} variant="outlined" fullWidth>
        <FieldContainer isFocused={isFocused}>
          {title && (
            <InputLabel required={required} shrink={isFocused || !!field.value}>
              {title}
            </InputLabel>
          )}
          <EditorWrapper>
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              editorClassName={clsx('form-control', validClass, invalidClass)}
              placeholder={!title ? placeholder : undefined}
              readOnly={readOnly || disabled}
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              toolbar={toolbar}
              localization={{
                translations: toolbarTranslations,
              }}
            />
            {disabled && <DisabledOverlay />}
            {loading && <LoadingOverlay />}
          </EditorWrapper>
        </FieldContainer>
      </FormControl>
      <CharacterCounter count={textLength} maxLength={maxLength} disabled={!withCounter}>
        <FormHelperText error={isError}>{helperText}</FormHelperText>
      </CharacterCounter>
    </FormGroup>
  );
};

export default FormikMarkdownField;
