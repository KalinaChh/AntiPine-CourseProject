import { useQuery } from '@tanstack/react-query';

import { axiosClient } from '../config/axios.config';
import { Endpoints } from './Endpoints';
import { HistoryResponse, PredictionResponse } from './responseTypes';

export const useGetSP500History = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosClient.get(Endpoints.SP500_HISTORY);

      return response.data as HistoryResponse;
    },
    queryKey: ['getSP500History'],
  });
};

export const useGetSP500Prediction = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosClient.get(Endpoints.SP500_PREDICTION);

      return response.data as PredictionResponse;
    },
    queryKey: ['getSP500Prediction'],
  });
};
