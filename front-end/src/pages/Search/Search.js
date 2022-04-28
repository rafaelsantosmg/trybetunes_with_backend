import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import reservationAPI, { readUser } from '../../services/userAPI';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import LinksAlbum from '../../components/LinksAlbum';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import './Search.css';

export default function Search() {
  const [album, setAlbum] = useState('');
  const [isDisabledSearch, setIsDisabledSearch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [albumName, setAlbumName] = useState('');
  const [listAlbum, setListAlbum] = useState([]);
  const [notFoundAlbum, setNotFoundAlbum] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { token } = readUser();

        await reservationAPI.get('/auth', {
          headers: {
            Authorization: token,
          },
        });
      } catch (error) {
        console.log(error.response);
        setRedirect(true);
        global.alert(error.message);
      }
    };
    getUser();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await searchAlbumsAPI(album);

    setListAlbum(response);
    setAlbumName(album);
    setIsLoading(false);
    setAlbumName('');
    setNotFoundAlbum(response.length === 0);
  };

  const onChangeInput = ({ target }) => {
    const { value, name } = target;
    const minLength = 2;
    setAlbum({ [name]: value });
    setIsDisabledSearch(value.length < minLength);
  };

  return (
    <div className="search" data-testid="page-search">
      <Header active="search" />
      {!isLoading && (
        <form onSubmit={ handleSearch }>
          <label htmlFor="search-artist-input">
            <input
              onChange={ onChangeInput }
              name="album"
              type="text"
              id="search-artist-input"
              value={ album }
            />
          </label>
          <button type="submit" disabled={ isDisabledSearch }>Buscar</button>
        </form>

      // <Form
      //   title="Album"
      //   inputId="search-artist-input"
      //   buttonId="search-artist-button"
      //   placeholder="Nome do artista"
      //   onSubmit={  }
      //   isDisabled={ isDisabledSearch }
      //   onChangeInput={ onChangeInput }
      //   value={ album }
      //   isSearch
      // >
      //   Buscar
      // </Form>
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
