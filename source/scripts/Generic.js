export const delay = (ms) => new Promise(res => setTimeout(res, ms));

export class Vector2{
  x = Number;
  y = Number;

  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  Compare(other){
    return this.x === other.x && this.y === other.y;
  }

  Randomize(min, max, dimensions=["x","y"]){
    if (typeof min !== "number" || typeof max !== "number"){
      throw Error("You must define a minimum and maximum value, they must be numbers");
    }
    if (min > max) {
      throw Error("Your minimum value is lower than the maximum value");
    }

    if (dimensions.includes("x")){
      this.x = Math.random() * ((max) - min + 1) + min;
    }
    if (dimensions.includes("y")){
      this.y = Math.random() * ((max) - min + 1) + min;
    }

    return this
  }

  RandomizeY(min, max){
    this.Randomize(min, max, ["y"]);
    return this.y;
  }

  RandomizeX(min, max){
    this.Randomize(min, max, ["x"]);
    return this.x;
  }
}

export default delay;