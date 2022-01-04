import { Avatar, Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DashboardGenericSection from '../../components/composite/common/sections/DashboardGenericSection';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import FlagIcon from '@mui/icons-material/Flag';
import { SectionSpacer } from '../../components/core/Section/Section';
import PersonIcon from '@mui/icons-material/Person';

const GettingStartedSection = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <DashboardGenericSection
      headerText={t('pages.home.sections.getting-started.header')}
      subHeaderText={t('pages.home.sections.getting-started.subheader')}
    >
      <Box display="flex" alignItems="center">
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
          <FlagIcon sx={{ color: theme.palette.background.default }} />
        </Avatar>
        <SectionSpacer />
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: t('pages.home.sections.getting-started.joining-a-challenge'),
          }}
        />
      </Box>
      <SectionSpacer />
      <Box display="flex" alignItems="center">
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
          <ConnectWithoutContactIcon sx={{ color: theme.palette.background.default }} />
        </Avatar>
        <SectionSpacer />
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: t('pages.home.sections.getting-started.connecting-with-people'),
          }}
        />
      </Box>
      <SectionSpacer />
      <Box display="flex" alignItems="center">
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
          <PersonIcon sx={{ color: theme.palette.background.default }} />
        </Avatar>
        <SectionSpacer />
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{
            __html: t('pages.home.sections.getting-started.your-profile'),
          }}
        />
      </Box>
    </DashboardGenericSection>
  );
};

export default GettingStartedSection;
