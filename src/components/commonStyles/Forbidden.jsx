import React from 'react';
import PropTypes from 'prop-types';
import CommonStyles from 'src/components/commonStyles';
import CommonIcons from 'src/components/commonIcons';
import { useRouter } from 'next/router';

const propTypes = {};

const Forbidden = props => {
  //! State
  const router = useRouter();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{ display: 'flex', justifycontent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px' }}
    >
      <CommonStyles.Typography variant='h1'>403</CommonStyles.Typography>
      <CommonStyles.Typography variant='h4'>Forbidden</CommonStyles.Typography>
      <CommonStyles.Button variant='contained' onClick={() => router.push('/home')}>
        Go home
      </CommonStyles.Button>
    </CommonStyles.Box>
  );
};

Forbidden.propTypes = propTypes;
export default Forbidden;
