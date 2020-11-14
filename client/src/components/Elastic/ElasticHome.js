import React, { useState, useEffect, Suspense, useRef } from "react";
import Card from "../Card/Card";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import AddForm from "../Home/AddForm.js";
import { BiAddToQueue } from "react-icons/bi";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Home/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [current, setCurrent] = useState('');
  const searchInput = useRef('')

  
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`elastic/playlists/:${searchInput.current}`)
      setPlaylistList(data);
    })();
    (async () => {
      const { data } = await axios.get(`elastic/albums/:${searchInput.current}`)
      setAlbumList(data);
      console.log(data)
    })();
    (async () => {
      const { data } = await axios.get(`elastic/songs/:${searchInput.current}`)
      setSongList(data);
      console.log(data)
    })();
    (async () => {
      const { data } = await axios.get(`elastic/artists/:${searchInput.current}`)
       setArtistList(data);
    })();
  }, [current]);

 
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("elastic/top_3_artists");
      console.log(data);
      setArtistList(data);
    })();
    (async () => {
      const { data } = await axios.get("elastic/top_3_songs");
      setSongList(data);
    })();
    (async () => {
      const { data } = await axios.get("elastic/top_3_albums");
      setAlbumList(data);
    })();
    (async () => {
      const { data } = await axios.get("elastic/top_3_playlists");
      setPlaylistList(data);
    })();
  }, [] || current === '');


  useEffect(() => {
    searchInput.current = current
  }, [current])


  return (
    <div className="homePage">
      <NavBar className="navBar" />
      <div className="artists">
      <input placeholder="Search" ref={searchInput} value={current} onChange={e => setCurrent(e.target.value)}></input>

        <Link to="elastic/artists">
          <div className="title">
            <div>Top 3 Artists</div>
            <div style={{fontSize: "15px", color: "grey"}}>Show more</div>
          </div>
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
            {artistList.map((prop) => {
              return (
                <Link to={`/artists/${prop.id}`}>
                  <Card key={prop.id} prop={prop} name={"artist"} />
                </Link>
              );
            })}
          </Carousel>{" "}
        </Suspense>
      </div>
      <div className="albums">
        {" "}
        <Link to="elastic/albums">
          <div className="title">Top 3 Albums</div>
          <div style={{fontSize: "15px", color: "grey"}}>Show more</div>
        </Link>
        <Suspense
          fallback={
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only"></span>
            </div>
          }
        >
          <Carousel breakPoints={breakPoints}>
            {albumList.map((prop) => {
              return (
                <Link to={`/albums/${prop.id}`}>
                  <Card key={prop.id} prop={prop} name={"album"} />
                </Link>
              );
            })}
          </Carousel>
        </Suspense>
      </div>
      <div className="playlists">
        {" "}
        <Link to="elastic/playlists">
          <div className="title">Top 3 Playlists</div>
          <div style={{fontSize: "15px", color: "grey"}}>Show more</div>
        </Link>
        <Suspense
          fallback={
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only"></span>
            </div>
          }
        >
          <Carousel breakPoints={breakPoints}>
            {playlistList.map((prop) => {
              return (
                <Link to={`/playlists/${prop.id}`}>
                  <Card key={prop.id} prop={prop} name={"playlist"} />
                </Link>
              );
            })}
          </Carousel>
        </Suspense>
      </div>
      <div className="songs">
        <Link to="elastic/songs">
          <div className="title">
            <div>Top  3 Songs</div>
            <div style={{fontSize: "15px", color: "grey"}}>Show more</div>
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
            {songList.map((prop) => {
              return (
                <Link to={`/songs/${prop.id}`}>
                  <Card key={prop.id} prop={prop} />
                </Link>
              );
            })}
          </Carousel>
        </Suspense>
      </div>
    </div>
  );
}

export default HomePage;
