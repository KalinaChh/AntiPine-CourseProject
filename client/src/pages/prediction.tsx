import MainLayout from '@/components/Layout/MainLayout';

import { useGetBitcoinPrediction } from '../api/bitcoinController';
import { useGetSP500Prediction } from '../api/sAndP500Controller';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Loader } from '../components/common/Loader';

export default function Prediction() {
  const { data: sp500PredictionData, isLoading: isSP500Loading } = useGetSP500Prediction();
  const { data: bitcoinPredictionData, isLoading: isBitcoinLoading } = useGetBitcoinPrediction();

  const isLoading =
    isSP500Loading || isBitcoinLoading || !sp500PredictionData || !bitcoinPredictionData;

  return (
    <MainLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <Dashboard
          spData={sp500PredictionData}
          bitcoinData={bitcoinPredictionData}
          boardType={'predictions'}
        />
      )}
    </MainLayout>
  );
}
