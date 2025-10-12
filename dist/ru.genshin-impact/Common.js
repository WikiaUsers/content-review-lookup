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