import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import MusicCard from '../../components/MusicCard/MusicCard';
import getMusics from '../../services/musicsAPI';

import './Album.css';

export default function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState([]);
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    async function handleMusic() {
      const response = await getMusics(id);
      setAlbum(response[0]);
      setMusics(response.filter((music, index) => index !== 0 && music));
    }
    handleMusic();
  }, [id]);

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
