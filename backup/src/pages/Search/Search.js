import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import userAPI, { readUser } from '../../services/userAPI';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import LinksAlbum from '../../components/LinksAlbum';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import './Search.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

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

        await userAPI.get('/auth', {
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
    setNotFoundAlbum(response.length === 0);
    setAlbum('');
  };

  const onChangeInput = ({ target }) => {
    const { value } = target;
    const minLength = 2;
    setAlbum(value);
    setIsDisabledSearch(value.length < minLength);
  };

  return (
    <div className="search" data-testid="page-search">
      <Header active="search" />
      {!isLoading && (
        <form onSubmit={ handleSearch }>
          <Input
            id="imput-search"
            onChangeInput={ onChangeInput }
            placeholder="Nome do artista"
            type="text"
            name="album"
            value={ album }
          />
          <Button isDisabled={ isDisabledSearch }>Buscar</Button>
        </form>
      )}
      {isLoading && <Loading />}
      <p>
        Resultado de álbuns de:
        {` ${albumName}`}
      </p>
      <div className="cards">
        {notFoundAlbum ? (
          <h2>Nenhum álbum foi encontrado</h2>
        ) : (
          <LinksAlbum listAlbum={ listAlbum } />
        )}
      </div>
      {redirect && <Redirect to="/" />}
    </div>
  );
}
