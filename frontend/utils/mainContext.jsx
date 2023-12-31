import React, { createContext, useCallback, useContext, useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from './authContext';
import api from './api';

const MainContext = createContext();

function useMainContext() {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMainContext must be used within a MainProvider');
  }
  return context;
}

const MainProvider = (props) => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [mySessions, setMySessions] = useState([]);
  const [bookclubs, setBookclubs] = useState([]);
  const [myBookclubs, setMyBookclubs] = useState([]);

  useEffect(() => {
    const arr = [];
    bookclubs.forEach((bookclub) => {
      if (bookclub.members.map((member) => member._id).includes(user._id)) {
        arr.push(bookclub);
      }
    });
    setMyBookclubs(arr);
  }, [bookclubs]);

  useEffect(() => {
    const arr = [];
    sessions.forEach((session) => {
      if (
        session.users_attending
          .map((attendingUser) => attendingUser._id)
          .includes(user._id)
      ) {
        arr.push(session);
      }
    });
    setMySessions(arr);
  }, [sessions]);

  return (
    <MainContext.Provider
      {...props}
      value={{
        sessions,
        setSessions,
        mySessions,
        setMySessions,
        bookclubs,
        setBookclubs,
        myBookclubs,
        setMyBookclubs,
      }}
    />
  );
};

export { MainProvider, useMainContext };
