/* Пользовательский ProfileCard */
    var currentUrl = decodeURIComponent(window.location.href);
    var username = currentUrl.replace(/.*\/(Участни(к|ца):|Стена_обсуждения:|Служебная:Вклад\/|Служебная:UserProfileActivity\/)/g, "").replace(/\?action=(edit|history|purge|protect|delete)/, "");
    var profile = "https://genshin-impact.fandom.com/ru/wiki/Участник:" + username;
    if (/(Стена_обсуждения:|Служебная:Вклад\/|Служебная:UserProfileActivity\/|Участни(к|ца):)/.test(currentUrl)) {
        $.ajax({
        url: profile,
        success: function(response) {
            var profileDiv = $(response).find('div[class*="profile-theme--"]');
            $('#userProfileApp').append(profileDiv);
            }
        });
    }

/* Подтягивание ширины картинки в инфобоксе до 100% */
	'use strict'
	$('.pi-item.pi-image img').each(function(){
		var i = $(this).width();
			$(this).removeAttr('width').removeAttr('height');
			console.log(i);
			if(parseInt(i) < parseInt(270)){
				$(this).css({'display':'block', 'width':'100%', 'max-width': i + 'px','margin':'auto'}),
				$(this).parent('a').css({'max-width': i + 'px','margin':'auto'});	
			}else{
				$(this).css({'display':'block', 'width':'100%'})
			}
	});

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