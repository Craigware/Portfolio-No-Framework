import { Vector2 } from "./bouncyballs.js";

export let cellAmount = 10;

export function GenerateHeroGrid(cellAmount){
  const gridContainer = document.getElementById("Hero-Grid");
  let cellSize = 100 / cellAmount;

  gridContainer.innerHTML = ""
  const offsets = new Vector2(1,1);
  if(gridContainer.clientHeight > gridContainer.clientWidth){
    offsets.x = gridContainer.clientHeight / gridContainer.clientWidth;
  } else {
    offsets.y = gridContainer.clientWidth / gridContainer.clientHeight;
  }

  for (let i = 0; i < cellAmount; i++){
    const gridLine = document.createElement("div")
    gridLine.classList.add("gridLine");
    gridContainer.appendChild(gridLine);
    gridLine.style.cssText = `
      width: 1px;
      height: 100%;
      background-color: white;
      right: ${i * cellSize * offsets.x}%;
      z-index: 0;
    `;
  }

  for (let i = 0; i < cellAmount; i++){
    const gridLine = document.createElement("div")
    gridLine.classList.add("gridLine");
    gridContainer.appendChild(gridLine);
    gridLine.style.cssText = `
      width: 100%;
      height: 1px;
      background-color: white;
      bottom: ${i * cellSize * offsets.y}%;
      z-index: 0;
    `;
  }
}

GenerateHeroGrid(cellAmount);

