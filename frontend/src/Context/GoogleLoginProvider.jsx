// GoogleLoginContext.jsx
import { createContext, useContext, useRef } from "react";

const GoogleLoginContext = createContext();

export const GoogleLoginProvider = ({ children }) => {
  const triggerGoogleLoginRef = useRef(() => {});

  const setTriggerLogin = (fn) => {
    triggerGoogleLoginRef.current = fn;
  };

  const triggerLogin = () => {
    triggerGoogleLoginRef.current();
  };

  return (
    <GoogleLoginContext.Provider value={{ setTriggerLogin, triggerLogin }}>
      {children}
    </GoogleLoginContext.Provider>
  );
};

export const useGoogleLoginBtn = () => useContext(GoogleLoginContext);
