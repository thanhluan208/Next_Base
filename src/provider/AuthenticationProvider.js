import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { allowedRoles, storageKeys } from 'src/constant/keys';
import httpService from 'src/services/httpService';

const AuthenticationContext = createContext({
  token: '',
  isLogged: false,
  login: () => {},
  logout: () => {}
});

export const useAuthentication = () => useContext(AuthenticationContext);

const AuthenticationProvider = ({ children }) => {
  //! State
  const tokenLocalStorage = httpService.getStorage(storageKeys.TOKEN);

  const [isLogged, setIsLogged] = useState(tokenLocalStorage ? true : false);

  //! Function
  const login = useCallback(async ({ setLoading }) => {
    try {
      setLoading && setLoading(true);

      const response = await httpService.get('https://jsonplaceholder.typicode.com/users/1');
      await new Promise(res => setTimeout(res, 1000));

      httpService.saveStorage([storageKeys.TOKEN, storageKeys.USER_ROLE], [response?.data?.name, allowedRoles.ADMIN]);

      setIsLogged(true);

      setLoading && setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading && setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    httpService.clearStorage();
    setIsLogged(false);
  }, []);

  //! Render
  const value = useMemo(() => {
    return {
      isLogged,
      login,
      logout
    };
  }, [isLogged, login, logout]);

  return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>;
};

export default AuthenticationProvider;
