import React, { useState, useEffect, Suspense } from "react";
import Card from "../Card/Card";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import AddForm from "./AddForm.js";
import { BiAddToQueue } from "react-icons/bi";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Carousel = React.lazy(() => import("react-elastic-carousel"));

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 450, itemsToShow: 2 },
  { width: 700, itemsToShow: 3 },
  { width: 1000, itemsToShow: 4 },
  { width: 1200, itemsToShow: 5 },
];

function HomePage() {
  const [artistList, setArtistList] = useState([]);
  const [songList, setSongList] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [playlistList, setPlaylistList] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/artists/top_artists");
      setArtistList(data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/songs/top_songs");
      setSongList(data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/albums/top_albums");
      setAlbumList(data);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("playlists/top_playlists");
      setPlaylistList(data);
    })();
  }, []);

  return (
    <article className="homePage">
      <NavBar className="navBar" />
      <div className="artists">
        <Link to="/artists">
          <nav className="title">Top Artists</nav>
        </Link>
        <Button
          className="title"
          style={{
            backgroundColor: "black",
            borderColor: "black",
            left: "48%",
          }}
        >
          <BiAddToQueue onClick={handleShow} />
        </Button>

        <Modal show={show} onHide={handleClose}>
          <AddForm />
        </Modal>
        <Suspense
          fallback={
            <div class="spinner-border text-danger text-center" role="status">
              <span class="sr-only">loading</span>
            </div>
          }
        >
          {" "}
          <Carousel style={{ height: "250px" }} breakPoints={breakPoints}>
            {artistList.map((one) => {
              return (
                <Link to={`/artists/${one.id}`}>
                  <Card key={one.id} one={one} type={"artist"} />
                </Link>
              );
            })}
          </Carousel>{" "}
        </Suspense>
      </div>
      <div className="albums">
        {" "}
        <Link to="/albums">
          <div className="title">Top Albums</div>
        </Link>
        <Suspense
          fallback={
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only"></span>
            </div>
          }
        >
          <Carousel breakPoints={breakPoints}>
            {albumList.map((one) => {
              return (
                <Link to={`/albums/${one.id}`}>
                  <Card key={one.id} one={one} name={"album"} />
                </Link>
              );
            })}
          </Carousel>
        </Suspense>
      </div>
      <div className="playlists">
        {" "}
        <Link to="/playlists">
          <div className="title">Top Playlists</div>
        </Link>
        <Suspense
          fallback={
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only"></span>
            </div>
          }
        >
          <Carousel breakPoints={breakPoints}>
            {playlistList.map((one) => {
              return (
                <Link to={`/playlists/${one.id}`}>
                  <Card key={one.id} one={one} name={"playlist"} />
                </Link>
              );
            })}
          </Carousel>
        </Suspense>
      </div>
      <div className="songs">
        <Link to="/songs">
          <div className="title">
            <div>Top Songs</div>
          </div>
        </Link>
        <Suspense
          fallback={
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only"></span>
            </div>
          }
        >
          <Carousel breakPoints={breakPoints}>
            {songList.map((one) => {
              return (
                <Link to={`/songs/${one.id}`}>
                  <Card key={one.id} one={one} />
                </Link>
              );
            })}
          </Carousel>
        </Suspense>
      </div>
    </article>
  );
}

export default HomePage;
