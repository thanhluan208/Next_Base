import { create } from 'zustand';

const useStore = create(set => ({
  state: {},
  save: (key, value) => {
    return set(rootState => ({
      state: {
        ...rootState.state,
        [key]: value
      }
    }));
  }
}));

export const useSave = () => useStore(rootState => rootState.save);
export const useGet = key => useStore(rootState => rootState.state?.[key]);
