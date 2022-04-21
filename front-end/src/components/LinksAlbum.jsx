import React, { Component } from 'react';
import propTypes, { shape } from 'prop-types';
import { Link } from 'react-router-dom';
import './LinksAlbum.css';

export default class CardAlbum extends Component {
  render() {
    const { listAlbum } = this.props;
    return (
      listAlbum.map((album) => (
        <div className="card" key={ album.collectionId }>
          <Link
            className="nav-link"
            data-testid={ `link-to-album-${album.collectionId}` }
            to={ `/album/${album.collectionId}` }
          >
            <p>{ album.artistName }</p>
            <p>{ album.collectionName }</p>
            <figure>
              <img src={ album.artworkUrl100 } alt={ album.artistName } />
            </figure>
          </Link>
        </div>
      ))
    );
  }
}

CardAlbum.propTypes = {
  listAlbum: propTypes.arrayOf(shape({
    collectionId: propTypes.number,
    artistName: propTypes.string,
    collectionName: propTypes.string,
    artworkUrl100: propTypes.string,
  })).isRequired,
};
