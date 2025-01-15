import MainLayout from '@/components/Layout/MainLayout';

import { Dashboard } from '../components/Dashboard/Dashboard';
import { bitcoinHistoryMock } from '../mock/history/bitcoinHistoryMock';
import { sp500PHistoryMock } from '../mock/history/sp500HistoryMock';

export type DataLog = {
  Title: string;
  Date: string;
  Forecast: number;
};

export default function History() {
  const sp500PredictionMockData = sp500PHistoryMock.map((x, index) => ({ id: index, ...x }));
  const bitcoinMockData = bitcoinHistoryMock.map((x, index) => ({ id: index, ...x }));

  return (
    <MainLayout>
      <Dashboard
        spData={sp500PredictionMockData}
        bitcoinData={bitcoinMockData}
        boardType={'history'}
      />
    </MainLayout>
  );
}
