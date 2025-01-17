import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '../config/axios.config';
import { Endpoints } from './Endpoints';
import { HistoryResponse, PredictionResponse } from './responseTypes';

export const useGetBitcoinHistory = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosClient.get(Endpoints.BTC_HISTORY);

      return response.data as HistoryResponse;
    },
    queryKey: ['getBitcoinHistory'],
  });
};

export const useGetBitcoinPrediction = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosClient.get(Endpoints.BTC_PREDICTION);

      return response.data as PredictionResponse;
    },
    queryKey: ['getBitcoinPrediction'],
  });
};
