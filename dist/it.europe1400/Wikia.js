// Implement importScriptPage (it is stupidly not implemented in Oasis so we have to do it manually).
function importScriptPage (page, server) {
var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g,'_')).replace('%2F','/').replace('%3A',':') + '&action=raw&ctype=text/javascript';
if (typeof server == "string") url = (server.indexOf('://') == -1)?'http://' + server + '.wikia.com' + url:server + url;
return importScriptURI(url);
}

// Patching in changes to table sorting and alt rows.
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

// Remove the "Featured on" links on File: / Image: description page
$(function() {
if (wgNamespaceNumber == 6) $("#file").html($("#file").html().replace(/<br>.*<br>/i,"<br>"));
});

// Make it so that when adding a new image you can not click "Upload" until you choose a license first.
function requireImageLicense() {
if (wgPageName == "Special:Upload" && getParamValue("wpDestFile") == null) {
$("[name=wpUpload]").not("#wpUpload").attr("disabled","true");
$("#wpLicense").change(function () {
if ($("#wpLicense").val()) {
$("[name=wpUpload]").removeAttr("disabled");
} else {
$("[name=wpUpload]").attr("disabled","true");
}
});
}
}
addOnloadHook(requireImageLicense);

// ShowHide2 function for collabsible tables and navboxes.
importScriptPage('ShowHide2/code.js', 'dev');

// AJAX Recent Changes auto refresh - Courtesy of "Pcj" of WoWWiki.
importScriptPage('AjaxRC/code.js', 'dev');

// Duplicate images list - Courtesy of "Pcj" of WoWWiki.
importScriptPage('DupImageList/code.js', 'dev');