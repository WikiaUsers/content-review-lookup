/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to soap by VegaDark
@ License: CC-BY-NC-SA
*/
 
 
// Variables for later on
// Keep these in an object for organization
var van = {
edittoken: mw.user.tokens.values.editToken,
namespace: mw.config.get('wgNamespaceNumber'),
pagename: mw.config.get('wgPageName'),
server: mw.config.get('wgServer'),
signature: '~~' + '~~',
language: mw.config.get('wgUserLanguage'),
username: mw.config.get('wgUserName')
};
 
 
// Add buttons 
if(van.pagename === "Report:Vandalism") {
var buttonappend = '<a class="wikia-button" id="vandalism-submit" onclick="openFormVandalism()">Report Vandalism</a>';
document.getElementById("lang-EN").innerHTML = buttonappend;
}
 
 
// This opens the form for the users to fill out
 
function openFormVandalism() {
$.showCustomModal('Report Vandalism', '<form class="WikiaForm" method="" name="" id="vandalism"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Wiki Name</span><br><input id="wikiname" type="text" placeholder="Example Wiki" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Wiki URL</span><br><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="Name BETWEEN http:// AND .wikia.com ---- Example: example" style="width:364px"/><span style="color:gray">.wikia.com</span><br><span style="font-weight:bold">Vandal</span><br><input id="user" type="text" placeholder="User or IP (no links) ---- Example: Rappy 4187" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Reason</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Add your comments or extra information here"></textarea><br><span id="br2" /></fieldset></form>', {
id: "requestWindow",
width: 650,
buttons: [{
id: "cancel",
message: "Cancel",
handler: function () {
cancelformVandalism();
}
}, {
id: "submit",
defaultButton: true,
message: "Save",
handler: function () {
submitformVandalism();
}
}]
});
}
 
// Closes the form
 
function cancelformVandalism() {
$("#requestWindow").closeModal();
}
 
// Submits the form
 
function submitformVandalism() {
console.log('Saving...');
var $form = $('#vandalism'),
wikiname = $form.find('#wikiname').val(),
url = $form.find('#wikiurl').val(),
user = $form.find('#user').val(),
comments = $form.find('#comment').val(),
page = '*Wiki: http://' + url + '.wikia.com\n*Vandal: http://' + url + '.wikia.com/wiki/Special:Contributions/' + encodeURIComponent(user.replace(/ /g, "_")) + '\n*Reason: ' + comments + '\n*Signature: ' + van.signature + '';
// If url or header is blank, return alerts
if (!url) {
alert('You forgot the wiki!');
return;
}
if (!wikiname) {
alert('You forgot the wikiname!');
return;
}
if (!user) {
alert('You forgot the vandal!');
return;
}
if ( url.match( /(\/| |%20|_)/ ) ) {
alert('Incorrectly entered the Wiki URL. Please do NOT copy/paste the URL, but just type in the suddomain (e.g. soap in http://soap.wikia.com/wiki/Report:Spam_filter_problems) Do NOT use spaces, use dashes (-) instead');
return;
}
console.log('Checking...');
 
// Ajax URL
var url = van.server + '/api.php?action=edit&title=Report:Vandalism&section=new&sectiontitle=' + wikiname + '&text=' + encodeURIComponent(page) + '&summary=New+vandalism+report+(' + wikiname + ', ' + user + ')&token=' + encodeURIComponent(van.edittoken);
console.log('Got the url: ',url);
 
$.post(url, function (r) {
console.log('Should be done now:',r);
cancelformVandalism();
window.location.reload();
});
console.log('Sent request...');
}