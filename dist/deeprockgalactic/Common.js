window.addEventListener('load', function(){
//***********************
//* Area Damage Link JS *
//***********************
    //Find all with AreaDamage Class, on click opens new tab on Area Damage Page
    var areaDamageDivs = document.getElementsByClassName("AreaDamage");
    if (areaDamageDivs !== null) {
	    for(var n = 0; n < areaDamageDivs.length; n++) {
	        areaDamageDivs[n].setAttribute("onclick","window.open('https://deeprockgalactic.gamepedia.com/Area_Damage', '_blank');");
	    }
    }
//***********************
//* Paint Job Viewer JS *
//***********************
    var hoverPaintJobJS = document.getElementsByClassName("PaintJob");
    var hoverFrameWorkJS = document.getElementsByClassName("FrameWork");
    if (hoverPaintJobJS === null || hoverFrameWorkJS === null ) {
    	return;
    }
    var PaintJob = "Stock";
    var FrameWork = "Stock";
    var Weapon = document.getElementById("Weapon");
    if (Weapon !== null) {
    	Weapon = Weapon.className;
    } else {
    	return;
    }
    var WeaponName = document.getElementById("WeaponName");
    if (WeaponName !== null) {
    	WeaponName = WeaponName.className;
    } else {
    	return;
    }
    var i;
    for (i = 0; i < hoverPaintJobJS.length; i++) {
      hoverPaintJobJS[i].addEventListener("mousedown", function( event ) {
      PaintJob = this.id;
    		document.getElementById("Name").innerHTML = WeaponName + ": " + FrameWork + " - "+ PaintJob;
        document.getElementById("Image").innerHTML = "File:Skin "+ Weapon + " " + FrameWork + " " + PaintJob +".png";
        }, false);
      hoverPaintJobJS[i].addEventListener("mouseover", function( event ) {
    		this.className += " Selected"
        }, false);
     	hoverPaintJobJS[i].addEventListener("mouseout", function( event ) {
        this.className = "PaintJob"
        }, false);
    }
    for (i = 0; i < hoverFrameWorkJS.length; i++) {
      hoverFrameWorkJS[i].addEventListener("mousedown", function( event ) {
      FrameWork = this.id;
    		document.getElementById("Name").innerHTML = WeaponName + ": " + FrameWork + " - "+ PaintJob;
        document.getElementById("Image").innerHTML = "File:Skin "+ Weapon + " " + FrameWork + " " + PaintJob +".png";
        }, false);
      hoverFrameWorkJS[i].addEventListener("mouseover", function( event ) {
    		this.className += " Selected"
        }, false);
     	hoverFrameWorkJS[i].addEventListener("mouseout", function( event ) {
        this.className = "FrameWork"
        }, false);
    }
}, false);
//***********
//* MathJax *
//***********
//Called in due to Math Extension being ... well completely & utterly broken for >2 months

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