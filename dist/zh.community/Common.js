/* MediaWiki:Gadget-site-lib.js */
window.wgUXS = function (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) {
    var ret = {
        'zh': zh || hans || hant || cn || tw || hk || sg || mo || my,
        'zh-hans': hans || cn || sg || my,
        'zh-hant': hant || tw || hk || mo,
        'zh-cn': cn || hans || sg || my,
        'zh-sg': sg || hans || cn || my,
        'zh-tw': tw || hant || hk || mo,
        'zh-hk': hk || hant || mo || tw,
        'zh-mo': mo || hant || hk || tw
    }
    return ret[wg] || zh || hant || hans || tw || cn || hk || sg || mo || my; //保證每一語言有值
}

window.wgULS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
    return wgUXS(mw.config.get('wgUserLanguage'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};

window.wgUVS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
    return wgUXS(mw.config.get('wgUserVariant'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};

window.importScriptCallback = function(page, ready) {
    importScriptURICallback(mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=' + mw.util.wikiUrlencode(page) + '&action=raw&ctype=text/javascript', ready);
};

window.importScriptURICallback = jQuery.getScript;

/* dev:UserTags */
window.UserTagsJS = {
    modules: {},
    tags: {
        'bureaucrat': { link: 'Project:社区中心团队' },
        'helper': { link: 'Project:国际团队' },
        'staff': { link: 'Project:员工团队' },
        'sysop': { link: 'Project:社区中心团队' },
        'vstf': { link: 'Help:VSTF' },
        'content-moderator': { link: 'Project:PVT' },

/* The CPT project has been archived
        'cpt': { link: 'Project:中文预备志愿者小组', u:'CPT Member' },
        'cpt-consultant': { link: 'Project:中文预备志愿者小组', u:'CPT Consultant' },
        'cpt-clerk': { link: 'Project:中文预备志愿者小组', u:'CPT Clerk' }
*/
    // But now we've got PVT-ZH!
    	'pvt': { link: 'Project:PVT', u: 'PVT' },
    	'pvt-zh': { link: 'Project:PVT', u: 'PVT-ZH' }
    }
};
UserTagsJS.modules.autoconfirmed = false;
UserTagsJS.modules.inactive =  false;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.nonuser = false;

/* The CPT project has been archived
UserTagsJS.modules.custom = {
        'AC0xRPFS001': ['cpt'],
	'Ffaarr': ['cpt', 'cpt-consultant'],
        'HansJie': ['cpt'],
        'Laundry Machine': ['cpt', 'cpt-clerk'],
        '机智的小鱼君': ['cpt', 'cpt-clerk'],
        '铁桶': ['cpt']
};
UserTagsJS.modules.metafilter = {
	'cpt': ['cpt-consultant', 'cpt-clerk']
};
*/
// But again, we've got PVT-ZH!
UserTagsJS.modules.custom = {
    'Winston Sung': ['pvt', 'pvt-zh'],
    '机智的小鱼君': ['pvt', 'pvt-zh'],
    '铁桶': ['pvt', 'pvt-zh'],
    'Lakejason0': ['pvt', 'pvt-zh'],
    'Dianliang233': ['pvt', 'pvt-zh']
};
UserTagsJS.modules.metafilter = {
	'pvt': ['pvt-zh']
};

/* Fix country names chosen by United Nations for the Special:Analytics page */
$(".analytics_table").each(function() {
    $(this).html($(this).html()
        .replace('Brunei Darussalam',                                    'Brunei')
        .replace('Bolivia (Plurinational State of)',                     'Bolivia')
        .replace('China',                                                'Mainland China')
        .replace('中国',                                                  '中国大陆')
        .replace('中華人民共和國',                                         '中國大陸')
        .replace('Falkland Islands (Malvinas)',                          'Falkland Islands')
        .replace('Iran (Islamic Republic of)',                           'Iran')
        .replace('Korea (Democratic People\'s Republic of)',             'North Korea')
        .replace('Korea, Republic of',                                   'South Korea')
        .replace('Lao People\'s Democratic Republic',                    'Laos')
        .replace('Moldova, Republic of',                                 'Moldova')
        .replace('Russian Federation',                                   'Russia')
        .replace('Syrian Arab Republic',                                 'Syria')
        .replace('Tanzania, United Republic of',                         'Tanzania')
        .replace('Taiwan, Province of China',                            'Taiwan')
        .replace('Taiwan, Province of Mainland China',                   'Taiwan')
        .replace('China',                                                'Mainland China')
        .replace('Mainland Mainland China',                              'Mainland China')
        .replace('United Kingdom of Great Britain and Northern Ireland', 'United Kingdom')
        .replace('Venezuela (Bolivarian Republic of)',                   'Venezuela')
        .replace('Viet Nam',                                             'Vietnam')
    );
});

/* MEDIAWIKI JQUERY FUNCTION */
(function ($, mw) {
////////////////////////////////
// MEDIAWIKI JQUERY FUNCTION
/* Opens chat in a new window for homepage */
/* Guided Tours */
if (mw.config.get('wgCanonicalNamespace') == 'User_blog') {
	setTimeout(function() {
		$('.guidedtours-header').each(function() {
			var headerWidth = $(this).find('.text').width();
			var leftMargin = parseInt(headerWidth) + 15 + 'px';
			$(this).next().css('margin-left',leftMargin);
		});
	},250);
}

/* Wikia University */
$('.wu-content .box .next').on('click', function() {
	var currentBox = $(this).parent();
	var nextBox = currentBox.next();
	if (nextBox.length !== 0) {
		$('html, body').animate({
			scrollTop: $(nextBox).offset().top
		}, 500);
	}
});

/** FANDOM SVG logo **/
$('.wds-community-header__wordmark').html(
  $('<a>',{
    'accesskey':'z',
    'href':'/zh/wiki/%E7%A4%BE%E5%8C%BA%E4%B8%AD%E5%BF%83'
  })
  .append(
    $('<img>',{
      'src':'https://vignette.wikia.nocookie.net/central/images/8/8f/FANDOM-logo.svg',
      'width':'250',
      'height':'57',
      'alt':'社区中心'
    })
  )
);

/* Discussion Icon */
$('header li:nth-child(5) .wds-dropdown__toggle > a').prepend('<svg class="wds-icon-tiny wds-icon" id="wds-icons-comment-tiny" viewBox="0 0 12 12"><path id="comment-tiny" d="M4.5 2c-.668 0-1.293.26-1.757.731A2.459 2.459 0 0 0 2 4.5c0 1.235.92 2.297 2.141 2.47A1 1 0 0 1 5 7.96v.626l1.293-1.293A.997.997 0 0 1 7 7h.5c.668 0 1.293-.26 1.757-.731.483-.476.743-1.1.743-1.769C10 3.122 8.878 2 7.5 2h-3zM4 12a1 1 0 0 1-1-1V8.739A4.52 4.52 0 0 1 0 4.5c0-1.208.472-2.339 1.329-3.183A4.424 4.424 0 0 1 4.5 0h3C9.981 0 12 2.019 12 4.5a4.432 4.432 0 0 1-1.329 3.183A4.424 4.424 0 0 1 7.5 9h-.086l-2.707 2.707A1 1 0 0 1 4 12z"></path></svg>') // too lazy to jQuery-ize this

////////////////////////////////
// END
}(jQuery, mediaWiki));