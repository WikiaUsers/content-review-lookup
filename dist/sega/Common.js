/* Any JavaScript here will be loaded for all users on every page load. */
/* Blip function */
function GetBlip(){
 var blip_elements = getElementsByClassName(document.getElementById('bodyContent'),'div','video_blip');
 for(var i = 0; i < blip_elements.length; i++){
  blip_elements[i].innerHTML = "<embed width=\""+ blip_elements[i].style.width + "\" height=\""+ blip_elements[i].style.height +"\" src=\""+ blip_elements[i].firstChild.href +"\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\"></embed>";
 }
}
GetBlip();

//Back To the Top
window.BackToTopModern = true;
window.BackToTopStart = 200;