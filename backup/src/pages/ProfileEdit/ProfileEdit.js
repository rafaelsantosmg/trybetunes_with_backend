import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import userApi, { saveUser, readUser } from '../../services/userAPI';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';

export default function ProfileEdit() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [updateUser, setUpdateUser] = useState({
    userName: user.userName,
    description: user.description,
    image: user.image,
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) setIsLoading(false);
  }, [user]);

  useEffect(() => {
    function getNotEmpty() {
      const { userName, image, description } = user;
      if (userName !== '' && description !== '' && image !== '') {
        setIsDisabled(false);
      }
    }
    getNotEmpty();
  }, [user]);

  function handleOnChange({ target }) {
    const { name, value } = target;
    setUpdateUser({
      ...updateUser,
      [name]: value,
    });
  }

  async function handleUpdateUser() {
    const { id, token } = readUser();
    try {
      await userApi.put(`/users/${id}`, updateUser,
        { headers: { Authorization: token } });
      saveUser(id, updateUser.userName, token);
      setUser({ ...user, updateUser });
      history.push('/profile');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div data-testid="page-profile-edit">
      <Header />
      { isLoading ? (<Loading />) : (
        <div className="input-group mb-3">
          <div className="mb-3">
            <figure>
              <img src={ user.image } alt={ user.userName } />
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
                value={ updateUser.image }
                onChange={ handleOnChange }
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
                name="userName"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="Nome de Usuário"
                value={ updateUser.userName }
                onChange={ handleOnChange }
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
                value={ updateUser.description }
                onChange={ handleOnChange }
              />
            </label>
          </div>
          <button
            data-testid="edit-button-save"
            className="btn btn-primary btn-lg"
            type="button"
            disabled={ isDisabled }
            onClick={ handleUpdateUser }
          >
            Salvar
          </button>
        </div>
      ) }
    </div>
  );
}
