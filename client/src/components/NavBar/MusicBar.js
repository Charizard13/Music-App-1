import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegPlayCircle, FaStopCircle } from "react-icons/fa";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import './MusicBar.css'
import { Prev } from "react-bootstrap/esm/PageItem";

function TopPage({ song }) {
//   const link = song.youtube_link
//   .replace("https://www.youtube.com/watch?v=", "")
//   .split("&list")[0];

  const [play, setPlay] = useState([true]);

  function stopOrPlay() {
    setPlay(prev => !prev);
  }

  return (
    <div bg="dark" variant="dark" style={{color: "white"}} className="musicBar" >
        {" "}
          {/* <img className="image" src="https://picsum.photos/5" height={} /> */}
          <div className="description">
            <div>Artist</div>
            <div>Song Name</div>
          </div>
          <div>
            <GoChevronLeft />
          </div>
          <div onClick={stopOrPlay}>
            {play ? <FaRegPlayCircle /> : <FaStopCircle />}
          </div>
          <div>
            <GoChevronRight />
          </div>
      </div>
  );
}

export default TopPage;
