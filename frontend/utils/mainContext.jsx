import React, { createContext, useContext, useState } from 'react';
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
  const { user, token, setToken } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [mySessions, setMySessions] = useState([]);
  const [bookclubs, setBookclubs] = useState([]);
  const [myBookclubs, setMyBookclubs] = useState([]);

  useEffect(() => {
    getBookclubs();
    getSessions();
  }, []);

  const getBookclubs = async () => {
    try {
      const bookclubsData = await api.getBookclubs(token);
      bookclubsData.bookclubs.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        else return -1;
      });
      setBookclubs(bookclubsData.bookclubs);
      if (bookclubsData.token) setToken(bookclubsData.token);
    } catch (error) {
      alert(error.message);
    }
  };

  const getSessions = async () => {
    try {
      const sessionsData = await api.getSessions(token);
      setSessions(sessionsData.sessions);
      if (sessionsData.token) setToken(sessionsData.token);
    } catch (error) {
      alert(error.message);
    }
  };

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
        setBookclubs,
      }}
    />
  );
};

export { MainProvider, useMainContext };
