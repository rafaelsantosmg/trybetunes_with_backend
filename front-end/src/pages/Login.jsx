import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import reservationAPI, { saveUser } from '../services/userAPI';
import Form from '../components/Form';
import Loading from '../components/Loading';
import './Login.css';
import logo from '../images/img_login.svg';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: '',
        password: '',
      },
      isDisabled: true,
      isLoading: false,
      redirect: false,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  async handleRedirect(event) {
    event.preventDefault();
    this.setState(({ isLoading: true }));
    const { user } = this.state;
    const response = await reservationAPI.post('/login', user);
    console.log(response);
    saveUser(response.data.user.userName, response.data.token);
    if (response.data.token) return this.setState({ redirect: true, isLoading: false });
  }

  onChangeInput({ target }) {
    const { value, name } = target;
    const minPassword = 6;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }), () => {
      const { user: { email, password } } = this.state;
      if (email.includes('@') && password.length >= minPassword) {
        this.setState(({ isDisabled: false }));
      }
    });
  }

  render() {
    const {
      state: {
        user,
        isDisabled,
        isLoading,
        redirect,
      },
      onChangeInput,
      handleRedirect,
    } = this;

    return (
      isLoading ? (<Loading />) : (
        <div className="login-page" data-testid="page-login">
          <figure>
            <img src={ logo } alt="Logo TrybeTunes" />
          </figure>
          <Form
            title="Usuário"
            inputId="login-name-input"
            buttonId="login-submit-button"
            placeholder="Nome de Usuário"
            onSubmit={ handleRedirect }
            isDisabled={ isDisabled }
            onChangeInput={ onChangeInput }
            user={ user }
          />
          <div><Link to="/Signin">SignIn</Link></div>
          { redirect && (<Redirect to="/search" />) }
        </div>
      )
    );
  }
}
