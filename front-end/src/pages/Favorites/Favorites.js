import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import './Favorites.css';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoritesMusic: [],
    };
  }

  componentDidMount() {
    this.favorites();
  }

  favorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoritesMusic: favorites });
  };

  render() {
    const { favoritesMusic } = this.state;
    return (
      <div className="page-favorites" data-testid="page-favorites">
        <Header active="favorites" />
        {
          favoritesMusic.map((favorite) => (
            <MusicCard
              key={ favorite.trackId }
              music={ favorite }
              removeSongFavorite={ this.favorites }
            />))
        }
      </div>
    );
  }
}
