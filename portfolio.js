import LightSwitch from "./source/lightswitch.js";
import delay from "./source/timing.js";
window.LightSwitch = LightSwitch;

import AlterJobTitle, { TypeWordEffect } from "./source/typeeffect.js";
window.AlterJobTitle = AlterJobTitle;
window.TypeWordEffect = TypeWordEffect;

class Vector2{
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
      this.x = Math.floor(Math.random() * ((max) - min + 1) + min);
    }

    if (dimensions.includes("y")){
      this.y = Math.floor(Math.random() * ((max) - min + 1) + min);
    }
  }

  RandomizeY(min, max){
    this.Randomize(min, max, ["y"]);
  }

  RandomizeX(min, max){
    this.Randomize(min, max, ["x"]);
  }
}

class Material{
  materialName = String;
  rotationSpeed = Number;
  weight = Number;
  bounciness = Number;
  
  constructor(materialName, rotationSpeed=1, weight=0.5, bounciness=0.5){
    this.weight = weight;
    this.bounciness = bounciness;
    this.materialName = materialName;
    this.rotationSpeed = rotationSpeed;
  }
}

const materials = [
  new Material("Bouncy", 1, 0.5, 1)
]



class Technology{
  technologyName = String;
  imagePath = String;
  imageOffsets = Object;

  constructor(technologyName, imagePath, imageOffsets=new Vector2(0, 0)){
    this.technologyName = technologyName;
    this.imagePath = imagePath;
    this.imageOffsets = imageOffsets;
  }
}

const technologies = [
  new Technology("Javascript", "./source/images/javascript_logo.jpg"),
  new Technology("Python", "./source/images/python_logo.png", new Vector2(0, 50)),
  new Technology("CSharp", "./source/images/csharp_logo.png"),
  // new Technology("React", ""),
  // new Technology("Django", ""),
  // new Technology("TailwindCSS", ""),
  // new Technology("SASS", ""),
  // new Technology("Docker", ""), 
  // new Technology("Git", ""),
  // new Technology("Bootstrap", ""),

]


class TechnologyBall{
  technology = Technology;
  material = Material;
  appliedForce = Vector2;
  target = Vector2;
  position = Vector2;
  updateSpeed = Vector2;
  element = Element;

  constructor(technology, material, appliedForce=new Vector2(0.5, 0.5), position){
    this.technology = technology;
    this.material = material;
    this.appliedForce = appliedForce;
    this.position = position;
    // 1000 = max total time to reach top
    this.updateSpeed.x = this.material.weight * (appliedForce.x);
    this.updateSpeed.y = this.material.weight * (appliedForce.y);
  }

  DecideTrajectory(){
    // need to decide what y the arch flops
    // peak y = y + (y * applied force) y = 5 + (5 * 1) peak y = 10
    // then we need to determine how fast the ball will move toward the peak this will probably be based on its material
    // then we need to determine how fast the ball will fall to the floor
    // then we need to determine the next peak y and how fast that bounce will be

    const targetY = this.position.y + Math.abs(this.position.y * this.appliedForce.y) + this.appliedForce.y;
    const targetX = this.position.x + Math.abs(this.position.x * this.appliedForce.x) + this.appliedForce.x;
    
    this.target = new Vector2(targetX, targetY);

    return this.target;
  }

  CreateTechnologyGFX(borderRadius=100, imageSize=64){
    if (borderRadius > 100){
      throw Error("Value of borderRadius must be between 0-100");
    }
    
    const technologyGFX = document.createElement("img");
    technologyGFX.onclick = () => { console.log("You clicked me!!"); }
  
    technologyGFX.src = this.technology.imagePath;
    technologyGFX.alt = this.technology.technologyName + " Icon";
  
    technologyGFX.style.cssText = `
      transition:
        right ${this.updateSpeed.x}s,
        bottom ${this.updateSpeed.y}s;
  
      border-radius: ${borderRadius}%;
      height: ${imageSize}px;
      width: ${imageSize}px;
      position: absolute;
      object-fit: cover;
      object-position: ${this.technology.imageOffsets.y}% ${this.technology.imageOffsets.x}%;
      right: calc(${this.position.x}% + ${imageSize/2}px);
      bottom: calc(${this.position.y}% - ${imageSize/2}px);
      transform: translate(50%,50%);
    `;
  
    this.element = technologyGFX;
    return technologyGFX;
  }


  async UpdatePosition(element, imageSize=64, targets){
    if (targets.x >= 50){
      element.style.right = `calc(${targets.x}% - ${imageSize/2}px)`;
    } else {
      element.style.right = `calc(${targets.x}% + ${imageSize/2}px)`;
    }
  
    if (targets.y >= 50){
      element.style.bottom = `calc(${targets.y}% - ${imageSize/2}px)`;
    } else {
      element.style.bottom = `calc(${targets.y}% + ${imageSize/2}px)`;
    }
    
    this.position = targets;
    await delay(this.updateSpeed.x);
  }
}


async function BounceElement(parent){
  let randomTechnologyIndex = Math.floor(Math.random() * ((technologies.length - 1) - 0 + 1)) + 0
  let randomMaterialIndex = Math.floor(Math.random() * ((materials.length - 1) - 0 + 1)) + 0
  const randomMaterial = materials[randomMaterialIndex];
  const randomTechnology = technologies[randomTechnologyIndex];
  

  const TechBall = new TechnologyBall(randomTechnology, randomMaterial, new Vector2(20, 20), new Vector2(0, 0));
  TechBall.CreateTechnologyGFX();
  parent.appendChild(TechBall.element);
  await delay(200);
  TechBall.DecideTrajectory();
  TechBall.UpdatePosition(TechBall.element, 64, TechBall.DecideTrajectory());
  await delay(5000);
}


BounceElement(document.getElementById("Hero"));