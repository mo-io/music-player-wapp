import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateCurrentSong } from "../utils";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  songInfo,
  setSongInfo,
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setSongs,
  setCurrentSong,
}) => {
  const [playIcon, setPlayIcon] = useState(faPlay);

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
      setPlayIcon(faPlay);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
      setPlayIcon(faPause);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.round(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = (direction) => {
    const currentSongIndex = songs.findIndex(
      (song) => song.id === currentSong.id
    );
    if (direction === "backward") {
      if (currentSongIndex !== 0) {
        updateCurrentSong(
          "backward",
          currentSongIndex,
          currentSong,
          songs,
          setSongs,
          setCurrentSong,
          isPlaying,
          audioRef
        );
      } else {
        updateCurrentSong(
          "last",
          currentSongIndex,
          currentSong,
          songs,
          setSongs,
          setCurrentSong,
          isPlaying,
          audioRef
        );
      }
    } else {
      updateCurrentSong(
        "forward",
        currentSongIndex,
        currentSong,
        songs,
        setSongs,
        setCurrentSong,
        isPlaying,
        audioRef
      );
    }
  };

  const animationStyle = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  }
  const trackStyle = {
    background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`
  }
  return (
    <div className="player">
      <div className="time-controle">
        <p>{getTime(songInfo.currentTime)}</p>
        <div className="track" style={trackStyle}>
          <input
            onChange={dragHandler}
            type="range"
            min={0}
            max={songInfo.duration ? Math.round(songInfo.duration) : 0}
            value={Math.round(songInfo.currentTime)}
          />
          <div className="animated-track" style={animationStyle}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-controle">
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="2x"
          className="left"
          onClick={() => skipTrackHandler("backward")}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          icon={playIcon}
          size="2x"
          className="play"
          onClick={playSongHandler}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          icon={faAngleRight}
          size="2x"
          className="right"
          onClick={() => skipTrackHandler("forward")}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Player;
