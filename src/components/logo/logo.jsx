import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import logo from '../../assets/logoArg.png'

const Logo = ({ sx }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <img src={logo} alt="Logo" />
    </Box>
  );
};

Logo.propTypes = {
  sx: PropTypes.object,
};

export default Logo;