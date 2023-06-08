import React from 'react';
import CommonStyles from 'src/components/commonStyles';
import { storageKeys } from 'src/constant/keys';
import { useWalletConnect } from 'src/provider/WalletConnectProvider';
import userHandleUserInfoStore from 'src/store/userHandleUserInfoStore';

const propTypes = {};

const ConnectWallet = props => {
  //! State
  const { connectWallet, deactivateWallet } = useWalletConnect();

  const userInfo = userHandleUserInfoStore.use.userInfo();
  const account = userInfo[storageKeys.ACCOUNT];
  const balance = userInfo[storageKeys.BALANCE];

  //! Function

  //! Render
  return (
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
          {account}:<CommonStyles.Box> {balance} LGT</CommonStyles.Box>
        </CommonStyles.Button>
      ) : (
        <CommonStyles.Button variant='outlined' onClick={() => connectWallet()}>
          Connect wallet
        </CommonStyles.Button>
      )}
    </CommonStyles.Box>
  );
};

ConnectWallet.propTypes = propTypes;
export default ConnectWallet;
