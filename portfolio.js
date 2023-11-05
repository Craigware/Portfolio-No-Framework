import LightSwitch from "./source/scripts/lightswitch.js";
window.LightSwitch = LightSwitch;

import StartBouncing, { CreateBallFromForm, AlterWorldEffects} from "./source/scripts/bouncyballs.js";
StartBouncing(document.getElementById("Hero"));
// might create an on off switch for the effect

import AlterJobTitle, { TypeWordEffect } from "./source/scripts/typeeffect.js";
window.AlterJobTitle = AlterJobTitle;
window.TypeWordEffect = TypeWordEffect;

const createBallForm = document.getElementById("Create-A-Ball");
createBallForm.addEventListener("submit", CreateBallFromForm);

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