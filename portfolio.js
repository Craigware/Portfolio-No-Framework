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
