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
$('nav > ul > li:nth-child(3) > div > ul > li:nth-child(1) > a > span').prepend('<svg class="wds-icon-tiny wds-icon navigation-item-icon" id="wds-icons-discussions-tiny" viewBox="0 0 12 12"><path d="M1,12c-0.13,0-0.26-0.02-0.38-0.08C0.24,11.77,0,11.4,0,11V4c0-0.55,0.45-1,1-1s1,0.45,1,1v4.59l0.29-0.29 C2.48,8.11,2.73,8,3,8h4c0.55,0,1,0.45,1,1s-0.45,1-1,1H3.41l-1.71,1.71C1.52,11.9,1.26,12,1,12z M11.38,8.92 C11.76,8.77,12,8.4,12,8V2c0-1.1-0.9-2-2-2H5C3.9,0,3,0.9,3,2v3c0,1.1,0.9,2,2,2h3.59l1.71,1.71C10.48,8.9,10.74,9,11,9 C11.13,9,11.26,8.98,11.38,8.92z M10,2v3.59L9.71,5.29C9.52,5.11,9.27,5,9,5H5V2H10z"></path></svg> ') // too lazy to jQuery-ize this

////////////////////////////////
// END
}(jQuery, mediaWiki));