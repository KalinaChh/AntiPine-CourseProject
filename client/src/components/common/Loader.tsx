import { Box, CircularProgress } from '@mui/material';

export const Loader = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '80vh',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <CircularProgress />
    </Box>
  );
};
