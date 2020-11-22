import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./SongBar.css";

function SongCard({ song }) {
  const [show, setShow] = useState(false);
  const link = song.youtube_link
    .replace("watch?v=", "embed/")
    .split("&list")[0];
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Navbar
        bg="dark"
        style={{ border: "1px solid" }}
        expand="lg"
        className="navbar"
      >
        <div>
          <Button variant="danger" onClick={handleShow}>
            Play
          </Button>
          <Modal show={show} onHide={handleClose}>
            <div className="youTubeModal">
              <iframe
                src={link}
                style={{ width: "60vw", height: "60vh", frameBorder: "0" }}
                allow="accelerometer; autoplay; encrypted-media"
                title="tt"
                allowFullScreen
              />
            </div>
          </Modal>
        </div>
        <Link style={{ color: "white" }} to={`/artists/${song.artistId}`}>
          <span>{song.Artist.name}</span>
        </Link>
        <Link style={{ color: "white" }} to={`/artists/${song.albumId}`}>
          <span>song album name</span>
        </Link>
        <Link style={{ color: "white" }} to={`/songs/${song.artistId}`}>
          <Nav>{song.name}</Nav>
        </Link>
      </Navbar>
    </div>
  );
}

export default SongCard;
