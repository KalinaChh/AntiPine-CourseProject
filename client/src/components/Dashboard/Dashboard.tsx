import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { DataLog } from '../../pages/history';
import DashboardContent from './DashboardContent';
import { DashboardFilters } from './DashboardFilters';
import { DashboardTabs } from './DashboardTabs';
import { getDataForPeriod } from './helpers';

const SP500_TAB_INDEX = 0;

type DashboardProps = {
  spData: DataLog[];
  bitcoinData: DataLog[];
  boardType: 'history' | 'predictions';
};

export type TimePeriod = '6mths' | '12mths' | '2y' | '3y' | '4y' | '5y';

export const Dashboard = ({ spData, bitcoinData, boardType }: DashboardProps) => {
  const [selectedTab, setSelectedTab] = useState(SP500_TAB_INDEX);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('6mths');

  const [chartData, setChartData] = useState<DataLog[]>([]);

  const isHistory = boardType === 'history';

  useEffect(() => {
    const selectedDataSource = selectedTab === SP500_TAB_INDEX ? spData : bitcoinData;

    if (isHistory) {
      setChartData(selectedDataSource);
      return;
    }

    setChartData(getDataForPeriod(selectedDataSource, timePeriod));
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
