
import { createContext, useState } from 'react';
import userHandler, { IUser } from '../utils/userHandler';

interface UserContextProps {
  getUser: () => Promise<IUser>;
  setUser: (user: IUser) => void;
  removeUser: () => void;
  isAuthenticated: boolean;
  changeAuth: (isAuthenticated: boolean) => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: any) => {
  const [isAuth, setIsAuth] = useState(false);

  const setUser = async (user: IUser) => {
    setIsAuth(true);
    await userHandler.notifyLogin(user);
  };

  const removeUser = async () => {
    setIsAuth(false);
    await userHandler.logout();
  };

  const getUser = async () => {
    const userData = await userHandler.getUser();
    let user = userData !== null ? userData : null;
    setIsAuth(user !== null ? true : false);
    return user;
  };

  const changeAuth = (isAuth: boolean) => {
    setIsAuth(isAuth);
  };

  const value = {
    setUser,
    removeUser,
    getUser,
    isAuthenticated: isAuth,
    changeAuth,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
