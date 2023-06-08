import { ethers } from 'ethers';
import { abiMethod, tokenContract } from 'src/constant/keys';

import ContractABI from 'src/abis/LuregasToken.json';
import { toastError } from 'src/helpers/toastify';

class contractServices {
  constructor(ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const luregas = new ethers.Contract(tokenContract, ContractABI.abi, signer);
    this.contract = luregas;
  }

  contractWorker = async (core, ...methodArgs) => {
    const { method, onSuccess, onFailed } = core;
    try {
      const methodResponse = await this.contract[method](...methodArgs);
      onSuccess && onSuccess(methodResponse);
    } catch (error) {
      onFailed && onFailed(error);
    }
  };

  contractListener = async (event, onSuccess, onFailed) => {
    console.log('listening', event);
    try {
      this.contract.on(event, (...args) => {
        onSuccess && onSuccess(...args);
        this.contract.off(event);
      });
    } catch (error) {
      console.log('asdas', error);
      onFailed && onFailed(error);
      this.contract.off(event);
    }
  };

  getBalance = async account => {
    console.log('getting balance', account);
    try {
      const response = await this.contract[abiMethod.BALANCEOF](account);
      return response;
    } catch (error) {
      console.log('err', error);
    }
  };
}

export default contractServices;
