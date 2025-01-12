import React from 'react';
import { useState } from 'react';

import { Box, Tab, Tabs } from '@mui/material';

export const DashboardTabs = () => {
  const TAB_SP500 = 0;
  const TAB_BITCOIN = 1;

  const [value, setValue] = useState(TAB_SP500);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(Number(newValue));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value={TAB_SP500} label="S&P 500" />
        <Tab value={TAB_BITCOIN} label="Bitcoin" />
      </Tabs>
    </Box>
  );
};
