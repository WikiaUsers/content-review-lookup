/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
var splashesBox = document.querySelector("#random-splashes");
if(splashesBox){
  var splashes = splashesBox.querySelectorAll(".random-splash");
  var randIndx = Math.floor(Math.random()*splashes.length);
  splashes[randIndx].style.display="block";
}