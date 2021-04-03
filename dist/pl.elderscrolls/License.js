if (6 == wgNamespaceNumber) {
	function LicenseTESW() {
		var e = "";
		for (i in options) e += '<option value="' + i + '" style="text-align:center">' + options[i] + "</option>";
		var n = '<p style="text-align:center;"><select id="TESWLicenseSelect">' + e + '</select>&nbsp;<a class="wikia-button" id="aSubmit">Dodaj licencję</a> (jeżeli nie istnieje)';
		document.getElementById("ESWLicensed") ? n += '&nbsp;<span style="color:red;font-weight:bold">Posiada licencję!</span></p>' : n += '&nbsp;<span style="color:green; font-weight:bold">Nie posiada licencji!</span></p>', $(".fullMedia").append(n), document.getElementById("aSubmit").onclick = function(e) {
			$.ajax({
				url: mw.util.wikiScript("api"),
				type: "POST",
				async: !0,
				data: {
					action: "edit",
					title: wgPageName,
					summary: "Dodano licencję",
					text: "== Licencja ==\n" + document.getElementById("TESWLicenseSelect").value,
					minor: !0,
					bot: !0,
					token: mediaWiki.user.tokens.get("editToken"),
					format: "json"
				},
				contentType: "application/x-www-form-urlencoded",
				error: function() {
					alert("Wystąpił błąd.")
				},
				success: function(e) {
					window.location.reload()
				}
			}), this.innerHTML = '<img src="https://vignette.wikia.nocookie.net/elderscrolls/images/8/8b/Loader-square.gif/revision/latest?cb=20150427024725&path-prefix=pl" border="0" />'
		}
	}
	addOnloadHook(LicenseTESW)
}