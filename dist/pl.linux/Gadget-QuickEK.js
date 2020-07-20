// QuickEK ver 2.0
// Autor: [[u:Dominiol]]
// Źródło oryginału - [[w:c:nonsensopedia:User:Dominiol/QuickEK.js]]
function showEKButton() {addPortletLink('p-cactions', 'javascript:showPanel()', 'EK');}
if($('#ca-edit').length) $(document).ready(showEKButton);
function showPanel() {
if($("#ek-window").length) $("#ek-window").dialog("open");
else $('<div title="Wstawienie EK" id="ek-window"><input type="text" id="ek-reason" name="ekreason" placeholder="Uzasadnienie"><br />(Możesz pozostawić uzasadnienie puste.)</div>').css({textAlign:"center"}).dialog({minHeight:"auto",resizable:!1,show:{effect:"fade",duration:250},hide:{effect:"fade",duration:250},buttons:[{text:"Wstaw EK",click:ek},{text:"Anuluj",click:function(){$("#ek-window").dialog("close");}}]});
}
function ek() {
var reason = ($('#ek-reason').val()!='')?$('#ek-reason').val():!1,
api = new mw.Api();
$("#ek-window").dialog({title:"Chwileczkę..."});
api.post({
format: 'json',
action: 'edit',
nocreate: '',
title: mw.config.get('wgPageName'),
prependtext: '{{'+'EK'+(reason?'|'+reason:'')+'}}',
summary: 'Oddano do natychmiastowej kasacji'+(reason?', powód:'+reason:' bez powodu'),
token: mw.user.tokens.get('editToken')
})
.done(function(data) {$("#ek-window").dialog("close");window.location.reload();})
.fail(function(error) {console.log(error);});
}