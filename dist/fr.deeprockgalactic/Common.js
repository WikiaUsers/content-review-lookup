/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

//***********************
//* Area Damage Link JS *
//***********************
window.onload = function(){
    //Find all with AreaDamage Class, on click opens new tab on Area Damage Page
    var areaDamageDivs = document.getElementsByClassName("Dégâts de Zone");
    for(var n = 0; n < areaDamageDivs.length; n++) {
        areaDamageDivs[n].setAttribute("onclick","window.open('https://deeprockgalactic-fr.gamepedia.com/D%C3%A9g%C3%A2ts_de_Zone', '_blank');");
    }
}
//***********
//* MathJax *
//***********
loadScript("https://polyfill.io/v3/polyfill.min.js?features=es6");
loadScript("https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js");

function loadScript(url) {
   var script = document.createElement('script'), done = false;
   script.src = url;
   script.onload = script.onreadystatechange = function(){
     if ( !done && (!this.readyState ||
          this.readyState == "loaded" || this.readyState == "complete") ) {
       done = true;
    }
  };
  document.getElementsByTagName("head")[0].appendChild(script);
}