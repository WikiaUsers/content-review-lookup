function impart(article) {
    importArticle({ type: 'script', article: article });
}

function getParamValue(param, url) {
	var re = new RegExp('^[^#]*[&?]' + param.replace(/([\\{}()|.?*+\-^$\[\]])/g, '\\$1') + '=([^&#]*)'),
		m = re.exec(url !== undefined ? url : location.href);
	if (m) {
		return decodeURIComponent(m[1].replace(/\+/g, '%20'));
	}
	return null;
}

if (
  !mw.config.get('wgCanonicalNamespace') &&
  !window.linkImagePopupDisabled &&
  !getParamValue('diff')
) {
    impart('MediaWiki:Common.js/LinkImagePopup.js');
}