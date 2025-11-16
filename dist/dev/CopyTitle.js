/*
	Appends two buttons to the title to copy the title with/without namespace
	Author: Caburum & Thundercraft5
	Based on code by: RheingoldRiver
	See also: [[w:c:dev:CopyTitle]]
*/

$(function() {
	if (window.CopyTitleLoaded) return;
	window.CopyTitleLoaded = true;

	function init(i18n) {
		function getSVG(id, ns) {
			return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" id="' + id + '">' +
				'<title>' + i18n.msg(id).escape() + '</title>' +
				'<path d="M1280,384L1280,384c-40,0-82.7,13.3-128,40V96l0,0c0-26.7-9.3-49.3-28-68s-41.3-28-68-28H640l0,0c-26.7,0-56,6.7-88,20 s-57.3,29.3-76,48L68,476l0,0c-18.7,18.7-34.7,44-48,76S0,613.3,0,640v672l0,0c0,26.7,9.3,49.3,28,68s41.3,28,68,28h544v288l0,0 c0,26.7,9.3,49.3,28,68s41.3,28,68,28h960l0,0c26.7,0,49.3-9.3,68-28s28-41.3,28-68V480l0,0c0-26.7-9.3-49.3-28-68s-41.3-28-68-28 H1280z M1152,896H853l299-299V896z M512,512H213l299-299V512z M708,860c-18.7,18.7-34.7,44-48,76s-20,61.3-20,88v256H128V640h416 l0,0c26.7,0,49.3-9.3,68-28s28-41.3,28-68V128h384v416L708,860L708,860z M768,1664v-640h416l0,0c26.7,0,49.3-9.3,68-28 s28-41.3,28-68V512h384v1152H768z" />' +
				(ns ? '<text transform="matrix(0.9489 0 0 1 768.0005 1618.7976)" style="font-family: Rubik; font-weight: 500; font-size: 700px;">NS</text>' : '') + // i18n could be possible but would need to fit the text properly
			'</svg>';
		}

		mw.util.addCSS('\
			#title-copy-container {\
				display: inline-flex;\
				flex-direction: column;\
				justify-content: space-between;\
				margin-left: 0.25em;\
				-webkit-touch-callout: none;\
				-webkit-user-select: none;\
				-khtml-user-select: none;\
				-moz-user-select: none;\
				-ms-user-select: none;\
				user-select: none;\
				height: 1em;\
				gap: 1px;\
			}\
			#title-copy-container svg {\
				height: 50%;\
				flex-basis: ' + (mw.config.get('wgNamespaceNumber') === 0 ? '100%' : '50%') + ';\
				cursor: pointer;\
				display: inline-block;\
				transition: fill 250ms;\
				fill: currentColor;\
			}\
			#title-copy-container svg:hover { filter: brightness(1.75); }\
			#firstHeading, body:is(.action-edit, .action-submit) .ve-fd-header__title {\
				display: flex;\
				align-items: center;\
			}\
			body:is(.action-edit, .action-submit) #title-copy-container { flex-direction: row; }\
			body:is(.action-edit, .action-submit) #title-copy-container > :first-of-type { margin-right: 5px; }\
			body:is(.action-edit, .action-submit) #title-copy-container svg { height: 1em; }\
		');

		$('<span>', { id: 'title-copy-container' })
			.append(getSVG('title-copy-content', false))
			.append(mw.config.get('wgNamespaceNumber') !== 0 ? getSVG('title-copy-all', true) : null)
			.appendTo($('.page-header__title, .ve-fd-header__title'));
	
		$('#title-copy-content').click(function() {
			copy(mw.config.get('wgTitle'), this);
		});

		$('#title-copy-all').click(function() {
			copy(mw.config.get('wgPageName').replace(/_/g, ' '), this);
		});
	}

	function copy(text, element) {
		var copyEl = document.createElement('textarea');
		copyEl.value = text;
		document.body.appendChild(copyEl);
		copyEl.select();
		document.execCommand('copy');
		document.body.removeChild(copyEl);
		document.execCommand('copy');

		$(element).css('fill', 'var(--theme-success-color)');
		setTimeout(function() {
			$(element).css('fill', '');
		}, 1000);
	}

	function waitForI18n() {
		var $promise = $.Deferred();
		mw.hook('dev.i18n').add(function(i18n) {
			i18n.loadMessages('CopyTitle').done($promise.resolve);
		});
		return $promise;
	}
	$.when( waitForI18n(), mw.loader.using('mediawiki.util') ).then(init);

	importArticle({
		type: 'script',
		article: 'u:dev:MediaWiki:I18n-js/code.js'
	});
});