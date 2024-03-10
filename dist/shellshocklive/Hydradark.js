/* Any JavaScript here will be loaded for users using the Hydra Dark skin */


function shadeHEXColor(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}
function shadeRGBColor(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

//shade a hex color (positive percent to lighten, negative to darken)
//returns a hex string
function shade(color, percent){
    if (color.length > 7 ) return shadeRGBColor(color,percent);
    else return shadeHEXColor(color,percent);
}

/*
window.onload = function(){
    var weaponBoxes = document.getElementsByClassName("weapon-box");
    var i;
    for (i = 0; i < weaponBoxes.length; i++) {
        var box = weaponBoxes[i];
        var color = box.style.backgroundColor;
        box.style.background = "radial-gradient(circle at 50% 40%, "+color+", "+shade(color,-.5)+")";
        box.style.borderImage = "linear-gradient(to bottom, "+color+", "+shade(color,-.5)+")";
    }
}
*/