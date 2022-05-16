import React, { FC } from 'react';
import Typography from '../../components/core/Typography';
import { useTranslation } from 'react-i18next';
import { Location } from './Location';

interface LocationViewProps {
  location: Partial<Location> | string | undefined;
}

const LocationView: FC<LocationViewProps> = ({ location, ...rest }) => {
  const { t } = useTranslation();

  if (!location) {
    return null;
  }

  let locationString = '';
  if (typeof location === 'string') {
    locationString = location;
  } else {
    const city = location?.city || '';
    const country = location?.country?.code || '';

    locationString = [city, country].filter(x => !!x).join(', ');
  }
  if (!locationString) {
    return null;
  }

  return (
    <>
      <Typography color="primary" weight="boldLight" aria-label="Location" {...rest}>
        {t('components.profile.fields.location.title')}
      </Typography>
      <Typography>{locationString}</Typography>
    </>
  );
};

export default LocationView;
