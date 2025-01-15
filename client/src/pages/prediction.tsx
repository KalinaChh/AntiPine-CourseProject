import MainLayout from '@/components/Layout/MainLayout';

import { Dashboard } from '../components/Dashboard/Dashboard';
import { bitcoinPredictionMock } from '../mock/predictions/bitcoinPredictionMock';
import { sp500PredictionMock } from '../mock/predictions/sp500PredictionMock';

export default function Prediction() {
  const sp500PredictionMockData = sp500PredictionMock.map((x, index) => ({ id: index, ...x }));
  const bitcoinMockData = bitcoinPredictionMock.map((x, index) => ({ id: index, ...x }));

  return (
    <MainLayout>
      <Dashboard
        spData={sp500PredictionMockData}
        bitcoinData={bitcoinMockData}
        boardType={'predictions'}
      />
    </MainLayout>
  );
}
