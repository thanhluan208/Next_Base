import { isEmpty } from 'lodash';
import Forbidden from 'src/components/commonStyles/Forbidden';
import { storageKeys } from 'src/constant/keys';
import httpService from 'src/services/httpService';

const withPermission = (Component, allowRoles = []) => {
  const PermissionComponent = () => {
    const userRoles = httpService.getStorage(storageKeys.USER_ROLE);

    if (isEmpty(allowRoles) || allowRoles.includes(userRoles)) {
      return <Component />;
    }

    return <Forbidden />;
  };

  return PermissionComponent;
};

export default withPermission;
