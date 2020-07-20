// Licencje
var options = {
                '{{Brak_licencji}}': 'Plik nie posiada informacji dotyczących jego praw autorskich.',
		'{{Dozwolony_użytek|comic}}': 'Obrazek jest skanem z mangi.',
                '{{Dozwolony_użytek|tv-screenshot}}': 'Obrazek podchodzi z anime.',
		'{{Dozwolony_użytek|video-screenshot}}': 'Obrazek pochodzi z filmu.',
		'{{Fairuse|Fairuse}}': 'Obrazek dozwolonego użytku.',
		'{{CC-BY-SA|CC-BY-SA}}': 'Obrazek na licencji CC-BY-SA.',
		'{{Obrazek na stronie użytkownika|Obrazek na stronie użytkownika}}': 'Obrazek na stronie użytkownika.',
		'{{Copyright|Copyright}}': 'Obrazek na licencji Copyright.',
};
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:License.js"
   ]
});

 
if(wgCanonicalNamespace == 'File') {
	addOnloadHook(QLicenseUI);
	importScriptPage('MediaWiki:APIQuery.js', 'monchbox');
}