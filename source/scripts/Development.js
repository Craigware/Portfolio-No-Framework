// async function updateVisibilty(event){
//   if (event.target.tagName === "DIV" || event.target.tagName === "H3") {
//     let childrenVisibility;
//     let animationDelay = 2;
//     event.target.style.transition = `height ${animationDelay}s`
//     if (!event.target.currentVisibility){ 
//       console.log("!")
//       event.target.currentVisibility = true;
//       ballCreationFormContainer.style.height = "0%"; 
//       childrenVisibility = "hidden";
//     } else {
//       console.log("?")
//       event.target.currentVisibility = false;
//       ballCreationFormContainer.style.height = "auto";
    
//       childrenVisibility = "visible";
//     }
//   }
// }

// const ballCreationFormContainer = document.getElementById("Ball-Forms-Holder");
// ballCreationFormContainer.addEventListener("click", updateVisibilty)

// const technicalSkills = document.getElementById("About-Me-Skills");
// for(let i = 0; i < technicalSkills.children.length; i++){
//   const currentSelect = technicalSkills.children[i];
//   if (currentSelect.tagName === "H3"){
//     currentSelect.style.marginLeft = `calc(4rem + ${i + 1}rem)`;
//   }
// }
