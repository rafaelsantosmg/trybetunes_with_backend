import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import './Signin.css';

export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
      },
      isDisabled: true,
      redirect: false,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput({ target }) {
    const { value, name } = target;
    const minLength = 3;
    const minPassword = 6;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }), () => {
      const { user: { name: userName, email, password } } = this.state;
      if (userName.length > minLength
        && email.includes('@') && password.length >= minPassword) {
        this.setState(({ isDisabled: false }));
      }
    });
  }

  async onSubmit(event) {
    event.preventDefault();
    const { user } = this.state;
    console.log(user);
    if (user) return this.setState({ redirect: true });
  }

  render() {
    const { user: { name, email, password }, isDisabled, redirect } = this.state;
    return (
      <div className="signin-page">
        <form onSubmit={ this.onSubmit }>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cadastro</span>
            <Input
              id="userName"
              name="name"
              value={ name }
              placeholder="Nome de Usuário"
              onChangeInput={ this.onChangeInput }
            />
            <Input
              id="email"
              name="email"
              value={ email }
              placeholder="email@email.com"
              onChangeInput={ this.onChangeInput }
            />
            <Input
              id="password"
              name="password"
              type="password"
              value={ password }
              placeholder="Senha"
              onChangeInput={ this.onChangeInput }
            />
            <Button
              id="signin"
              isDisabled={ isDisabled }
            >
              Cadastrar
            </Button>
          </div>
        </form>
        { redirect && (<Redirect to="/" />) }
      </div>
    );
  }
}
