import LightSwitch from "./source/scripts/lightswitch.js";
window.LightSwitch = LightSwitch;
import delay from "./source/scripts/timing.js";
import StartBouncing, { CreateBallFromForm, AlterWorldEffects} from "./source/scripts/bouncyballs.js";
StartBouncing(document.getElementById("Hero"));
// might create an on off switch for the effect

import AlterJobTitle, { TypeWordEffect } from "./source/scripts/typeeffect.js";
window.AlterJobTitle = AlterJobTitle;
window.TypeWordEffect = TypeWordEffect;

const createBallForm = document.getElementById("Create-A-Ball");
createBallForm.addEventListener("submit", CreateBallFromForm);

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
const alterWorldSettingsForm = document.getElementById("World-Settings");
alterWorldSettingsForm.addEventListener("change", AlterWorldEffects);


// function GenerateHeroGrid(){
//   const gridContainer = document.getElementById("Hero");
//   const gridSize = 25;
//   for (let i = 0; i < gridSize + 1; i++){
//     const gridLine = document.createElement("div")
//     gridLine.classList.add("gridLine");
//     gridContainer.appendChild(gridLine);
//     gridLine.style.width = "1px";
//     gridLine.style.height = "100%";
//     gridLine.style.position = "absolute";
//     gridLine.style.backgroundColor = "white";
//     gridLine.style.left = `${i * 100/gridSize}%`
//     gridLine.style.zIndex = "0"
//   }

//   for (let i = 0; i < gridSize + 1; i++){
//     const gridLine = document.createElement("div")
//     gridLine.classList.add("gridLine");
//     gridContainer.appendChild(gridLine);
//     gridLine.style.height = "1px";
//     gridLine.style.width = "100%";
//     gridLine.style.position = "absolute";
//     gridLine.style.backgroundColor = "white";
//     gridLine.style.top = `${i * 156.25/gridSize}%`
//     gridLine.style.zIndex = "0"
//   }
// }
// GenerateHeroGrid();