import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { DateEntry, HistoryResponse, PredictionResponse } from '../../api/responseTypes';
import DashboardContent from './DashboardContent';
import { DashboardFilters } from './DashboardFilters';
import { DashboardTabs } from './DashboardTabs';
import { chartDataReducer, getDataForPeriod } from './helpers';

const SP500_TAB_INDEX = 0;

type DashboardProps = {
  spData: HistoryResponse | PredictionResponse;
  bitcoinData: HistoryResponse | PredictionResponse;
  boardType: 'history' | 'predictions';
};

export type TimePeriod = '6mths' | '12mths' | '2y' | '3y' | '4y' | '5y';

export const Dashboard = ({ spData, bitcoinData, boardType }: DashboardProps) => {
  const [selectedTab, setSelectedTab] = useState(SP500_TAB_INDEX);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('6mths');
  const [scenario, setScenario] = useState<number>(0);

  const [chartData, setChartData] = useState<DateEntry[]>([]);

  const isHistory = boardType === 'history';

  useEffect(() => {
    if (isHistory) {
      const selectedDataSource = (
        selectedTab === SP500_TAB_INDEX ? spData : bitcoinData
      ) as HistoryResponse;

      const finalData = chartDataReducer(selectedDataSource, 10);

      setChartData(finalData);
    } else {
      const selectedDataSource = (
        selectedTab === SP500_TAB_INDEX ? spData : bitcoinData
      ) as PredictionResponse;

      const selectedScenarioData = Object.values(selectedDataSource)[scenario || 0];
      const filteredData = getDataForPeriod(selectedScenarioData, timePeriod);

      setChartData(filteredData);
    }
  }, [selectedTab, timePeriod, spData, bitcoinData, scenario]);

  return (
    <Box mt={10}>
      <Box sx={{ display: 'flex', mx: 3 }}>
        <DashboardTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {!isHistory && (
          <DashboardFilters
            totalScenarios={Object.keys(spData).length}
            timePeriod={timePeriod}
            scenario={scenario}
            setTimePeriod={setTimePeriod}
            setScenario={setScenario}
          />
        )}
      </Box>

      <DashboardContent chartData={chartData} isHistoryContent={isHistory} />
    </Box>
  );
};
