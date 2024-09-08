// Botón de Mensaje privado grupal

importScriptPage("MediaWiki:Chat.js/MP.js", "es.fanonminecraft");

// Palabras Censuradas

ChatStringsBlocker = {"count": 0};
$('textarea[name="message"]').on("keypress", function(e) {
	if (e.keyCode == 13) {
		var a = $('textarea[name="message"]').val().toLowerCase(),
			b = [
                                "puta",
				"putas",
				"puto",
				"putos",
				"prostituta",
                                "prostitutas",
                                "estupido",
				"estupidos",
                                "estupida",
				"estupidas",
				"tarado",
				"subnormal",
				"subnormales",
				"imbecil",
                                "coño",
				"boludo",
				"idiota",
                                "pelotudo",
				"carajo",
				"maricon",
				"pene",
                                "vagina",
				"prostituto",
				"mogolico",
				"gilipollas",
				"polla",
				"fuck",
				"bitch",
				"stupid",
				"fucking",
				"chupamela",
				"lamepija",
				"lamepollas",
				"putilla",
				"putillo",
                                "putita",
				"putito",
				"gay",
				"tetas",
				"teta",
				"cabron",
				"cabrón",
				"cojones",
				"mierda",
				"porno",
				"carajo",
				"pendejo",
				"pendeja",
				"cojon",
				"retrasada",
				"retrasado",
				"culo",
				"chota"
			],
			c = false; // Palabras censuradas
		for (var i = 0; i < b.length; i++) { // loop through all words
			var d = b[i];
			if (
			(
			/* Adverttencias */
				a == d ||                                                                      //

				a.search(new RegExp(d + "[ ,\\.\\!\\?]")) == 0 ||                              //
				a.search(new RegExp("[ ,\\.\\!\\?]" + d + "[ ,\\.\\!\\?]")) > -1 ||            // contains the word
				a.substr(a.length - d.length - 1).search(new RegExp("[ ,\\.\\!\\?]" + d)) > -1 // end with the word
			/* possibilities end */
			) && c === false
			) {
				var c = true;
				$('textarea[name="message"]').val("");
				ChatStringsBlocker.count++;
				if (ChatStringsBlocker.count < 2) {
					alert("¡Advertencia! ésta totalmente prohibido usar un lenguaje inapropiado.");
				} else if (ChatStringsBlocker.count === 2) {
					alert("ÚLTIMA ADVERTENCIA\n Esta es la segunda advertencia, recuerda que en este chat esta totalmente prohibido usar lenguaje inapropiado, sí lo vuelves a intentar serás expulsado automáticamente del servidor.");
				} else if (ChatStringsBlocker.count === 3) {
					window.close();
				}
			}
		}
	}
});