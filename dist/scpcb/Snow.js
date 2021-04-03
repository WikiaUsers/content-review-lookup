function makeItSnow() {
    for (i=0;i<50;i++) {
        setTimeout(function(){replaceSnow(null)},Math.random()*10000);
    }
}

function replaceSnow(domObj) {
    if (domObj) { document.body.removeChild(domObj); }
    newObj = document.createElement("div");
    newSize = (Math.floor(Math.random()*10)+5);
    newObj.style.borderRadius = (newSize/2)+"px";
    newObj.style.width = newSize+"px"; newObj.style.height = newSize+"px";
    newDuration = (Math.floor(Math.random()*10)+5);
    newObj.style.animationDuration = newDuration+"s";
    newLeft = (Math.floor(Math.random()*180)-80);
    newObj.style.left = newLeft+"%";
    newObj.style.position = "fixed";
    newObj.className = "snowparticle1";
    document.body.appendChild(newObj);
    setTimeout(replaceSnow,newDuration*1000,newObj);
}
makeItSnow();