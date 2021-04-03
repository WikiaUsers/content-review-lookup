/* Any JavaScript here will be loaded for all users on every page load. */
// impart('MediaWiki:Snow.js');
// Rather than waiting for mw.util to load, we'll make this a local function.
// Source: https://gerrit.wikimedia.org/r/plugins/gitiles/mediawiki/core/+/HEAD/resources/src/mediawiki.util/util.js
function getParamValue(param, url) {
	var re = new RegExp('^[^#]*[&?]' + param.replace(/([\\{}()|.?*+\-^$\[\]])/g, '\\$1') + '=([^&#]*)'),
		m = re.exec(url !== undefined ? url : location.href);
	if (m) {
		return decodeURIComponent(m[1].replace(/\+/g, '%20'));
	}
	return null;
}
// Shortcut for importArticle
function impart(article) {
    importArticle({ type: 'script', article: article });
}

jQuery.fx.interval = 80;

window.DragDropUploader = true;

window.mbLoadingOpacity = 1;

window.PurgeButtonText = 'Làm mới trang';

window.nullEditDelay = 1000;

window.lastEdited = {
    avatar: true,
    avatarsize: 25,
    size: false,
    diff: true,
    comment: false,
    time: 'timeago',
    lang: 'vi',
    position: {
        element: document.getElementById('WikiaArticle'),
        method: 'prepend'
    },
    namespaces: {
        exclude: []
    },
    pages: []
};
// Time Circles
$(function() {
    if (document.getElementsByClassName("countdown")[0] !== null) {
        impart('MediaWiki:TimeCircles.js');
    }
});
// For specific pages
if ((mw.config.get('wgAction') === 'view') && (mediaWiki.config.get('wgPageName') !== 'Sonako_Light_Novel') && (mediaWiki.config.get('wgNamespaceNumber') !== -1 || mediaWiki.config.get('wgNamespaceNumber') !== 1201 || mediaWiki.config.get('wgNamespaceNumber') !== 2001)) {
    impart('u:dev:MediaWiki:ReferencePopups/code.js');
    impart('u:dev:MediaWiki:LastEdited/code.js');
}
if (mediaWiki.config.get('wgPageName') === 'Sonako_Statistics') {
    impart('MediaWiki:WikiStats.js');
}
// Cài đặt bộ gõ [[Wikipedia:Gõ tiếng Việt|AVIM]] từ Wikipedia tiếng Việt
// Sửa đổi để chạy trên Wikia bởi Dai ca superman
if ((mediaWiki.config.get('wgPageName') !== 'Sonako_Light_Novel') && (mediaWiki.config.get('wgNamespaceNumber') === 0 || mediaWiki.config.get('wgNamespaceNumber') === 500 || mediaWiki.config.get('wgNamespaceNumber') === 1202 || mediaWiki.config.get('wgNamespaceNumber') === 1200 || mediaWiki.config.get('wgNamespaceNumber') === 1201 || mediaWiki.config.get('wgNamespaceNumber') === 2000) || mw.config.get('wgAction') === 'edit') {
    impart('MediaWiki:AVIM.js');
    impart('MediaWiki:AVIM_portlet.js');
}
if (mw.config.get('wgNamespaceNumber') === 0 || mw.config.get('wgNamespaceNumber') === 500) {
    impart('MediaWiki:Ebook.js');
    impart('MediaWiki:Wikia.js/customInterface.js');
}
if (mw.util.getParamValue('action') == "edit" || mw.util.getParamValue('action') == "submit") {
    $(".mw-editform").before("<div id='editToolbar'></div>");
    impart('MediaWiki:StdTemplates.js'); /* adds standard edit summaries dropdown */
}
// Tạm sửa cho MediaWiki:Group-sysop, hiện không load được
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
    impart('MediaWiki:Group-sysop.js');
}