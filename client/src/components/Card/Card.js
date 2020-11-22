import React from "react";
import "./Card.css";
function Card({ one }) {
  const coverLink = one.youtube_link
    .replace("https://www.youtube.com/watch?v=", "")
    .split("&list")[0];
  return (
    <div id="one-card">
      <img
        style={{ borderRadius: "35%" }}
        src={`https://img.youtube.com/vi/${coverLink}/hqdefault.jpg`}
        alt=""
      />
      <p id="one-title">
        {one.name.length > 20 ? one.name.slice(0, 20) + "..." : one.name}{" "}
      </p>
      <p id="one-type">type</p>
    </div>
  );
}

export default Card;
