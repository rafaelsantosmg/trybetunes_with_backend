import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import MusicCard from '../../components/MusicCard/MusicCard';
import './Favorites.css';

export default function Favorites() {
  const [favoritesMusic, setFavoritesMusic] = useState([]);

  const favorites = async () => {
    const favoritesMus = await getFavoriteSongs();
    setFavoritesMusic(favoritesMus);
  };

  useEffect(() => {
    favorites();
  }, []);

  return (
    <div className="page-favorites" data-testid="page-favorites">
      <Header active="favorites" />
      {
        favoritesMusic.map((favorite) => (
          <MusicCard
            key={ favorite.trackId }
            music={ favorite }
            removeSongFavorite={ favorites }
          />))
      }
    </div>
  );
}
