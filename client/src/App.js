import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home/Home";
import ElasticHome from "./components/Elastic/ElasticHome";
import AllElastic from "./components/Elastic/AllElastic";
import All from "./components/All/All";
import One from "./components/One/One";
import OneSong from "./components/Song/OneSong";
import NotFound from "./components/NotFound/NotFound";
import NavBar from "./components/NavBar/NavBar";
import SignUp from "./components/Login/SignUp";
import AuthParent from "./components/FireBase/AuthParent";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={SignUp} />
        <Route path="/artists/:id" component={One} />
        <Route path="/albums/:id" component={One} />
        <Route path="/playlists/:id" component={One} />
        <Route path="/songs/:id" component={OneSong} />
        <Route path="/playlists" component={All} />
        <Route path="/artists" component={All} />
        <Route path="/albums" component={All} />
        <Route path="/songs" component={All} />
        <Route path="/elastic/albums" component={AllElastic} />
        <Route path="/elastic/playlists" component={AllElastic} />
        <Route path="/elastic/artists" component={AllElastic} />
        <Route path="/elastic/songs" component={AllElastic} />
        <Route path="/elastic" component={ElasticHome} />
        <Route path="/firebase" component={AuthParent} />
        <Route path="/404" component={NotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
