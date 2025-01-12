import { Box } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar';

export default function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Header />

      <Sidebar />

      <Box display="flex" mb="100px" sx={{ justifyContent: 'center' }}>
        {children}
      </Box>
    </Box>
  );
}
