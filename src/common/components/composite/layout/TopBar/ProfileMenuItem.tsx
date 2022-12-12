import { Button, useTheme } from '@mui/material';
import { useSelector } from '@xstate/react';
import { useLocation } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { useUserContext } from '../../../../../domain/community/contributor/user';
import { useGlobalState } from '../../../../../core/state/useGlobalState';
import UserSegment from '../../entities/User/UserSegment';
import SignInIcon from './SignInIcon';

interface ProfileMenuItemProps {
  buttonClassName: string;
}

const ProfileMenuItem = ({ buttonClassName }: ProfileMenuItemProps) => {
  const { user, verified, isAuthenticated, loadingMe } = useUserContext();
  const theme = useTheme();
  const { pathname } = useLocation();

  const {
    ui: { userSegmentService },
  } = useGlobalState();

  const isUserSegmentVisible = useSelector(userSegmentService, state => {
    return state.matches('visible');
  });

  const renderUserProfileSegment = () => {
    if (loadingMe) {
      return (
        <Button className={buttonClassName}>
          <Skeleton
            variant="circular"
            width={theme.spacing(3)}
            height={theme.spacing(3)}
            sx={{ marginTop: theme.spacing(0.5) }}
          />
          <Skeleton variant="text" sx={{ width: theme => theme.spacing(6), marginTop: theme.spacing(0.5) }} />
        </Button>
      );
    }
    if (!isAuthenticated) {
      return <SignInIcon className={buttonClassName} returnUrl={pathname} />;
    }
    return (
      <>
        {isUserSegmentVisible && user && (
          <UserSegment userMetadata={user} emailVerified={verified} buttonClassName={buttonClassName} />
        )}
      </>
    );
  };

  return renderUserProfileSegment();
};

export default ProfileMenuItem;
