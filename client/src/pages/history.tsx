import { Box } from '@mui/material';

import MainLayout from '@/components/Layout/MainLayout';

import DashboardContent from '../components/Dashboard/DashboardContent';
import { DashboardTabs } from '../components/Dashboard/DashboardTabs';

export default function History() {
  return (
    <MainLayout>
      <Box mt={10}>
        <Box sx={{ display: 'flex' }}>
          <DashboardTabs />
        </Box>

        <DashboardContent />
      </Box>
    </MainLayout>
  );
}
