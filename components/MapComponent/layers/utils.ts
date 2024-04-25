import { ConnectionType, StationStatusType } from 'types';
import { TextColor } from 'components/Text';

export const getStatusTooltipTextColor = (status: string, defaultColor = TextColor.Light): TextColor => {
  switch (status) {
    case ConnectionType.Connected:
      return TextColor.Success;
    case ConnectionType.StationIssue:
    case ConnectionType.NotFound:
      return TextColor.Warning;
    case StationStatusType.Alarm:
      return TextColor.Danger;
    case StationStatusType.Normal:
      return TextColor.Success;
    case StationStatusType.Medium:
      return TextColor.Warning;
    case StationStatusType.Learning:
      return TextColor.Gray;
    default:
      return defaultColor;
  }
};
