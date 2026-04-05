/* ImprovedTabbers */
    window.ImprovedTabbers = {
        HideHeaderTitle: true,
        HideContentTitle: true,
        HumanReadableAnchor: true,
        SynchroInfoboxes: false,
        SynchroTabbers: false
    };

/* BackToTopButton */
    window.BackToTopModern = true;

/* EraIcons */
	/* Copied from https://starwars.fandom.com/wiki/MediaWiki:Common.js */
	$( function eraIconsOasis() {
	    if ( $( '#title-eraicons' ).length && $( '.page-header__actions' ).length ) {
	    	$( '.page-header__actions' ).first().prepend( $( '#title-eraicons' ).show() );
	    }
	} );

/* LockOldComments */
    window.lockOldComments = (window.lockOldComments || {});
    window.lockOldComments.limit = 90;
        /** translation fix **/
        window.dev = window.dev || {};
        window.dev.i18n = window.dev.i18n || {};
        window.dev.i18n.overrides = window.dev.i18n.overrides || {};
        window.dev.i18n.overrides['LockOldComments'] = window.dev.i18n.overrides['LockOldComments'] || {};
        window.dev.i18n.overrides['LockOldComments']['locked-reply-box'] = "🔒 Этой ветке комментариев более " + window.lockOldComments.limit + " " + (window.lockOldComments.limit > 1 ? 'дней.' : 'дня.') + " Нет необходимости отвечать.";

/* MapsExtended */
	window.mapsExtendedConfig = {
		enableSearch: true,
		enableSidebar: true,
		enableTooltips: true,
		openPopupsOnHover: false,
	};
        /** translation change **/
        window.dev = window.dev || {};
        window.dev.i18n = window.dev.i18n || {};
        window.dev.i18n.overrides = window.dev.i18n.overrides || {};
        window.dev.i18n.overrides["MapsExtended"] = window.dev.i18n.overrides["MapsExtended"] || {};
        window.dev.i18n.overrides["MapsExtended"]["sidebar-header"] = "$1";

/* Всплывающие окна [[T:tt]] */
/* import https://genshin-impact.fandom.com/wiki/MediaWiki:Common.js */
mw.loader.using('oojs-ui-widgets').then(() => { // make sure the PopupWidget library is loaded
	mw.hook('wikipage.content').add((contents)=>{ // hydrate any content inserted
		if (contents instanceof Element || contents instanceof NodeList) {contents = $(contents);}
		if (!contents || !(contents instanceof jQuery) || contents.length===0) {return;}
		let toggle = $('body').hasClass('gadget-toggle-tooltip');
		contents
		.find('.custom-tt-wrapper.mw-collapsible')
		.each((_, wrapper) => {
			const $wrapper = $(wrapper);
			const isEE = $wrapper.hasClass('giw-extra-effect-wrapper');
			const hover = !toggle || isEE;
			const classes = $wrapper.attr('class').replace(/mw-collapsible|mw-made-collapsible/g, '');
			
			const content = $wrapper.children('.mw-collapsible-content').html();
			$wrapper.children('.mw-collapsible-content').remove();
			
			const toggleCont = $wrapper.children('.toggle-tooltip').html();
			$wrapper.children('.toggle-tooltip').replaceWith(toggleCont);
			const $toggle = $('<span>', {
				'class': 'custom-tt toggle-tooltip'+(isEE ? ' giw-extra-effect' : ''),
				html: $wrapper.html().replace(/mw-collapsible-toggle(-collapsed|-expanded)? ?/g, '')
			});
			const popup = new OO.ui.PopupWidget({
				$content: $('<div>', { html: content }),
				$container: $('.page__main'),
				anchor: !isEE,
			});
			if (isEE) { popup.$element.find('.oo-ui-popupWidget-popup').toggleClass('giw-extra-effect', true); }
			
			// Remove default collapsible
			const newWrap = $('<span>', {
				'class': classes,
				attr: { 'data-tt-text': $wrapper.attr('data-tt-text') },
				html: [
					$toggle,
					popup.$element
				]
			});
			$wrapper.replaceWith(newWrap);
			
			// Functionality
			let time = null;
			$toggle.on('click', ()=> {
				newWrap.toggleClass('cutom-tt-forceStay');
				popup.toggle(newWrap.hasClass('cutom-tt-forceStay'));
			});
			$toggle.add(popup.$element).on('mouseover mouseout', (e) => {
				if (newWrap.hasClass('cutom-tt-forceStay')) {clearTimeout(time); return;}
				else if (time) { clearTimeout(time); }
				time = setTimeout(()=>{
					popup.toggle(e.type==='mouseout' ? false : true);
				}, e.type==='mouseout' ? 250 : 0);
			});
		});
	});
});