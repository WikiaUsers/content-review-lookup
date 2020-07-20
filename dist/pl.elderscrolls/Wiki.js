// ElderScrollsWiki.js
// CC-BY-NA-SA
// Autor: Vuh

// Prerender OZ
$('head').append('<link rel="dns-prefetch" href="http://wikia-beacon.com" />');
$('head').append('<link rel="dns-prefetch" href="http://wikia.nocookie.net" />');
$('head').append('<link rel="dns-prefetch" href="'+wgServer+'" />');
if (wgPageName === 'Specjalna:Aktywność_na_wiki') {
	$('head').append('<link rel="prefetch prerender" href="/wiki/Specjalna:Ostatnie_zmiany" />');
} else {
	$('head').append('<link rel="prefetch prerender" href="/wiki/Specjalna:Aktywność_na_wiki" />');
}