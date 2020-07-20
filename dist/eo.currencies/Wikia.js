/*<pre><nowiki>*/
$(document).ready(function()
{
	// Restaŭras normala alŝuto formo ekde la ŝprucfenestron unu ignoras fonto kaj licenco politiko. Prenita de http://starwars.wikia.com/wiki/MediaWiki:Wikia.js.
	$('a.wikia-button.upphotos').unbind('click',UploadPhotos.showDialog);
});
 
ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20111230181004/currencytest/images/d/de/Ajax-loader.gif';
AjaxRCRefreshText = 'Aŭtomate refreŝigi';
AjaxRCRefreshHoverText = 'Aŭtomate refreŝigi la paĝon';
ajaxPages = ["Speciala:Lastaj_ŝanĝoj","Speciala:WikiActivity","Speciala:Novaj_bildoj","Speciala:Novaj_paĝoj"];
importScriptPage('AjaxRC/code.js', 'dev');
 
// Tutmonda serĉo
 
$('#mw-search-top-table').append('<input name="crossWikiaSearch" type="checkbox" value="1" id="crossWikiaSearch" /><span id="crossWikiaLabel" style="font-size:xx-small">Tutmonda serĉo</span>');
 
/*</nowiki></pre>*/