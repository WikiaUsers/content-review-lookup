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
------------------
NOMBRE DEL USUARIO
------------------
*/

function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
  
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}

addOnloadHook(UserNameReplace);

/*
-------------------------------------
REDEFINICION DEL BOTÓN "SUBIR IMAGEN"
-------------------------------------
*/

function specialImageUpload(tagOpen, tagClose, sampleText)
{
    if ( document.getElementById('wpWatchthis') == null )
      loginBeforeUpload();
    else
    {
    	var re = /http:\/\/([^\/]*)\//g;
    	var matches = re.exec(window.location.href);
    	if ( !matches ) {
		// TAH: firefox bug: have to do it twice for it to work
		matches = re.exec(window.location.href);
	}
	var domain = matches[1];

    if (imageUploadDialog && imageUploadDialog.open && !imageUploadDialog.closed)
	  imageUploadDialog.close();

    	imageUploadDialog = window.open("http://" + domain + "/wiki/Special:Upload",
          "upload_file",
          "toolbar=no,location=no,top=0,left=0,menubar=0,scrollbars=yes,width=800"); 
    }
}

/*
-----------------------
REDEFINICIÓN DE TÍTULOS
-----------------------
*/

function rewriteTitle()
{
   if(typeof(SKIP_TITLE_REWRITE) != 'undefined' && SKIP_TITLE_REWRITE)
       return;

   var titleDiv = document.getElementById('title-meta');

   if(titleDiv == null || titleDiv == undefined)
       return;

   var cloneNode = titleDiv.cloneNode(true);
   var firstHeading = YAHOO.util.Dom.getElementsByClassName('firstHeading', 'h1', document.getElementById('content') )[0];
   var node = firstHeading.childNodes[0];

   // new, then old!
   firstHeading.replaceChild(cloneNode, node);
   cloneNode.style.display = "inline";

   var titleAlign = document.getElementById('title-align');
   firstHeading.style.textAlign = titleAlign.childNodes[0].nodeValue;
}

addOnloadHook(rewriteTitle, false);


/* Wikimedia Player 
Añade reproductor en la misma página.
*/ 

document.write('<script type="text/javascript" src="' 
+ '/w/index.php?title=MediaWiki:Wikimediaplayer.js'
+ '&action=raw&ctype=text/javascript&dontcountme=s&smaxage=3600"></script>');
 
 
/* WikiMiniAtlas */
 
document.write('<script type="text/javascript" src="' 
+ 'http://meta.wikimedia.org/w/index.php?title=MediaWiki:Wikiminiatlas.js' 
+ '&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400"></script>');

/* Eliminando discusión de foros e inhabilitando ediciones luego de cierto tiempo */

if(wgNamespaceNumber == 110) {
 
function disableOldForumEdit() {
	if( typeof( enableOldForumEdit ) != 'undefined' && enableOldForumEdit )
		return;
	if(!document.getElementById('old-forum-warning') ||
		 !document.getElementById('ca-edit') )
		return;
 
	if( skin == 'monaco' )
	{
		editLink = document.getElementById('ca-edit');
	}
	else if( skin == 'monobook' )
	{
		editLink = document.getElementById('ca-edit').firstChild;
	}
 
	editLink.removeAttribute('href', 0);
	editLink.removeAttribute('title', 0);
	editLink.style.color = 'gray';
	editLink.innerHTML = 'Archivado';
 
	$('span.editsection-upper').remove();
 
}
addOnloadHook( disableOldForumEdit );
}

/* Chat */
function onloadhookcustom() {
	if( skin == 'oasis' ) {
                 var replace = document.getElementById("ticochat");
                    if (null != replace) {
                      replace.innerHTML='<iframe src="http://qchat.rizon.net/?channels=Ticopedia&uio=Nz10cnVlJjk9MTEzJjExPXRydWU6c" width="670" height="550"></iframe>';
                    if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
                    else window.onbeforeunload = confirmexitjrchat;

                 }
        } else {
                 var replace = document.getElementById("ticochat");
                    if (null != replace) {
                      replace.innerHTML='<iframe src="http://qchat.rizon.net/?channels=Ticopedia&uio=Nz10cnVlJjk9MTEzJjExPXRydWU6c" width="900" height="550"></iframe>';
                    if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
                    else window.onbeforeunload = confirmexitjrchat;

                    }
        }
  //alert(document.getElementById("ticochat").innerHTML);

}

if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);