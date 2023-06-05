import React from 'react';
import PropTypes from 'prop-types';
import CommonStyles from 'src/components/commonStyles';
import CommonIcons from 'src/components/commonIcons';
import { useWalletConnector } from 'src/provider/WalletConnectProvider';

const propTypes = {};

const Layout = props => {
  //! State
  const { connectWallet, account, deactivateWallet, balance } = useWalletConnector();

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ position: 'relative' }}>
      <CommonStyles.Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100px',
          top: '0',
          left: '0',
          background: '#ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {account ? (
          <CommonStyles.Button variant='contained' onClick={deactivateWallet}>
            {account} : {balance} LGT
          </CommonStyles.Button>
        ) : (
          <CommonStyles.Button variant='outlined' onClick={() => connectWallet()}>
            Connect wallet
          </CommonStyles.Button>
        )}
      </CommonStyles.Box>
      <CommonStyles.Box sx={{ paddingTop: '100px' }}>{props.children}</CommonStyles.Box>
    </CommonStyles.Box>
  );
};

Layout.propTypes = propTypes;
export default Layout;
