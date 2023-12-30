async function getComponentByFile(filePath){
  return fetch(filePath).then((res) => (res.text()));
}

const aboutMe = document.getElementById("About-Me");
const hobbyOption = aboutMe.getElementsByClassName("option");

function ChangeContents(event, section){
  let content = {};
  if (section === document.getElementById("About-Me")){
    content = {
      "default": defaultContents,
      "hobbies": hobbyContents,
      "goals": goalsContents,
      "soft-skills": softSkillsContents,
      "technical-skills": technicalSkillsContents
    };
  }
  

  const sectionContent = section.getElementsByClassName("content")[0];
  event.target.value = event.target.getAttribute("value");
  sectionContent.innerHTML = content[event.target.value];
}

for (let i = 0; i < hobbyOption.length; i++){
  hobbyOption[i].addEventListener("click", (e) => {ChangeContents(e, aboutMe)});
}

window.ChangeContents = ChangeContents;

const defaultContents = aboutMe.getElementsByClassName("content")[0].innerHTML;
const hobbyContents = await getComponentByFile("./source/components/aboutme/HobbyComponent.html");
const goalsContents = await getComponentByFile("./source/components/aboutme/GoalsComponent.html");
const softSkillsContents = await getComponentByFile("./source/components/aboutme/SoftSkillsComponent.html");
const technicalSkillsContents = await getComponentByFile("./source/components/aboutme/TechnicalSkillsComponent.html");