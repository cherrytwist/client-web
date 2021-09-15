import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { MembershipOrganisationResultEntryChallenge, MembershipResultEntry } from '../../models/graphql-schema';
import Section, { Header as SectionHeader, SubHeader } from '../../components/core/Section';
import { CardContainer } from '../../components/core/CardContainer';
import CardProps from './CardProps';

type ComponentCard = React.ComponentType<CardProps>;

type OrgMembershipResult = MembershipResultEntry | MembershipOrganisationResultEntryChallenge;

interface Props {
  entities: OrgMembershipResult[];
  cardHeight?: number;
  cardComponent: ComponentCard;
  title: string;
  subtitle?: string;
  noDataText: string;
  icon: React.ReactElement;
}

const isMembershipOrganisationResultEntryChallenge = (
  entities: OrgMembershipResult[]
): entities is MembershipOrganisationResultEntryChallenge[] =>
  (entities[0] as MembershipOrganisationResultEntryChallenge)?.ecoverseID != null;

const MembershipSection: FC<Props> = ({
  entities,
  title,
  subtitle,
  noDataText,
  icon,
  cardHeight,
  cardComponent: CardComponent,
}) => {
  const toCardComponent = (entities: OrgMembershipResult[]) => {
    let cards: React.ReactElement[];
    if (isMembershipOrganisationResultEntryChallenge(entities)) {
      cards = entities.map(({ id, ecoverseID }, i) => <CardComponent key={i} id={id} ecoverseID={ecoverseID} />);
    } else {
      cards = (entities as MembershipResultEntry[]).map(({ id }, i) => <CardComponent key={i} id={id} />);
    }

    return cards;
  };

  return (
    <>
      <Section avatar={icon}>
        <SectionHeader text={title} />
        <SubHeader text={subtitle} />
      </Section>
      {!entities.length && (
        <Typography align={'center'} variant={'subtitle1'}>
          {noDataText}
        </Typography>
      )}
      <CardContainer cardHeight={cardHeight}>{toCardComponent(entities)}</CardContainer>
    </>
  );
};
export default MembershipSection;
