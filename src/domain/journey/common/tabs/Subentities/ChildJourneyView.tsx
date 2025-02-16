import { ApolloError } from '@apollo/client';
import { useMemo, useState, ReactElement, ReactNode, cloneElement } from 'react';
import { useTranslation } from 'react-i18next';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ValueType } from '@/core/utils/filtering/filterFn';
import ErrorBlock from '@/core/ui/error/ErrorBlock';
import PageContent from '@/core/ui/content/PageContent';
import PageContentBlock from '@/core/ui/content/PageContentBlock';
import LinksList from '@/core/ui/list/LinksList';
import { Caption } from '@/core/ui/typography';
import MembershipBackdrop from '@/domain/shared/components/Backdrops/MembershipBackdrop';
import { CardLayoutContainer } from '@/core/ui/card/cardsLayout/CardsLayout';
import ChildJourneyCreate from './ChildJourneyCreate';
import Loading from '@/core/ui/loading/Loading';
import PageContentBlockSeamless from '@/core/ui/content/PageContentBlockSeamless';
import JourneyFilter from '@/domain/journey/common/JourneyFilter/JourneyFilter';
import { Identifiable } from '@/core/utils/Identifiable';
import { Actions } from '@/core/ui/actions/Actions';
import RoundedIcon from '@/core/ui/icon/RoundedIcon';
import { useSpace } from '@/domain/journey/space/SpaceContext/useSpace';
import InfoColumn from '@/core/ui/content/InfoColumn';
import ContentColumn from '@/core/ui/content/ContentColumn';
import SearchField from '@/core/ui/search/SearchField';
import defaultSubspaceAvatar from '@/domain/journey/defaultVisuals/Card.jpg';
import { SpaceAboutCardBannerFragment, SpaceLevel } from '@/core/apollo/generated/graphql-schema';

export interface JourneySubentitiesState {
  loading: boolean;
  error?: ApolloError;
}

interface BaseChildEntity extends Identifiable {
  about: SpaceAboutCardBannerFragment;
}

export interface ChildJourneyViewProps<ChildEntity extends BaseChildEntity> {
  childEntities: ChildEntity[] | undefined;
  childEntitiesIcon: ReactElement;
  childEntityReadAccess?: boolean;
  level: SpaceLevel;
  renderChildEntityCard?: (childEntity: ChildEntity) => ReactElement;
  childEntityValueGetter: (childEntity: ChildEntity) => ValueType;
  childEntityTagsGetter: (childEntity: ChildEntity) => string[];
  childEntityCreateAccess?: boolean;
  childEntityOnCreate?: () => void;
  createSubentityDialog?: ReactElement;
  state: JourneySubentitiesState;
  children?: ReactNode;
  onClickCreate?: (isOpen: boolean) => void;
}

const ChildJourneyView = <ChildEntity extends BaseChildEntity>({
  childEntities = [],
  childEntitiesIcon,
  childEntityReadAccess,
  level,
  renderChildEntityCard,
  childEntityValueGetter,
  childEntityTagsGetter,
  childEntityCreateAccess = false,
  childEntityOnCreate,
  createSubentityDialog,
  state,
  children,
  onClickCreate,
}: ChildJourneyViewProps<ChildEntity>) => {
  const [filter, setFilter] = useState('');

  const { t } = useTranslation();
  const { permissions } = useSpace();

  const filteredItems = useMemo(
    () =>
      childEntities
        .map(entity => ({
          id: entity.id,
          title: entity.about.profile.displayName,
          icon: childEntitiesIcon,
          uri: entity.about.profile.url,
          cardBanner: entity.about.profile?.cardBanner?.uri || defaultSubspaceAvatar,
        }))
        .filter(ss => ss.title.toLowerCase().includes(filter.toLowerCase())),
    [childEntities, filter, childEntitiesIcon]
  );

  return (
    <MembershipBackdrop show={!childEntityReadAccess} blockName={t(`common.space-level.${level}`)}>
      <PageContent>
        <InfoColumn>
          <ChildJourneyCreate
            level={level}
            canCreateSubentity={childEntityCreateAccess}
            onCreateSubentity={childEntityOnCreate}
          />

          {createSubentityDialog}

          <PageContentBlock>
            {childEntities.length > 3 && (
              <SearchField
                value={filter}
                placeholder={t('pages.generic.sections.subEntities.searchPlaceholder')}
                onChange={event => setFilter(event.target.value)}
              />
            )}

            <LinksList items={filteredItems} />
          </PageContentBlock>
        </InfoColumn>
        <ContentColumn>
          {state.loading && <Loading />}
          {!state.loading && childEntities.length === 0 && (
            <PageContentBlockSeamless>
              <Caption textAlign="center">
                {t('pages.generic.sections.subEntities.empty', {
                  entities: t(`common.space-level.${level}`),
                  parentEntity: t(`common.space-level.${level}`),
                })}
              </Caption>
            </PageContentBlockSeamless>
          )}
          {!state.loading && childEntities.length > 0 && (
            <PageContentBlock>
              {childEntityReadAccess && renderChildEntityCard && (
                <JourneyFilter
                  data={childEntities}
                  valueGetter={childEntityValueGetter}
                  tagsGetter={childEntityTagsGetter}
                  title={t('common.entitiesWithCount', {
                    entityType: t(`common.space-level.${level}`),
                    count: childEntities.length,
                  })}
                >
                  {filteredEntities => (
                    <CardLayoutContainer disablePadding>
                      {filteredEntities.map((item, index) => {
                        const key = item ? item.id : `__loading_${index}`;
                        return cloneElement(renderChildEntityCard(item), { key });
                      })}
                      {permissions.canCreateSubspaces && (
                        <Actions sx={{ justifyContent: 'flex-end', width: '100%' }}>
                          <IconButton aria-label={t('common.add')} size="small" onClick={() => onClickCreate?.(true)}>
                            <RoundedIcon component={AddIcon} size="medium" iconSize="small" />
                          </IconButton>
                        </Actions>
                      )}
                    </CardLayoutContainer>
                  )}
                </JourneyFilter>
              )}
            </PageContentBlock>
          )}
          {!state.loading && childEntities.length === 0 && childEntityCreateAccess && (
            <Button
              startIcon={<AddOutlinedIcon />}
              variant="contained"
              onClick={childEntityOnCreate}
              sx={{ width: '100%' }}
            >
              {t('common.create-new-entity', { entity: t(`common.space-level.${level}`) })}
            </Button>
          )}
          {children}
          {state.error && <ErrorBlock blockName={t(`common.space-level.${level}`)} />}
        </ContentColumn>
      </PageContent>
    </MembershipBackdrop>
  );
};

export default ChildJourneyView;
