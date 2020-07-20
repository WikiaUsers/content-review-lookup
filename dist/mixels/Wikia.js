/* Fix idiotic country names chosen by United Nations for the Analytics page */
$(".analytics_table").each(function() {
    $(this).html($(this).html()
        .replace('Brunei Darussalam',                                            'Brunei')
        .replace('Bolivia (Plurinational State of)',                            'Bolivia')
        .replace('Côte d\'Ivoire',                                          'Ivory Coast')
        .replace('Falkland Islands (Malvinas)',                        'Falkland Islands')
        .replace('Iran (Islamic Republic of)',                                     'Iran')
        .replace('Korea (Democratic People\'s Republic of)',                 'North Korea')
        .replace('Korea, Republic of',                                      'South Korea')
        .replace('Lao People\'s Democratic Republic',                              'Laos')
        .replace('Moldova, Republic of',                                        'Moldova')
        .replace('Russian Federation',                                           'Russia')
        .replace('Syrian Arab Republic',                                          'Syria')
        .replace('Tanzania, United Republic of',                               'Tanzania')
        .replace('Taiwan, Province of China',                                    'Taiwan')
        .replace('United Kingdom of Great Britain and Northern Ireland', 'United Kingdom')
        .replace('United States of America',                              'United States')
        .replace('Venezuela (Bolivarian Republic of)',                        'Venezuela')
        .replace('Viet Nam',                                                    'Vietnam')
    );
});