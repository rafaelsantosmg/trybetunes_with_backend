import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import userAPI, { saveUser } from '../../services/userAPI';
import './Login.css';
import logo from '../../images/img_login.svg';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const minPassword = 6;
    if (user.email.includes('@') && user.password.length >= minPassword) {
      setIsDisabled(false);
    }
  }, [user]);

  async function handleLogin(event) {
    event.preventDefault();
    const STATUS_CODE = 400;
    try {
      const response = await userAPI.post('/login', user);
      console.log(response);
      saveUser(response.data.user.id, response.data.user.userName, response.data.token);
      if (response.data.token) return history.push('/search');
    } catch (err) {
      if (err.response.status === STATUS_CODE) {
        setError(err.response.data.message);
      }
    }
  }

  function onChangeInput({ target }) {
    const { value, name } = target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  return (
    <div className="login-page" data-testid="page-login">
      <p>{error }</p>
      <figure>
        <img src={ logo } alt="Logo TrybeTunes" />
      </figure>
      <form onSubmit={ handleLogin }>
        <Input
          type="text"
          id="login-email-input"
          name="email"
          value={ user.email }
          placeholder="email@email.com"
          onChangeInput={ onChangeInput }
        />
        <Input
          type="password"
          id="login-password-input"
          name="password"
          value={ user.password }
          placeholder="senha"
          onChangeInput={ onChangeInput }
        />
        <Button
          id="login-button"
          isDisabled={ isDisabled }
        >
          Entrar
        </Button>
      </form>
      <Link to="/Signin">SignIn</Link>
    </div>
  );
}
