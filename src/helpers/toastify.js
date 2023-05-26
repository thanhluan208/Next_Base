import { toast } from 'react-toastify';

export const toastSucesss = (message, options = {}) => {
  toast.success(message, {
    ...options
  });
};

export const toastError = (message, options = {}) => {
  toast.error(message, {
    ...options
  });
};

export const toastWarning = (message, options = {}) => {
  toast.warning(message, {
    ...options
  });
};

export const toastInfo = (message, options = {}) => {
  toast.info(message, {
    ...options
  });
};
