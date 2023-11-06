import delay from "./timing.js";

// Alternating Job Title Related
export async function TypeWordEffect(element, word, typeSpeed=100){
  return new Promise(async (resolve) => {
    for (let i = 0; i < word.length; i++){
      element.innerHTML += word[i];
      await delay(typeSpeed)
    }
    let randomChance = Math.random();
    if (randomChance > 0.9){
      element.innerHTML += ".";
    }
    resolve(0);
  });
}

export function EraseWordEffect(element, word, typeSpeed=100, random=false){
  return new Promise(async (resolve) => {
    const wordStartIndex = element.innerHTML.indexOf(word)
    const wordEndIndex = wordStartIndex + word.length - 1;

    let randomChance;
    if (random){
      randomChance = Math.random();
    } else { randomChance = 1; }
    
    if (randomChance > 0.3){
      // 70% chance to create a backspacing effect
      for (let i = wordEndIndex; i >= wordStartIndex; i--){
        element.innerHTML = element.innerHTML.slice(0, i);
        await delay(typeSpeed);
      }
    } else {
      // 30% chance to create a highlight and delete effect
      const oldBackgroundColor = element.style.backgroundColor;
      element.style.backgroundColor = "var(--highlight_color)";
      await delay(typeSpeed * (word.length / 2));

      element.innerHTML = "";
      element.style.backgroundColor = oldBackgroundColor;
      await delay(typeSpeed * (word.length / 2));
    }
    resolve(0);
  });
}

export default function AlterJobTitle(typeSpeed, eraseSpeed, delayBetweenTitles){
  async function CycleThroughTitles(index, element, jobTitles, typeSpeed=100, eraseSpeed=100, delayBetweenTitles=4000) {
    const title = jobTitles[index];
    let previousTitle;

    // edge case if reaches end of array
    if (index === 0){
      previousTitle = jobTitles[jobTitles.length-1]
    } else {
      previousTitle = jobTitles[index-1];
    }

    if (element.innerHTML === ""){
      element.innerHTML = jobTitles[0];
      await delay(delayBetweenTitles);
    }

    await EraseWordEffect(element, previousTitle, eraseSpeed, true);
    await TypeWordEffect(element, title, typeSpeed);
    await delay(delayBetweenTitles);
    
    // edge case if reaches end of array
    if (index + 1 > jobTitles.length - 1){
      index = 0
    } else {
      index = index + 1;
    }

    CycleThroughTitles(index, element, jobTitles, typeSpeed, eraseSpeed, delayBetweenTitles);
  }

  const jobTitles = [
    "Software Engineer",
    "Front-End Developer",
    "Back-End Developer",
    "Programmer",
    "Web Developer",
    "Graphic Designer",
    "Game Designer",
    "Game Developer"
  ];
  const element = document.getElementById("Alternating-Job-Title");

  CycleThroughTitles(1, element, jobTitles, typeSpeed, eraseSpeed, delayBetweenTitles);
}

function Test(element){
  console.log("!");
  element.style.right = "100%";
  element.style.transform = "translate(50%, 0%)";
}
