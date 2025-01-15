import dayjs from 'dayjs';

import { DataLog } from '../../pages/history';
import { TimePeriod } from './Dashboard';

export const getDataForPeriod = (allData: DataLog[], timePeriod: TimePeriod) => {
  const selectedPeriodData: DataLog[] = [];

  if (timePeriod === '6mths') {
    const dateAfterSixMonths = dayjs().add(6, 'month');
    allData.forEach((data) => {
      if (dayjs(data.Date).isBefore(dateAfterSixMonths)) {
        selectedPeriodData.push(data);
      }
    });
  } else if (timePeriod === '12mths') {
    const dateAfterTwelveMonths = dayjs().add(12, 'month');
    allData.forEach((data) => {
      if (dayjs(data.Date).isBefore(dateAfterTwelveMonths)) {
        selectedPeriodData.push(data);
      }
    });
  } else if (timePeriod === '2y') {
    const dateAfterTwoYears = dayjs().add(2, 'year');
    allData.forEach((data) => {
      if (dayjs(data.Date).isBefore(dateAfterTwoYears)) {
        selectedPeriodData.push(data);
      }
    });
  } else if (timePeriod === '3y') {
    const dateAfterThreeYears = dayjs().add(3, 'year');
    allData.forEach((data) => {
      if (dayjs(data.Date).isBefore(dateAfterThreeYears)) {
        selectedPeriodData.push(data);
      }
    });
  } else if (timePeriod === '4y') {
    const dateAfterFourYears = dayjs().add(4, 'year');
    allData.forEach((data) => {
      if (dayjs(data.Date).isBefore(dateAfterFourYears)) {
        selectedPeriodData.push(data);
      }
    });
  } else if (timePeriod === '5y') {
    const dateAfterFiveYears = dayjs().add(5, 'year');

    allData.forEach((data) => {
      if (dayjs(data.Date).isBefore(dateAfterFiveYears)) {
        selectedPeriodData.push(data);
      }
    });
  }

  return selectedPeriodData;
};
