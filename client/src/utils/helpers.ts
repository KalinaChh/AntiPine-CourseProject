import dayjs from 'dayjs';

export const formatChartFooterDate = (dateString: string) => {
  return dayjs(dateString).format('MM,YYYY');
};
