import './source/scripts/LightSwitch.js';
import './source/scripts/Techballs.js';
import './source/scripts/WordEffects.js';
import './source/scripts/ScalableGrid.js';
import './source/scripts/Development.js';

async function getComponentByFile(filePath){
  return fetch(filePath).then((res) => (res.text()));
}

const aboutMe = document.getElementById("About-Me");
const hobbyOption = aboutMe.getElementsByClassName("option");

function changeContents(event, section){
  let content = {};
  if (section === document.getElementById("About-Me")){
    content = {
      "default": defaultContents,
      "hobbies": hobbyContents,
      "goals": goalsContents,
      "soft-skills": softSkillsContents,
      "dog-pictures": "3",
      "doodle-gallery": "4"
    };
  }
  

  const sectionContent = section.getElementsByClassName("content")[0];
  event.target.value = event.target.getAttribute("value");
  sectionContent.innerHTML = content[event.target.value];
}

for (let i = 0; i < hobbyOption.length; i++){
  hobbyOption[i].addEventListener("click", (e) => {changeContents(e, aboutMe)});
}

const defaultContents = aboutMe.getElementsByClassName("content")[0].innerHTML;
const hobbyContents = await getComponentByFile("./source/components/aboutme/HobbyComponent.html");
const goalsContents = await getComponentByFile("./source/components/aboutme/GoalsComponent.html");
const softSkillsContents = await getComponentByFile("./source/components/aboutme/SoftSkillsComponent.html");