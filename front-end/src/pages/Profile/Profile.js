import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import UserContext from '../../context/UserContext';
import './Profile.css';

export default function Profile() {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) setIsLoading(false);
  }, [user]);

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
