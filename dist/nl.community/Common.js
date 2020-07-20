importScriptPage('MediaWiki:AdoptionForm.js', 'nl.community');

/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */

/* JavaScript die hier wordt geplaatst heeft invloed op alle pagina's voor alle gebruikers */
var DOCHEAD = document.getElementsByTagName('HEAD')[0];

function createElement(tag,children,props){
var element = document.createElement(tag);
if (!(children instanceof Array)) children=[children];
for(var i=0;i<children.length;i++){
var child=children[i];
if (typeof child=='string') child=document.createTextNode(child);
if (child) element.appendChild(child);
}
if (typeof props=='object') {
for(var k in props){
switch (k) {
case 'styles':
var styles=props.styles;
for (var s in styles) element.style[s]=styles[s];
break;
case 'events':
var events=props.events;
for (var e in events) addHandler(element,e,events[e]);
break;
case 'class':
element.className=props[k];
break;
default:
element.setAttribute(k,props[k]);
}
}
}
return element;
}

function insertCSS(page) {
insertExternalCSS(wgScriptPath + '/index.php?title=' + encodeURIComponent(page.replace(/ /g, '_')) + '&action=raw&ctype=text/css');
}

function insertExternalCSS(sheetURL) {
var styleElem = document.createElement('style');
styleElem.setAttribute('type','text/css');
try {
styleElem.appendChild( document.createTextNode('@import "' + sheetURL + '";'));
} catch (el){ // a hack to fix problem with Internet Explorer
document.createStyleSheet(sheetURL);
}
DOCHEAD.appendChild(styleElem);
}

document.write('<script type="text/javascript" src="' + '/index.php?title=MediaWiki:Functions.js&action=raw&ctype=text/javascript&smaxage=18000"></script>');

// BEGIN Dynamic Navigation Bars (experimental) Script taken from Wikipedia.
// Test if an element has a certain class
// Description: Uses regular expressions and caching for better performance.

function setCookie(c_name,value,expiredays) {
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=");
if (c_start!=-1) { 
c_start=c_start + c_name.length+1;
c_end=document.cookie.indexOf(";",c_start);
if (c_end==-1) c_end=document.cookie.length;
return unescape(document.cookie.substring(c_start,c_end));
}
}
return "";
}

var hasClass = (function () {
var reCache = {};
return function (element, className) {
return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
};
})();
 
var autoCollapse = 2;
var collapseCaption = "verberg";
var expandCaption = "toon";
 
function collapseTable(tableIndex) {
var Button = document.getElementById("collapseButton" + tableIndex);
var Table = document.getElementById("collapsibleTable" + tableIndex);
if (!Table || !Button) return false;
var Rows = Table.rows;
if (Button.firstChild.data == collapseCaption) {
for (var i = 1; i < Rows.length; i++) Rows[i].style.display = "none";
setCookie("hideTable-" + wgArticleId + "-" + tableIndex,1,30);
Button.firstChild.data = expandCaption;
} else {
for (var i = 1; i < Rows.length; i++) Rows[i].style.display = Rows[0].style.display;
setCookie("hideTable-" + wgArticleId + "-" + tableIndex,0,30);  
Button.firstChild.data = collapseCaption;
}
}
 
function createCollapseButtons() {
var tableIndex = 0;
var NavigationBoxes = new Object();
var Tables = document.getElementsByTagName("table");
for (var i = 0; i < Tables.length; i++) {
if (hasClass(Tables[i], "collapsible")) {
// only add button and increment count if there is a header row to work with
var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
if (!HeaderRow) continue;
var Header = HeaderRow.getElementsByTagName("th")[0];
if (!Header) continue;
NavigationBoxes[tableIndex] = Tables[i];
Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
var Button = document.createElement("span");
var ButtonLink = document.createElement("a");
var ButtonText = document.createTextNode(collapseCaption);
Button.style.styleFloat = "right";
Button.style.cssFloat = "right";
Button.style.fontWeight = "normal";
Button.style.textAlign = "right";
Button.style.width = "6em";
ButtonLink.style.color = Header.style.color;
ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
ButtonLink.appendChild(ButtonText);
Button.appendChild(document.createTextNode("["));
Button.appendChild(ButtonLink);
Button.appendChild(document.createTextNode("]"));
Header.insertBefore(Button, Header.childNodes[0]);
tableIndex++;
}
}
 
for (var i = 0; i < tableIndex; i++) {
if (hasClass(NavigationBoxes[i], "collapsed") || (getCookie("hideTable-" + wgArticleId + "-" + i) == 1) || (tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse"))) collapseTable(i);
}
}

addOnloadHook(createCollapseButtons);


// Dynamic Navigation Bars
// Description: See [[Wikipedia:NavFrame]].
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
// shows and hides content and picture (if available) of navigation bars
// Parameter: indexNavigationBar: the index of navigation bar to be toggled

function toggleNavigationBar(indexNavigationBar) {
var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
if (!NavFrame || !NavToggle) return false; 

for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
if (hasClass(NavChild, 'NavPic')) NavChild.style.display = (NavToggle.firstChild.data == NavigationBarHide)?'none':'block';
if (hasClass(NavChild, 'NavContent')) NavChild.style.display = (NavToggle.firstChild.data == NavigationBarHide)?'none':'block';
}
NavToggle.firstChild.data = (NavToggle.firstChild.data == NavigationBarHide)?NavigationBarShow:NavigationBarHide;
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
var indexNavigationBar = 0;
// iterate over all < div >-elements 
var divs = document.getElementsByTagName("div");
for (var i=0; NavFrame = divs[i]; i++) {
// if found a navigation bar
if (hasClass(NavFrame, "NavFrame")) {
indexNavigationBar++;
var NavToggle = document.createElement("a");
NavToggle.className = 'NavToggle';
NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
var NavToggleText = document.createTextNode(NavigationBarHide);
for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
if (NavChild.style.display == 'none') {
NavToggleText = document.createTextNode(NavigationBarShow);
break;
}
}
}
NavToggle.appendChild(NavToggleText);
// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
for (var j=0; j < NavFrame.childNodes.length; j++) {
if (hasClass(NavFrame.childNodes[j], "NavHead")) NavFrame.childNodes[j].appendChild(NavToggle);
}
NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
}
}
}
 
addOnloadHook( createNavigationBarToggleButton );

// tooltips
if (getCookie("wiki-tiploader") != "no") document.write('<scr'+'ipt type="text/javascript" src="http://www.wowwiki.com/index.php?title=MediaWiki:Tooltips.js&action=raw&ctype=text/javascript&dontcountme=s&smaxage=18000"></scr'+'ipt>');

// edit summaries
// function fillEditSummaries() {
// var label = document.getElementById("wpSummaryLabel");
// if (label == null) return;
// var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
// comboString += "</select><br />";
// label.innerHTML = comboString + label.innerHTML;
// requestComboFill('stdSummaries', 'Template:Stdsummaries');
// }
// 
// function onStdSummaryChange() {
// var combo = document.getElementById("stdSummaries");
// var value = combo.options[combo.selectedIndex].value;
// if (value != "") document.getElementById("wpSummary").value = value;
// }
// 
// addOnloadHook(fillEditSummaries);

// extract a URL parameter from the current URL
// From wikipedia:User:Lupin/autoedit.js
// paramName  : the name of the parameter to extract

function getParamValue(paramName) {
var cmdRe=RegExp( '[&?]' + paramName + '=([^&]*)' );
var h = document.location.href;
var m=cmdRe.exec(h);
if (m) {
try {
return decodeURIComponent(m[1]);
} catch (someError) {}
}
return null;
}

// &withJS= URL parameter
// Allow to try custom scripts on the MediaWiki namespace without
// editing [[Special:Mypage/myskin.js]]
// from Wikipedia

{
var extraJS = getParamValue("withJS");
if (extraJS)
if (extraJS.match("^MediaWiki:[^&<>=%]*\.js$"))
importScript(extraJS);
else
alert(extraJS + " javascript not allowed to be loaded.");
}

// patching in changes to table sorting and alt rows
function changeTS() {
window['ts_alternate'] = function (table) {
var tableBodies = table.getElementsByTagName("tbody");
for (var i = 0; i < tableBodies.length; i++) {
var tableRows = tableBodies[i].getElementsByTagName("tr");
for (var j = 0; j < tableRows.length; j++) {
var oldClasses = tableRows[j].className.split(" ");
var newClassName = "";
for (var k = 0; k < oldClasses.length; k++) {
if (oldClasses[k] != "" && oldClasses[k] != "alt") newClassName += oldClasses[k] + " ";
}
tableRows[j].className = newClassName + (j%2 == 0?"alt":"");
}
}
}
}

addOnloadHook(changeTS);


 // 2.- Edit Menu
 // From http://www.sourcewatch.org/index.php?title=MediaWiki:Monobook.js#Edit_summary_stuff
 // Modify by [[User:Cizagna]]
 // Translated to Dutch by [[User:Tedjuh10]]
 
 // The original value of the edit summary field is stored here
 var editsummOriginalSummary = new String();
 
 // A global ref to the dropdown with canned edit summaries
 var editsummDropdown = null;
 
 function editsummInitialize() {
    var label = document.getElementById('wpSummaryLabel');
    if(label == null) return;
    label.firstChild.style.cssText = 'display:none';
    
    // Save the original value of the edit summary field
    editsummOriginalSummary = document.forms.editform.wpSummary.value;
    
    // For convenience, add a dropdown box with some canned edit
    // summaries to the form.
    
    var dropdown = document.createElement('select');
    dropdown.setAttribute('title', 'Standaard Samenvattingen')
    dropdown.style.cssText = 'margin-top:3px;';
    dropdown.onchange = new Function('editsummOnCannedSummarySelected()');
    
    addDropdownOption(dropdown,'','Veelgebruikte samenvattingsopties');
    addDropdownOption(dropdown,'','Verbeteren:');
    addDropdownOption(dropdown,'Schoonmaak','— Schoonmaak');
    addDropdownOption(dropdown,'Geformatteerd','— Geformatteerd');
    addDropdownOption(dropdown,'HTML verbeterd','— HTML verbeterd');
    addDropdownOption(dropdown,'Wikificatie','— Wikificatie');
    addDropdownOption(dropdown,'','Inhoud:');
    addDropdownOption(dropdown,'Pagina gemaakt','— Pagina gemaakt');
    addDropdownOption(dropdown,'Geupdate met nieuwe informatie','— Geupdate met nieuwe informatie');
    addDropdownOption(dropdown,'Uitgebreid','— Uitgebreid');
    addDropdownOption(dropdown,'Herschreven','— Herschreven');
    addDropdownOption(dropdown,'Spelling/Grammatica verbeterd','— Spelling/Grammatica verbeterd');
    addDropdownOption(dropdown,'Redirect gemaakt','— Redirect gemaakt');
    addDropdownOption(dropdown,'','Verwijdering/Terugdraaien:');
    addDropdownOption(dropdown,'Vandalisme teruggedraaid','— Vandalisme teruggedraaid');
    addDropdownOption(dropdown,'-Ongeverifeerde informatie verwijderd','— Ongeverifeerde informatie verwijderd');
    addDropdownOption(dropdown,'','Sjablonen:');
    addDropdownOption(dropdown,'Infobox(en) toegevoegd','— Infobox(en) toegevoegd');
    addDropdownOption(dropdown,'Sjabloon gebruik verbeterd','— Sjabloon gebruik verbeterd');
    addDropdownOption(dropdown,'Sjablo(o)n(en) toegevoegd','— Sjablo(o)n(en) toegevoegd');
    addDropdownOption(dropdown,'','Categorieën:');
    addDropdownOption(dropdown,'Categorie(ën) toegevoegd','— Categorie(ën) toegevoegd');
    addDropdownOption(dropdown,'Categorie gebruik verbeterd','— Categorie gebruik verbeterd');
    addDropdownOption(dropdown,'Categorie(ën) verwijderd','— Categorie(ën) verwijderd');
    addDropdownOption(dropdown,'Op alfabet gezet ""','— Op alfabet gezet ');
    addDropdownOption(dropdown,'','Overleg pagina:');
    addDropdownOption(dropdown,'Bericht achtergelaten','— Bericht achtergelaten');
    addDropdownOption(dropdown,'Vraag gesteld','— Vraag gesteld');
    addDropdownOption(dropdown,'Antwoord gegeven op vraag','— Antwoord gegeven op vraag');
    /*addDropdownOption(dropdown,'','');
    addDropdownOption(dropdown,'','');*/
    
    label.appendChild(dropdown);
    
    // Store a global ref to it
    editsummDropdown = dropdown;
    
    var onMonaco = skin == 'monaco' ? true : false;
    if(onMonaco) {
        // even thougth this can be configure by MediaWiki pages its better this way so it only affects monaco pages
        document.getElementById('wpMinoredit').nextSibling.nextSibling.innerHTML = 'Kleine bewerking';
        document.getElementById('wpWatchthis').nextSibling.nextSibling.innerHTML = 'Volg deze pagina';
    }else {
        var wpSumamaryCssSize  = document.getElementById('wpSummary');
        wpSumamaryCssSize.style.cssText = 'width:70%'; //FF
        wpSumamaryCssSize.size = '60'; //IE
    }
 }
 // Adds options to the drop down menu on "editsummInitialize()"
 function addDropdownOption(dropdown,optionValue,optionText) {
    var option = document.createElement('option');
    option.setAttribute('value', optionValue)
    option.appendChild(document.createTextNode(optionText));
    dropdown.appendChild(option);
 }
 // There's a cross-browser issue when accessing the selected text:
 // *In Firefox you can use: selectObj.value
 // *In IE, you have to use: selectObj.options[selectObj.selectedIndex].text
 // *The latter method also works in Firefox
 function editsummOnCannedSummarySelected() {
    var newSummary = editsummOriginalSummary;
    if(newSummary.length!=0) newSummary += " - ";
    
    var idx = editsummDropdown.selectedIndex;
    var canned = editsummDropdown.options[idx].value;
    newSummary += canned;
    document.forms.editform.wpSummary.value = newSummary;
 }
  addOnloadHook(editsummInitialize);

/*
$("#wikilist-dpl li a").each(function() {
   var link = $(this)
   var name = link.attr('href').slice(6);
 
   var div = $('<div/>').hide().text(name)
 
   $(this).after(div)
   div.load("http://nl.community.wikia.com/wiki/" + name + "?action=render", null, function() {
    var box = $(this).find('.wikia-infobox')
    if(!box.length) { link.closest('li').remove() } else { 
	
	link.replaceWith(box); box.unwrap(); 
	
	}
    $(this).remove();
	$('.nohub').remove();
	$('.wikia-infobox img').css('width', '150px');
	$('.wikia-infobox img').removeAttr('width').removeAttr('height').attr('hubbox');
	$('.wikia-infobox').css({
		'display': 'inline-table',
		'width': '155px',
		'margin': '5px',
		'font-size': '90%',
		'padding': '0px'
	});
	$('.hubbox').each(function() {
		articlenumber = $(this).find('.articlenumber').text();
		wikiurl = $(this).find('.wikiurl').text();
		
		$(this).find('.articlebox').append(articlenumber);
		$(this).find('.articlenumber').remove();
		
		$(this).find('th:last-child').html('<a href="' + wikiurl + '">BEZOEK DE WIKI</a>');
	});
   });
}); */

$(function() {
    if ($("body").hasClass("ns-4")) {
        importScriptPage('MediaWiki:HubLoad.js', 'nl.community');
    }
});

/* temp fix for new project namespace alias */

if (wgPageName.indexOf('Centrale_Wikia_community:') > -1) {
    window.location = 'http://nl.community.wikia.com/wiki/Centrale_community:' + wgPageName.replace(/Centrale_Wikia_community\:/g, '')
}