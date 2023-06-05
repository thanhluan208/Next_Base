import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import { storageKeys, tokenContract } from 'src/constant/keys';
import LuregasABI from 'src/abis/LuregasToken.json';
import httpService from 'src/services/httpService';
import { toastError } from 'src/helpers/toastify';

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

const injectedConnector = new InjectedConnector({
  supportedChainIds: [11155111]
});

const WalletConnectorProvider = ({ children }) => {
  //! State
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [stakingInfo, setStakingInfo] = useState([]);
  const { activate, active, deactivate, account } = useWeb3React();
  const abi = LuregasABI.abi;

  //! Function
  const connectWallet = useCallback(async (wallet = 'metamask') => {
    try {
      switch (wallet) {
        case 'metamask':
          await activate(injectedConnector);
          break;

        default:
          console.log('asdasd', wallet);
          break;
      }

      httpService.saveStorage(storageKeys.WALLET, wallet);
    } catch (error) {
      console.log('err', error);
    }
  }, []);

  const deactivateWallet = useCallback(() => {
    try {
      deactivate();
      httpService.removeStorage(storageKeys.WALLET);
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
    if (active) {
      console.log('asdasd', active);
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
  }, [active]);

  useEffect(() => {
    const wallet = httpService.getStorage(storageKeys.WALLET);
    if (wallet) {
      connectWallet(wallet);
    }
  }, []);

  //! Render
  const value = useMemo(() => {
    return { connectWallet, deactivateWallet, getBalance, contract, account, balance, contractWorker };
  }, [connectWallet, deactivateWallet, getBalance, contract, account, balance, contractWorker]);

  return <WalletConnectorContext.Provider value={value}>{children}</WalletConnectorContext.Provider>;
};

export default WalletConnectorProvider;
