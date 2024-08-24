// {{MediaWiki:Usefulplacesjs}}
// <pre style="overflow:scroll"><nowiki>

// [[Main Page]] JS transform. Originally from [[Wikipedia:MediaWiki:Monobook.js]]/[[Wikipedia:MediaWiki:Common.js]] and may be further modified for local use.
function mainPageRenameNamespaceTab() {
    try {
        var Node = document.getElementById('ca-nstab-main').firstChild;
        if (Node.textContent) { // Per DOM Level 3
            Node.textContent = 'Main Page';
        } else if (Node.innerText) { // IE doesn't handle .textContent
            Node.innerText = 'Main Page';
        } else { // Fallback
            Node.replaceChild(Node.firstChild, document.createTextNode('Main Page'));
        }
    } catch (e) {
        // bailing out!
    }
}

if (wgTitle == 'Main Page' && (wgNamespaceNumber === 0 || wgNamespaceNumber == 1)) {
    addOnloadHook(mainPageRenameNamespaceTab);
}

function blRenameNamespaceTab() {
    try {
        var Node = document.getElementById('ca-nstab-project').firstChild;
        if (Node.textContent) { // Per DOM Level 3
            Node.textContent = 'Special';
        } else if (Node.innerText) { // IE doesn't handle .textContent
            Node.innerText = 'Special';
        } else { // Fallback
            Node.replaceChild(Node.firstChild, document.createTextNode('Special'));
        }
    } catch (e) {
        // bailing out!
    }
}

if (wgPageName == 'Inheriwiki:Title_Blacklist' && (wgNamespaceNumber == 4 || wgNamespaceNumber == 5)) {
    addOnloadHook(blRenameNamespaceTab);
}

// Set Search link to [[Special:Search]]. Retrieved from [[w:c:starwars:MediaWiki:Monobook.js]] and Splarka and further modified for local use.
$(function searchLink() {
    if ((document.getElementById('searchform')) && (document.getElementById('searchform').getElementsByTagName('a').length !== 0)) {
        document.getElementById('searchform').getElementsByTagName('a')[0].href = wgArticlePath.replace(/\$1/, 'Special:Search');
    }
});

/* Edit counter ([[User:GHe/editcount.js]]) from [[Wikipedia:User:Interiot/Tool2/code.js]] and further modified for local use.
if (document.title.indexOf('User:GHe/editcount.js') != -1) {
  document.write('<script type="text/javascript" src="' 
    + '//inheritance.wikia.com/index.php?title=User:GHe/editcount.js' 
    + '&action=raw&ctype=text/javascript&dontcountme=s"></script>'); }
*/

// *****************************************************************

function addLoadEvent(func) {
    if (window.addEventListener)
        window.addEventListener("load", func, false);
    else if (window.attachEvent)
        window.attachEvent("onload", func);
}

// Inserts user name into <span id="insertusername"></span> (from [[Uncyclopedia:MediaWiki:Uncyclopedia.js]])

$(function UserNameReplace() {
    if (typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
    for (var i = 0; UserName = document.getElementsByTagName("span")[i]; i++) {
        if ((document.getElementById('pt-userpage')) && (UserName.getAttribute('id') == "insertusername")) {
            UserName.innerHTML = wgUserName;
        }
    }
});

// *****************************************************************
// Ciencia Al Poder's patch against 
// toolbar duplication on 1.12a wikis
// *****************************************************************
// Deshabilitamos toolbar de wikibits. Está repetido
//if(window.mwSetupToolbar){
//  if(window.removeEventListener) window.removeEventListener('load',mwSetupToolbar,false);
//  else if(window.detachEvent) window.detachEvent('onload',mwSetupToolbar);
//}
// En caso de que el duplicado esté solucionado, no habrá toolbar. Si es así, lo restauramos.
//function setuptoolbardelayed(){
//  var toolbar = document.getElementById('toolbar');
//  if (toolbar.getElementsByTagName('img').length < 5 && window.mwSetupToolbar) mwSetupToolbar();
//}
//addOnloadHook(function(){
//  var toolbar = document.getElementById('toolbar');
//  if (toolbar) window.setTimeout(setuptoolbardelayed,2000);
//});
// Deshabilitamos Miniupload. Falla.
//addOnloadHook(function(){
//  window.mwWikiaUploadButton = function(){};
//});

// Custom JS toolbar buttons

if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/inheritance/images/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Insert text"
    };
}