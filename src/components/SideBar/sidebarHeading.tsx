import React from 'react';
import { Box, Typography, styled, useTheme } from '@mui/material';
import IconButton from './iconButton';
import CloseIcon from '@mui/icons-material/Close';

const Div = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
  paddingBottom: '8px',
  zIndex: 1500,
  backgroundColor: 'transparent',
  [theme.breakpoints.down('md')]: {
    paddingBottom: '8px',
  },
}));

const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.80)' : '#37474f',
  fontWeight: 700,
  fontSize: '1.25rem',
}));

type HeadProps = {
  onClickButton: React.MouseEventHandler<HTMLButtonElement>;
};

const Head: React.FC<HeadProps> = ({ onClickButton }) => {
  const {
    palette: { mode },
  } = useTheme();

  const isDarkMode = mode === 'dark';

  return (
    <Div>
      <Text>MENU</Text>
      <IconButton
        onClick={onClickButton}
        sx={{
          border: `1px solid ${isDarkMode ? '#3C3C3C' : '#E4E8F0'}`,
          color: isDarkMode ? 'rgba(255,255,255,.80)' : '#9e9e9e',
        }}
      >
        <CloseIcon />
      </IconButton>
    </Div>
  );
};

export default Head;
