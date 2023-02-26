window.railWAM = {
    logPage:"Project:WAM Log"
};

window.UserTagsJS = {
	modules: {},
	tags: {
		rollbacker: { u: 'Откатчик' },
		bureaucrat: { u: 'Старший администратор' },
		founder: { u: 'Основатель' },
		moderator: { u: 'Модератор' }
	}
};

UserTagsJS.modules.custom = {
	'Bibigon54': ['founder'],
	'TNTVV989': ['moderator'], 
	'Yerassyl Kh.': ['rollbacker']
};

UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat'],
	'content-moderator': ['moderator'],
	'threadmoderator': ['content-moderator']
};

$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").text(wgUserName);
});

/* == Кабинет администратора == */
/* === Кнопка ImportJS. Сделано HIHRAIM'ом из AdminDashboard JS-Button */
(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'AdminDashboard' ||
        window.AdminDashboardJSButtonLoaded
    ) {
        return;
    }
    window.AdminDashboardImportJSButtonLoaded = true;
    var AdminDashboardJSButton = {
        init: function(i18n) {
            console.log(i18n);
            this.$control = $('<li>', {
                'class': 'control',
                'data-tooltip': ('Управляйте импортом скриптов из Dev Wiki.')
            }).append(
                $('<a>', {
                    'class': 'set',
                    href: mw.util.getUrl('MediaWiki:ImportJS', { action: 'edit' })
                }).append(
                    $('<span>', {
                        'class': 'representation'
                    }).append(
                        $('<span>', {
                            text: 'IJS'
                        })
                    ),
                    i18n.msg('text').plain()
                )
            ).hover($.proxy(this.hover, this), $.proxy(this.unhover, this));
            $('.control a[data-tracking="special-css"]').parent().after(this.$control);
            this.$tooltip = $('.control-section.wiki > header > .dashboard-tooltip');
        },
        hover: function(e) {
            this.$tooltip.text(this.$control.data('tooltip'));
        },
        unhover: function(e) {
            this.$tooltip.text('');
        },
        hook: function(i18n) {
            i18n.loadMessages('AdminDashboard_JS-Button')
                .then($.proxy(this.init, this));
        }
    };
    mw.hook('dev.i18n').add($.proxy(AdminDashboardJSButton.hook, AdminDashboardJSButton));
    importArticle(
        {
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        },
        {
            type: 'style',
            article: 'u:dev:MediaWiki:AdminDashboardJSButton.css'
        }
    );
})();