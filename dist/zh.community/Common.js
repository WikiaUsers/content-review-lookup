/* MediaWiki:Gadget-site-lib.js */
window.wgUXS = function (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) {
    var ret = {
        'zh': zh || hant || hans || tw || cn || hk || sg || mo || my,
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

/* WAM记录器 */
window.railWAM = {
    logPage:"Project:WAM Log" 
};

/* dev:LockOldBlogs */
window.LockOldBlogs = {
    expiryMessage: wgULS('此博客已存档，无法进行评论。', '此網誌已存檔，無法發表評論。'),
};

/* dev:UserTags */
window.UserTagsJS = {
    modules: {},
    tags: {
        'bureaucrat': { link: 'Project:社区中心团队' },
        'helper': { link: 'Project:国际团队' },
        'staff': { link: 'Project:员工团队' },
        'sysop': { link: 'Project:社区中心团队' },
        'vstf': { link: 'Help:VSTF' }

/* The CPT project has been archived
        'cpt': { link: 'Project:中文预备志愿者小组', u:'CPT Member' },
        'cpt-consultant': { link: 'Project:中文预备志愿者小组', u:'CPT Consultant' },
        'cpt-clerk': { link: 'Project:中文预备志愿者小组', u:'CPT Clerk' }
*/

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
$(".openchat a").click(function () {
    window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
    return false;
});

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

////////////////////////////////
// END
}(jQuery, mediaWiki));