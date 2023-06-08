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
  ACCOUNT: 'ACCOUNT',
  BALANCE: 'BALANCE'
};

export const allowedRoles = {
  ADMIN: 'ADMIN'
};

export const tokenContract = '0xcb6fFC2A07d5fd2B352afC7692dBCBA72437A1c0';

export const abiMethod = {
  DEFAULT_ADMIN_ROLE: 'DEFAULT_ADMIN_ROLE',
  MINTER_ROLE: 'MINTER_ROLE',
  ALLOWANCE: 'allowance',
  APPROVE: 'approve',
  BALANCEOF: 'balanceOf',
  CALCULATEREWARD: 'calculateReward',
  CAP: 'cap',
  CLAIMREWARD: 'claimReward',
  CREATESTAKE: 'createStake',
  DECIMALS: 'decimals',
  DECREASEALLOWANCE: 'decreaseAllowance',
  GETROLEADMIN: 'getRoleAdmin',
  GETSTAKINGINFO: 'getStakingInfo',
  GRANTROLE: 'grantRole',
  HASROLE: 'hasRole',
  INCREASEALLOWANCE: 'increaseAllowance',
  ISSTAKING: 'isStaking',
  MINTBYMINTER: 'mintByMinter',
  NAME: 'name',
  RENOUNCEROLE: 'renounceRole',
  REVOKEROLE: 'revokeRole',
  SUPPORTSINTERFACE: 'supportsInterface',
  SYMBOL: 'symbol',
  TOTALSUPPLY: 'totalSupply',
  TRANSFER: 'transfer',
  TRANSFERFROM: 'transferFrom',
  UNSTAKE: 'unstake'
};

export const abiEvent = {
  APPROVAL: 'Approval',
  ROLEADMINCHANGED: 'RoleAdminChanged',
  ROLEGRANTED: 'RoleGranted',
  ROLEREVOKED: 'RoleRevoked',
  TRANSFER: 'Transfer',
  CLAIMED: 'claimed',
  STAKED: 'staked',
  UNSTAKED: 'unstaked'
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
