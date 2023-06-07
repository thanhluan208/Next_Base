import LuregasABI from 'src/abis/LuregasToken.json';
import { ethers } from 'ethers';

export const getABIMethodsOrEvent = isGetMethod => {
  const abiMethods = LuregasABI.abi
    .map(elm => {
      return {
        name: elm.name,
        type: elm.type
      };
    })
    .reduce((acc, cur) => {
      if (!cur || (isGetMethod && cur.type !== 'function') || (!isGetMethod && cur.type !== 'event')) return acc;
      return {
        ...acc,
        [cur.name.toUpperCase()]: cur.name
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
