/*
 * QLicense.js,
 * [originally] by User:Cakemix, decoded and formatted,
 * decoded, formatted, and shortened by Monchoman45,
 * translated by MarkosBoss.
 * fixed by Vuh
 */
if (wgNamespaceNumber == 6) {
	function QLicenseUI() {
		window.qapi = new APIQuery();
		var optstr = '';
		for (i in options) {
			optstr += '<option value="' + i + '" style="text-align:center;">' + options[i] + '</option>';
		}
 
		var html = '<p style="text-align:center;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Dodaj licencję</a> (jeżeli nie istnieje)';
		if (document.getElementById('LicensedFile') || document.getElementById('Copyright')) {
			html += '&nbsp;<span style="color:red; font-weight:bold; text-align:center;"></span></p>';
		} else {
			html += '&nbsp;<span style="color:green; font-weight:bold; text-align:center;"></span></p>';
		}
		$('.fullMedia').append(html);
 
		document.getElementById('aSubmit').onclick = function (event) {
			qapi.send(new qapi.Query(qapi, 'POST', 'action=edit&title=' + wgPageName + '&appendtext=' + '== Licencja ==\n' + document.getElementById('QLicenseSelect').value + '&summary=Dodano licencję', function (result) {
				if (result.edit.result == 'Success') {
					window.location = wgServer + '/index.php?title=' + wgPageName + '&action=purge';
				} else {
					alert('Wystąpił błąd.');
				}
			}));
			this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		}
	}
 
	if (wgCanonicalNamespace == 'File') {
		addOnloadHook(QLicenseUI);
		importArticles({
			type: "script",
			articles: ['MediaWiki:APIQuery.js']
		});
	}
}