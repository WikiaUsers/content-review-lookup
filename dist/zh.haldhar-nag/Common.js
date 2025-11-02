/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */

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

/* ImageCategory: see https://dev.fandom.com/wiki/ImageCategory */
// <nowiki>
(function() {
	var page = mw.config.get('wgCanonicalSpecialPageName');
	if (
		window.ImageCategoryLoaded ||
		!(/Upload|MultipleUpload/g.test(page))
	) {
        return;
	}
	window.ImageCategoryLoaded = true;
	
	var queryString = window.location.search;
	var urlParams = new URLSearchParams(queryString);

	if (urlParams.get('wpForReUpload') != 1) {
		$('#wpUploadDescription').val(window.ImageCategory || '[[Category:图片]]');
	}
})();
// </nowiki>