import { TextField as MUITextField, InputAdornment } from '@mui/material';
import React from 'react';
import { getIn } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PropTypes from 'prop-types';

const propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  afterOnChange: PropTypes.func,
  onChangeCusomize: PropTypes.func,
  enableShowPassword: PropTypes.bool
};

const TextField = ({ form, field, afterOnChange, onChangeCusomize, enableShowPassword, ...otherProps }) => {
  //! State
  const [showPassword, setShowPassword] = React.useState(false);
  const { name, value, onChange, onBlur } = field;

  const error = getIn(form.errors || {}, name || '');
  const touch = getIn(form.touched || {}, name || '');

  //! Function
  const handleChange = e => {
    if (onChangeCusomize) {
      onChangeCusomize(e);
      return;
    }

    onChange(e);

    if (afterOnChange) {
      afterOnChange(e);
    }
  };

  //! Render
  return (
    <MUITextField
      value={value}
      name={name}
      id={name}
      onChange={handleChange}
      onBlur={onBlur}
      error={!!error && !!touch}
      helperText={error && touch ? error : ''}
      InputProps={
        enableShowPassword
          ? {
              id: name,
              endAdornment: (
                <InputAdornment
                  position='end'
                  sx={{
                    height: '100%',
                    width: '33px',
                    cursor: 'pointer',
                    padding: '0 8px'
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              )
            }
          : {
              id: name
            }
      }
      {...otherProps}
      type={!enableShowPassword ? 'text' : showPassword ? 'text' : 'password'}
    />
  );
};

TextField.propTypes = propTypes;
export default TextField;
