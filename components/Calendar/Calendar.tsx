import React from 'react';
import Text, { TextColor, TextSize } from '../Text';
import { StyledComponent } from 'types';
import classNames from 'classnames';
import './Calendar.scss';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import Tooltip from '../Tooltip';
import TextResourceContext from 'contexts/TextResource';
import CalendarOverlay from './CalendarOverlay';
import { Placement } from 'components/Tooltip/Tooltip';

export interface Range {
  startDate: Date;
  endDate: Date;
}

const getDateLabel = (date: Date) => {
  if (!date) {
    return '_______';
  }

  const today = new Date(date);
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  return dd + '/' + mm + '/' + yyyy;
};

const threeDaysAgo = Date.now() - 1000 * 60 * 60 * 24 * 3;
const DEFAULT_VALUE = [new Date(threeDaysAgo), new Date()];

interface CalendarProps extends StyledComponent {
  onSubmit: (dates: Date[]) => void;
  defaultValue?: Date[];
  textColor?: TextColor;
  placement?: Placement;
  align?: { offset: [number, number] };
}

const Calendar: React.FC<CalendarProps> = ({
  onSubmit,
  defaultValue = DEFAULT_VALUE,
  className,
  textColor = TextColor.Inherit,
  placement = 'bottom',
  align = { offset: [0, 20] }
}) => {
  const { getTextResourceByKey } = React.useContext(TextResourceContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const [isCloseForce, setIsCloseForce] = React.useState(false);
  const defaultDataRange = {
    startDate: defaultValue[0],
    endDate: defaultValue[1]
  };

  const [submittedDate, setSubmittedDate] = React.useState<Range>(defaultDataRange);

  const [range, setValue] = React.useState<Range>(defaultDataRange);

  const handleValueChange = React.useCallback((newValue: { range1: Range }) => {
    setValue(newValue.range1);
  }, []);

  const closeCalendar = () => {
    setIsCloseForce(true);

    setTimeout(() => {
      setIsCloseForce(false);
    });
  };

  const onRejectCalendar = () => {
    setValue(submittedDate);
    closeCalendar();
  };

  // const onSetDefaults = () => {
  //   closeCalendar();
  //   setSubmittedDate(defaultDataRange);
  //   setValue(defaultDataRange);
  //   onSubmit([defaultValue[0], defaultValue[1]]);
  // };

  const onSubmitDate = React.useCallback(() => {
    closeCalendar();
    setSubmittedDate(range);
    onSubmit([range.startDate, range.endDate]);
  }, [range]);

  const maxDate = React.useMemo(() => new Date(), []);

  // const isDefaultValueChanged =
  //   submittedDate.startDate === defaultValue[0] && submittedDate.endDate === defaultValue[1];

  return (
    <div ref={ref}>
      <Tooltip
        overlay={
          <div>
            <CalendarOverlay
              range={range}
              handleValueChange={handleValueChange}
              maxDate={maxDate}
              // isDefaultValueChanged={isDefaultValueChanged}
              // onSetDefaults={onSetDefaults}
              getTextResourceByKey={getTextResourceByKey}
              onRejectCalendar={onRejectCalendar}
              onSubmitDate={onSubmitDate}
              onClickOutside={onRejectCalendar}
              shownDate={threeDaysAgo}
            />
          </div>
        }
        trigger='click'
        placement={placement}
        mouseLeaveDelay={0.5}
        align={align}
        {...(isCloseForce ? { visible: false } : {})}
        getTooltipContainer={() => ref.current as HTMLDivElement}
      >
        <div className={classNames(className, 'd-inline-flex  calendar__select-btn gap-1')}>
          <Text size={TextSize.Sm} color={textColor}>
            {getDateLabel(submittedDate.startDate)}
          </Text>
          <Text size={TextSize.Sm} color={textColor}>
            -
          </Text>
          <Text size={TextSize.Sm} color={textColor}>
            {getDateLabel(submittedDate.endDate)}
          </Text>
        </div>
      </Tooltip>
    </div>
  );
};

export default Calendar;
