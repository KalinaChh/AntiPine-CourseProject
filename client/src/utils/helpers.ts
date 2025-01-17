import dayjs from 'dayjs';

import { DateEntry } from '../api/responseTypes';

export const formatChartFooterDate = (dateString: string) => {
  return dayjs(dateString).format('MM,YYYY');
};

export const calculateTrend = (
  data: DateEntry[],
): { moneyTrend: string; percentageTrend: string } => {
  const firstPrice = data[0]?.price;
  const lastPrice = data[data.length - 1]?.price;

  const moneyTrend = (lastPrice - firstPrice).toFixed(2);
  const percentageTrend = ((Number(moneyTrend) / firstPrice) * 100).toFixed(2);

  return { moneyTrend, percentageTrend };
};

export const calculateGainsLosses = (data: DateEntry[]) => {
  const changes = data.slice(1).map((point, i) => point.price - data[i]?.price);
  const gains = changes.filter((change) => change > 0).reduce((sum, gain) => sum + gain, 0);
  const losses = Math.abs(
    changes.filter((change) => change < 0).reduce((sum, loss) => sum + loss, 0),
  );

  return [
    { name: 'Gains', value: gains },
    { name: 'Losses', value: losses },
  ];
};
