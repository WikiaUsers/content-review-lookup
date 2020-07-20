importArticles({
    type: "script",
    articles: [
    "u:dev:ReferencePopups/code.js"
    ]
});

/* Podpisy zamiast prefiksów */
$(function FixNs() {
    $('.ns-4 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader .header-title').append('<h2>Strona projektu Teen Wolf Wiki</h2>');
});

// Skrypt dodaje na pasku narzędzi przycisk powrotu na górę strony.
function ToTop() {
	$('.WikiaBarWrapper .tools')
		.append('<li style="border:none;float:right;"><a href="#top">Powrót do góry</a></li>');
}
addOnloadHook(ToTop);