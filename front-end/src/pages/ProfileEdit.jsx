import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      isLoading: false,
      isDisabled: true,
      submit: false,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.getUserProfile = this.getUserProfile.bind(this);
    this.getNotEmpty = this.getNotEmpty.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  componentDidMount() {
    this.getUserProfile();
  }

  handleOnChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.getNotEmpty();
    });
  }

  handleOnSubmit() {
    this.handleUpdateUser();
    this.setState({ submit: true });
  }

  async handleUpdateUser() {
    const { name, image, email, description } = this.state;
    await updateUser({ name, image, email, description });
  }

  async getUserProfile() {
    this.setState({ isLoading: true }, async () => {
      const response = await getUser();
      this.setState({
        name: response.name,
        image: response.image,
        description: response.description,
        email: response.email,
        isLoading: false,
      }, () => {
        this.getNotEmpty();
      });
    });
  }

  getNotEmpty() {
    const { name, image, email, description } = this.state;
    if (name !== '' && email !== '' && description !== '' && image !== '') {
      this.setState({ isDisabled: false });
    }
  }

  render() {
    const { name, email, description, image, isLoading, submit, isDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? (<Loading />) : (
          <div className="input-group mb-3">
            <div className="mb-3">
              <figure>
                <img src={ image } alt={ name } />
              </figure>
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label"
              >
                Foto
                <input
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Caminho da Imagem"
                  value={ image }
                  onChange={ this.handleOnChange }
                />
              </label>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput2"
                className="form-label"
              >
                Nome
                <input
                  data-testid="edit-input-name"
                  type="text"
                  name="name"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder="Nome de Usuário"
                  value={ name }
                  onChange={ this.handleOnChange }
                />
              </label>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput3"
                className="form-label"
              >
                Email
                <input
                  data-testid="edit-input-email"
                  type="email"
                  name="email"
                  className="form-control"
                  id="exampleFormControlInput3"
                  placeholder="example@example.com"
                  value={ email }
                  onChange={ this.handleOnChange }
                />
              </label>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Descrição
                <textarea
                  data-testid="edit-input-description"
                  name="description"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Descrição"
                  value={ description }
                  onChange={ this.handleOnChange }
                />
              </label>
            </div>
            <button
              data-testid="edit-button-save"
              className="btn btn-primary btn-lg"
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleOnSubmit }
            >
              Salvar
            </button>
          </div>
        ) }
        { submit && <Redirect to="/profile" /> }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  users: propTypes.shape({
    name: propTypes.string,
    email: propTypes.string,
    description: propTypes.string,
    image: propTypes.string,
  }),
};

ProfileEdit.defaultProps = {
  users: {
    name: '',
    email: '',
    description: '',
    image: '',
  },
};
