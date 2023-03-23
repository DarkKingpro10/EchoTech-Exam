import { createContext, useContext, useState } from "react";

export const ProfileContext = createContext();

export const useProfile = ()=>{
    const context = useContext(ProfileContext);
    return context;
}

export const ProfileProvider = ({children}) =>{
    const PIN_Password = 'Root1L'
    const [profile, setUpdate] = useState({
        login: false,
        userName: 'hola',
        password: '123',
        image: '3'
    });

    return(
        <ProfileContext.Provider value={{profile, PIN_Password, setUpdate
        }}>{children}</ProfileContext.Provider>
    );
}