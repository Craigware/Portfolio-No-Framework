import { Vector2 } from "./bouncyballs.js";

export function GenerateHeroGrid(element, cellAmount){
  let cellSize = 100 / cellAmount;

  if (element.innerHTML !== undefined) { element.innerHTML = ""; }
  const offsets = new Vector2(1,1);
  if(element.clientHeight > element.clientWidth){
    offsets.x = element.clientHeight / element.clientWidth;
  } else {
    offsets.y = element.clientWidth / element.clientHeight;
  }

  for (let i = 0; i < cellAmount; i++){
    const gridLine = document.createElement("div")
    gridLine.classList.add("gridLine");
    element.appendChild(gridLine);
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
    element.appendChild(gridLine);
    gridLine.style.cssText = `
      width: 100%;
      height: 1px;
      background-color: white;
      bottom: ${i * cellSize * offsets.y}%;
      z-index: 0;
    `;
  }
}