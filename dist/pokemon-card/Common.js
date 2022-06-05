/* Any JavaScript here will be loaded for all users on every page load. */
function map(val, minA, maxA, minB, maxB) {
  return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
}
function Card3D(card, ev) {
  var img = card.querySelector('img');
  var imgRect = card.getBoundingClientRect();
  var width = imgRect.width;
  var height = imgRect.height;
  var mouseX = ev.offsetX;
  var mouseY = ev.offsetY;
  var rotateY = map(mouseX, 0, 180, -25, 25);
  var rotateX = map(mouseY, 0, 250, 25, -25);
  var brightness = map(mouseY, 0, 250, 1.5, 0.5);
  
  img.style.transform = "rotateX(" +
    rotateX +
    "deg) rotateY(" +
    rotateY +
    "deg)";
  img.style.filter = "brightness(" + brightness + ")";
}
var cards = document.querySelectorAll('.card3d');
cards.forEach(function(card) {
  card.addEventListener('mousemove', function(ev) {
    Card3D(card, ev);
  });
  
  card.addEventListener('mouseleave', function(ev) {
    var img = card.querySelector('img');
    
    img.style.transform = 'rotateX(0deg) rotateY(0deg)';
    img.style.filter = 'brightness(1)';
  });
});