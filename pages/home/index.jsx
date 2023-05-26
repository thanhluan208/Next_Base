import React, { Fragment } from 'react';
import CommonStyles from 'src/components/commonStyles';
import CommonIcons from 'src/components/commonIcons';
import useToggleDialog from 'src/hooks/useToggleDialog';
import useHandleThemeStore from 'src/store/useHandleThemeStore';
import withAuth from 'src/HOCs/withAuth';
import { useGetListComment } from 'src/hooks/home/useGetListComment';
import withPermission from 'src/HOCs/withPermission';
import { allowedRoles } from 'src/constant/keys';
import { useAuthentication } from 'src/provider/AuthenticationProvider';
import { toastInfo } from 'src/helpers/toastify';

const propTypes = {};

const Home = props => {
  //! State
  const { logout } = useAuthentication();
  const theme = useHandleThemeStore.use.theme();
  const toggleTheme = useHandleThemeStore.use.toggleTheme();
  const { open, toggle, shouldRender } = useToggleDialog();

  const { data } = useGetListComment();

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

  //! Render
  return (
    <Fragment>
      <CommonStyles.Button onClick={toggle}>Toggle</CommonStyles.Button>
      {shouldRender && <CommonStyles.Dialog open={open} toggle={toggle} title={renderTitle} />}

      <CommonStyles.Button onClick={() => toastInfo('Info')}>Toast</CommonStyles.Button>

      <CommonStyles.Button onClick={toggleTheme}>{`To ${theme === 'light' ? 'dark' : 'light'}`}</CommonStyles.Button>

      <CommonStyles.Button onClick={logout}>Log out</CommonStyles.Button>
    </Fragment>
  );
};

export default withAuth(withPermission(Home, [allowedRoles.ADMIN]));
