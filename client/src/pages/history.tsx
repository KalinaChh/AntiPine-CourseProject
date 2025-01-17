import MainLayout from '@/components/Layout/MainLayout';

import { useGetBitcoinHistory } from '../api/bitcoinController';
import { useGetSP500History } from '../api/sAndP500Controller';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Loader } from '../components/common/Loader';

export default function History() {
  const { data: sp500PredictionData, isLoading: isSP500Loading } = useGetSP500History();
  const { data: bitcoinData, isLoading: isBitcoinLoading } = useGetBitcoinHistory();

  const isLoading = isSP500Loading || isBitcoinLoading || !sp500PredictionData || !bitcoinData;

  return (
    <MainLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <Dashboard spData={sp500PredictionData} bitcoinData={bitcoinData} boardType={'history'} />
      )}
    </MainLayout>
  );
}
