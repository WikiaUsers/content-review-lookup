/*Quick image licence - contains the most commonly used licencing criteria*/
if (wgUserGroups.indexOf('autoconfirmed') != -1) {
function QLicenceUI() {
	var options = {
                ' ': 'Select a licence',
		'==Licencing==\n{{Fairuse}}': 'This is used in a way that qualifies as fair use under US law',
		'==Licencing==\n{{Self}}': 'This was created by the uploader',
                '==Licencing==\n{{From Wikimedia}}': 'This is from Wikipedia or another Wikimedia project',
                '==Licencing==\n{{cc-by-sa-3.0}}': 'This is licenced under Creative Commons Attribution 3.0 (free licence)',
                '==Licencing==\n{{CC-BY-SA}}': 'This is licenced under Creative Commons Attribution-Share Alike Licence',
                '==Licencing==\n{{Other free}}': 'This is licenced under another free licence',
                '==Licencing==\n{{Copyrighted by Fandom}}': 'This is part of the interface on a wiki hosted by Fandom',
                '==Licencing==\n{{PD}}': 'This is in the public domain',
		'==Licencing==\n{{Permission}}': 'This is copyrighted, but use is permitted by the copyright holder',
                '==Licencing==\n{{No licence}}': 'Licence unknown'
		};
	var optstr = '';
	for (var i in options ) {
		if ( options.hasOwnProperty( i ) ) {
			optstr += '<option value="' + i + '" style="text-align:left;padding-bottom:10px;">' + options[i] + '</option>';
		}
	}
 
	var html = '<p style="text-align:left;"><select id="QLicenceSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Add licence</a>';
	if($('#LicencedFile').length || $('#Licencing').length) {
		html += '&nbsp;<span style="color:#008000; font-weight:bold; text-align:left;">This page has a licence template.</span> (<a href="https://csydes.fandom.com/wiki/Help:Quick_licence">help</a>)</p>';
	} else {
		html += '&nbsp;<span style="color:#ff0000; font-weight:bold; text-align:left;">This page does not have a licence template! Consider adding one.</span> (<a href="https://csydes.fandom.com/wiki/Help:Quick_licence">help</a>)</p>';
	}
	$(html).insertBefore('#WikiaMainContent');
	$('#aSubmit').click( function(event) {
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		$.post("/api.php", {action: "edit", title: mw.config.get("wgPageName"), token: mw.user.tokens.values.editToken, bot: true, appendtext: $("#QLicenceSelect").val(), summary: "Adding licence template using [[Help:Quick licence|Quick licence]]"}, function (result) {
			window.location = wgServer + '/index.php?title=' + mw.config.get("wgPageName") + '&action=purge';
		});
	});
}
 
if (mw.config.get('wgNamespaceIds').file === mw.config.get('wgNamespaceNumber') && mw.config.get('wgAction') === 'view' && !window.QLicenceLoaded) {
    window.QLicenceLoaded = true;
    addOnloadHook(QLicenceUI);
}
}
//