import { Checkbox, FormControl, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { UiNodeInputAttributes } from '@ory/kratos-client';
import React, { FC, useState } from 'react';
import { getNodeName, getNodeTitle, getNodeValue, isInvalidNode } from './helpers';
import KratosFeedback from './KratosFeedback';
import { KratosProps } from './KratosProps';
import { useTranslation } from 'react-i18next';

interface KratosCheckboxProps extends KratosProps {}

const KratosCheckbox: FC<KratosCheckboxProps> = ({ node }) => {
  const attributes = node.attributes as UiNodeInputAttributes;
  const [state, setState] = useState(Boolean(getNodeValue(node)));

  const { t } = useTranslation();

  const invalid = isInvalidNode(node);

  const checkbox = (
    <Checkbox
      name={getNodeName(node)}
      checked={state}
      onChange={() => setState(oldState => !oldState)}
      color="primary"
    />
  );

  return (
    <Grid item xs={12}>
      <FormControl required={attributes.required} error={invalid}>
        <FormGroup row>
          <FormControlLabel control={checkbox} label={getNodeTitle(node, t)} />
        </FormGroup>
        <KratosFeedback node={node} />
      </FormControl>
    </Grid>
  );
};

export default KratosCheckbox;
