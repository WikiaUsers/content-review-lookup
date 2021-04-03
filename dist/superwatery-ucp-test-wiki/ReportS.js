var spa = {
edittoken: mw.user.tokens.values.editToken,
namespace: mw.config.get('wgNamespaceNumber'),
pagename: mw.config.get('wgPageName'),
server: mw.config.get('wgServer'),
signature: '~~' + '~~',
language: mw.config.get('wgUserLanguage'),
username: mw.config.get('wgUserName')
};
 
 
// Add buttons 
if(spa.pagename === "Report:Spam") {
var buttonappend = '<a class="wikia-button" id="spam-submit" onclick="openFormSpam()">Report Spam</a>';
document.getElementById("lang-EN").innerHTML = buttonappend;
}
 
 
// This opens the form for the users to fill out
 
function openFormSpam() {
$.showCustomModal('Report Spam', '<form class="WikiaForm" method="" name="" id="spam"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Wiki Name</span><br><input id="wikiname" type="text" placeholder="soap Wiki" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Wiki URL</span><br><span style="color:gray">http://</span><input id="wikiurl" type="text" placeholder="Name BETWEEN http:// AND .wikia.com ---- Example: soap" style="width:364px"/><span style="color:gray">.wikia.com</span><br><span style="font-weight:bold">Spammer</span><br><input id="user" type="text" placeholder="User or IP (no links) ---- Example: Applemasterexpert" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Reason</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Add your comments or extra information here"></textarea><br><span id="br2" /></fieldset></form>', {
id: "requestWindow",
width: 650,
buttons: [{
id: "cancel",
message: "Cancel",
handler: function () {
cancelformSpam();
}
}, {
id: "submit",
defaultButton: true,
message: "Save",
handler: function () {
submitformSpam();
}
}]
});
}
 
// Closes the form
 
function cancelformSpam() {
$("#requestWindow").closeModal();
}
 
// Submits the form
 
function submitformSpam() {
console.log('Saving...');
var $form = $('#spam'),
wikiname = $form.find('#wikiname').val(),
url = $form.find('#wikiurl').val(),
user = $form.find('#user').val(),
comments = $form.find('#comment').val(),
page = '*Wiki: http://' + url + '.wikia.com\n*Spammer: http://' + url + '.wikia.com/wiki/Special:Contributions/' + encodeURIComponent(user.replace(/ /g, "_")) + '\n*Reason: ' + comments + '\n*Signature: ' + spa.signature + '';
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
alert('You forgot the spammer!');
return;
}
if ( url.match( /(\/| |%20|_)/ ) ) {
alert('Incorrectly entered the Wiki URL. Please do NOT copy/paste the URL, but just type in the suddomain (ie soap in http://soap.wikia.com/wiki/Report:Spam_filter_problems) Do NOT use spaces, use dashes (-) instead');
return;
}
console.log('Checking...');
 
// Ajax URL
var url = spa.server + '/api.php?action=edit&title=Report:Spam&section=new&sectiontitle=' + wikiname + '&text=' + encodeURIComponent(page) + '&summary=New+spam+report+(' + wikiname + ', ' + user + ')&token=' + encodeURIComponent(spa.edittoken);
console.log('Got the url: ',url);
 
$.post(url, function (r) {
console.log('Should be done now:',r);
cancelformSpam();
window.location.reload();
});
console.log('Sent request...');
}