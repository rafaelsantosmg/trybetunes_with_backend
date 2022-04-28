import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import Checkbox from '../CheckBox/Checkbox';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';
import './MusicCard.css';

export default function MusicCard({ music, removeSongFavorite }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const getFavoriteMusic = async () => {
      const favorites = await getFavoriteSongs();
      setIsLoading({
        isChecked: favorites.some((favorite) => music.trackId === favorite.trackId),
      });
    };
    getFavoriteMusic();
  }, [music.trackId]);

  const handleSaveFavorites = async ({ target }) => {
    const { checked } = target;
    setIsLoading(true);

    if (checked) {
      await addSong(music);
      setIsChecked(true);
      setIsLoading(false);
    } else {
      await removeSong(music);
      await removeSongFavorite();

      setIsLoading(false);
      isChecked(false);
    }
  };

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
            onChange={ handleSaveFavorites }
            isChecked={ isChecked }
          />
        </div>
      ) }
    </div>
  );
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
