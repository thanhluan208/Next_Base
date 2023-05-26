import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

const Button = ({ children, ...otherProps }) => {
  return <LoadingButton {...otherProps}>{children}</LoadingButton>;
};

export default Button;
