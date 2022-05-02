import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import userApi from '../services/userAPI';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { id, token } = JSON.parse(localStorage.getItem('user'));

        const response = await userApi.get(`/users/${id}`, {
          headers: { Authorization: token },
        });

        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  // console.log(user);
  return (
    <UserContext.Provider value={ user }>
      {children}
    </UserContext.Provider>);
};
UserProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};
export default UserProvider;
