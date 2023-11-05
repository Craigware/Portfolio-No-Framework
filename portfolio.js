import LightSwitch from "./source/scripts/lightswitch.js";
window.LightSwitch = LightSwitch;
import delay from "./source/scripts/timing.js";
import StartBouncing, { CreateBallFromForm, AlterWorldEffects, materials, Material, Vector2 } from "./source/scripts/bouncyballs.js";
StartBouncing(document.getElementById("Hero"));

const alterWorldSettingsForm = document.getElementById("World-Settings");
alterWorldSettingsForm.addEventListener("change", AlterWorldEffects);

const createBallForm = document.getElementById("Applied-Force-Form");
createBallForm.addEventListener("submit", CreateBallFromForm);
// might create an on off switch for the effect

import AlterJobTitle, { TypeWordEffect } from "./source/scripts/typeeffect.js";
window.AlterJobTitle = AlterJobTitle;
window.TypeWordEffect = TypeWordEffect;

const physicsMaterialForm = document.getElementById("Physics-Material-Form");
const savedMaterialSelect = document.getElementById("Saved-Material-Select");
savedMaterialSelect.addEventListener("change", updateCurrentMaterial);
physicsMaterialForm.addEventListener("submit", saveMaterial);

updateSavedMaterialsList();

function updateCurrentMaterial(event){
  if (!materials[event.target.value]) { return Error("Material is not in list of saved materials."); } 
  console.log(materials[event.target.value]);
  document.getElementById("Material-Name-Input").value = materials[event.target.value].materialName;
  document.getElementById("Material-Weight-Input").value = materials[event.target.value].materialWeight;
  document.getElementById("Material-Bounce-Input").value = materials[event.target.value].materialBounce;
  document.getElementById("Material-Friction-Input").value = materials[event.target.value].materialFriction;
}

function updateSavedMaterialsList(){
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
  const materialWeight = document.getElementById("Material-Weight-Input").value / 100;
  const materialBounce = document.getElementById("Material-Bounce-Input").value / 100;
  const materialFriction = document.getElementById("Material-Friction-Input").value / 1000;

  return new Material(materialName, materialWeight, materialBounce, materialFriction);
}

function saveMaterial(event){
  event.preventDefault();
  const materialToSave = getMaterialValuesFromForm()
  materials.push(materialToSave);
  updateSavedMaterialsList();
}



// async function updateVisibilty(event){
//   if (event.target.tagName === "DIV" || event.target.tagName === "H3") {
//     let childrenVisibility;
//     let animationDelay = 2;
//     event.target.style.transition = `height ${animationDelay}s`
//     if (!event.target.currentVisibility){
//       console.log("!")
//       event.target.currentVisibility = true;
//       ballCreationFormContainer.style.height = "0%"; 
//       childrenVisibility = "hidden";
//     } else {
//       console.log("?")
//       event.target.currentVisibility = false;
//       ballCreationFormContainer.style.height = "auto";
    
//       childrenVisibility = "visible";
//     }
//   }
// }

// const ballCreationFormContainer = document.getElementById("Ball-Forms-Holder");
// ballCreationFormContainer.addEventListener("click", updateVisibilty)



function GenerateHeroGrid(cellSize){
  const gridContainer = document.getElementById("Hero-Grid");
  gridContainer.innerHTML = ""
  const offsets = new Vector2(1,1);
  if(gridContainer.clientHeight > gridContainer.clientWidth){
    offsets.x = gridContainer.clientHeight / gridContainer.clientWidth;
  } else {
    offsets.y = gridContainer.clientWidth / gridContainer.clientHeight;
  }
  
  // i < 100 because i = the % of the page, must go to 100 to spread through entire page
  for (let i = 0; i < 100 / cellSize + 1; i++){
    const gridLine = document.createElement("div")
    gridLine.classList.add("gridLine");
    gridContainer.appendChild(gridLine);
    gridLine.style.cssText = `
      width: 1px;
      height: 100%;
      background-color: white;
      right: ${i * (100 / cellSize) * offsets.x}%;
      z-index: 0;
    `;
  }
  for (let i = 0; i < 100 / cellSize+ 1; i++){
    const gridLine = document.createElement("div")
    gridLine.classList.add("gridLine");
    gridContainer.appendChild(gridLine);
    gridLine.style.cssText = `
      width: 100%;
      height: 1px;
      background-color: white;
      bottom: ${i * (100 / cellSize) * offsets.y}%;
      z-index: 0;
    `;
  }
}
GenerateHeroGrid(10);

addEventListener("resize", () => { GenerateHeroGrid(10) })