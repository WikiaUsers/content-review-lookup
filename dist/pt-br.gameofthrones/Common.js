/** Gera uma lista das páginas mais visitadas da Wikia
Exemplo de Uso:
<div id="mais-visitadas"></div> 
**/

$(function() {
	if ($("#mais-visitadas")) {
		var lista = "";
		$.post("/api/v1/Articles/Top?namespaces=0&limit=10", function(res) {
			for (var i = 0; res.items.length > i; i++) {
				lista += "<a href=" + res.items[i].url + ">" + res.items[i].title + "</a><br>";
				$("#mais-visitadas").html(lista);
			}
		});
	}
});

/**** Importações ****/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MiniComplete/code.js',
        'u:dev:ReferencePopups/custom.js'
    ]
});