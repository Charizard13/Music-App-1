import React, { useState, useEffect } from "react";
import axios from "axios";
import "./One.css";
import AlbumSongBar from "./AlbumSongBar";
import ArtistSongBar from "./ArtistSongBar";
import PlaylistSongBar from "./PlaylistSongBar";

function One({ match }) {
  const from = match;
  const link = match.url;
  const type = link.replaceAll('/','',link)
  const queryKey =
  type.includes("artist")
    ? `artist`
    : type.includes("album")
    ? `album`
    : "playlist";
  const [list, setList] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${link}`);
      setList(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${link}/songs`);
      setSongs(data);
    })();
  }, []);

  return (
    <div className="one">
      <div className="one-title">
        {list && list.name}
      </div>
      <div className="one-title">  
      <img
        src={`https://img.youtube.com/vi/qojvO0E0z_Y/hqdefault.jpg`}
        alt=""
        className="img"
      /></div>
    
      <div >
        <div className="one-title">Songs</div>
        <div className="bar">
          {songs.map((prop) => {
            if(queryKey === 'album')
            return (
             <div><AlbumSongBar
             from={from}
             key={prop.id}
             prop={prop}
             className="bar"
           /></div> 
            );
            if(queryKey === 'artist')
            return (
              <div><ArtistSongBar
              from={from}
              key={prop.id}
              prop={prop}
              className="bar"
            /></div>
            );
            if(queryKey === 'playlist')
            return (
              <div><PlaylistSongBar
              from={from}
              key={prop.id}
              prop={prop}
              className="bar"
            /></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default One;
