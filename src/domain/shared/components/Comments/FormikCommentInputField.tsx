import { Send } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBaseComponentProps,
  InputProps,
  OutlinedInput,
  OutlinedInputProps,
  Paper,
  Popper,
  PopperProps,
  styled,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';
import React, { FC, PropsWithChildren, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mention, MentionItem, MentionsInput, OnChangeHandlerFunc, SuggestionDataItem } from 'react-mentions';
import CharacterCounter from '../../../../common/components/composite/common/CharacterCounter/CharacterCounter';
import { buildUserProfileUrl } from '../../../../common/utils/urlBuilders';
import { useMentionableUsersLazyQuery } from '../../../../core/apollo/generated/apollo-hooks';
import { gutters } from '../../../../core/ui/grid/utils';
import { Caption } from '../../../../core/ui/typography';
import { makeAbsoluteUrl } from '../../../../core/utils/links';
import { ProfileChipView } from '../../../community/contributor/ProfileChip/ProfileChipView';

const MAX_USERS_MENTIONABLE = 5;
const POPPER_Z_INDEX = 1400; // Dialogs are 1300

interface MentionableUser extends SuggestionDataItem {
  id: string;
  display: string;
  avatarUrl: string | undefined;
  city: string | undefined;
  country: string | undefined;
}

const StyledSuggestions = styled(Box)(({ theme }) => ({
  width: gutters(17)(theme),
  '& li': {
    listStyle: 'none',
    margin: 0,
    padding: `0 ${gutters(0.5)(theme)} 0 ${gutters(0.5)(theme)}`,
  },
  '& li:hover': {
    background: theme.palette.highlight.light,
  },
}));

interface SuggestionsContainerProps {
  anchorElement: PopperProps['anchorEl'];
}
const SuggestionsContainer: FC<PropsWithChildren<SuggestionsContainerProps>> = ({ anchorElement, children }) => {
  return (
    <Popper open placement="bottom-start" anchorEl={anchorElement} sx={{ zIndex: POPPER_Z_INDEX }}>
      <Paper elevation={3}>
        <StyledSuggestions>{children}</StyledSuggestions>
      </Paper>
    </Popper>
  );
};

interface CommentsInputProps {
  name: string;
  inactive?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  submitOnReturnKey?: boolean;
  popperAnchor: SuggestionsContainerProps['anchorElement'];
}

const StyledInput = styled(Box)(({ theme }) => ({
  flex: 1,
  '& textarea': {
    //TODO: Maybe this should be somewhere else
    lineHeight: '20px',
    top: '-1px !important',
    left: '-1px !important',
    border: 'none !important',
    outline: 'none',
  },
  '& textarea:focus': {
    outline: 'none',
  },
  '& strong': {
    color: theme.palette.common.black,
  },
}));

export const CommentsInput: FC<InputBaseComponentProps> = props => {
  const { name, inactive, readOnly, maxLength, submitOnReturnKey = false, popperAnchor } = props as CommentsInputProps;

  const { t } = useTranslation();
  const [currentMentionedUsers, setCurrentMentionedUsers] = useState<MentionItem[]>([]);

  const [loadUsers, { data }] = useMentionableUsersLazyQuery();
  const users = data?.usersPaginated.users ?? [];

  const queryUsers = (search: string, callback: (users: MentionableUser[]) => void) => {
    if (!search) {
      callback([]);
      return;
    }
    const filter = { email: search, firstName: search, lastName: search };
    loadUsers({
      variables: { filter, first: MAX_USERS_MENTIONABLE },
    }).then(() => {
      callback(
        users
          // Only show users that are not already mentioned
          .filter(user => {
            return currentMentionedUsers.find(mention => mention.id === user.nameID) === undefined;
          })
          // Map users to MentionableUser
          .map(user => ({
            id: user.nameID,
            display: user.displayName,
            avatarUrl: user.profile?.avatar?.uri,
            city: user.profile?.location?.city,
            country: user.profile?.location?.country,
          }))
      );
    });
  };

  const { submitForm } = useFormikContext();
  const [field, , helper] = useField(name);

  const onChange: OnChangeHandlerFunc = (_event, newValue, _newPlaintextValue, mentions) => {
    if (readOnly) {
      return;
    }
    //TODO: newPlaintextValue should be the char counter
    setCurrentMentionedUsers(mentions);
    helper.setValue(newValue);
  };

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLInputElement>) => {
    setTooltipOpen(false);
    if (inactive) {
      event.preventDefault();
      return;
    }
    if (event.key === '@') {
      setTooltipOpen(true);
      console.log('@ pressed');
    }
    if (event.key === 'Enter' && event.shiftKey === false) {
      if (submitOnReturnKey) {
        event.preventDefault();
        submitForm();
      }
    }
  };

  return (
    <StyledInput
      sx={theme => ({
        '& textarea': { color: inactive ? theme.palette.neutralMedium.main : theme.palette.common.black },
      })}
    >
      <MentionsInput
        value={field.value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        readOnly={readOnly}
        maxLength={maxLength}
        onBlur={() => helper.setTouched(true)}
        forceSuggestionsAboveCursor
        customSuggestionsContainer={children => (
          <SuggestionsContainer anchorElement={popperAnchor}>{children}</SuggestionsContainer>
        )}
      >
        <Mention
          trigger="@"
          data={queryUsers}
          appendSpaceOnAdd
          displayTransform={(id, display) => `@${display}`}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          renderSuggestion={(userAny: any) => {
            const user = userAny as MentionableUser;
            return (
              <ProfileChipView
                key={user.id}
                displayName={user.display}
                avatarUrl={user.avatarUrl}
                city={user.city}
                country={user.country}
              />
            );
          }}
          markup={`[@__display__](${makeAbsoluteUrl(buildUserProfileUrl(''))}__id__)`}
        />
      </MentionsInput>
      {tooltipOpen && (
        <SuggestionsContainer anchorElement={popperAnchor}>
          <Caption sx={{ padding: gutters() }}>{t('components.post-comment.tooltip.mentions')}</Caption>
        </SuggestionsContainer>
      )}
    </StyledInput>
  );
};

/**
 * Material styles wrapper, with the border and the Send arrow IconButton and the char counter
 * @param param0
 * @returns
 */
interface FormikCommentInputFieldProps extends InputProps {
  name: string;
  disabled?: boolean;
  readOnly?: boolean;
  submitting?: boolean;
  maxLength?: number;
  withCounter?: boolean;
  submitOnReturnKey?: boolean;
  size?: OutlinedInputProps['size'];
}

export const FormikCommentInputField: FC<FormikCommentInputFieldProps> = ({
  name,
  disabled = false,
  readOnly = false,
  submitting = false,
  maxLength,
  withCounter = false,
  submitOnReturnKey = false,
  size = 'medium',
}) => {
  const ref = useRef(null);
  const [field, meta] = useField(name);

  const inactive = disabled || submitting;

  return (
    <FormGroup>
      <FormControl>
        <OutlinedInput
          ref={ref}
          multiline
          size={size}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="post comment" size={'small'} type="submit" disabled={inactive}>
                <Send />
              </IconButton>
            </InputAdornment>
          }
          aria-describedby="filled-weight-helper-text"
          inputComponent={CommentsInput}
          inputProps={{
            name,
            inactive,
            readOnly,
            maxLength,
            submitOnReturnKey,
            popperAnchor: ref.current,
          }}
        />
      </FormControl>
      <CharacterCounter count={field.value?.length} maxLength={maxLength} disabled={!withCounter}>
        <FormHelperText error={Boolean(meta.error)}>{meta.error}</FormHelperText>
      </CharacterCounter>
    </FormGroup>
  );
};

export default FormikCommentInputField;
