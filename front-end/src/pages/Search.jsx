import React, { Component } from 'react';
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
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
    const { value } = target;
    const minLength = 2;
    this.setState(({
      album: value,
      isDisabledSearch: value.length < minLength,
    }
    ));
  }

  render() {
    const {
      state: {
        albumName,
        isDisabledSearch,
        isLoading,
        listAlbum,
        notFoundAlbum,
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
      </div>
    );
  }
}
