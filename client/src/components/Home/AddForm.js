import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { Button, Container, Card, Alert } from "react-bootstrap";

export default function AddArtist() {
  const [artistName, setArtistName] = useState([]);
  const [albumName, setAlbumName] = useState([]);
  const [songName, setSongName] = useState([]);
  const [link, setLink] = useState([]);
  const [id, setId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("artists/last");
      console.log(data);
      setId(data);
    })();
  }, []);

  function onSubmit() {
    setLoading(true);
    setProblem("");
    const newArtist = { name: artistName, youtube_link: link };
    const newAlbum = {
      name: albumName,
      youtubelink: link,
      artistId: id[0].id + 1,
    };
    console.log(newAlbum);
    axios
      .post("/artists", newArtist)
      .catch((data) => setProblem(data.response.data.message));
    console.log(problem);
    axios
      .post("/albums", newAlbum)
      .catch((data) => setProblem(data.response.data.message));
    if (problem && problem.length > 0) {
      history.push("/");
      setLoading(false);
    }
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "130vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card style={{ minHeight: "80vh" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add new Artist</h2>
            <Form>
              <Form.Group>
                <Form.Label>Artist Name</Form.Label>
                <Form.Control
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  type="name"
                  placeholder="Eminem..."
                  required
                />
                <Form.Label>You-tube Link</Form.Label>
                <Form.Control
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  type="link"
                  placeholder="https://www.youtube.com/watch?v=9zB5y66gsM"
                  required
                />
                <Form.Label>Song Name</Form.Label>
                <Form.Control
                  required
                  value={songName}
                  onChange={(e) => setSongName(e.target.value)}
                  type="name"
                />
                <Form.Label>Album Name</Form.Label>
                <Form.Control
                  required
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                  type="name"
                />
              </Form.Group>
              {problem && <Alert variant="danger">{problem}</Alert>}
              <Button
                disabled={loading}
                className="w-100"
                type="submit"
                variant="danger"
                onClick={onSubmit}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
