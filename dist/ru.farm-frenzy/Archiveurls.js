/* Initial copy from http://fr.wikipedia.org/w/index.php?oldid=61255481 authors — http://fr.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
Скрипт генерирует ссылки на копии интернет-источника в архиве.
Можно отключать формирование ссылки на архивы выставлением no_external_cache = true в своем файле js.
Для предотвращения проставления ссылки на архив можно заключать ссылку в <span class='noarchive'>, см. http://ru.wikipedia.org/w/index.php?diff=31098174
 */
var archiveLinks = {
	'http://web.archive.org/web/*/' : 'web.archive.org',
	'http://wikiwix.com/cache/?url=' : 'wikiwix.com',
	'http://www.webcitation.org/query?url=' : 'WebCite',
	'http://webcache.googleusercontent.com/search?q=cache:' : 'Google Cache',
	'http://www.exalead.com/search/web/cached/?url=' : 'Exalead.com Cache',
	'http://archive.is/' : 'Archive.is'
};

function addcache() {
	if (typeof no_external_cache !== 'undefined' && no_external_cache) {
		return;
	}
	var archLink = document.createElement('a');
	archLink.className = 'cachelinks';
	archLink.appendChild(document.createTextNode(' Архивы'));
	$('ol.references a.external').after(archLink);
	$('a.cachelinks').click(function (event) {
		var value = event.target;

		var current_link = $(value.parentNode).find('a.external');

		var url = current_link[0].href;
		if (url.indexOf('http://wikiwix.com/cache/') > -1 || url.indexOf('http://web.archive.org/web/') > -1 || url.indexOf('wikipedia.org') > -1 || url.indexOf('wikimedia.org') > -1 || url.indexOf('stable.toolserver.org') > -1) {
			return;
		}
		var element_parent = current_link[0].parentNode;

		var title = getTextContent(current_link[0]);

		var hiddenDiv = document.createElement('div');
		hiddenDiv.style.display = '';
		hiddenDiv.style.position = 'absolute';
		hiddenDiv.style.zindex = '9999';
		hiddenDiv.style.padding = '2px';
		hiddenDiv.style.background = 'none repeat scroll 0 0 #FFFFCC';
		hiddenDiv.style.borderStyle = 'solid';
		hiddenDiv.style.borderWidth = '1px 2px 2px 1px';
		hiddenDiv.style.fontSize = '90%';
		hiddenDiv.style.marginLeft = '0.5em';
		hiddenDiv.style.marginTop = '1em';
		hiddenDiv.style.overflow = 'hidden';
		for (archiveLink in archiveLinks) {
			var link = document.createElement('a');
			link.href = archiveLink + url.replace(/%/g, '%25').replace(/&/g, '%26');
			link.title = 'Архивная копия ' + title + ' на ' + archiveLinks[archiveLink];
			link.appendChild(document.createTextNode(archiveLinks[archiveLink]));
			hiddenDiv.appendChild(link);
			hiddenDiv.appendChild(document.createElement('br'));
		}

		element_parent.insertBefore(hiddenDiv, current_link[0].nextSibling);

		hiddenDiv.style.top = value.offsetTop + 2 + 'px';
		hiddenDiv.style.left = value.offsetLeft + value.offsetWidth + 2 + 'px';

		$(value).unbind('click');
		$(value).click(function (event) {
			var value = event.target;
			var hiddenDiv = value.previousSibling;
			if (hiddenDiv.style.display == 'none') {
				hiddenDiv.style.display = '';
			} else {
				hiddenDiv.style.display = 'none';
			}
		})
	});
}

// Возвращает текстовое содержание нода и дочерних нодов.
// Copyright Harmen Christophe, http://openweb.eu.org/articles/validation_avancee, CC
function getTextContent(oNode) {
	if (!oNode)
		return null;
	if (typeof(oNode.textContent) != 'undefined') {
		return oNode.textContent;
	}
	switch (oNode.nodeType) {
	case 3: // TEXT_NODE
	case 4: // CDATA_SECTION_NODE
		return oNode.nodeValue;
		break;
	case 7: // PROCESSING_INSTRUCTION_NODE
	case 8: // COMMENT_NODE
		if (getTextContent.caller != getTextContent) {
			return oNode.nodeValue;
		}
		break;
	case 9: // DOCUMENT_NODE
	case 10: // DOCUMENT_TYPE_NODE
	case 12: // NOTATION_NODE
		return null;
		break;
	}
	var _textContent = '';
	oNode = oNode.firstChild;
	while (oNode) {
		_textContent += getTextContent(oNode);
		oNode = oNode.nextSibling;
	}
	return _textContent;
}

$(document).ready(function () {
	//if (mw.config.get('wgNamespaceNumber' === 0))
	//{
	addcache();
	//}
});