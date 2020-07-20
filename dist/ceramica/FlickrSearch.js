fsImgBy = 'http://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Cc-by_new_white.svg/16px-Cc-by_new_white.svg.png';
fsImgSa = 'http://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Cc-sa_white.svg/16px-Cc-sa_white.svg.png';

var FlickrSearch = {
	// Search functions
	'initInterface': function ()
	{
		var css = document.createElement('link');
		css.setAttribute('rel', 'stylesheet');
		css.setAttribute('type', 'text/css');
		css.setAttribute('href', wgScript + '?title=MediaWiki:FlickrSearch.css&action=raw&ctype=text/css');
		document.body.appendChild(css);
	
		var searchContainer = document.getElementById('FlickrSearchBoxContainer');
	
		var h2 = document.createElement('h2');
		h2.appendChild(document.createTextNode(FlickrSearch.i18n('title')));
		searchContainer.appendChild(h2);
		
		var form = document.createElement('form');
		form.onsubmit = function () { return false; };
	
		var pSearchField = document.createElement('p');
		pSearchField.setAttribute('id', 'fsSearchField');
		pSearchField.appendChild(document.createTextNode(FlickrSearch.i18n('keywords')));
		FlickrSearch.searchBox = document.createElement('input');
		FlickrSearch.searchBox.setAttribute('id', 'fsSearchBox');
		pSearchField.appendChild(FlickrSearch.searchBox);
		pSearchField.appendChild(document.createTextNode(' '));
				
		var submitButton = document.createElement('input');
		submitButton.setAttribute('type', 'submit');
		submitButton.setAttribute('value', FlickrSearch.i18n('search'));
		submitButton.onclick = function () { FlickrSearch.doSearch(1); };
		pSearchField.appendChild(submitButton);
		
		form.appendChild(pSearchField);
		
		var h3 = document.createElement('h3');
		h3.appendChild(document.createTextNode(FlickrSearch.i18n('options')));
		form.appendChild(h3);
		
		FlickrSearch.options = {}
		var tOptions = document.createElement('table');
		tOptions.setAttribute('id', 'fsSearchOptions');
		function _addRow(name)
		{
			var row = document.createElement('tr');
			var td = document.createElement('td');
			td.appendChild(document.createTextNode(FlickrSearch.i18n(name)));
			row.appendChild(td);
			td = document.createElement('td');
			td.appendChild(FlickrSearch.options[name]);
			row.appendChild(td);
			tOptions.appendChild(row);
		}
		FlickrSearch.options['tags option'] = document.createElement('input');
		_addRow('tags option');
		
		form.appendChild(tOptions);
		searchContainer.appendChild(form);
		
		var divLoading = document.getElementById('FlickrSearchLoading');
		divLoading.parentNode.removeChild(divLoading);
	},
	'doSearch': function (page)
	{
		var qs = '?q=';
		qs += encodeURIComponent(FlickrSearch.searchBox.value);
		qs += '&tags=';
		qs += encodeURIComponent(FlickrSearch.options['tags option'].value);
		qs += '&page=' + page;
		url = 'http://toolserver.org/~bryan/cgi-bin/flickr/ajax/search.py';
		
		var oScript = document.createElement('script');
		oScript.type = 'text/javascript';
		oScript.src = url + qs;
		document.getElementById('FlickrSearchResults').appendChild(oScript);
	},
	
	'displaySearchResults' : function (result)
	{	
		var searchResultsContainer = document.getElementById('FlickrSearchResults');
		
		while (searchResultsContainer.firstChild)
			searchResultsContainer.removeChild(searchResultsContainer.firstChild);
		
		var h2 = document.createElement('h2');
		h2.appendChild(document.createTextNode(FlickrSearch.i18n('results')));
		searchResultsContainer.appendChild(h2);
	
		var divResults = document.createElement('div');
		searchResultsContainer.appendChild(divResults);
		
		function _createLink (element, target)
		{
			var a = document.createElement('a');
			a.href = target;
			a.appendChild(element);
			return a;
		}
		function _em (text)
		{
			var em = document.createElement('em');
			em.appendChild(document.createTextNode(text));
			return em;
		}
		
		for each (var item in result['result'])
		{
			var divItem = document.createElement('div');
			divItem.setAttribute('class', 'fsItem');
			var image = document.createElement('img');
			image.setAttribute('src', item['thumb']);
			image.setAttribute('width', '120');
			image.setAttribute('height', '120');
			var link = document.createElement('a');
			link.setAttribute('class', 'fsThumbnail');
			link.setAttribute('href', item['url'])
			link.onmouseover = function () { FlickrSearch.enlargeThumb(this); };
			link.onmouseout = function () { FlickrSearch.closeThumb(this); };
			link.appendChild(image);
			divItem.appendChild(link)
			
			var description = document.createElement('p');
			description.setAttribute('class', 'fsDescription');
			
			var aLicense = document.createElement('a');
			var imgBy = document.createElement('img');
			imgBy.setAttribute('src', fsImgBy);
			aLicense.appendChild(imgBy);
			aLicense.setAttribute('href', wgScript + '?title=Template:cc-by-2.0');
			if (item['license'] == 'cc-by-sa')
			{
				var imgSa = document.createElement('img');
				imgSa.setAttribute('src', fsImgSa);
				aLicense.appendChild(imgSa);
				aLicense.setAttribute('href', wgScript + '?title=Template:cc-by-sa-2.0');
			}				
			description.appendChild(aLicense);
			description.appendChild(document.createTextNode(' '));
			
			var title = document.createElement('strong');
			title.appendChild(_createLink(document.createTextNode(item['title']), item['url']));
			description.appendChild(title);
			
			function truncateString(string, max)
			{
				if (string.length > max)
					return string.substr(string, max - 4) + '[...]';
				return string;
			}
			function addSingleLine (name, element)
			{
				var parent = document.createElement('p');
				parent.setAttribute('class', 'fsSingleLine');
				parent.appendChild(document.createTextNode(name));
				parent.appendChild(element);
				divItem.appendChild(parent);
			}
			
			addSingleLine(FlickrSearch.i18n('author'), 
				_createLink(document.createTextNode(
					truncateString(item['ownername'], 24)),
					item['ownerurl']));	
			addSingleLine(FlickrSearch.i18n('tags'),
				_em(truncateString(item['tags'].join(', '), 56)));
				
			var toolbar = document.createElement('p');
			toolbar.setAttribute('class', 'fsItemToolbar');
			toolbar.appendChild(document.createTextNode('( '));
			toolbar.appendChild(_createLink(document.createTextNode(FlickrSearch.i18n(
				'upload')), '/wiki/Commons:FlickrUpload?id=' + item['id']));
			if (item['oncommons'])
			{
				toolbar.appendChild(document.createTextNode(' | '));
				toolbar.appendChild(_createLink(document.createTextNode(
					FlickrSearch.i18n('on commons')), 
					'http://tools.wikimedia.de/~bryan/flickr/browse?id=' + 
					item['id']));
			}
			//toolbar.appendChild(document.createTextNode(' | '));
			//toolbar.appendChild(_createLink(document.createTextNode(FlickrSearch.i18n('author more')), 
			//	'http://toolserver.org/~bryan/flickr/browse?nsid=' + item['nsid']));

			toolbar.appendChild(document.createTextNode(' )'));
			divItem.appendChild(toolbar);
			
			
			
			divResults.appendChild(divItem);
		}
		if (!result['result'])
		{
			var em = document.createElement('em');
			em.appendChild(document.createTextNode(FlickrSearch.i18n('no results')));
			divResults.appendChild(em);
		}
		
		if (result['pages'])
		{
			function _pagerOnclick ()
			{
				FlickrSearch.doSearch(this.getAttribute('fsPage'));
			}
		
			function _addPageLink (i, name)
			{
				if (!name) name = i;
			
				var element = document.createElement('span');
				if (i == result['page'])
				{
					element.setAttribute('class', 'fsPagerCurrent');
				}
				else
				{
					element.setAttribute('fsPage', i);
					element.setAttribute('class', 'fsPagerUncurrent');
					element.onclick = _pagerOnclick
				}			
				element.appendChild(document.createTextNode(name));
				divPager.appendChild(element);
				divPager.appendChild(document.createTextNode(' '));
			};
			function _addSeperator ()
			{
				divPager.appendChild(document.createTextNode(' ... '));
			}
		
			var divPager = document.createElement('div');
			divPager.setAttribute('id', 'fsPager');
			
			var span = document.createElement('span');
			span.appendChild(document.createTextNode(FlickrSearch.i18n('pages')));
			span.appendChild(document.createTextNode(' '));
			span.setAttribute('id', 'fsPageCaption');
			divPager.appendChild(span);
			
			if (result['page'] != 1) _addPageLink(result['page'] - 1, '<<');
			
			if (result['pages'] <= 10)
			{
				for (var i = 1; i <= result['pages']; i++)
					_addPageLink(i);
			}
			else if (result['page'] <= 6)
			{
				for (var i = 1; i <= result['page'] + 2; i++)
					_addPageLink(i);
				_addSeperator();
				for (var i = result['pages'] - 2; i <= result['pages']; i++)
					_addPageLink(i);
			}
			else if (result['page'] >= (result['pages'] - 4))
			{
				for (var i = 1; i <= 3; i++)
					_addPageLink(i);
				_addSeperator();
				for (var i = result['page'] - 2; i <= result['pages']; i++)
					_addPageLink(i);
			}
			else
			{
				for (var i = 1; i <= 3; i++)
					_addPageLink(i);
				_addSeperator();
				for (var i = result['page'] - 1; i <= result['page'] + 1; i++)
					_addPageLink(i);
				_addSeperator();
				for (var i = result['pages'] - 2; i <= result['pages']; i++)
					_addPageLink(i);
			}
			
			if (result['page'] != result['pages']) _addPageLink(result['page'] + 1, '>>');

			searchResultsContainer.appendChild(divPager)
		}
	},
	
	// i18n functions
	't9n': {},
	'lang': 'en',
	'i18n': function (key)
	{
		if (FlickrSearch.t9n[FlickrSearch.lang])
			if (FlickrSearch.t9n[FlickrSearch.lang][key])
				return FlickrSearch.t9n[FlickrSearch.lang][key];
		return FlickrSearch.t9n['en']['key'];
	},
	
	// Interface functions
	'enlargeThumb': function (thumb)
	{
		//thumb.firstChild.firstChild.setAttribute('src', thumb.getAttribute('image-url'));
		thumb.firstChild.setAttribute('width', null);
		thumb.firstChild.setAttribute('height', null);
	},
	'closeThumb': function (thumb)
	{
		//thumb.firstChild.firstChild.setAttribute('src', thumb.getAttribute('thumb-url'));
		thumb.firstChild.setAttribute('width', '120');
		thumb.firstChild.setAttribute('height', '120');
	},
}
//if (wgPageName == 'Commons:FlickrSearch')
$j(document).ready(FlickrSearch.initInterface);


FlickrSearch.t9n['en'] = {
	'title': 'Search for Flickr images',
	'keywords': 'Keywords: ',
	'search': 'Search',
	'options': 'Search options',
	'tags option': 'Tags (comma seperated)',
	
	'results': 'Search results',
	'pages': 'Pages',
	'author': 'Author: ',
	'tags': 'Tags: ',
	
	'upload': 'Upload',
	'on commons': 'On Commons',
	'author more': 'This author on Commons',
	
	'no results': 'No search results',
};