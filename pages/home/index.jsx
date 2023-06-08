import React, { Fragment } from 'react';
import CommonStyles from 'src/components/commonStyles';
import CommonIcons from 'src/components/commonIcons';
import useToggleDialog from 'src/hooks/useToggleDialog';
import useHandleThemeStore from 'src/store/useHandleThemeStore';
import withAuth from 'src/HOCs/withAuth';
import withPermission from 'src/HOCs/withPermission';
import { abiEvent, abiMethod, allowedRoles, storageKeys } from 'src/constant/keys';
import { useAuthentication } from 'src/provider/AuthenticationProvider';
import { toastInfo } from 'src/helpers/toastify';
import withLayout from 'src/HOCs/withLayout';

import { convertToWei, convertfromWei } from 'src/helpers';
import contractServices from 'src/services/contractServices';
import userHandleUserInfoStore from 'src/store/userHandleUserInfoStore';

const propTypes = {};

const Home = props => {
  //! State
  const { logout } = useAuthentication();
  const theme = useHandleThemeStore.use.theme();
  const toggleTheme = useHandleThemeStore.use.toggleTheme();
  const { open, toggle, shouldRender } = useToggleDialog();
  const ContractSerivce = new contractServices(window.ethereum);

  const saveUserInfo = userHandleUserInfoStore.use.saveUserInfo();
  const userInfo = userHandleUserInfoStore.use.userInfo();

  const account = userInfo[storageKeys.ACCOUNT];

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

  const handleGetStakingInfos = () => {
    ContractSerivce.contractWorker(
      {
        method: abiMethod.GETSTAKINGINFO,
        onSuccess: response => {
          console.log('response', response);
        },
        onFailed: err => {
          console.log('err', err);
        }
      },
      180
    );
  };

  const onEventSuccess = async (user, amount, timestamp, rewardRate) => {
    console.log('reponse', { user, amount, timestamp, rewardRate, account });

    if (account) {
      const balance = await ContractSerivce.getBalance(account);
      saveUserInfo([storageKeys.BALANCE], convertfromWei(balance));
    }
  };

  const onEventFailed = err => {
    console.log('err', err);
  };

  const handleStake180 = async () => {
    await ContractSerivce.contractWorker(
      {
        method: abiMethod.CREATESTAKE
      },
      convertToWei('5.599999999999999999'),
      180,
      1000
    );
    await ContractSerivce.contractListener(abiEvent.STAKED, onEventSuccess, onEventFailed);
  };

  const handleUnstake = async () => {
    await ContractSerivce.contractWorker(
      {
        method: abiMethod.UNSTAKE
      },
      180
    );

    await ContractSerivce.contractListener(abiEvent.UNSTAKED, onEventSuccess, onEventFailed);
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
