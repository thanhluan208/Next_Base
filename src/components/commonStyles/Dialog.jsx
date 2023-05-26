import React from 'react';
import PropTypes from 'prop-types';
import CommonStyles from 'src/components/commonStyles';
import CommonIcons from 'src/components/commonIcons';
import MUIDialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { isFunction, isString } from 'lodash';

const propTypes = {};

const Dialog = ({ open, toggle, title, content, footer, ...otherProps }) => {
  //! State

  //! Function

  //! Render
  return (
    <MUIDialog open={open} onClose={toggle}>
      <DialogTitle>
        {isString(title) ? { title } : isFunction(title) ? title(open, toggle, otherProps) : ''}
      </DialogTitle>
      <DialogContent>
        {isString(content) ? { content } : isFunction(content) ? content(open, toggle, otherProps) : ''}
      </DialogContent>
      <DialogActions>
        {isString(footer) ? { footer } : isFunction(footer) ? footer(open, toggle, otherProps) : ''}
      </DialogActions>
    </MUIDialog>
  );
};

Dialog.propTypes = propTypes;
export default Dialog;
