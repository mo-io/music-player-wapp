import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Nav from "./components/Nav";
import data from "./data";
import "./styles/app.scss";
import Library from "./components/Library";
import { endedSongHandler } from "./utils";

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    startTime: 0,
    endTime: 0,
    animationPercentage: 0,
  });

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const animationPercentage = Math.round((currentTime / duration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage,
    });
  };

  return (
    <div className="App">
      <div className="library-container">
        <Library
          libraryStatus={libraryStatus}
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
        />
      </div>
      <div className="player-container">
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
        />
        <Song currentSong={currentSong} />
        <Player
          audioRef={audioRef}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
        />
        <audio
          onLoadedMetadata={timeUpdateHandler}
          onTimeUpdate={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={() =>
            endedSongHandler(
              currentSong,
              songs,
              setSongs,
              setCurrentSong,
              isPlaying,
              audioRef
            )
          }
        ></audio>
      </div>
    </div>
  );
}

export default App;
