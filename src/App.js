import "./App.css";

import {
  ProfessionIconLinksAll,
  ProfessionIconsAll,
} from "./assets/profession_icons/ProfessionIcon";
import "./styles.css";
import { v4 as uuidv4 } from "uuid";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";

function App() {
  const icons = ProfessionIconLinksAll(30);

  const onDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onClickRemove = (event) => {
    event.target.remove();
  };

  const createProfCube = (icon) => {
    return (
      <div
        id={uuidv4().toString()}
        key={icon}
        draggable={true}
        onDragStart={onDragStart}
        className="prof-item"
        style={{
          backgroundImage: `url(${icon})`,
          backgroundSize: `40px`,
          height: "40px",
          width: "40px",
        }}
      ></div>
    );
  };

  const createPartyFrames = (amount) => {
    let frames = [];
    for (let i = 0; i < amount; i++) {
      frames.push(
        <div
          className="party-frame"
          onDrop={onDrop}
          onDragOver={onDragOver}
        ></div>
      );
    }
    return frames;
  };

  const onDrop = (event) => {
    console.log("🚀 ~ file: App.js:18 ~ onDrop ~ event:", event);
    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id);

    let node = draggableElement.cloneNode(true);
    node.id = uuidv4().toString();
    node.onclick = onClickRemove;
    node.draggable = false;

    const dropzone = event.target;
    dropzone.appendChild(node);
  };

  return (
    <div className="container">
      <div className="origin">
        <div className="prof-grid">
          {" "}
          {icons.map((icon) => {
            return createProfCube(icon);
          })}{" "}
        </div>{" "}
      </div>{" "}
      <div className="party-grid"> {createPartyFrames(10)} </div>{" "}
    </div>
  );
}

export default App;
