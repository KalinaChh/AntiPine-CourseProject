import React from 'react';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Button, Card, IconButton, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const DashboardContent = () => {
  // Sample data
  const barData = [
    { date: '16/08', '2022': 200, '2023': 150 },
    { date: '17/08', '2022': 300, '2023': 280 },
    { date: '18/08', '2022': 250, '2023': 200 },
    { date: '19/08', '2022': 400, '2023': 380 },
    { date: '20/08', '2022': 320, '2023': 300 },
    { date: '21/08', '2022': 100, '2023': 90 },
    { date: '22/08', '2022': 380, '2023': 350 },
  ];

  const pieData = [
    { name: '2022', value: 65 },
    { name: '2023', value: 35 },
  ];

  const COLORS = ['#6C63FF', '#65C9FF'];

  return (
    <Box sx={{ display: 'flex', gap: 2, padding: 3 }}>
      {/* Sales Overview */}
      <Card sx={{ flex: 3, padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Sales Overview</Typography>
          <Button variant="outlined" size="small">
            March 2023
          </Button>
        </Box>

        {/* Bar Chart */}
        <Box sx={{ height: 300, marginTop: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="2022" fill="#6C63FF" />
              <Bar dataKey="2023" fill="#65C9FF" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      {/* Right Side Cards */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Yearly Breakup */}
        <Card sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h6">Yearly Breakup</Typography>
          <Typography variant="h4" color="primary" sx={{ my: 1 }}>
            $36,358
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ color: 'green' }}>+9% </span> last year
          </Typography>

          {/* Donut Chart */}
          <Box sx={{ height: 150, marginTop: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  fill="#8884d8"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        {/* Monthly Earnings */}
        <Card sx={{ padding: 3, textAlign: 'center', position: 'relative' }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: '#65C9FF',
              color: '#fff',
              '&:hover': { backgroundColor: '#4da6db' },
            }}
          >
            <AttachMoneyIcon />
          </IconButton>
          <Typography variant="h6">Monthly Earnings</Typography>
          <Typography variant="h4" color="primary" sx={{ my: 1 }}>
            $6,820
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ color: 'red' }}>-9% </span> last year
          </Typography>

          {/* Placeholder for Graph */}
          <Box
            component="img"
            src="https://via.placeholder.com/150x50"
            alt="Graph"
            sx={{ width: '100%', mt: 2 }}
          />
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardContent;
