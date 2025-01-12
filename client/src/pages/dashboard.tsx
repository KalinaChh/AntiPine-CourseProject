import { Box, Button, Typography } from '@mui/material';

import MainLayout from '@/components/Layout/MainLayout';

import DashboardContent from '../components/Dashboard/DashboardContent';

export default function Dashboard() {
  return (
    <MainLayout>
      <Box>
        <DashboardContent />

        <Button onClick={() => console.log('clicked')}>Click me</Button>
        <Typography>EMPTY PAGE</Typography>
      </Box>
    </MainLayout>
  );
}
