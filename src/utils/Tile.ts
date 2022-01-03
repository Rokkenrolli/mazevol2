import Boundary from "./Boundary";
import p5Types from "p5"


export interface TileProps {
    pos : p5Types.Vector
    boundaries: Boundary[]
}

export class Tile {

    public boundaries: Boundary[]
    public pos:p5Types.Vector

    public static fromProps(props:TileProps):Tile {
        return new Tile(props.pos, props.boundaries)
    }

    constructor(pos:p5Types.Vector, boundaries: Boundary[]) {
        this.boundaries = [...boundaries]
        this.pos = pos
    }

    show() {
        this.boundaries.forEach(b => b.show())
    }

}