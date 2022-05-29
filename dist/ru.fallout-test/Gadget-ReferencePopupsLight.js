;(function($, document, mw) {
	'use strict';

	function ReferencePopupsLight(/*i18n*/) {

		if (window.ReferencePopupsLight) return;

		window.ReferencePopupsLight = {
			'init': true,
			'hover': false
		};

		window.importArticle({
			type: 'style',
			article: 'u:dev:MediaWiki:ReferencePopupsLight.css'
		});

		var $popupLight = $('<div>', {
			id: 'popupLight',
		}).appendTo('body');

		var popupLightContent = $('<div>', {
			id: 'popupLightContent',
		}).appendTo($popupLight);


		function getPopup(event) {

			window.ReferencePopupsLight.hover = true;

			if (!window.ReferencePopupsLight.showed) {

				var ref = event.currentTarget;

				var refId = $(ref).attr('id');
				var noteId = refId.split('-').reverse()[0];

				var refText = $('#cite_note-' + noteId + ' .reference-text').html();

				$('#popupLightContent').html(refText);

				if ( (window.innerWidth - event.clientX) > window.innerWidth/2 ) {
					$popupLight.css({
						left: 0,
						right: ''
					});
				} else {
					$popupLight.css({
						left: '',
						right: 0
					});
				}

				$('#popupLight').appendTo(ref).show();
				window.ReferencePopupsLight.showed = true;

			}

		}

		function popupOver() {
			window.ReferencePopupsLight.hover = false;
			setTimeout(hidePopup, 180);
		}

		function hidePopup() {

			if (!window.ReferencePopupsLight.hover) {
				$('#popupLight').appendTo('body').hide();
				window.ReferencePopupsLight.showed = false;
			}

		}

		$('.reference').mousemove(function(event) { 
			getPopup(event);
		});
		$('.reference').mouseout(function() {
			popupOver();
		});

	}

	mw.hook('wikipage.content').add(function() {
		// mw.hook('dev.i18n').add(function(i) {
		// 	i.loadMessages('ReferencePopupsLight').done(function(i) {
		// 		i.useUserLang(); ReferencePopupsLight(i);
		// 	});
		// });
		ReferencePopupsLight();
	});
	
	// importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });

})(window.jQuery, document, window.mediaWiki);