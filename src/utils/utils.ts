import p5Types from "p5"
import Boundary from "./Boundary"
import {  TileProps } from "./Tile"

export type ValueOf<T> = T[keyof T];

export interface BoundaryProps {
    x1:number
    y1:number
    x2:number
    y2:number
    solid:boolean
    color?:p5Types.Color |string
}

export interface Map {
    canvasWidth:number
    canvasHeight:number
    areaHeight: number
    areaWidth:number
    boundaries: BoundaryProps[]
}




export type HeaderSymbols = "cw" | "ch" | "aw" | "ah" 
export type RowSymbols = "xf" |"xs" | "yf" |"ys" |"sb" |"bc"
export const gridPosToCoord = (p5:p5Types,pos:p5Types.Vector, blockWidth:number, blockHeight:number) => {
    return p5.createVector(pos.x * blockWidth, pos.y * blockHeight)
}

export const initalizeGrid = (p5:p5Types,width:number,height:number, xTiles:number, yTiles:number, color:p5Types.Color):TileProps[] => {
    const tiles:TileProps[] = []
    const blockWidth = width / xTiles
    const blockHeight = height / yTiles

    for (let x = 0; x<xTiles; x++) {

        for (let y = 0; y< yTiles; y++) {
            const pos = p5.createVector(x,y)
            const coordPos = gridPosToCoord(p5,pos, blockWidth, blockHeight)
            const boundaries:Boundary[] = [] 
            boundaries.push(new Boundary(p5,coordPos.x,coordPos.y,coordPos.x+blockWidth, coordPos.y, color, true))
            boundaries.push(new Boundary(p5,coordPos.x,coordPos.y,coordPos.x, coordPos.y+ blockHeight, color, true))
            boundaries.push(new Boundary(p5,coordPos.x + blockWidth,coordPos.y,coordPos.x+blockWidth, coordPos.y + blockHeight, color, true))
            boundaries.push(new Boundary(p5,coordPos.x,coordPos.y+blockHeight,coordPos.x+blockWidth, coordPos.y+blockHeight, color, true))
            tiles.push({pos:pos, boundaries:boundaries})
        }

    }

    return tiles
}


/**
 * 
 * @param map the map that the grid will be added.
 * @param p5 ref to p5
 * @returns copy of the map with boundaries for each end
 */
export const initalizeBoundaries = (map:Map,  width:number,height:number, color:p5Types.Color):Map => {
    const modifiedMap:Map = {...map}

    map.boundaries.push({x1:0,     y1:0,      x2:width, y2:0,      color:color, solid:true});
    map.boundaries.push({x1:0,     y1:0,      x2:0,     y2:height, color:color, solid:true});
    map.boundaries.push({x1:width, y1:height, x2:width, y2:0,      color:color, solid:true});
    map.boundaries.push({x1:width, y1:height, x2:0,     y2:height, color:color, solid:true});


    return modifiedMap
}

export const parseMapFile = (text:string):Map=> {
    const split = text.split("\n")
    const boundaries:BoundaryProps[] = []
    const map = parseHeader(split[0])
    const end = split.findIndex(p => p.trim().includes("end"))
    console.log(split)
    console.log("found end at "+ end)
    split.slice(1,end).forEach(row => {
        const boundary = parseRow(row)
        boundaries.push(boundary)
    })
    map.boundaries = boundaries
    return map
}



const parseRow = (row:String):BoundaryProps => {
    const b:BoundaryProps = {x1:0,x2:0,y1:0,y2:0,solid:false}
    const elements = row.split(" ")
    elements.forEach(e => {
        const eType = e.slice(0,2) as RowSymbols
        const body = e.slice(2)
        switch(eType) {
            case "sb":
                b.solid = Boolean(body)
            break;
            case "xf":
                b.x1 = Number(body)
            break;
            case "xs":
                b.x2 = Number(body)
            break;
            case "yf":
                b.y1 = Number(body)
            break;
            case "ys":
                b.y2 = Number(body)
            break;
            case "bc":
                b.color = body
            break;
            default:
                return
        }
    })
    console.log(b)
    return b
}

const parseHeader = (header:string):Map => {
    const map:Map = {areaWidth:0, areaHeight:0, canvasHeight:0, canvasWidth:0, boundaries:[]}
    console.log(header)
    const rows = header.split(" ")
    rows.forEach(p => {
        const elementType = p.slice(0,2) as HeaderSymbols
        const body = p.slice(2)
        switch (elementType) {
            case "ch":
                map.canvasHeight = Number(body)
            break;
            case "cw":
                map.canvasWidth = Number(body)
            break;
            case "aw":
                map.areaWidth = Number(body)
            break;
            case "ah":
                map.areaHeight = Number(body)
            break;

        }
    })
    return map
}