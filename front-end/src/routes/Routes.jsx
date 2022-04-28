import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from '../pages/Albuns/Album';
import Favorites from '../pages/Favorites/Favorites';
import Login from '../pages/Login/Login';
import NotFound from '../pages/NotFound/NotFound';
import Profile from '../pages/Profile/Profile';
import ProfileEdit from '../pages/ProfileEdit/ProfileEdit';
import Search from '../pages/Search/Search';
import Loading from '../components/Loading/Loading';
import Signin from '../pages/Signin/Signin';

export default class routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/loading" component={ Loading } />
        <Route exact path="/signin" component={ Signin } />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    );
  }
}
