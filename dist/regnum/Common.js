/* Any JavaScript here will be loaded for all users on every page load. */

/*************************************************************/
/* sliders using jquery by User:Tierrie from Dragon Age Wiki */
/*************************************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );

//<source lang="javascript">

// Import script for World Map page
if(wgPageName === "Regnum_Online_Wiki:World_Map" && wgAction === "view") {
importScript("Project:Scripts/World_Map.js")
}

/**
* From http://fr.wikipedia.org/wiki/MediaWiki:Common.js
* For Template:Images
* Utilisation du modèle Modèle:Images
*/
function toggleImage(group, remindex, shwindex) {
document.getElementById("ImageGroupsGr"+group+"Im" +remindex).style.display="none";
document.getElementById("ImageGroupsGr"+group+"Im" +shwindex).style.display="inline";
}

function imageGroup(){
if (document.URL.match(/printable/g)) return;
var bc=document.getElementById("bodyContent");
if( !bc ) bc = document.getElementById("mw_contentholder");
if( !bc ) return;
var divs=bc.getElementsByTagName("div");
var i = 0, j = 0;
var units, search;
var currentimage;
var UnitNode;
for (i = 0; i < divs.length ; i++) {
if (divs[i].className != "ImageGroup") continue;
UnitNode=undefined;
search=divs[i].getElementsByTagName("div");
for (j = 0; j < search.length ; j++) {
if (search[j].className != "ImageGroupUnits") continue;
UnitNode=search[j];
break;
}
if (UnitNode==undefined) continue;
units=Array();
for (j = 0 ; j < UnitNode.childNodes.length ; j++ ) {
var temp = UnitNode.childNodes[j];
if (temp.className=="center") units.push(temp);
}
for (j = 0 ; j < units.length ; j++) {
currentimage=units[j];
currentimage.id="ImageGroupsGr"+i+"Im"+j;
var imghead = document.createElement("div");
var leftlink;
var rightlink;
if (j != 0) {
leftlink = document.createElement("a");
leftlink.href = "javascript:toggleImage("+i+","+j+","+(j-1)+");";
leftlink.innerHTML="◀";
} else {
leftlink = document.createElement("span");
leftlink.innerHTML="&nbsp;";
}
if (j != units.length - 1) {
rightlink = document.createElement("a");
rightlink.href = "javascript:toggleImage("+i+","+j+","+(j+1)+") ;";
rightlink.innerHTML="▶";
} else {
rightlink = document.createElement("span");
rightlink.innerHTML="&nbsp;";
}
var comment = document.createElement("tt");
comment.innerHTML = "("+ (j+1) + "/" + units.length + ")";
with(imghead) {
style.fontSize="110%";
style.fontweight="bold";
appendChild(leftlink);
appendChild(comment);
appendChild(rightlink);
}
currentimage.insertBefore(imghead,currentimage.childNodes[0]);
if (j != 0) currentimage.style.display="none";
}
}
}
addOnloadHook(imageGroup);

//</source>