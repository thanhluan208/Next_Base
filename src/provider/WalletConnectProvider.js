import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { storageKeys, tokenContract } from 'src/constant/keys';
import LuregasABI from 'src/abis/LuregasToken.json';
import { toastError } from 'src/helpers/toastify';
import Web3Modal from 'web3modal';
import { providerOptions } from 'src/constant/keys';
import httpService from 'src/services/httpService';

const WalletConnectorContext = React.createContext({
  connectWallet: () => {},
  deactivateWallet: () => {},
  getBalance: () => {},
  contractWorker: () => {},
  contract: null,
  account: null,
  balance: 0
});

export const useWalletConnector = () => React.useContext(WalletConnectorContext);

const WalletConnectorProvider = ({ children }) => {
  //! State
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState(httpService.getStorage(storageKeys.ACCOUNT) || null);
  const [stakingInfo, setStakingInfo] = useState([]);
  const abi = LuregasABI.abi;

  const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
  });

  //! Function
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      if (accounts) setAccount(accounts[0]);

      const shouldDeleteStorage = provider.isCoinbaseWallet;
      const checkStorage = localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses');

      if (shouldDeleteStorage && checkStorage)
        httpService.removeStorage('-walletlink:https://www.walletlink.org:Addresses');

      httpService.saveStorage(storageKeys.ACCOUNT, accounts[0]);
    } catch (error) {
      console.log('asdasd', error);
    }
  };

  const deactivateWallet = useCallback(() => {
    try {
      web3Modal.clearCachedProvider();
      setAccount();
      httpService.removeStorage(storageKeys.ACCOUNT);
    } catch (error) {
      console.log('err', error);
    }
  }, []);

  const getBalance = useCallback(async (contract, account) => {
    try {
      const balance = await contractWorker(contract, 'balanceOf', account);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log('asdasd', error);
    }
  }, []);

  const contractWorker = useCallback(async (contract, method, ...methodArgs) => {
    if (!contract) {
      toastError('Please connect wallet');
      return;
    }
    try {
      const methodResponse = await contract[method](...methodArgs);
      return methodResponse;
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  useEffect(() => {
    if (account) {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const luregas = new ethers.Contract(tokenContract, abi, signer);
          getBalance(luregas, account);
          luregas.on('staked', (user, amount, timestamp, rewardRate) => {
            console.log('staked', user, amount, timestamp, rewardRate);
          });
          setContract(luregas);
        }
      } catch (error) {
        console.log('asdasd', error);
      }
    }
  }, [account]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      httpService.clearStorage('-walletlink:https://www.walletlink.org:Addresses');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  //! Render
  const value = useMemo(() => {
    return { connectWallet, deactivateWallet, getBalance, contract, account, balance, contractWorker };
  }, [connectWallet, deactivateWallet, getBalance, contract, account, balance, contractWorker]);

  return <WalletConnectorContext.Provider value={value}>{children}</WalletConnectorContext.Provider>;
};

export default WalletConnectorProvider;
