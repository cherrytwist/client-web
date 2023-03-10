import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { Lifecycle } from '../../../../../core/apollo/generated/graphql-schema';
import { LifecycleVisualization, LifecycleDataProvider, LifecycleVisualizationOptions } from '@alkemio/visualization';

export interface InnovationFlowVisualizerProps {
  lifecycle: Pick<Lifecycle, 'machineDef' | 'state'>;
  options?: LifecycleVisualizationOptions;
}

const InnovationFlowVisualizer: FC<InnovationFlowVisualizerProps> = ({ lifecycle, options }) => {
  const theme = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (lifecycle && svgRef.current) {
      buildGraph(svgRef.current, lifecycle, theme, options);
    }
  }, [theme, options, lifecycle]);
  const key = useMemo(() => Date.now(), [lifecycle]);

  return <svg id="graph-container" key={key} ref={svgRef} />;
};

const buildGraph = (
  ref: SVGSVGElement,
  lifecycle: Pick<Lifecycle, 'machineDef' | 'state'>,
  theme: Theme,
  options?: LifecycleVisualizationOptions
) => {
  if (!LifecycleDataProvider.validateLifecycleDefinition(lifecycle.machineDef)) {
    return undefined;
  }

  const graphThemeDefaults: LifecycleVisualizationOptions = {
    strokePrimaryColor: theme.palette.primary.main,
    strokeDefaultColor: '#000',
    fillColor: theme.palette.background.paper,
    font: theme.typography.button.fontFamily?.toString() || 'Source Sans Pro',
    fontSize: theme.typography.button.fontSize?.toString() || '16px',
  };

  options = { ...graphThemeDefaults, ...options };

  _buildGraph(ref, lifecycle, options);
};

const _buildGraph = async (
  ref: SVGSVGElement,
  lifecycle: Pick<Lifecycle, 'machineDef' | 'state'>,
  options: LifecycleVisualizationOptions
) => {
  const lifecycleData = new LifecycleDataProvider();
  await lifecycleData.loadData(lifecycle.machineDef);

  const width = 800;
  const height = 400;
  lifecycleData.updateState(lifecycle.state || '');

  const visualization = new LifecycleVisualization(ref, lifecycleData, width, height, options);
  visualization.displayLifecycle();
};

export default InnovationFlowVisualizer;
