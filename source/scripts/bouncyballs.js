import delay from "./timing.js";

let gravity = 0.3;
let windStrength = 0;
const fps = 60;
const ballRefreshRate = 1000/fps;

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

export class Material{
  materialName = String;
  weight = Number;
  bounciness = Number;
  friction = Number;
  
  constructor(materialName, weight=0.5, bounciness=0.5, friction=0.01){
    this.weight = weight;
    this.bounciness = bounciness;
    this.materialName = materialName;
    this.friction = friction;
  }
}

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
  rotationAmount = Number;
  material = Material;
  position = Vector2;
  anchorOffset = Vector2;
  element = Element;

  constructor(technology, material, position){
    this.technology = technology;
    this.material = material;
    this.position = position;
    this.rotationAmount = 0;
  }

  DecideTrajectory(){
    return 0;
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
      bottom: ${this.position.y}%;
      right: ${this.position.x}%;
      object-fit: cover;
      object-position: ${this.technology.imageOffsets.y}% ${this.technology.imageOffsets.x}%;
      transform: translate(50%,50%);
    `;
    
    this.element = technologyGFX;
    this.anchorOffset = new Vector2(
      parseInt(this.element.style.width)/2,
      parseInt(this.element.style.height)/2
    );
    
    this.StopExisting(10000);
    return technologyGFX;
  }

  async StopExisting(timeBeforeDeath=0){
    await delay(timeBeforeDeath);
    this.element.parentNode.removeChild(this.element);
    return true;
  }

  async UpdatePosition(appliedForce){
    if(document.visibilityState === "visible"){
      if (!this.velocity){
        this.velocity = new Vector2(appliedForce.x, appliedForce.y);
      }

      this.position.y += appliedForce.y;
      this.position.x += appliedForce.x;

      appliedForce.x -= windStrength / this.material.weight;
      appliedForce.y -= gravity * this.material.weight;

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
        }

        if (appliedForce.x < 0) {
          if (appliedForce.x + this.material.friction > 0){
            appliedForce.x = 0;
          } else {
            appliedForce.x += this.material.friction;
          }
        }
      }

      if(appliedForce.x <= 0 && windStrength === 0){
        this.StopExisting();
        return 0;
      }

      if(this.position.x >= 100 || this.position.x <= -20){
        this.StopExisting();
        return 0
      }

      this.element.style.right = `calc(${this.position.x}% + ${this.anchorOffset.x}px)`;
      this.element.style.bottom = `calc(${this.position.y}% + ${this.anchorOffset.y}px)`;
    }

    await delay(ballRefreshRate);
    this.UpdatePosition(appliedForce);
  }
}

export const materials = [
  new Material("silly name", 0.3, 0.7, 0)
]

function CreateBall(parent, random, material, appliedForce){
  if (document.visibilityState === "visible"){
    let startPosition = new Vector2(-10,0);
    let randomTechnologyIndex = Math.floor(Math.random() * ((technologies.length - 1) - 0 + 1)) + 0
    let technology = technologies[randomTechnologyIndex];
    if (random){
      
      let randomMaterialIndex = Math.floor(Math.random() * ((materials.length - 1) - 0 + 1)) + 0
      material = materials[randomMaterialIndex];
      
      appliedForce = new Vector2(0,0);
      appliedForce.RandomizeX(0.1,2);
      appliedForce.RandomizeY(0.2,5);
    }

    const TechBall = new TechnologyBall(technology, material, startPosition);

    TechBall.CreateTechnologyGFX();
    parent.appendChild(TechBall.element);
    TechBall.UpdatePosition(appliedForce);
  }
}


export function CreateBallFromForm(event){
  event.preventDefault();
  const materialName = document.getElementById("Material-Name-Input").value;
  const materialWeight = document.getElementById("Material-Weight-Input").value / 100;
  const materialBounce = document.getElementById("Material-Bounce-Input").value / 100;
  const materialFriction = document.getElementById("Material-Friction-Input").value / 10000;
  const x = document.getElementById("Applied-Force-X").value / 10;
  const y = document.getElementById("Applied-Force-Y").value / 10;

  let material = new Material(materialName, materialWeight, materialBounce, materialFriction);
  let appliedForce = new Vector2(x,y);

  CreateBall(document.getElementById("Hero"), false, material, appliedForce);
};

export function AlterWorldEffects(event){
  event.preventDefault();
  const updatedGravity = document.getElementById("Gravity").value / 100;
  const updatedWindStrength = document.getElementById("Wind-Strength").value / 10000;
  windStrength = updatedWindStrength;
  gravity = updatedGravity;
}

export default async function StartBouncing(parent){
  CreateBall(parent, true);
  await delay(1000);
  StartBouncing(parent);
}

export function updateCurrentMaterial(event){
  if (!materials[event.target.value]) { return Error("Material is not in list of saved materials."); } 
  console.log(materials[event.target.value]);
  document.getElementById("Material-Name-Input").value = materials[event.target.value].materialName;
  document.getElementById("Material-Weight-Input").value = materials[event.target.value].materialWeight;
  document.getElementById("Material-Bounce-Input").value = materials[event.target.value].materialBounce;
  document.getElementById("Material-Friction-Input").value = materials[event.target.value].materialFriction;
}

export function updateSavedMaterialsList(){
  for (let materialIndex in materials){
    const materialOption = materials[materialIndex].materialName;
    const option = document.createElement("option");
    option.innerHTML = materialOption;
    option.value = materialIndex;
    if (checkIfMaterialInSelect(materialOption, savedMaterialSelect.children)){ continue; }
    savedMaterialSelect.appendChild(option);
  }
}

function checkIfMaterialInSelect(materialName, array){
  for (let option in array){
    if (savedMaterialSelect.children[option].innerHTML ===  materialName){
      return true;
    }
  }
  return false;
}

function getMaterialValuesFromForm(){
  const materialName = document.getElementById("Material-Name-Input").value;
  for (let material in materials){
    if (materials[material].materialName === materialName){
      throw Error("A material of this name already exists in saved materials.")
    }
  }

  const materialWeight = document.getElementById("Material-Weight-Input").value / 100;
  const materialBounce = document.getElementById("Material-Bounce-Input").value / 100;
  const materialFriction = document.getElementById("Material-Friction-Input").value / 1000;

  return new Material(materialName, materialWeight, materialBounce, materialFriction);
}

export function saveMaterial(event){
  event.preventDefault();
  const materialToSave = getMaterialValuesFromForm()
  materials.push(materialToSave);
  updateSavedMaterialsList();
}

export const savedMaterialSelect = document.getElementById("Saved-Material-Select");
export const physicsMaterialForm = document.getElementById("Physics-Material-Form");