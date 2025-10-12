/* TAGI PROFILI UŻYTKOWNICZEK I UŻYTKOWNIKÓW */
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u:'Założyciel' },
		bureaucrat: { u:'Biurokrata_ka', m:'Biurokrata', f: 'Biurokratka' },
		sysop: { u:'Administrator_ka', m:'Administrator', f: 'Administratorka' },
		contentmoderator: { u:'Moderator_ka treści', m:'Moderator treści', f: 'Moderatorka treści' },
		threadmoderator: { u:'Moderator_ka dyskusji', m:'Moderator dyskusji', f: 'Moderatorka dyskusji' },
		formerbureaucrat: { u: 'Były_a biurokrata_ka', m:'Były biurokrata', f:'Była biurokratka' },
		formersysop: { u: 'Były_a administrator_ka', m:'Były administrator', f:'Była administratorka' },
		formercontentmodeator: { u: 'Były_a moderator_ka treści', m:'Były moderator treści', f:'Była moderatorka treści' },
		formerthreadmoderator: { u: 'Były_a moderator_ka dyskusji', m:'Były moderator dyskusji', f:'Była moderatorka dyskusji' },
		formerchatmoderator: { u: 'Były_a moderator_ka czatu', m:'Były moderator czatu', f:'Była moderatorka czatu' },
		blocked: { u: 'Zablokowany_a', m:'Zablokowany', f:'Zablokowana' },
		inactive: { u: 'Nieaktywny_a', m:'Nieaktywny', f:'Nieaktywna' }
	}
};

UserTagsJS.modules.custom = {
	'Severin Andrews': ['founder', 'formerbureaucrat', 'formersysop'],
	'Talho': ['formerbureaucrat', 'formersysop'],
	'Ravger': ['formersysop'],
	'Lordtrion': ['formerbureaucrat', 'formersysop'],
	'Ksoroxdz': ['formerbureaucrat', 'formersysop'],
	'Charmedp5': ['formersysop'],
	'Colette Rousseau': ['formerchatmoderator'],
	'Pallid': ['formersysop'],
	'Dawid2.bot': ['bot']
};

UserTagsJS.modules.metafilter = {
	'rollback': ['sysop', 'bureaucrat', 'contentmoderator', 'threadmoderator'],
	'sysop': ['bot']
};

UserTagsJS.modules.inactive = {
	days: 60,
	zeroIsInactive: false
};

/* PRZYCISK GALERII */
$(function() {
    if ($('#showgallerybutton').length) {
        var $editButton = $('.page-header__actions .wds-button[id^="ca-edit"], .wds-button[accesskey="e"]');
        if ($editButton.length) {
            var $galleryButton = $('<a>', {
                class: 'wds-button wds-is-text page-header__action-button has-label collapsible',
                href: '/wiki/Galeria:' + encodeURIComponent(mw.config.get('wgPageName')),
                title: 'Zobacz galerię tej strony'
            });
            $galleryButton.html(
                '<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-image-small"></use></svg>' +
                ' Galeria'
            );
            $editButton.after($galleryButton);
        }
    }
});

/** POWRÓT DO STRONY **/
$(function() {
    const ns = mw.config.get('wgNamespaceNumber');
    if (ns === 112) {
        var $editButton = $('.page-header__actions .wds-button[id^="ca-edit"], .wds-button[accesskey="e"]');
        if ($editButton.length) {
            const pageTitle = mw.config.get('wgTitle');
            var $backButton = $('<a>', {
                class: 'wds-button wds-is-text page-header__action-button has-label collapsible',
                href: '/wiki/' + encodeURIComponent(pageTitle),
                title: 'Powrót do artykułu'
            });
            $backButton.html(
                '<svg class="wds-icon wds-icon-small"><use xlink:href="#wds-icons-reply-small"></use></svg>' +
                ' Powrót'
            );
            $editButton.after($backButton);
        }
    }
});

/* PODPISY ZAMIAST PREFIKSÓW */
$(function FixNsUCPFinalSpan() {
    const $h1 = $('#firstHeading');
    const ns = mw.config.get('wgNamespaceNumber');
    
    if (!$h1.length) return; 

    const desc = {
        4: 'Strona projektu Czarodziejki Wiki',
        112: 'Strona galerii',
        114: 'Strona ujednoznaczniająca',
    };
    
    if (desc[ns]) {
        $h1.find('.mw-page-title-namespace, .mw-page-title-separator').hide();
        
        $h1.after(
            $('<div>', {
                class: 'page-header__page-subtitle',
                text: desc[ns]
            })
        ).find('.mw-page-title-main').text(mw.config.get('wgTitle'));
    }
});

/* WDSICONS */
importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });

mw.hook('dev.wds').add(function(wds) {
	mw.hook('wikipage.content').add(function() {
    wds.render('.bar');
	});
});