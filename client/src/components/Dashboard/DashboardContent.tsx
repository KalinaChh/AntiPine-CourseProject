import React from 'react';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Button, Card, IconButton, Typography } from '@mui/material';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { DataLog } from '../../pages/history';
import { formatChartFooterDate } from '../../utils/helpers';

type DashboardContentProps = { chartData: DataLog[]; isHistoryContent: boolean };

const DashboardContent = ({ chartData, isHistoryContent }: DashboardContentProps) => {
  //TODO: Get average trend for the period in %
  const pieData = [
    { name: '2022', value: 65 },
    { name: '2023', value: 35 },
  ];

  const COLORS = ['#6C63FF', '#65C9FF'];

  const maxTicks = 5; // Define maximum number of ticks you want
  const interval = Math.floor(chartData.length / maxTicks); // Calculate interval

  return (
    <Box sx={{ display: 'flex', gap: 2, padding: 3, width: '70vw' }}>
      <Card sx={{ flex: 3, padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isHistoryContent ? 'History' : 'Prediction'} Overview
          </Typography>

          <Box>
            <Button variant="outlined" size="small">
              {formatChartFooterDate(chartData[0].Date)}
            </Button>
            -
            <Button variant="outlined" size="small">
              {formatChartFooterDate(chartData[chartData.length - 1].Date)}
            </Button>
          </Box>
        </Box>

        <Box sx={{ height: 500, marginTop: 2 }}>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <XAxis
                interval={interval}
                dataKey="Date"
                tickFormatter={formatChartFooterDate}
                tickSize={15}
                tickCount={5}
              />
              <YAxis
                dataKey="Forecast"
                width={100}
                tickFormatter={(number) => `${number.toFixed(2)}$`}
                domain={['dataMin', 'dataMax']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Forecast"
                stroke={isHistoryContent ? '#65C9FF' : '#8884d8'}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Card sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h6">Trend for the period</Typography>
          <Typography variant="h4" color="primary" sx={{ my: 1 }}>
            {/* //TODO: Current price */}
            $36,358
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* //TODO: Last 12 moths */}
            <span style={{ color: 'green' }}>+9% </span> last year
          </Typography>

          {/* Donut Chart ? */}
          <Box sx={{ height: 250, marginTop: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {pieData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Card>

        <Card sx={{ padding: 5, textAlign: 'center', position: 'relative' }}>
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
