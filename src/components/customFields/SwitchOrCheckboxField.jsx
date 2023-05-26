import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';

const propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  onChangeCustomize: PropTypes.func,
  afterOnChange: PropTypes.func,
  isSwitch: PropTypes.bool
};

const SwitchOrCheckboxField = ({ form, field, onChangeCustomize, isSwitch, afterOnChange, ...otherProps }) => {
  //! State
  const { name, value, onBlur } = field;
  const { setFieldValue } = form;

  //! Function
  const handleChange = e => {
    if (onChangeCustomize) {
      onChangeCustomize(e);
      return;
    }

    !!setFieldValue && setFieldValue(name, e.target.checked);

    !!afterOnChange && afterOnChange(e);
  };

  //! Render
  if (isSwitch) {
    return <Switch checked={value} id={name} onBlur={onBlur} onChange={handleChange} {...otherProps} />;
  }

  return <Checkbox checked={value} id={name} onBlur={onBlur} onChange={handleChange} {...otherProps} />;
};

SwitchOrCheckboxField.propTypes = propTypes;
export default SwitchOrCheckboxField;
