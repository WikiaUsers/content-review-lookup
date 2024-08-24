// importScript('MediaWiki:Chat.js');

/* Any JavaScript here will be loaded for all users on every page load. */

/* webchat freenode
function onloadhookcustom() {
  var replace = document.getElementById("chat");
  if (null != replace) {
    replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=#wikia-es" width="900" height="550"></iframe>';
     if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
    else window.onbeforeunload = confirmexitjrchat;

  }
  //alert(document.getElementById("chat").innerHTML);

}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
*/

/* java
function onloadhookcustom() {
  var replace = document.getElementById("yugichat");
  if (null != replace) {

    replace.innerHTML='<applet width="990" height="550" code="IRCApplet.class" archive="irc.jar,pixx.jar"  codebase="http://java.freenode.net/freenode/pjirc"><param name="nick" value="wikian"/><param name="alternatenick" value="Yugi???"/><param name="name" value="Chat Yu-Gi-Oh!"/><param name="host" value="irc.freenode.net"/><param name="gui" value="pixx"/><param name="command1" value="/join #wikia-es"/><param name="command2" value="/clear"/><param name="quitmessage" value="Wikia"/><param name="pixx:timestamp" value="true"/><param name="pixx:nickfield" value="true"/><param name="style:highlightlinks" value="true"/><param name="pixx:setfontonstyle" value="true"/><param name="pixx:styleselector" value="true"/><param name="style:link" value=":link: http://img148.imageshack.us/img148/6707/copyoflinkkm3.png)"> <h1>No java support</h1><p><font color="green">Lo sentimos, pero necesitas Java 1.4.x-activado en tu navegador para usar el Chat de Wikia-es!</font></p></applet>';
  }
}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);
*/

/*
----------------------------------------
EDITAR JUSTO A LA DERECHA DE LOS TÍTULOS
----------------------------------------
*/
function moveEditsection() {
    if (typeof oldEditsectionLinks == 'undefined' || oldEditsectionLinks == false) {
        var spans = document.getElementsByTagName("span");
        for(var i = 0; i < spans.length; i++) {
            if(spans[i].className == "editsection") {
                spans[i].style.fontSize = "small";
                spans[i].style.fontWeight = "normal";
                spans[i].style.cssFloat = "none";
                spans[i].style.marginLeft = "0px";
                spans[i].parentNode.appendChild(document.createTextNode(" "));
                spans[i].parentNode.appendChild(spans[i]);
            }
        }
    }
}

addOnloadHook(moveEditsection);

/*
-----------------------------------------
CÓDIGO PARA PLEGADO/DESPLEGADO DE BLOQUES
-----------------------------------------
*/

var NavigationBarHide = '[Ocultar]';
var NavigationBarShow = '[Mostrar]';

function toggleNavigationBar(indexNavigationBar)
{
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    // if shown now
    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'none';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarShow;
            }
        }

    // if hidden now
    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
                var NavChild = NavFrame.firstChild;
                NavChild != null;
                NavChild = NavChild.nextSibling
            ) {
            if (NavChild.className == 'NavPic') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavContent') {
                NavChild.style.display = 'block';
            }
            if (NavChild.className == 'NavToggle') {
                NavChild.firstChild.data = NavigationBarHide;
            }
        }
    }
}

 // adds show/hide-button to navigation bars
 function createNavigationBarToggleButton()
 {
    var indexNavigationBar = 0;
    // iterate over all <div>-elements
    for(
            var i=0; 
            NavFrame = document.getElementsByTagName("div")[i]; 
            i++
        ) {
        // if found a navigation bar
        if (NavFrame.className == "NavFrame") {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode( NavigationBarShow );
            NavToggle.appendChild(NavToggleText);

            // add NavToggle-Button as first div-element 
            // in <div class="NavFrame">
            NavFrame.insertBefore(
                NavToggle,
                NavFrame.firstChild
            );
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }

    //Plegamos todas....
        for(
                var i=1; 
                i<=indexNavigationBar; 
                i++
        ) {
            toggleNavigationBar(i);
            toggleNavigationBar(i);
        }   
 }

addLoadHook(createNavigationBarToggleButton);



/*
-----------------------------------------------
REDEFINICIÓN DE ORDENACIÓN DE TABLAS "SORTABLE"
-----------------------------------------------
*/

function ts_dateToSortKey(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	if (date.length == 11) {
		switch (date.substr(3,3).toLowerCase()) {
			case "ene": var month = "01"; break;
			case "feb": var month = "02"; break;
			case "mar": var month = "03"; break;
			case "abr": var month = "04"; break;
			case "may": var month = "05"; break;
			case "jun": var month = "06"; break;
			case "jul": var month = "07"; break;
			case "ago": var month = "08"; break;
			case "sep": var month = "09"; break;
			case "oct": var month = "10"; break;
			case "nov": var month = "11"; break;
			case "dic": var month = "12"; break;
			// default: var month = "00";
		}
		return date.substr(7,4)+month+date.substr(0,2);
	} else if (date.length == 10) {
		if (ts_europeandate == false) {
			return date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
		} else {
			return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
		}
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
		if (ts_europeandate == true) {
			return yr+date.substr(3,2)+date.substr(0,2);
		} else {
			return yr+date.substr(0,2)+date.substr(3,2);
		}
	}
	return "00000000";
}

//Modificado por Sanbec en WP-es aplicando la solución de WP en sueco
//(Anteriormente parece que solo cambiaba un punto)
//EXPERIMENTAL: Añadido además para que ordene los porcentajes.
function ts_parseFloat(num) {
        if (!num) return 0;
        num = num.replace("%", "");
        num = num.replace(/\./g, "");
        num = num.replace(/,/, ".");
        num = parseFloat(num);
        return (isNaN(num) ? 0 : num);
}

//Modificación hecha por Sanbec en WP-es para que ordene alfabéticamente bien
// ignorando acentos y no se limite a ordenarlo según el código ASCII.
function ts_sort_caseinsensitive(a,b) {
var aa = a[1].toLowerCase();
var bb = b[1].toLowerCase();
return(aa.localeCompare(bb));
}


/* Wikimedia Player */ 
document.write('<script type="text/javascript" src="' 
+ '/w/index.php?title=MediaWiki:Wikimediaplayer.js'
+ '&action=raw&ctype=text/javascript&dontcountme=s&smaxage=3600"></script>');
 

/* WikiMiniAtlas [[User:Dschwen]] */
 
document.write('<script type="text/javascript" src="' 
+ 'http://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js' 
+ '&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400"></script>');

importScriptPage('MediaWiki:Expand.js', 'es.vegadark');