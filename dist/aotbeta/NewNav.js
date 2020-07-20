console.log('AoT Wiki NavBar v1.0');

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById('globalNavigation').style.top = '0';
  } else {
    document.getElementById('globalNavigation').style.top = '-50px';
  }
  prevScrollpos = currentScrollPos;
};