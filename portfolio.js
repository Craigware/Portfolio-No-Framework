import LightSwitch from "./source/lightswitch.js";
import delay from "./source/timing.js";
window.LightSwitch = LightSwitch;

import AlterJobTitle, { TypeWordEffect } from "./source/typeeffect.js";
window.AlterJobTitle = AlterJobTitle;
window.TypeWordEffect = TypeWordEffect;

const gravity = 0.3;
const windResistance = 0;
const fps = 60;
const ballRefreshRate = 1000/fps;

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
      this.x = Math.random() * ((max) - min + 1) + min;
    }

    if (dimensions.includes("y")){
      this.y = Math.random() * ((max) - min + 1) + min;
    }

    return this
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
  friction = Number;
  
  constructor(materialName, rotationSpeed=1, weight=0.5, bounciness=0.5, friction=0.01){
    this.weight = weight;
    this.bounciness = bounciness;
    this.materialName = materialName;
    this.rotationSpeed = rotationSpeed;
    this.friction = friction;
  }
}

const materials = [
  new Material("Bouncy", 1, 0.5, 0.5),
  new Material("Super-Light", 1, 0.25, 1),
  new Material("Heavy", 1, 1, 0),
  new Material("Light-But-Not-Bouncy", 1, 0.4, 0)
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
  new Technology("React", "./source/images/react_logo.jpg"),
  new Technology("Django", "./source/images/django_logo.png"),
  // new Technology("TailwindCSS", "./source/images/tailwindcss_logo.jpg"),
  // new Technology("SASS", "./source/images/sass_logo.png"),
  // new Technology("Docker", ""), 
  // new Technology("Git", ""),
  // new Technology("Bootstrap", ""),
]


class TechnologyBall{
  technology = Technology;
  material = Material;
  position = Vector2;
  anchorOffset = Vector2;
  element = Element;

  constructor(technology, material, position){
    this.technology = technology;
    this.material = material;
    this.position = position;
  }

  DecideTrajectory(){
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
      border-radius: ${borderRadius}%;
      height: ${imageSize}px;
      width: ${imageSize}px;
      position: absolute;
      bottom: 110%;
      right: -10%;
      object-fit: cover;
      object-position: ${this.technology.imageOffsets.y}% ${this.technology.imageOffsets.x}%;
      transform: translate(50%,50%);
    `;
    
    this.element = technologyGFX;
    this.anchorOffset = new Vector2(
      parseInt(this.element.style.width)/2,
      parseInt(this.element.style.height)/2
    )

    return technologyGFX;
  }


  async UpdatePosition(element, appliedForce){
    if (!this.velocity){
      this.velocity = new Vector2(appliedForce.x, appliedForce.y);
    }
    this.position.y = (this.position.y + appliedForce.y);
    this.position.x = (this.position.x + appliedForce.x);
    appliedForce.y -= gravity * this.material.weight;
    appliedForce.x -= windResistance;
  
    if (this.position.y <= 0){
      this.position.y = 0;
      appliedForce.y = this.velocity.y * this.material.bounciness;
      this.velocity.y = appliedForce.y;


      if (appliedForce.x > 0){
        if (appliedForce.x - this.material.friction < 0){
          appliedForce.x = 0;
        } else {
          appliedForce.x -= this.material.friction;
        }
      } else if (appliedForce.x > 0) {
        if (appliedForce.x + this.material.friction < 0){
          appliedForce.x = 0;
        } else {
          appliedForce.x += this.material.friction;
        }
      }
    }

    if(appliedForce.x <= 0){
      console.log("The ball ran out of horizontal force");
      element.parentNode.removeChild(element);
      return 0;
    }
    if(parseInt(element.style.right) >= 120 || element.style.right <= 20){
      console.log("The ball ran off the left of the screen");
      element.parentNode.removeChild(element);
      return 0
    }
    element.style.right = `calc(${this.position.x}% + ${this.anchorOffset.x}px)`;
    element.style.bottom = `calc(${this.position.y}% + ${this.anchorOffset.y}px)`;

    await delay(ballRefreshRate);
    this.UpdatePosition(element, appliedForce);
  }
}


async function BounceElement(parent){
  let randomTechnologyIndex = Math.floor(Math.random() * ((technologies.length - 1) - 0 + 1)) + 0
  let randomMaterialIndex = Math.floor(Math.random() * ((materials.length - 1) - 0 + 1)) + 0
  const randomMaterial = materials[randomMaterialIndex];
  const randomTechnology = technologies[randomTechnologyIndex];
  const randomForce = new Vector2(0,0)
  randomForce.RandomizeX(0.1,1);
  randomForce.RandomizeY(0.2,2);

  const TechBall = new TechnologyBall(randomTechnology, randomMaterial, new Vector2(0, 0));

  TechBall.CreateTechnologyGFX();
  parent.appendChild(TechBall.element);
  TechBall.DecideTrajectory();
  TechBall.UpdatePosition(TechBall.element, randomForce);
}

BounceElement(document.getElementById("Hero"));