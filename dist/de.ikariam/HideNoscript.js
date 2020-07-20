 function hideNoscript() {
 	var noscriptElement = document.getElementsByClassName('noscript');
 	
 	for(var i = 0; i < noscriptElement.length; i++) {
 		noscriptElement[i].parentNode.removeChild(noscriptElement[i]);
 	}
 }
 
 hideNoscript();