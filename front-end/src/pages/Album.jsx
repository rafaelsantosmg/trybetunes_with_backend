import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

import './Album.css';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: [],
      musics: [],
    };
    this.handleMusic = this.handleMusic.bind(this);
  }

  componentDidMount() {
    this.handleMusic();
  }

  async handleMusic() {
    const { match } = this.props;
    const response = await getMusics(match.params.id);
    this.setState(({
      album: response[0],
      musics: response.filter((music, index) => index !== 0 && music),
    }));
  }

  render() {
    const { musics, album } = this.state;
    return (
      <div className="page-album" data-testid="page-album">
        <Header />
        <div className="album-content">
          <figure className="album-image">
            <img src={ album.artworkUrl100 } alt={ album.artistName } />
          </figure>
          <div className="album-title">
            <h2 data-testid="artist-name">{ album.artistName }</h2>
            <h3 data-testid="album-name">{ album.collectionName }</h3>
          </div>
        </div>
        <div className="music-card">
          { musics.map((music, index) => (
            <MusicCard
              key={ `${music.artistId}${index}` }
              music={ music }
            />
          )) }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string,
    }).isRequired,
  }).isRequired,
};
