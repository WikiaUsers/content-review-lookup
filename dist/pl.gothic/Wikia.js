// Licencje
var options = {
	'{{Nieznana}}': 'Nie znam licencji',
	'{{Screenshot}}': 'Screenshot z gry',
	'{{Screenshot-wikia}}': 'Screenshot strony wiki',
	'{{Logo}}': 'Logo gry lub firmy',
	'{{CC-BY-SA}}': 'Creative Commons 3.0',
	'{{GFDL}}': 'GNU Free Documentation License',
	'{{Copyright}}': 'Plik ma zastrzeżone pr. autorskie',
	'{{Fair-use}}': 'Plik ma dozwolone użycie',
	'{{Wikimedia}}': 'Plik pochodzi z Wikipedii',
	'{{PD}}': 'Plik należy do domeny publicznej'
};

// AddRailModule
window.AddRailModule = [{ prepend: true }];

// Stare blogi
window.LockOldBlogs = {
	expiryDays: 60,
	expiryMessage: 'Komentowanie zostało wyłączone, ponieważ nikt nie dodał komentarza do tego wpisu od <expiryDays> dni. W razie potrzeby skontaktuj się z administratorem.',
	nonexpiryCategory: 'Niearchiwizowane blogi'
};

// Kolor menu w mobilnej wersji Google Chrome 
$( function() {
	if ( !$( 'meta[name="theme-color"]' ).exists() )$( '<meta>', {
		name: 'theme-color',
		content: mw.config.get( 'wgSassParams' )['color-community-header'] || '#1b0300'
	} ).appendTo( 'head' );
} );

// Fix do wyświetlania ikon w infoboksach
$( '.changebox' ).click( function() {
	$( '.changebox img' ).each( function() {
		ImgLzy.load( this );
	} );
} );

importArticles( {
	type: 'script',
	articles: [
		'u:pl.tes:MediaWiki:License.js',
		'u:pl.tes:MediaWiki:Change.js',
		'u:pl.tes:MediaWiki:CategorySorter.js',
	]
} );