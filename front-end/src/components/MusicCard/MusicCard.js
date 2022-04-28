import React, { Component } from 'react';
import propTypes from 'prop-types';
import Checkbox from './Checkbox';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './MusicCard.css';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isChecked: false,
    };
    this.handleSaveFavorites = this.handleSaveFavorites.bind(this);
    this.getFavoriteMusic = this.getFavoriteMusic.bind(this);
  }

  componentDidMount() {
    this.getFavoriteMusic();
  }

  async handleSaveFavorites({ target }) {
    const { music, removeSongFavorite } = this.props;
    const { checked } = target;
    this.setState({ isLoading: true }, async () => {
      if (checked) {
        await addSong(music);
        this.setState({
          isChecked: true,
          isLoading: false,
        });
      } else {
        await removeSong(music);
        await removeSongFavorite();
        this.setState({
          isLoading: false,
          isChecked: false,
        });
      }
    });
  }

  async getFavoriteMusic() {
    const { music } = this.props;
    const favorites = await getFavoriteSongs();
    this.setState({
      isChecked: favorites.some((favorite) => music.trackId === favorite.trackId),
    });
  }

  render() {
    const { music } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      <div className="music-card">
        { isLoading ? (<Loading />) : (
          <div className="music-track">
            <p>{ music.trackName }</p>
            <audio
              data-testid="audio-component"
              src={ music.previewUrl }
              controls
            >
              <track kind="captions" />
            </audio>
            <Checkbox
              id={ music.trackId }
              dataId={ `checkbox-music-${music.trackId}` }
              onChange={ this.handleSaveFavorites }
              isChecked={ isChecked }
            />
          </div>
        ) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: propTypes.shape({
    previewUrl: propTypes.string,
    trackName: propTypes.string,
    trackId: propTypes.number,
  }).isRequired,
  removeSongFavorite: propTypes.func,
};

MusicCard.defaultProps = {
  removeSongFavorite: () => {},
};
