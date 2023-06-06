import WalletConnect from '@walletconnect/web3-provider';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

export const queryKeys = {
  GET_LIST_COMMENT: 'GET_LIST_COMMENT'
};

export const storageKeys = {
  USER_ROLE: 'USER_ROLE',
  USER_INFO: 'USER_INFO',
  TOKEN: 'TOKEN',
  WALLET: 'WALLET',
  ACCOUNT: 'ACCOUNT'
};

export const allowedRoles = {
  ADMIN: 'ADMIN'
};

export const tokenContract = '0x3551D8d0069D3cb6A1E019d38e45C76645E2F5ee';

export const abiMethod = {
  APPROVAL: 'Approval',
  EVENTMINTERADDED: 'EventMinterAdded',
  EVENTMINTERREMOVED: 'EventMinterRemoved',
  OWNERSHIPTRANSFERRED: 'OwnershipTransferred',
  TRANSFER: 'transfer',
  CLAIMED: 'claimed',
  STAKED: 'staked',
  UNSTAKED: 'unstaked',
  ADDMINTER: 'addMinter',
  ALLOWANCE: 'allowance',
  APPROVE: 'approve',
  BALANCEOF: 'balanceOf',
  CALCULATEREWARD: 'calculateReward',
  CAP: 'cap',
  CLAIMREWARD: 'claimReward',
  CREATESTAKE: 'createStake',
  DECIMALS: 'decimals',
  DECREASEALLOWANCE: 'decreaseAllowance',
  GETSTAKINGINFO: 'getStakingInfo',
  INCREASEALLOWANCE: 'increaseAllowance',
  ISMINTER: 'isMinter',
  ISSTAKING: 'isStaking',
  MINTBYMINTER: 'mintByMinter',
  NAME: 'name',
  OWNER: 'owner',
  REMOVEMINTER: 'removeMinter',
  RENOUNCEOWNERSHIP: 'renounceOwnership',
  SYMBOL: 'symbol',
  TOTALSUPPLY: 'totalSupply',
  TRANSFERFROM: 'transferFrom',
  TRANSFEROWNERSHIP: 'transferOwnership',
  UNSTAKE: 'unstake'
};

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: 'Web 3 Modal Demo', // Required
      infuraId: 'https://sepolia.infura.io/v3/fbc4aa55c71b42c9b3b04e07bf1ecdb9' // Required unless you provide a JSON RPC url; see `rpc` below
    }
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: 'https://sepolia.infura.io/v3/fbc4aa55c71b42c9b3b04e07bf1ecdb9' // required
    }
  }
};
