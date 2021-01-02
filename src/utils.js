const setNewActiveSong = async (song, songs, setSongs, isPlaying, audioRef) => {
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
  if (isPlaying) {
    await audioRef.current.play();
  } else {
    await audioRef.current.pause();
  }
};

export const updateCurrentSong = (
  state,
  currentSongIndex,
  currentSong,
  songs,
  setSongs,
  setCurrentSong,
  isPlaying,
  audioRef
) => {
  if (state === "backward") {
    let song = songs[(currentSongIndex - 1) % songs.length];
    setCurrentSong(song);
    setNewActiveSong(song, songs, setSongs, isPlaying, audioRef);
  }
  if (state === "last") {
    let song = songs[songs.length - 1];
    setCurrentSong(song);
    setNewActiveSong(song, songs, setSongs, isPlaying, audioRef);
  }
  if (state === "forward") {
    let song = songs[(currentSongIndex + 1) % songs.length];
    setCurrentSong(song);
    setNewActiveSong(song, songs, setSongs, isPlaying, audioRef);
  }
};

export const endedSongHandler = (
  currentSong,
  songs,
  setSongs,
  setCurrentSong,
  isPlaying,
  audioRef
) => {
  const currentSongIndex = songs.findIndex(
    (song) => song.id === currentSong.id
  );
  let nextSong = songs[(currentSongIndex + 1) % songs.length];
  setCurrentSong(nextSong);
  setNewActiveSong(nextSong, songs, setSongs, isPlaying, audioRef);
};
