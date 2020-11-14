import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import './AllElastic.css'

function All({match}) {
  const [list, setList] = useState([]);
  const url = match.url
  console.log(url)

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(url);
      console.log(data)
      setList(data);
    })();
  },[url]);

  return (
      <div className="All" >
        {list.map((prop) => {
          return (
            <div >
            <Link   to={`${url}/${prop.id}`} style={{ backgroundColor: "black" }}  >
              <Card  className="each" key={prop.id} prop={prop} />
            </Link></div>
          );
        })}
      </div>
  );
}

export default All;
