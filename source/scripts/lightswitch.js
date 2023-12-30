const themeVariables = {
  "--background-color": "",
  "--foreground-color": "",
  "--highlight-color": "",
  "--text-color": "",
  "--shadow-color": ""
};

const themes = [];

const lightModeTheme = {...themeVariables};
lightModeTheme["--background-color"] = "white";
lightModeTheme["--foreground-color"] = "lightblue";
lightModeTheme["--highlight-color"] = "#ffff99";
lightModeTheme["--text-color"] = "black";
lightModeTheme["--shadow-color"] = "";
themes.push(lightModeTheme);

const darkModeTheme = {...themeVariables};