import { Vector2 } from "./Generic.js";

export function GenerateHeroGrid(element, cellAmount){
  let cellSize = 100 / cellAmount;

  if (element.innerHTML !== undefined) { element.innerHTML = ""; }
  const offsets = new Vector2(1,1);
  if(element.clientHeight > element.clientWidth){
    offsets.x = element.clientHeight / element.clientWidth;
  } else {
    offsets.y = element.clientWidth / element.clientHeight;
    
  }

  let i = 0
  while (i * cellSize * offsets.x < 100){
    const gridLine = document.createElement("div")
    gridLine.classList.add("gridLine");
    element.appendChild(gridLine);
    gridLine.style.cssText = `
      width: 1px;
      height: 100%;
      background-color: var(--background_color);
      right: ${i * cellSize * offsets.x}%;
      z-index: 0;
    `;
    i++;
  }

  i = 0
  while (i * cellSize * offsets.y < 100){
    const gridLine = document.createElement("div")
    gridLine.classList.add("gridLine");
    element.appendChild(gridLine);
    gridLine.style.cssText = `
      width: 100%;
      height: 1px;
      background-color: var(--background_color);
      bottom: ${i * cellSize * offsets.y}%;
      z-index: 0;
    `;
    i++;
  }
}

const cellAmount = 25;
const grids = [
  document.getElementById("Hero-Grid"),
  document.getElementById("Projects-Grid"),
  document.getElementById("Resume-Grid")
]
addEventListener("resize", () => {
  for (let grid in grids){
    GenerateHeroGrid(grids[grid], cellAmount)
  }
})

for (let grid in grids){
    GenerateHeroGrid(grids[grid], cellAmount)
}