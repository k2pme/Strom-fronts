// AppContext.js
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AppContext = createContext();
const getDeviceSize = () => {
    return window.innerWidth <= 768 ? 'small' : 'large';
  };

const AppProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const [deviceSize, setDeviceSize] = useState(getDeviceSize());
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if(Cookies.get('access')){
      setOnline(true);
    }else{
      setOnline(false);
    }
    const mediaQueryDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const mediaQuerySize = window.matchMedia('(max-width: 800px)'); // Ajustez la requête media pour votre besoin


    const handleThemeChange = () => {
      setIsDarkMode(mediaQueryDarkMode.matches);
    };

    const handleSizeChange = () => {
      setDeviceSize(getDeviceSize());
    };

    mediaQueryDarkMode.addEventListener('change', handleThemeChange);
    mediaQuerySize.addEventListener('change', handleSizeChange);

    // Nettoie les écouteurs d'événements lors du démontage du composant
    return () => {
      mediaQueryDarkMode.removeEventListener('change', handleThemeChange);
      mediaQuerySize.removeEventListener('change', handleSizeChange);
    };
  }, []);

  return (
    <AppContext.Provider value={{ isDarkMode, deviceSize, online }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
