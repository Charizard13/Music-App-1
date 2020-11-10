import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SongBar.css";

function PlaylistCard({ prop, from }) {
  console.log(prop)
  const [show, setShow] = useState(false);
  const link = prop.Song.youtube_link
    .replace("watch?v=", "embed/")
    .split("&list")[0];
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="songBar">
      <div className="left">
        <Button variant="danger" onClick={handleShow}>
          Play
        </Button>
        <Modal show={show} onHide={handleClose}>
          <div className="youTubeModal">
            <iframe
              src={link}
              style={{ width: "60vw", height: "60vh", frameBorder: "0" }}
              allow="accelerometer; autoplay; encrypted-media"
              title="iframe"
              allowFullScreen
            />
          </div>
        </Modal>
      </div>
      <Link  className="center" from={from} to={`/albums/${prop.Song.Album.id}`}>
        <div className="artist">{prop.Song.Album.name}</div>
      </Link>
      <Link   className="center" from={from} to={`/artists/${prop.Song.Artist.id}`}>
        <div className="artist">{prop.Song.Artist.name}</div>
      </Link>
      <Link   className="right" from={from} to={`/songs/${prop.songId}?playlist=${prop.playlistId}`}>
        <div>{prop.Song.name}</div>
      </Link>
    </div>
  );
}

export default PlaylistCard;
