import React, { Fragment } from 'react';
import CommonStyles from 'src/components/commonStyles';
import CommonIcons from 'src/components/commonIcons';
import useToggleDialog from 'src/hooks/useToggleDialog';
import useHandleThemeStore from 'src/store/useHandleThemeStore';
import withAuth from 'src/HOCs/withAuth';
import withPermission from 'src/HOCs/withPermission';
import { abiMethod, allowedRoles } from 'src/constant/keys';
import { useAuthentication } from 'src/provider/AuthenticationProvider';
import { toastInfo } from 'src/helpers/toastify';
import withLayout from 'src/HOCs/withLayout';
import { useWalletConnector } from 'src/provider/WalletConnectProvider';

import { convertfromWei } from 'src/helpers';

const propTypes = {};

const Home = props => {
  //! State
  const { logout } = useAuthentication();
  const theme = useHandleThemeStore.use.theme();
  const toggleTheme = useHandleThemeStore.use.toggleTheme();
  const { open, toggle, shouldRender } = useToggleDialog();

  const { contractWorker, contract } = useWalletConnector();

  //! Function
  const renderTitle = (open, toggle) => {
    return (
      <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
        <CommonStyles.Typography variant='h6'>Filter</CommonStyles.Typography>
        <CommonStyles.Button onClick={toggle}>
          <CommonIcons.close />
        </CommonStyles.Button>
      </CommonStyles.Box>
    );
  };

  const handleGetStakingInfos = async () => {
    const info = await contractWorker(contract, abiMethod.GETSTAKINGINFO, 180);
    const { amount, rewardRate, startTime } = info;
    console.log('asdasd', convertfromWei(amount));
  };

  const handleStake180 = () => {
    contractWorker(contract, abiMethod.CREATESTAKE, 10000000, 180, 10000);
  };

  const handleUnstake = () => {
    contractWorker(contract, abiMethod.UNSTAKE, 180);
  };

  //! Render
  return (
    <Fragment>
      <CommonStyles.Button onClick={toggle}>Toggle</CommonStyles.Button>
      {shouldRender && <CommonStyles.Dialog open={open} toggle={toggle} title={renderTitle} />}

      <CommonStyles.Button onClick={() => toastInfo('Info')}>Toast</CommonStyles.Button>

      <CommonStyles.Button onClick={toggleTheme}>{`To ${theme === 'light' ? 'dark' : 'light'}`}</CommonStyles.Button>

      <CommonStyles.Button onClick={logout}>Log out</CommonStyles.Button>

      <CommonStyles.Button onClick={handleGetStakingInfos}>Get info staking</CommonStyles.Button>

      <CommonStyles.Button onClick={handleStake180}>Staking 180s</CommonStyles.Button>

      <CommonStyles.Button onClick={handleUnstake}>Unstake 180</CommonStyles.Button>
    </Fragment>
  );
};

export default withAuth(withPermission(withLayout(Home), [allowedRoles.ADMIN]));
