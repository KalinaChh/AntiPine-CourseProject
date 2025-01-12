import { AppBar, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static" sx={{ zIndex: 10000 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h4" component="div">
          AntiPine
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
