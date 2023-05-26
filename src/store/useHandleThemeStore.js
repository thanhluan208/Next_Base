import { create } from 'zustand';
import createSelectors from './createSelector';

export const themeMode = {
  light: 'light',
  dark: 'dark'
};

const useHandleThemeStore = create((set, get) => ({
  theme: themeMode.light,
  toggleTheme: () => {
    const rootState = get();
    const { theme } = rootState;
    if (theme === themeMode.light) {
      set({ theme: themeMode.dark });
    } else {
      set({ theme: themeMode.light });
    }
  }
}));

export default createSelectors(useHandleThemeStore);
