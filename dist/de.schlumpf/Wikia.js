//=========================================================================================
// zusätzliche nutzbare Funktionen im Wiki 
//=========================================================================================

//----------------------------------------------------------------------------------------
// sfHover                                                                                 
//                                                                                         
// Folgende Funktion dient der Funktion eines Drop-Down Menues                             
// Richtet den Event-Handler ein wenn die Maus über ein <li>-Element geführt wird          
// Für Informationen siehe z.B. auch                                                       
// http://www.htmldog.com/articles/suckerfish/dropdowns/                                   
// http://www.alistapart.com/articles/dropdowns/                                           
// http://de.selfhtml.org/css/layouts/navigationsleisten.htm                                     
//---------------------------------------------------------------------------------------- 

sfHover = function() {
	var sfEls = document.getElementById("nav").getElementsByTagName("LI");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" sfhover";
		}// end function
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}// end function 
	}// end for 
}// end function 
if (window.attachEvent) window.attachEvent("onload", sfHover);

//---------------------------------------------------------------------------------------- 
// end sfHover                                                                             
//----------------------------------------------------------------------------------------