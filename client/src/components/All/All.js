import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import "./All.css";

function All({ match }) {
  const [list, setList] = useState([]);
  const url = match.url;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(url);
      setList(data);
    })();
  }, [url]);

  return (
    <section className="all">
      {list.map((one, index) => {
        return (
          <div key={index}>
            <Link to={`${url}/${one.id}`}>
              <Card one={one} className="one" />
            </Link>
          </div>
        );
      })}
    </section>
  );
}

export default All;
