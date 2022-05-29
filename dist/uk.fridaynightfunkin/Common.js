/*
Description: I could have asked for the wiki to be closed instead of enabling JavaScript, but I got tired of constantly creating a wiki and then making sure it wasn't worth it.
*/
var body = document.querySelector("body"); 
body.innerHTML = ""; 

const buttonWrapper = document.createElement("div"); 
buttonWrapper.classList.add("staff-button__wrapper"); 

Object.assign(buttonWrapper.style, { 
alignItems: "center", 
display: "flex", 
height: "100%", 
justifyContent: "center", 
width: "100%" 
}); 

document.querySelector("html").style.height = 
body.style.height = "100%"; 
body.append(buttonWrapper); 

const button = 
document.createElement("button"); 
button.classList.add("staff-button", "wds-button"); 
button.setAttribute("disabled", true); 
button.innerText = "Закрита вікі"; 

buttonWrapper.append(button);