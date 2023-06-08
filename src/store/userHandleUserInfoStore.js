import { create } from 'zustand';
import createSelectors from './createSelector';

const useHandleUserInfo = create((set, get) => ({
  userInfo: {},
  saveUserInfo: (key, value) => {
    return set(rootState => ({
      userInfo: {
        ...rootState.userInfo,
        [key]: value
      }
    }));
  },
  clearUserInfo: () => {
    return set(rootState => ({
      userInfo: {}
    }));
  }
}));

export default createSelectors(useHandleUserInfo);
