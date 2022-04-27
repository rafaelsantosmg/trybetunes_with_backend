import React, { Component } from 'react';
import propTypes from 'prop-types';
import { readUser } from '../services/userAPI';
import Loading from './Loading';
import logoHeader from '../images/group-1.svg';
import avatar from '../images/icon/default.png';
import Menu from './Menu';
import './Header.css';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: false,
    };
    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount() {
    this.handleUser();
  }

  async handleUser() {
    this.setState(({ isLoading: true }));
    const { user } = readUser();
    this.setState(({ user, isLoading: false }));
  }

  render() {
    const { user, isLoading } = this.state;
    const { active } = this.props;
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
}

Header.propTypes = {
  active: propTypes.string,
};

Header.defaultProps = {
  active: 'active',
};
