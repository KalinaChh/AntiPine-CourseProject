import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { DateEntry, HistoryResponse } from '../../api/responseTypes';
import DashboardContent from './DashboardContent';
import { DashboardFilters } from './DashboardFilters';
import { DashboardTabs } from './DashboardTabs';
import { chartDataReducer, getDataForPeriod } from './helpers';

const SP500_TAB_INDEX = 0;

type DashboardProps = {
  spData: HistoryResponse;
  bitcoinData: HistoryResponse;
  boardType: 'history' | 'predictions';
};

export type TimePeriod = '6mths' | '12mths' | '2y' | '3y' | '4y' | '5y';

export const Dashboard = ({ spData, bitcoinData, boardType }: DashboardProps) => {
  const [selectedTab, setSelectedTab] = useState(SP500_TAB_INDEX);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('6mths');

  const [chartData, setChartData] = useState<DateEntry[]>([]);

  const isHistory = boardType === 'history';

  useEffect(() => {
    const selectedDataSource = selectedTab === SP500_TAB_INDEX ? spData : bitcoinData;

    if (isHistory) {
      setChartData(chartDataReducer(selectedDataSource, 10));
      return;
    }

    setChartData(chartDataReducer(getDataForPeriod(selectedDataSource, timePeriod), 10));
  }, [selectedTab, timePeriod, spData, bitcoinData]);

  return (
    <Box mt={10}>
      <Box sx={{ display: 'flex', mx: 3 }}>
        <DashboardTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {!isHistory && <DashboardFilters timePeriod={timePeriod} setTimePeriod={setTimePeriod} />}
      </Box>

      <DashboardContent chartData={chartData} isHistoryContent={isHistory} />
    </Box>
  );
};
