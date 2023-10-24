import Gutters from '../../grid/Gutters';
import { GridItemStyle, gutters } from '../../grid/utils';
import { MAX_CONTENT_WIDTH_GUTTERS, useGlobalGridColumns } from '../../grid/constants';
import ImageBlurredSides from '../../image/ImageBlurredSides';
import { useTranslation } from 'react-i18next';
import { ComponentType, ReactElement, ReactNode, useState } from 'react';
import { Visual } from '../../../../domain/common/visual/Visual';
import { Box, Skeleton } from '@mui/material';
import { DEFAULT_BANNER_URL } from '../../../../domain/journey/space/layout/SpacePageBanner';
import GridProvider from '../../grid/GridProvider';
import GridItem from '../../grid/GridItem';
import { useColumns } from '../../grid/GridContext';
import { NAVIGATION_CONTAINER_HEIGHT_GUTTERS } from '../../navigation/NavigationBar';
import Overlay from '../../utils/Overlay';
import { BasePageBannerProps } from '../../../../domain/journey/common/EntityPageLayout/EntityPageLayoutTypes';

export interface PageBannerProps extends BasePageBannerProps {
  banner: Visual | undefined;
  ribbon?: ReactNode;
  fade?: boolean;
}

interface CardRendererProps<CardProps extends { maxWidth?: number | string }> {
  cardComponent: ComponentType<CardProps>;
}

interface CardContainerProps {
  children: (props: GridItemStyle) => ReactElement;
  watermark?: ReactNode;
}

const CardContainer = ({ watermark, children }: CardContainerProps) => {
  const columns = useColumns();

  const cardStickSide = columns > 8 ? 'left' : undefined;

  return (
    <Gutters
      width={gutters(MAX_CONTENT_WIDTH_GUTTERS - 2)}
      maxWidth="100%"
      marginX="auto"
      alignItems={cardStickSide === 'left' ? 'start' : 'stretch'}
      position="relative"
      paddingTop={gutters(NAVIGATION_CONTAINER_HEIGHT_GUTTERS)}
    >
      <GridItem columns={10}>{children}</GridItem>
      {watermark}
    </Gutters>
  );
};

const PageBanner = <CardProps extends { maxWidth?: number | string }>({
  banner,
  ribbon,
  fade,
  cardComponent: Card,
  watermark,
  ...cardProps
}: PageBannerProps & CardRendererProps<CardProps> & CardProps) => {
  const { t } = useTranslation();

  const [imageLoading, setImageLoading] = useState(true);

  const imageLoadError = () => {
    setImageLoading(false);
  };

  const globalGridColumns = useGlobalGridColumns();

  return (
    <GridProvider columns={globalGridColumns}>
      <Box position="relative">
        {ribbon}
        <Overlay fade={fade}>
          <ImageBlurredSides
            src={banner?.uri || DEFAULT_BANNER_URL}
            alt={t('visuals-alt-text.banner.page.text', { altText: banner?.alternativeText })}
            onLoad={() => setImageLoading(false)}
            onError={imageLoadError}
            blurRadius={2}
            width={gutters(MAX_CONTENT_WIDTH_GUTTERS - 2)}
            maxWidth="100%"
            containerProps={{
              height: '100%',
              visibility: imageLoading ? 'hidden' : undefined,
            }}
          />
        </Overlay>
        {imageLoading && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        )}
        <CardContainer watermark={watermark}>
          {({ width }) => <Card maxWidth={width} {...(cardProps as unknown as CardProps)} />}
        </CardContainer>
      </Box>
    </GridProvider>
  );
};

export default PageBanner;
