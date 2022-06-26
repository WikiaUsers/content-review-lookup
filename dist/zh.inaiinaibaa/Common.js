/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */

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
    /* 保證每一語言有值 */
    return ret[wg] || zh || hant || hans || tw || cn || hk || sg || mo || my;
}

window.wgULS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
    return wgUXS(mw.config.get('wgUserLanguage'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};

window.wgUVS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
    return wgUXS(mw.config.get('wgUserVariant'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};

/* Fix country names chosen by United Nations for the Special:Analytics page */
$(".analytics_table").each(function() {
    $(this).html($(this).html()
        .replace('Brunei Darussalam',                                    'Brunei')
        .replace('Bolivia (Plurinational State of)',                     'Bolivia')
        .replace('China',                                                'Chinese Mainland')
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
        .replace('China',                                                'Chinese Mainland')
        .replace('Mainland China',                              'Chinese Mainland')
        .replace('United Kingdom of Great Britain and Northern Ireland', 'United Kingdom')
        .replace('Venezuela (Bolivarian Republic of)',                   'Venezuela')
        .replace('Viet Nam',                                             'Vietnam')
    );
});