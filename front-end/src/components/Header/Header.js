import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { readUser } from '../services/userAPI';
import Loading from './Loading';
import logoHeader from '../images/group-1.svg';
import avatar from '../images/icon/default.png';
import Menu from './Menu';
import './Header.css';

export default function Header({ active }) {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(() => {
    const handleUser = async () => {
      setIsLoading(true );
      const { user } = readUser();
      setUser(user);
      setIsLoading(false);
    }
    handleUser();
  }, [])

    return (
      isLoading ? (<Loading />) : (
        <header className="header" data-testid="header-component">
          <div className="header-content">
            <figure className="header-figure">
              <img
                className="header-image"
                src={ logoHeader }
                alt="Logo Header"
              />
            </figure>
            <div className="user-name">
              <figure>
                <img src={ avatar } alt="Avatar" />
              </figure>
              <h2 data-testid="header-user-name">{ user }</h2>
            </div>
          </div>
          <Menu active={ active } />
        </header>
      )
    );
}

Header.propTypes = {
  active: propTypes.string,
};

Header.defaultProps = {
  active: 'active',
};
