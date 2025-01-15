import { Dispatch, SetStateAction } from 'react';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { TimePeriod } from './Dashboard';

type DashboardFiltersProps = {
  timePeriod: TimePeriod;
  setTimePeriod: Dispatch<SetStateAction<TimePeriod>>;
};

export const DashboardFilters = ({ timePeriod, setTimePeriod }: DashboardFiltersProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value as TimePeriod);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="time-period-label">Time Period</InputLabel>
      <Select
        labelId="time-period-label"
        id="time-period-select"
        value={timePeriod}
        label="Time Period"
        onChange={handleChange}
      >
        <MenuItem value="6mths">6 months</MenuItem> <MenuItem value="12mths">12 months</MenuItem>
        <MenuItem value="2y">2 years</MenuItem> <MenuItem value="3y">3 years</MenuItem>
        <MenuItem value="4y">4 years</MenuItem> <MenuItem value="5y">5 years</MenuItem>
      </Select>
    </FormControl>
  );
};
