import React, { Component } from 'react';
import propTypes from 'prop-types';
import Input from './Input';
import Button from './Button';

export default class Form extends Component {
  render() {
    const { isDisabled, onChangeInput, onSubmit, title,
      inputId, buttonId, placeholder, user, isSearch, value } = this.props;
    return (
      <form onSubmit={ onSubmit }>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">{ title }</span>
          <Input
            id={ inputId }
            name={ isSearch ? 'album' : 'email' }
            value={ isSearch ? value : user.email }
            placeholder={ placeholder }
            onChangeInput={ onChangeInput }
          />
          { !isSearch && <Input
            id={ inputId }
            name="password"
            value={ user.password }
            type="password"
            placeholder="Senha"
            onChangeInput={ onChangeInput }
          />}
          <Button
            id={ buttonId }
            isDisabled={ isDisabled }
          >
            Entrar
          </Button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  onChangeInput: propTypes.func.isRequired,
  isDisabled: propTypes.bool.isRequired,
  onSubmit: propTypes.func.isRequired,
  inputId: propTypes.string.isRequired,
  buttonId: propTypes.string.isRequired,
  placeholder: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  user: propTypes.shape({
    email: propTypes.string,
    password: propTypes.string,
  }),
  isSearch: propTypes.bool,
  value: propTypes.string,
};

Form.defaultProps = {
  user: {
    email: '',
    password: '',
  },
  isSearch: false,
  value: '',
};
