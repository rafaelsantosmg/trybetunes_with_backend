import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      users: {
        name: '',
        email: '',
        description: '',
        image: '',
      },
      isLoading: false,
    };
    this.getUserProfile = this.getUserProfile.bind(this);
  }

  componentDidMount() {
    this.getUserProfile();
  }

  async getUserProfile() {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ users: user, isLoading: false });
  }

  render() {
    const { users, isLoading } = this.state;
    return (
      <div className="page-profile" data-testid="page-profile">
        <Header active="profile" />
        { isLoading ? <Loading /> : (
          <div>
            <p>{ users.name }</p>
            <p>{ users.email }</p>
            <figure>
              <img
                data-testid="profile-image"
                src={ users.image }
                alt={ users.name }
              />
            </figure>
            <p>{ users.description }</p>
            <Link
              to="profile/edit"
              users={ users }
            >
              Editar perfil
            </Link>
          </div>
        ) }
      </div>
    );
  }
}
