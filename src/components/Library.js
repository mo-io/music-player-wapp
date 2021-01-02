import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setSongs, setCurrentSong, audioRef, isPlaying, libraryStatus }) => {

  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-song">
        {songs.map(song => <LibrarySong 
                                  song={song}
                                  songs={songs}
                                  setSongs={setSongs}
                                  key={song.id} 
                                  setCurrentSong={setCurrentSong} 
                                  audioRef={audioRef} 
                                  isPlaying={isPlaying} />)}
      </div>
    </div>
  );
};
export default Library;
