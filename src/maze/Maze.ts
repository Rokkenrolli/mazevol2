import { Tile } from "../utils/Tile";
import p5Types from "p5"
import { initalizeGrid } from "../utils/utils";


export interface MazeProps {
    name:string
    tiles?:Tile[]
    width:number
    height:number
    rows:number
    columns:number
}

type MazeStatus = "completed" | "initialized" | "generating"

class Maze {
    public name:string
    public tiles:Tile[]
    public status:MazeStatus = "initialized"
    public width:number
    public height:number
    public rows:number
    public columns:number
    private p5:p5Types

    constructor(p5:p5Types,name:string,width:number,height:number,rows:number, columns:number,tiles:Tile[] = []) {
        this.name = name
        this.tiles = tiles
        this.height = height
        this.width = width
        this.rows = rows
        this.columns = columns
        this.p5 = p5
    }

    copy() {
        return new Maze(this.p5, this.name, this.width, this.height, this.rows, this.columns, this.tiles)
    }

    static fromProps(p5:p5Types,props:MazeProps) {
        return new Maze(p5,props.name, props.width, props.height, props.rows, props.columns, props.tiles)
    }

    public initializeMaze(color: p5Types.Color) {
        this.tiles = initalizeGrid(this.p5,this.width,this.height, this.columns, this.rows, color).map(t => Tile.fromProps(t))
    }


}

export default Maze