import React, { useCallback, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';
import { storageKeys } from 'src/constant/keys';
import Web3Modal from 'web3modal';
import { providerOptions } from 'src/constant/keys';
import httpService from 'src/services/httpService';
import userHandleUserInfoStore from 'src/store/userHandleUserInfoStore';
import contractServices from 'src/services/contractServices';
import { convertfromWei } from 'src/helpers';

const WalletConnectContext = React.createContext({
  connectWallet: () => {},
  deactivateWallet: () => {},
  contractWorker: () => {},
  account: null,
  loadingByEvent: false
});

export const useWalletConnect = () => React.useContext(WalletConnectContext);

const WalletConnectProvider = ({ children }) => {
  //! State

  const saveUserInfo = userHandleUserInfoStore.use.saveUserInfo();
  const clearUserInfo = userHandleUserInfoStore.use.clearUserInfo();

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
  });

  //! Function

  const getBalance = async account => {
    const ContractServices = new contractServices(window.ethereum);
    const balance = await ContractServices.getBalance(account);
    saveUserInfo(storageKeys.BALANCE, convertfromWei(balance));
  };

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();

      const shouldDeleteStorage = provider.isCoinbaseWallet;
      const checkStorage = localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses');

      if (shouldDeleteStorage && checkStorage)
        httpService.removeStorage('-walletlink:https://www.walletlink.org:Addresses');

      if (accounts) {
        httpService.saveStorage(storageKeys.ACCOUNT, accounts[0]);
        saveUserInfo(storageKeys.ACCOUNT, accounts[0]);

        await getBalance(accounts[0]);
      }
    } catch (error) {
      console.log('asdasd', error);
    }
  };

  const deactivateWallet = useCallback(() => {
    try {
      web3Modal.clearCachedProvider();
      httpService.removeStorage(storageKeys.ACCOUNT);
      clearUserInfo();
    } catch (error) {
      console.log('err', error);
    }
  }, []);

  useEffect(() => {
    const account = httpService.getStorage(storageKeys.ACCOUNT);
    if (account) {
      saveUserInfo(storageKeys.ACCOUNT, account);
      getBalance(account);
    }
  }, []);

  //! Render
  const value = useMemo(() => {
    return {
      connectWallet,
      deactivateWallet
    };
  }, [connectWallet, deactivateWallet]);

  return <WalletConnectContext.Provider value={value}>{children}</WalletConnectContext.Provider>;
};

export default WalletConnectProvider;
