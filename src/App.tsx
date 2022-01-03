import { useEffect, useState } from "react";
import  { MazeProps } from "./maze/Maze";
import MainCanvas from "./sketches/MainCanvas";
import styles from "./styles/app.module.css"

function App() {
  

  return (
    <div className={styles.container}>
      <MainCanvas mazePath=""/>
    </div>
  );
}

export default App;
