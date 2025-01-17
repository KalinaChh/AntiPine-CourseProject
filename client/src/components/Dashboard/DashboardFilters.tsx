import { Dispatch, SetStateAction } from 'react';

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { TimePeriod } from './Dashboard';

type DashboardFiltersProps = {
  totalScenarios: number;
  timePeriod: TimePeriod;
  setTimePeriod: Dispatch<SetStateAction<TimePeriod>>;

  scenario: number;
  setScenario: Dispatch<SetStateAction<number>>;
};

export const DashboardFilters = ({
  totalScenarios,
  timePeriod,
  scenario,
  setTimePeriod,
  setScenario,
}: DashboardFiltersProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value as TimePeriod);
  };

  const scenarioButtons = Array.from({ length: totalScenarios }, (_, i) => i);

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

      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, mt: 2 }}
      >
        {scenarioButtons.map((x) => (
          <Button
            variant={scenario === x ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setScenario(x)}
          >
            Scenario {x + 1}
          </Button>
        ))}
      </Box>
    </FormControl>
  );
};
