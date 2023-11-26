import React, { createContext, useContext, useState } from 'react';

const MainContext = createContext();

function useMainContext() {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMainContext must be used within a MainProvider');
  }
  return context;
}

const MainProvider = (props) => {
  const [sessions, setSessions] = useState([]);
  const [bookclubs, setBookclubs] = useState([]);

  return (
    <MainContext.Provider
      {...props}
      value={{ sessions, setSessions, bookclubs, setBookclubs }}
    />
  );
};

export { MainProvider, useMainContext };
