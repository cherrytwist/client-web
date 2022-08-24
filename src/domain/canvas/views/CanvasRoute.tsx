import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useUrlParams } from '../../../hooks';
import { EntityTypeName } from '../../shared/layout/PageLayout/SimplePageLayout';
import CanvasesView from '../EntityCanvasPage/CanvasesView';

export interface AspectRouteProps {
  parentPagePath: string;
  entityTypeName: EntityTypeName;
}

const CanvasRoute: FC<AspectRouteProps> = ({ parentPagePath, entityTypeName }) => {
  const { canvasNameId } = useUrlParams();

  return (
    <Routes>
      <Route
        path="/"
        element={<CanvasesView canvasId={canvasNameId} parentUrl={parentPagePath} entityTypeName={entityTypeName} />}
      />
    </Routes>
  );
};

export default CanvasRoute;
