import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import reservationAPI from '../services/userAPI';
// import { readUser } from '../services/userAPI';
import Header from '../components/Header';
import Form from '../components/Form';
import Loading from '../components/Loading';
import LinksAlbum from '../components/LinksAlbum';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      album: '',
      isDisabledSearch: true,
      isLoading: false,
      albumName: '',
      listAlbum: [],
      notFoundAlbum: false,
      redirect: false,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  async handleSearch(event) {
    event.preventDefault();
    const { album } = this.state;
    this.setState(({
      isLoading: true,
    }));
    const response = await searchAlbumsAPI(album);
    this.setState(({
      listAlbum: response,
      albumName: album,
      isLoading: false,
      album: '',
      notFoundAlbum: response.length === 0,
    }));
  }

  onChangeInput({ target }) {
    const { value, name } = target;
    const minLength = 2;
    this.setState(({
      [name]: value,
      isDisabledSearch: value.length < minLength,
    }
    ));
  }

  async getUser() {
    try {
      // const { token } = readUser();
      await reservationAPI.get('/auth', {});
    } catch (error) {
      console.log(error);
      this.setState(({ redirect: true }));
      global.alert(error.message);
    }
  }

  render() {
    const {
      state: {
        album,
        albumName,
        isDisabledSearch,
        isLoading,
        listAlbum,
        notFoundAlbum,
        redirect,
      },
      onChangeInput,
      handleSearch,
    } = this;
    return (
      <div className="search" data-testid="page-search">
        <Header active="search" />
        { !isLoading && (
          <Form
            title="Album"
            inputId="search-artist-input"
            buttonId="search-artist-button"
            placeholder="Nome do artista"
            onSubmit={ handleSearch }
            isDisabled={ isDisabledSearch }
            onChangeInput={ onChangeInput }
            value={ album }
            isSearch
          >
            Buscar
          </Form>
        ) }
        { isLoading && (<Loading />) }
        <p>
          Resultado de álbuns de:
          { ` ${albumName}` }
        </p>
        <div className="cards">
          { notFoundAlbum ? (<h2>Nenhum álbum foi encontrado</h2>)
            : (<LinksAlbum listAlbum={ listAlbum } />) }
        </div>
        { redirect && (<Redirect to="/" />) }
      </div>
    );
  }
}
