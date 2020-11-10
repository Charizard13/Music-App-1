import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OneSong.css";
import SongBar from "./SongBar";
import { useParams, useLocation } from "react-router-dom";

function App({ match }) {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const artistQuery = query.get("artist");
  const albumQuery = query.get("album");
  const playlistQuery = query.get("playlist");
  const queryKey =
    playlistQuery !== null
      ? `playlist`
      : albumQuery !== null
      ? `album`
      : "artist";
  const queryValue =
    albumQuery !== null
      ? albumQuery
      : artistQuery !== null
      ? artistQuery
      : playlistQuery;

  const [song, setSong] = useState([]);
  const [relatedSongs, setRelatedSongs] = useState([]);
  const[link, setLink] = useState([])
  
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/songs/${match.params.id}`);
      setSong(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/songs/${queryKey}_related/${queryValue}`);
      console.log(queryKey)
      console.log(queryValue)
      console.log(data)
      setRelatedSongs(data);
    })();
  }, []);



  
  return (
    <body>
      <div className="navbar"></div>
      <div>
        <div className="combine">
          <div className="image">
            <div style={{ color: "white" }}>{song && song.name}</div>
            <iframe
                src={"https://www.youtube.com/embed/LDMTjY-QgD0"}
                style={{ width: "50vw", height: "90vh", frameBorder: "0" }}
                allow="accelerometer; autoplay ; encrypted-media"
                title=""
                allowFullScreen
              />
          </div>
          <div className="rest">
            <h1 style={{ color: "white" }}>{` same ${queryKey} songs`}</h1>
            <div>
              {
                <div className="bar">
                  {relatedSongs && relatedSongs.map((song) => {
                    return <SongBar key={song.id} song={song} />;
                  })}
                </div>
              }
            </div>
          </div>
        </div>
        <footer className="footer">footer</footer>
      </div>
    </body>
  );
}

export default App;
