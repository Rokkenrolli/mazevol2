import p5Types from "p5"
import { BoundaryProps } from "./utils"



class Boundary {

    public a:p5Types.Vector   
    public b:p5Types.Vector
    private p5:p5Types 
    public color: p5Types.Color
    public solid:boolean
    constructor(p5Ref:p5Types,x1:number, y1:number, x2:number, y2:number,color?:p5Types.Color | string, solid = false) {
      this.a = p5Ref.createVector(x1, y1)
      this.b = p5Ref.createVector(x2, y2)
      this.p5 = p5Ref
      this.solid = solid
      this.color = color ? (typeof color === "string" ? p5Ref.color(color) : color): p5Ref.color(255)
    }
        
   static fromProps(p5:p5Types,props:BoundaryProps) {
       return new Boundary(p5,props.x1,props.y1,props.x2,props.y2, props.color,props.solid)
   }
    show() {
      let a = this.a.copy();
      let b = this.b.copy();
      this.p5.stroke(this.color)
      this.p5.line(a.x,a.y,b.x,b.y)
    }
  }

export default Boundary