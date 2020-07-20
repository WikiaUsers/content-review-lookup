/*
 * QLicense.js,
 * [originally] by User:Cakemix, decoded and formatted,
 * decoded, formatted, and shortened by Monchoman45,
 * translated by MarkosBoss.
 * fixed by Vuh
 */
if(wgNamespaceNumber == 6) {
	function QLicenseUI() {
		window.qapi = new APIQuery;
		var e = "";
		for(i in LicenseOptions) e += '<option value="' + i + '" style="text-align:center">' + LicenseOptions[i] + "</option>";
		var n = '<p style="text-align:center"><select id="QLicenseSelect">' + e + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em;cursor:pointer" id="aSubmit">Dodaj licencję</a>';
		document.getElementById("ESWLicensed") ? n += '&nbsp;<span style="color:red;font-weight:bold;text-align:center">Posiada licencję!</span></p>' : n += '&nbsp;<span style="color:green;font-weight:bold;text-align:center">Nie posiada licencji!</span></p>', $(".fullMedia").append(n), document.getElementById("aSubmit").onclick = function(e) {
			qapi.send(new qapi.Query(qapi, "POST", "action=edit&title=" + wgPageName + "&appendtext=== Licencja ==\n" + document.getElementById("QLicenseSelect").value + "&summary=Dodano licencję", function(e) {
				"Success" == e.edit.result ? window.location = wgServer + "/index.php?title=" + wgPageName + "&action=purge" : alert("Wystąpił błąd.")
			})), this.innerHTML = '<img src="/wiki/Loader-square.gif" style="vertical-align:baseline" border="0" />'
		}
	}
	addOnloadHook(QLicenseUI);
}