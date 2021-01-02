import React, { useRef } from "react";

const LibrarySong = ({
  song,
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
}) => {
  const selectedSong = useRef(null);
  const selectCurrentSongHandler = async () => {
    const newActiveSong = songs.map((songState) => {
      if (song.id === songState.id) {
        return {
          ...songState,
          active: true,
        };
      } else {
        return {
          ...songState,
          active: false,
        };
      }
    });
    await setSongs(newActiveSong);
    await setCurrentSong(song);
    if (isPlaying) {
      await audioRef.current.play();
    } else {
      await audioRef.current.pause();
    }
  };

  return (
    <div
      className={`song-info ${song.active ? "selected" : " "}`}
      onClick={selectCurrentSongHandler}
      ref={selectedSong}
    >
      <img alt={song.name} src={song.cover} />
      <div className="song-description">
        <h4>{song.name}</h4>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
