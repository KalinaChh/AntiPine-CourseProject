import MainLayout from '@/components/Layout/MainLayout';

import { useGetBitcoinPrediction } from '../api/bitcoinController';
import { useGetSP500Prediction } from '../api/sAndP500Controller';
import { Dashboard } from '../components/Dashboard/Dashboard';

export default function Prediction() {
  const { data: sp500PredictionData } = useGetSP500Prediction();
  const { data: bitcoinPredictionData } = useGetBitcoinPrediction();

  if (!sp500PredictionData || !bitcoinPredictionData) {
    return null;
  }

  return (
    <MainLayout>
      <Dashboard
        spData={sp500PredictionData}
        bitcoinData={bitcoinPredictionData}
        boardType={'predictions'}
      />
    </MainLayout>
  );
}
