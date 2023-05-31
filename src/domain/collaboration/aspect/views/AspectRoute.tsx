import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { JourneyTypeName } from '../../../challenge/JourneyTypeName';
import useBackToParentPage from '../../../shared/utils/useBackToParentPage';
import AspectDashboardPage from '../pages/AspectDashboardPage';
import AspectSettingsPage from '../pages/AspectSettingsPage';
import AspectSharePage from '../pages/AspectSharePage';
import { AspectDialogSection } from './AspectDialogSection';
import { AspectLayoutHolder } from './AspectLayoutWithOutlet';

export interface AspectRouteProps {
  parentPagePath: string;
  journeyTypeName: JourneyTypeName;
}

const AspectRoute: FC<AspectRouteProps> = ({ parentPagePath, journeyTypeName }) => {
  const [backToExplore] = useBackToParentPage(parentPagePath, { keepScroll: true });
  const onClose = () => backToExplore();

  return (
    <Routes>
      <Route path="/" element={<AspectLayoutHolder />}>
        <Route index element={<Navigate replace to={AspectDialogSection.Dashboard} state={{ keepScroll: true }} />} />
        <Route path={AspectDialogSection.Dashboard} element={<AspectDashboardPage onClose={onClose} />} />
        <Route path={AspectDialogSection.Share} element={<AspectSharePage onClose={onClose} />} />
        <Route
          path={AspectDialogSection.Settings}
          element={<AspectSettingsPage onClose={onClose} journeyTypeName={journeyTypeName} />}
        />
      </Route>
    </Routes>
  );
};

export default AspectRoute;
