import { useState } from 'react';

import { Box } from '@mui/material';

import { DataLog } from '../../pages/history';
import DashboardContent from './DashboardContent';
import { DashboardFilters } from './DashboardFilters';
import { DashboardTabs } from './DashboardTabs';

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

  const isHistory = boardType === 'history';

  return (
    <Box mt={10}>
      <Box sx={{ display: 'flex', mx: 3 }}>
        <DashboardTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {!isHistory && <DashboardFilters timePeriod={timePeriod} setTimePeriod={setTimePeriod} />}
      </Box>

      <DashboardContent
        chartData={selectedTab === SP500_TAB_INDEX ? spData : bitcoinData}
        isHistoryContent={isHistory}
      />
    </Box>
  );
};
