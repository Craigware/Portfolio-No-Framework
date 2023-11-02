// Light Mode Related
export default function LightSwitch(){
  const lightSwitch = document.getElementById("Light-Switch")
  const status = lightSwitch.className.includes("light-mode");
  AlterAllElementsLightMode(!status);
  return 0;
}

function AlterAllElementsLightMode(lightsOn){
  let oldTag;
  let newTag;
  const pageElements = document.body.getElementsByTagName("*");

  if (lightsOn){
    // turns elements to light mode
    oldTag = "dark-mode";
    newTag = "light-mode";
  } else {
    // turns elements to dark mode
    oldTag = "light-mode";
    newTag = "dark-mode";
  }
  document.body.style.setProperty("--highlight_color", "red");
  for (let element in pageElements){
    try{
      pageElements[element].classList.add(newTag);
      pageElements[element].classList.remove(oldTag);
    } catch {}
  }

  return 0;
}