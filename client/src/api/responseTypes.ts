export type DateEntry = {
  date: string;
  price: number;
};

export type HistoryResponse = DateEntry[];

export type PredictionResponse = {
  scenario1: DateEntry[];
  scenario2: DateEntry[];
  scenario3: DateEntry[];
  scenario4: DateEntry[];
  scenario5: DateEntry[];
};
