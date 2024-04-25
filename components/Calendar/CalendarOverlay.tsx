import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { COLORS } from 'consts';
import Button, { ButtonSize, ButtonType } from '../Button'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { Range } from './Calendar';

interface CalendarOverlayProps {
  range: Range;
  handleValueChange: (newValue: { range1: Range }) => void;
  maxDate: Date;
  //   isDefaultValueChanged: boolean;
  //   onSetDefaults: () => void;
  getTextResourceByKey: (key: string, params?: object | undefined) => React.ReactNode;
  onRejectCalendar: () => void;
  onSubmitDate: () => void;
  onClickOutside: () => void;
  shownDate: number;
}

const colors = [COLORS.success];

const CalendarOverlay: React.FC<CalendarOverlayProps> = ({
  range,
  handleValueChange,
  maxDate,
  //   isDefaultValueChanged,
  //   onSetDefaults,
  getTextResourceByKey,
  onRejectCalendar,
  onSubmitDate,
  onClickOutside,
  shownDate
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onClickOutside);

  return (
    <div className='position-relative' ref={ref}>
      <DateRangePicker
        ranges={[range]}
        onChange={handleValueChange}
        showMonthAndYearPickers={false}
        maxDate={maxDate}
        rangeColors={colors}
        style={{ paddingBottom: '40px' }}
        shownDate={new Date(shownDate)}
      />
      <div className='position-absolute bottom-1 d-flex align-self-end pl-2' style={{ gap: '5px' }}>
        {/* <Button
          disabled={isDefaultValueChanged}
          size={ButtonSize.Small}
          buttonType={ButtonType.Secondary}
          onClick={onSetDefaults}
        >
          {getTextResourceByKey('default')}
        </Button> */}
        <Button size={ButtonSize.Small} buttonType={ButtonType.Danger} onClick={onRejectCalendar}>
          {getTextResourceByKey('close')}
        </Button>
        <Button size={ButtonSize.Small} buttonType={ButtonType.Success} onClick={onSubmitDate}>
          {getTextResourceByKey('submit')}
        </Button>
      </div>
    </div>
  );
};

export default CalendarOverlay;
