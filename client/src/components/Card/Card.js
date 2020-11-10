import React from "react";
import "./Card.css"
function Card({ prop, name }) {
  const coverLink = prop.youtube_link
    .replace("https://www.youtube.com/watch?v=", "")
    .split("&list")[0];
  return (
    <div className="card" style={{ backgroundColor: "black", width: "150px", height: "250px" , textAlign: "center" }}>
      <img
        style={{ width: "150px", height: "150px", borderRadius: "50%"}}
        className="card-img"
        className=""
        src={`https://img.youtube.com/vi/${coverLink}/hqdefault.jpg`}
        alt=""
      />
      <div className="card-body">
        <div style={{ fontSize: "16px", color: "white"}} className="card-title">
        {prop.name.length > 20 ? prop.name.slice(0, 20) + '...' : prop.name }        </div>
        <p style={{ fontSize: "11px", color: "grey"}} className="card-text">
        <div>{name}</div>
        </p>
      </div>
    </div>
  );
}

export default Card;
