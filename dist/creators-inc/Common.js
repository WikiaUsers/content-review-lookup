/* Any JavaScript here will be loaded for all users on every page load. */
var element = document.createElement("div");
create();

function showContent(title,width,height){
	element.style.display = "block";
    element.style.webkitTransition = "display 1s";
    element.style.MozTransition = "display 1s";
    element.style.opacity = "1";
    element.style.width = width;
    element.style.height = height;
    element.innerHTML = title;
    element.style.top = event.clientY + "px";
    element.style.left = event.clientX + "px";
    this.addEventListener("mouseout",hideContent);
    element.setAttribute
    ("onmouseover","element.style.opacity='1'");
    element.setAttribute
    ("onmouseout","element.style.opacity='0'");
}

function hideContent(){
    element.style.webkitTransition = "opacity 1s";
    element.style.MozTransition = "opacity 1s";
    element.style.opacity = "0";
    element.style.pointerEvents = "none";
    element.style.userSelect = "none";
}

function create(){
    document.body.appendChild(element);
    element.setAttribute("class","ws-box");
}