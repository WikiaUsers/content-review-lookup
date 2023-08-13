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
		"enableSidebar": true,
		"sidebarBehaviour": "manual",
		"sidebarInitialState": "show",
		"enableSearch": true,
		"openPopupsOnHover": false,
		"enableTooltips": true
	};
        /** translation change **/
        window.dev = window.dev || {};
        window.dev.i18n = window.dev.i18n || {};
        window.dev.i18n.overrides = window.dev.i18n.overrides || {};
        window.dev.i18n.overrides["MapsExtended"] = window.dev.i18n.overrides["MapsExtended"] || {};
        window.dev.i18n.overrides["MapsExtended"]["sidebar-header"] = "$1";