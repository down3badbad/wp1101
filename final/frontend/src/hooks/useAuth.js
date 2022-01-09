import { createContext, useContext, useState } from 'react';

const AuthProvider = (props) => {
    const [isLogin, setisLogin] = useState(false);
    const [username, setUsername] = useState("");

    const setLogin = (val) => {
        setisLogin(val);
    }

    const setUser = (name) => {
        setUsername(name);
    }

    return (
        <AuthContext.Provider
          value={{
            isLogin,
            username,
            setLogin,
            setUser
          }}
          {...props}
        />
      );
}

const AuthContext = createContext({
    isLogin: false,
    username: "",
    setLogin: () => {},
    setUser: () => {},
  });

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };