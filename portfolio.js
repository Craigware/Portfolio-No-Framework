import LightSwitch from "./source/scripts/lightswitch.js";
window.LightSwitch = LightSwitch;


import StartBouncing, {
  updateCurrentMaterial,
  saveMaterial,
  updateSavedMaterialsList,
  savedMaterialSelect,
  physicsMaterialForm,
  CreateBallFromForm,
  AlterWorldEffects
} from "./source/scripts/bouncyballs.js";
savedMaterialSelect.addEventListener("change", updateCurrentMaterial);
physicsMaterialForm.addEventListener("submit", saveMaterial);


updateSavedMaterialsList();
StartBouncing(document.getElementById("Hero"));


const alterWorldSettingsForm = document.getElementById("World-Settings");
alterWorldSettingsForm.addEventListener("change", AlterWorldEffects);


const createBallForm = document.getElementById("Applied-Force-Form");
createBallForm.addEventListener("submit", CreateBallFromForm);


import AlterJobTitle, { TypeWordEffect } from "./source/scripts/typeeffect.js";
AlterJobTitle(100,100,4000);


import {GenerateHeroGrid} from './source/scripts/scalablegrid.js'
const cellAmount = 25;
const heroGrid = document.getElementById("Hero-Grid");
// const projectsGrid = document.getElementById("Projects-Grid");
const grids = [
  heroGrid,
  // projectsGrid
]
addEventListener("resize", () => {
  for (let grid in grids){
    GenerateHeroGrid(grids[grid], cellAmount)
  }
})
GenerateHeroGrid(heroGrid, cellAmount)
// GenerateHeroGrid(projectsGrid, cellAmount)


async function updateVisibilty(event){
  if (event.target.tagName === "DIV" || event.target.tagName === "H3") {
    let childrenVisibility;
    let animationDelay = 2;
    event.target.style.transition = `height ${animationDelay}s`
    if (!event.target.currentVisibility){ 
      console.log("!")
      event.target.currentVisibility = true;
      ballCreationFormContainer.style.height = "0%"; 
      childrenVisibility = "hidden";
    } else {
      console.log("?")
      event.target.currentVisibility = false;
      ballCreationFormContainer.style.height = "auto";
    
      childrenVisibility = "visible";
    }
  }
}

const ballCreationFormContainer = document.getElementById("Ball-Forms-Holder");
ballCreationFormContainer.addEventListener("click", updateVisibilty)

// const technicalSkills = document.getElementById("About-Me-Skills");
// for(let i = 0; i < technicalSkills.children.length; i++){
//   const currentSelect = technicalSkills.children[i];
//   if (currentSelect.tagName === "H3"){
//     currentSelect.style.marginLeft = `calc(4rem + ${i + 1}rem)`;
//   }
// }


// set lifetime on techball