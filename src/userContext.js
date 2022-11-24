import { createContext } from 'react';

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
    const value = {};


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};