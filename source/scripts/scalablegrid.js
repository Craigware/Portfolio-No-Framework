import { Vector2 } from "./bouncyballs.js";

export function GenerateHeroGrid(cellSize){
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
