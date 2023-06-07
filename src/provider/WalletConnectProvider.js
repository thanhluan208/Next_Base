import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { abiEvent, abiMethod, storageKeys, tokenContract } from 'src/constant/keys';
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
  balance: 0,
  loadingByEvent: false
});

export const useWalletConnector = () => React.useContext(WalletConnectorContext);

const WalletConnectorProvider = ({ children }) => {
  //! State
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState(httpService.getStorage(storageKeys.ACCOUNT) || null);
  const [loadingByEvent, setLoadingByEvent] = useState(false);
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
      const balance = await contractWorker(
        {
          contract,
          method: abiMethod.BALANCEOF
        },
        account
      );
      setBalance(ethers.utils.formatEther(balance));
      console.log('balance', balance);
    } catch (error) {
      console.log('asdasd', error);
    }
  }, []);

  const contractWorker = useCallback(async (core, ...methodArgs) => {
    const { contract, method, shouldLoadingEvent } = core;
    if (shouldLoadingEvent) setLoadingByEvent(true);
    if (!contract) {
      toastError('Please connect wallet');
      return;
    }
    try {
      const methodResponse = await contract[method](...methodArgs);
      return methodResponse;
    } catch (error) {
      console.log('error', error);
      toastError(error.message);
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
          luregas.on(abiEvent.STAKED, async (user, amount, timestamp, rewardRate) => {
            console.log('staked', user, amount, timestamp, rewardRate);
            await getBalance(luregas, account);
            setLoadingByEvent(false);
          });

          luregas.on(abiEvent.UNSTAKED, async (user, amount, timestamp, rewardRate) => {
            console.log('unstaked', user, amount, timestamp, rewardRate);
            await getBalance(luregas, account);
            setLoadingByEvent(false);
          });

          setContract(luregas);
        }
      } catch (error) {
        console.log('asdasd', error);
      }
    }
  }, [account]);

  //! Render
  const value = useMemo(() => {
    return {
      connectWallet,
      deactivateWallet,
      getBalance,
      contract,
      account,
      balance,
      contractWorker,
      loadingByEvent
    };
  }, [connectWallet, deactivateWallet, getBalance, contract, account, balance, contractWorker, loadingByEvent]);

  return <WalletConnectorContext.Provider value={value}>{children}</WalletConnectorContext.Provider>;
};

export default WalletConnectorProvider;
