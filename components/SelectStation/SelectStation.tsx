import React from 'react';
import { StationType, StyledComponent } from 'types';
import Switcher from '../Switcher';
import classNames from 'classnames';

const stations = [StationType.Status, StationType.Elescope] as [string, string];

interface SelectStationProps extends StyledComponent {
  stationType: StationType;
  setStationType: (st: StationType) => void;
}

const SelectStation: React.FC<SelectStationProps> = ({ stationType, className, setStationType }) => (
  <Switcher
    variants={stations}
    variant={stationType}
    setVariant={setStationType as (s: string) => void}
    className={classNames('d-inline-block', className)}
  />
);

export default React.memo(SelectStation);
