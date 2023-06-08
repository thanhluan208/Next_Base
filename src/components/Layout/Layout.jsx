import React from 'react';
import CommonStyles from 'src/components/commonStyles';

import ConnectWallet from './ConnectWallet';

const propTypes = {};

const Layout = props => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ position: 'relative' }}>
      <ConnectWallet />
      <CommonStyles.Box sx={{ paddingTop: '100px' }}>{props.children}</CommonStyles.Box>
    </CommonStyles.Box>
  );
};

Layout.propTypes = propTypes;
export default Layout;
