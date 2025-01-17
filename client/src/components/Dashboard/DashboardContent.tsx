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

import { DateEntry } from '../../api/responseTypes';
import { calculateGainsLosses, calculateTrend, formatChartFooterDate } from '../../utils/helpers';
import { PieChartTooltip } from './Charts/PieChartTooltip';

type DashboardContentProps = { chartData: DateEntry[]; isHistoryContent: boolean };

const DashboardContent = ({ chartData, isHistoryContent }: DashboardContentProps) => {
  //TODO: Get average trend for the period in %
  const pieData = [
    { name: '2022', value: 65 },
    { name: '2023', value: 35 },
  ];

  const COLORS = ['#6C63FF', '#65C9FF'];

  const maxTicks = 5; // Define maximum number of ticks you want
  const interval = Math.floor(chartData.length / maxTicks); // Calculate interval

  const gainsLosesPie = calculateGainsLosses(chartData || []);
  const { moneyTrend, percentageTrend } = calculateTrend(chartData || []);

  return (
    <Box sx={{ display: 'flex', gap: 2, padding: 3, width: '70vw' }}>
      <Card sx={{ flex: 3, padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isHistoryContent ? 'History' : 'Prediction'} Overview
          </Typography>

          <Box>
            <Button variant="outlined" size="small">
              {formatChartFooterDate(chartData?.[0]?.date)}
            </Button>
            -
            <Button variant="outlined" size="small">
              {formatChartFooterDate(chartData?.[chartData.length - 1]?.date)}
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
                dataKey="date"
                tickFormatter={formatChartFooterDate}
                tickSize={15}
                tickCount={5}
              />
              <YAxis
                dataKey="price"
                width={100}
                tickFormatter={(number) => `${number.toFixed(2)}$`}
                domain={['dataMin', 'dataMax']}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke={isHistoryContent ? '#65C9FF' : '#8884d8'}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Card sx={{ padding: 3, textAlign: 'center' }}>
          <Typography variant="h6">
            Trend {isHistoryContent ? 'since beginning' : 'for the period'}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ my: 1 }}>
            ${moneyTrend}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ color: 'green' }}>{percentageTrend}% </span>
            {isHistoryContent ? 'since begging' : 'for selected period'}
          </Typography>

          <Box sx={{ height: 250, marginTop: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<PieChartTooltip />} />

                <Pie
                  data={gainsLosesPie}
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

        <Card sx={{ padding: 8, textAlign: 'center', position: 'relative' }}>
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
          <Typography variant="h6">Current price</Typography>
          <Typography variant="h4" color="primary" sx={{ my: 1 }}>
            ${isHistoryContent ? chartData[chartData.length - 1]?.price : chartData[0]?.price}
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default DashboardContent;
