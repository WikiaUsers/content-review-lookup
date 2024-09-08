/* Jedes JavaScript hier wird für alle Benutzer für jede Seite geladen. */

/* Variablen für das Skript AjaxRC (siehe http://dev.wikia.com/wiki/AjaxRC) */

window.AjaxRCRefreshText = 'Auto-Aktualisierung';
window.AjaxRCRefreshHoverText = 'automatische Aktualisierung ohne Neuladen der kompletten Seite';
window.ajaxPages = ["Spezial:Letzte_Änderungen", "Spezial:WikiActivity", "Spezial:Beobachtungsliste"];
importScriptPage('AjaxRC/code.js', 'dev');


///////////////////////////////////////////////////////////////////////////////////////////////////////////
 // Import [[MediaWiki:Onlyifuploading.js]] 
 

/* <pre><nowiki> */

function showEras(className)
{
    if(typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;

    var titleDiv = document.getElementById(className);

    if(titleDiv == null || titleDiv == undefined)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}

function getFirstHeading()
{
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements != null && elements.length > 0) ? elements[0] : null;
}

function moveRating()
{
    var elements = getElementsByClass('ratings-top', document.getElementById('content'), 'div');
    if(elements[0] == null || elements[0] == undefined)
        return;
    var cloneNode = elements[0].cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}


/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
function getElementsByClass(searchClass, node, tag)
{
	var classElements = new Array();

	if(node == null)
		node = document;

	if(tag == null)
		tag = '*';

	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var tester = new ClassTester(searchClass);

	for(i = 0, j = 0; i < elsLen; i++)
	{
		if(tester.isMatch(els[i]))
		{
			classElements[j] = els[i];
			j++;
		}
	}
    
	return classElements;
}

function ClassTester(className)
{
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function(element)
{
    return this.regex.test(element.className);
}
/*
    end getElementsByClass
*/

moveRating();
showEras('title-linktabs');
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/* Any JavaScript here will be loaded for all users on every page load. */
importScriptPage('ShowHide/code.js', 'dev')