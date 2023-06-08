import { storageKeys } from 'src/constant/keys';
import { useGet } from 'src/store/cachedStore';

const useContractListener = event => {
  const account = useGet(storageKeys.ACCOUNT);

  return {};
};

export default useContractListener;
