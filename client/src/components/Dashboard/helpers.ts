import dayjs from 'dayjs';

import { DateEntry, HistoryResponse } from '../../api/responseTypes';
import { TimePeriod } from './Dashboard';

export const getDataForPeriod = (allData: HistoryResponse, timePeriod: TimePeriod) => {
  const selectedPeriodData: HistoryResponse = [];

  if (timePeriod === '6mths') {
    const dateAfterSixMonths = dayjs().add(6, 'month');
    allData.forEach((data) => {
      if (dayjs(data.date).isBefore(dateAfterSixMonths)) {
        selectedPeriodData.push(data);
      }
    });
  } else if (timePeriod === '12mths') {
    const dateAfterTwelveMonths = dayjs().add(12, 'month');
    allData.forEach((data) => {
      if (dayjs(data.date).isBefore(dateAfterTwelveMonths)) {
        selectedPeriodData.push(data);
      }
    });
  } else if (timePeriod === '2y') {
    const dateAfterTwoYears = dayjs().add(2, 'year');
    allData.forEach((data) => {
      if (dayjs(data.date).isBefore(dateAfterTwoYears)) {
        selectedPeriodData.push(data);
      }
    });
  } else if (timePeriod === '3y') {
    const dateAfterThreeYears = dayjs().add(3, 'year');
    allData.forEach((data) => {
      if (dayjs(data.date).isBefore(dateAfterThreeYears)) {
        selectedPeriodData.push(data);
      }
    });
  } else if (timePeriod === '4y') {
    const dateAfterFourYears = dayjs().add(4, 'year');
    allData.forEach((data) => {
      if (dayjs(data.date).isBefore(dateAfterFourYears)) {
        selectedPeriodData.push(data);
      }
    });
  } else if (timePeriod === '5y') {
    const dateAfterFiveYears = dayjs().add(5, 'year');

    allData.forEach((data) => {
      if (dayjs(data.date).isBefore(dateAfterFiveYears)) {
        selectedPeriodData.push(data);
      }
    });
  }

  return selectedPeriodData;
};

export const chartDataReducer = (data: DateEntry[], groupSize: number): DateEntry[] => {
  const reducedData: DateEntry[] = [];

  for (let i = 0; i < data.length; i += groupSize) {
    const chunk = data.slice(i, i + groupSize);

    // Calculate the average price for the group
    const avgPrice = chunk.reduce((sum, point) => sum + point.price, 0) / chunk.length;

    // Calculate the average date
    const avgDate = dayjs(
      chunk.reduce((sum, point) => sum + new Date(point.date).getTime(), 0) / chunk.length,
    ).toISOString();

    reducedData.push({
      date: avgDate,
      price: Number(avgPrice.toFixed(2)),
    });
  }

  return reducedData;
};
