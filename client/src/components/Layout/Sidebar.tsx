import React, { useState } from 'react';

import LayersIcon from '@mui/icons-material/Layers';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const { pathname, push } = useRouter();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box>
        <Typography variant="h6" noWrap component="div" sx={{ padding: '22px' }}>
          AntiPine
        </Typography>
        <Divider />

        <List>
          <ListItem
            component="li"
            onClick={() => push('/history')}
            sx={{
              ':hover': { cursor: 'pointer' },
              bgcolor: pathname === '/history' ? '#5D87FF' : 'white',
            }}
          >
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          <ListItem
            component="li"
            onClick={() => push('/prediction')}
            sx={{
              ':hover': { cursor: 'pointer' },
              bgcolor: pathname === '/prediction' ? '#5D87FF' : 'white',
            }}
          >
            <ListItemIcon>
              <OnlinePredictionIcon />
            </ListItemIcon>
            <ListItemText primary="Prediction" />
          </ListItem>
        </List>

        {/* <Divider /> */}
        {/* <Typography variant="subtitle1" sx={{ padding: 2 }}>
          Utilities
        </Typography>
        <List>
          <ListItem
            component="li"
            onClick={() => handleTabClick('Shadow')}
            sx={{
              ':hover': { cursor: 'pointer' },
              bgcolor: selectedTab === 'Shadow' ? '#5D87FF' : 'white',
            }}
          >
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Shadow" />
          </ListItem>
        </List> */}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
