import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getIn } from 'formik';
import PropTypes from 'prop-types';

const propTypes = {
  options: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  onChangeCustomize: PropTypes.func,
  afterOnChange: PropTypes.func,
  label: PropTypes.string
};

const SelectField = ({ options, form, field, label, onChangeCustomize, afterOnChange, ...otherProps }) => {
  //! State
  const { name, value, onBlur } = field;
  const { setFieldValue } = form;

  const error = getIn(form.errors || {}, name || '');
  const touch = getIn(form.touched || {}, name || '');

  //! Function
  const handleChange = (e, value, reason, details) => {
    if (onChangeCustomize) {
      onChangeCustomize(e, value, reason, details);
      return;
    }

    !!setFieldValue && setFieldValue(name, value);

    !!afterOnChange && afterOnChange(e, value, reason, details);
  };

  //! Render
  return (
    <Autocomplete
      options={options}
      getOptionLabel={option => option?.label || ''}
      id={name}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      renderInput={params => (
        <TextField {...params} label={label} error={!!error && !!touch} helperText={error && touch ? error : ''} />
      )}
      {...otherProps}
    />
  );
};

SelectField.propTypes = propTypes;
export default SelectField;
