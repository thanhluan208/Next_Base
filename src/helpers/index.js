import LuregasABI from 'src/abis/LuregasToken.json';
import { ethers } from 'ethers';

export const getABIMethods = () => {
  const abiMethods = LuregasABI.abi
    .map(elm => elm.name)
    .reduce((acc, cur) => {
      if (!cur) return acc;
      return {
        ...acc,
        [cur.toUpperCase()]: cur
      };
    }, {});

  return abiMethods;
};

export const convertToWei = value => {
  return ethers.utils.parseEther(value);
};

export const convertfromWei = value => {
  return ethers.utils.formatEther(value);
};

export const convertRewartRate = value => {
  return ethers.utils.formatEther(value) * Math.pow(10, 16);
};

export const convertTimeStamp = value => {
  return ethers.utils.formatEther(value) * Math.pow(10, 21);
};
