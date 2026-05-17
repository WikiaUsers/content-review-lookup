var outputelement = document.getElementById("hpnum");
var hppn = mw.config.get("wgPageName").toLowerCase().split("/")[0]; // The split ensures that the script can also be executed on subpages of a boss page

var inputelement = document.createElement("input");
	inputelement.type = "number";
	inputelement.id = "playernum";
	inputelement.value = "1";
	inputelement.min = "1";
	inputelement.onchange = function() {
		if (document.getElementById("playernum").value <= 0) {
			return;
		}
		else {
			var api = new mw.Api();
			api.get( {
				action: "expandtemplates",
				prop: "wikitext",
				text: "{{#invoke:HpCalc|main|" + hppn + "|" + document.getElementById("playernum").value + "|" + "}}" // The actual calculation is resolved through a Module to omit potential arbitrary code execution through eval of a non-js article
			} ).then( ( data ) => {
				if (isNaN(data.expandtemplates.wikitext)) {
					var dataarr = JSON.parse(data.expandtemplates.wikitext);
					document.getElementById("hpnum").innerHTML = Math.floor(dataarr[0]);
					document.getElementById("hpnum2").innerHTML = Math.floor(dataarr[1]);
				}
				else {
					document.getElementById("hpnum").innerHTML = Math.floor(data.expandtemplates.wikitext);
				}
			} );
		return;
		}
	};
var labelelement = document.createElement("label");
	labelelement.id = "hplabel";
	labelelement.for = "playernum";
	labelelement.innerHTML = "Players: ";
document.getElementById("statbox").appendChild(document.createElement("br"));
document.getElementById("statbox").appendChild(labelelement);
document.getElementById("statbox").appendChild(inputelement);