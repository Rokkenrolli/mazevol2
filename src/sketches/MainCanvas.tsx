
import Maze, { MazeProps } from "../maze/Maze";
import { ReactP5Wrapper, Sketch } from "react-p5-wrapper";
import classnames from "classnames";
import { useEffect, useState } from "react";
import { ValueOf } from "../utils/utils";
import Slider from "../generics/Slider";
import styles from "../styles/MainCanvas.module.css"


export interface ComponentProps {
  mazePath:string,
  className?: string;
}


const sketch:Sketch = p5 => {
  let maze: Maze

  p5.updateWithProps = (props) => {
    const mazeProps = props.mazeProps as MazeProps
    if (mazeProps) {
      maze = Maze.fromProps(p5,mazeProps)
      maze.initializeMaze(p5.color("white"))
      p5.resizeCanvas(maze.width,maze.height)
    }
  }

  p5.setup = () => {
    p5.createCanvas(maze.width, maze.height)
    
    
  }


  p5.draw = () => {
    p5.background(0);
     maze.tiles.forEach(t => {
      t.show()
     })
  }
}

const MainCanvas: React.FC<ComponentProps> = ({
  mazePath,
  className,
}) => {
  
  const [maze, setMaze] = useState<MazeProps|undefined>()

  useEffect(() => {
    const inner = () => {
      const name = "gridMaze"
      const width = 1200
      const height = 750
      const columns = 20
      const rows = 10
      const maze:MazeProps = {name:name,width:width, height:height, columns:columns, rows:rows  }
      setMaze(maze)
      
    }
    inner()
  }, [mazePath])
  const setValue = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => {
    obj[key] = value;
  }

  const setKey = (key:keyof MazeProps,value: ValueOf<MazeProps> ) => {
    if (!maze) {
      return
    }
    const cp:MazeProps = {...maze}
    setValue(cp, key, value)
    setMaze(cp)
  }

 
  

  return <div className={classnames(className)}>

    {maze && <h2>{maze.name}</h2>}
    {maze &&<div id="controls" className={styles.controls}>
        <Slider id="widthSlider" label="width" onChange={(e) => setKey("width",Number(e.target.value))} min={100} max={window.visualViewport.width}  value={maze.width} />
        <Slider id="heightSlider" label="height" onChange={(e) => setKey("height",Number(e.target.value))} min={100} max={window.visualViewport.height}  value={maze.height} />
        <Slider id="columnSlider" label="columns" onChange={(e) => setKey("columns",Number(e.target.value))} min={2} max={100}  value={maze.columns} />
        <Slider id="rowSlider" label="rows" onChange={(e) => setKey("rows",Number(e.target.value))} min={2} max={100}  value={maze.rows} />
      </div>}
    <ReactP5Wrapper sketch={sketch} mazeProps={maze} /> 
    </div>
};

export default MainCanvas;
