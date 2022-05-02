import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userApi, { readUser } from '../../services/userAPI';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { id, token } = readUser();
    try {
      const getUser = async () => {
        const response = await userApi.get(`/users/${id}`, {
          headers: { Authorization: token },
        });
        setUser(response.data);
      };
      getUser();
      if (user) setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page-profile" data-testid="page-profile">
      <Header active="profile" />
      { isLoading ? <Loading /> : (
        <div>
          <p>{ user.userName }</p>
          <p>{ user.email }</p>
          <figure>
            <img
              data-testid="profile-image"
              src={ user.image }
              alt={ user.userName }
            />
          </figure>
          <p>{ user.description }</p>
          <Link
            to="profile/edit"
          >
            Editar perfil
          </Link>
        </div>
      ) }
    </div>
  );
}
