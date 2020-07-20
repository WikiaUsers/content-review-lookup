importScriptPage('SocialIcons/code.js','dev');
var SocialMediaButtonsNamespaces = [0, 6, 14, 500, 1201];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "light",
	buttonSize: "20px",
	wikiTwitterAccount: "arthoria_de"
};

//Damit tabber beim Klick auf einen Anker den Tab wechselt:
var tabberAnchorFix = function() {
	$(window).on( "hashchange", function() {
		var ank = location.hash.substring(1);
		if(ank) {
			var reg = new RegExp('id="'+ank+'"','i');
			var tabConts = document.getElementsByClassName("tabbertab");
			for(var i=0; i<tabConts.length; i++) {
				if(tabConts[i].innerHTML.match(reg)) {
					setTimeout( function() {
						document.getElementsByClassName("tabbernav")[0].childNodes[2*i].firstChild.click();
						setTimeout(function(){document.location=document.URL},10);
					},10);
					return;
				}
			}
		}
	});
	window.dispatchEvent(new CustomEvent("hashchange"));
}
$(function(){ //tabberAnchorFix darf erst ausgeführt werden, nachdem tabber geladen wurde
	var delay=1;
	var callFunc = function() {
		if(delay<20) {	//Nach spätestens 19 Sekunden sollte die Seite wohl geladen sein
			if(typeof(tabberObj)=="undefined") {
				setTimeout(callFunc, 100*delay);
				delay++;
			} else {
				tabberAnchorFix();
			}
		}
	}
	callFunc();
});


// Klickt alle [Ausklappen] oder [Einklappen] Elemente auf einer Seite an
// Dazu einfach ein div/span mit der Klasse sh-all einfügen
$(".sh-all").each(function(){
	var text1 = '&nbsp;[<a href="#">Alle Ausklappen</a>]&nbsp;';
	var text2 = '&nbsp;[<a href="#">Alle Einklappen</a>]&nbsp;';
	var tSwitch=true;
	this.innerHTML=(tSwitch?text1:text2);
	var toggle = function() {
		$('.'+(tSwitch?"mw-collapsible-toggle-collapsed":"mw-collapsible-toggle-expanded")).click();
		tSwitch = !tSwitch;
		this.innerHTML=(tSwitch?text1:text2);
	}
	this.addEventListener("click",toggle,false);
});