// Light Mode Related
const lightModeTheme = {
  "--highlight_color": "#ffff99",
  "--background_color": "white",
  "--text_color": "black",
};
const darkModeTheme = {
  "--highlight_color": "#99ccff",
  "--background_color": "black",
  "--text_color": "white",
};

export default function LightSwitch(){
  const lightSwitch = document.getElementById("Light-Switch");
  window.lightMode = !window.lightMode;

  if (window.lightMode){
    lightSwitch.style.left = "50%";

    for (let property in darkModeTheme) {
      document.documentElement.style.setProperty(property, darkModeTheme[property]);
    }
  } else {
    lightSwitch.style.left = "0";

    for (let property in lightModeTheme) {
      document.documentElement.style.setProperty(property, lightModeTheme[property]);
    }
  }
  return 0;
}
