import React from 'react';

import { Box, Tab, Tabs } from '@mui/material';

type DashboardTabsProps = {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
};

export const DashboardTabs = ({ selectedTab, setSelectedTab }: DashboardTabsProps) => {
  const TAB_SP500 = 0;
  const TAB_BITCOIN = 1;

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(Number(newValue));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value={TAB_SP500} label="S&P 500" />
        <Tab value={TAB_BITCOIN} label="Bitcoin (BTC)" />
      </Tabs>
    </Box>
  );
};
