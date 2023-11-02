import LightSwitch from "./source/lightswitch.js";
import delay from "./source/timing.js";
window.LightSwitch = LightSwitch;

import AlterJobTitle, { TypeWordEffect } from "./source/typeeffect.js";
window.AlterJobTitle = AlterJobTitle;
window.TypeWordEffect = TypeWordEffect;


class material{
  bouncePath = Array;
  materialName = String;
  rotationSpeed = Number;

  constructor(materialName, bouncePath, rotationSpeed=1){
    this.bouncePath = bouncePath;
    this.materialName = materialName;
    this.rotationSpeed = rotationSpeed;
  }

  GetMaterialName(){
    return this.materialName;
  }

  GetBouncePath(){
    return this.bouncePath;
  }

  GetRotationSpeed(){
    return this.rotationSpeed;
  }
}

class technology{
  technologyName = String;
  imagePath = String;
  imageOffsets = Object;

  constructor(technologyName, imagePath, imageOffsets={"x": 0, "y": 0}){
    this.technologyName = technologyName;
    this.imagePath = imagePath;
    this.imageOffsets = imageOffsets;
  }

  GetTechnologyName(){
    return this.technologyName;
  }

  GetImagePath(){
    return this.imagePath;
  }

  GetImageOffSet(){
    return this.imageOffsets;
  }
}

const technologies = [
  new technology("Javascript", "./source/images/javascript_logo.jpg"),
  new technology("Python", "./source/images/python_logo.png", {"x": "0", "y": "50%"}),
]

const materials = [
  new material("Bouncy", []),
  new material("Somewhat-Bouncy", []),
  new material("Somewhat-Rigid", []),
  new material("Rigid", [])
]

async function UpdateElementAnimation(element, imageSize=64, targets){
  let randomPosition = {"x": Math.floor(Math.random() * (100 - 0 + 1)) + 0, "y": Math.floor(Math.random() * (100 - 0 + 1)) }

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

  await delay(3000);
  UpdateElementAnimation(element, parseInt(element.style.height), randomPosition);
}

async function BounceElement(element){
  let randomTechnology = Math.floor(Math.random() * ((technologies.length - 1) - 0 + 1)) + 0
  let randomPosition = {"x": Math.floor(Math.random() * (100 - 0 + 1)) + 0, "y": Math.floor(Math.random() * (100 - 0 + 1)) }

  const technologyGFX = CreateTechnologyGFX(technologies[randomTechnology]);
  element.appendChild(technologyGFX);
  await delay(2000);
  UpdateElementAnimation(element.lastChild, parseInt(element.lastChild.style.height), randomPosition);
}


function CreateTechnologyGFX(technology, borderRadius=100, imageSize=64){
  if (borderRadius > 100){
    throw Error("Value of borderRadius must be between 0-100");
  }
  
  const technologyGFX = document.createElement("img");
  const offSetX = technology.GetImageOffSet().x;
  const offSetY = technology.GetImageOffSet().y;

  technologyGFX.src = technology.GetImagePath();
  technologyGFX.alt = technology.GetTechnologyName() + " Icon";

  technologyGFX.style.cssText = `
    transition:
      right 2s,
      bottom 2s;

    border-radius: ${borderRadius}%;
    height: ${imageSize}px;
    width: ${imageSize}px;
    position: absolute;
    object-fit: cover;
    object-position: ${offSetY} ${offSetX};
    right: calc(0% + ${imageSize/2}px);
    bottom: calc(0% + ${imageSize/2}px);
    transform: translate(50%,50%);
  `;

  return technologyGFX;
}

BounceElement(document.getElementById("Hero"));