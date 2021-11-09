import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import UserAvatar from '../../components/composite/common/UserAvatar/UserAvatar';
import { Loading } from '../../components/core';
import AvatarContainer from '../../components/core/AvatarContainer';
import Typography from '../../components/core/Typography';
import UserCardsContainer from '../../containers/user/UserCardsContainer';
import { User } from '../../models/graphql-schema';
import shuffleCollection from '../../utils/shuffleCollection';

interface MembersProps {
  shuffle?: boolean;
  users: User[];
}

export const MembersView: FC<MembersProps> = ({ shuffle = false, users }) => {
  const { t } = useTranslation();

  const shuffled = shuffle ? shuffleCollection(users) : users;
  const userIDs = shuffled.slice(0, 20).map(x => x.id);

  return (
    <UserCardsContainer userIDs={userIDs}>
      {(entities, state) => {
        const { users: populated } = entities;
        const { loading } = state;

        if (loading) return <Loading />;

        return (
          <>
            <AvatarContainer title={t('components.members-view.title')}>
              {populated.map((u, i) => (
                <UserAvatar key={i} {...u} roleName={t('common.member')} />
              ))}
            </AvatarContainer>
            <div style={{ flexBasis: '100%' }} />
            {users.length - populated.length > 0 && (
              <Typography variant="h3" as="h3" color="positive">
                {`... + ${users.length - populated.length} other members`}
              </Typography>
            )}
          </>
        );
      }}
    </UserCardsContainer>
  );
};
export default MembersView;
