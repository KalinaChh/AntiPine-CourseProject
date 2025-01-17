import MainLayout from '@/components/Layout/MainLayout';

import { useGetBitcoinHistory } from '../api/bitcoinController';
import { useGetSP500History } from '../api/sAndP500Controller';
import { Dashboard } from '../components/Dashboard/Dashboard';

export default function History() {
  const { data: sp500PredictionData } = useGetSP500History();
  const { data: bitcoinData } = useGetBitcoinHistory();

  if (!sp500PredictionData || !bitcoinData) {
    return null;
  }

  return (
    <MainLayout>
      <Dashboard spData={sp500PredictionData} bitcoinData={bitcoinData} boardType={'history'} />
    </MainLayout>
  );
}
