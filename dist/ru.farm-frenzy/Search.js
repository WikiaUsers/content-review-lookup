$(function () {
	// Remove [[MediaWiki:Searchmenu-new]] if searching with "prefix:" (usually in talk archives)
	var cL = $('.mw-search-createlink');
	if( / prefix:/.test( cL.find('a:first').text() ) )
		cL.after('<br>').remove();

	// External search engines
	var searchInput = document.querySelector('#searchText > input');
	var list = {
		'Google': 'https://google.com/search?q=%s+site:ru.farm-frenzy.wikia.com&hl=ru',
		'Яндексе': 'https://yandex.ru/yandsearch?text=%s&site=ru.farm-frenzy.wikia.com',
		'Bing': 'https://www.bing.com/search?q=%s+site:ru.farm-frenzy.wikia.com',
	};
	var listKeys = Object.keys(list);

	var searchEngines = document.createElement('p');
	searchEngines.id = 'searchEngines';
	searchEngines.innerHTML = 'Искать&nbsp;в&nbsp;(';
	searchEngines.style.float = 'right';

	for( var i in list ){
		var link = document.createElement('a');
		link.href = list[i].replace('%s',searchInput.value);
		link.textContent = i;
		searchEngines.appendChild(link);

		if( listKeys.indexOf(i) < listKeys.length - 1 ){
			searchEngines.appendChild(document.createTextNode(' | '));
		}
	}
	searchEngines.appendChild(document.createTextNode(')'));

	$('.searchresults > .mw-search-visualclear:not(.mw-search-interwiki-header)').after( searchEngines );
});