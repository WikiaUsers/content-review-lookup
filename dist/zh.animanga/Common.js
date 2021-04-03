/* Any JavaScript here will be loaded for all users on every page load. */

// <nowiki>

/* RailWAM */
window.railWAM = {
    logPage: "Project:WAM Log",
    showLogAlert: false,
};

/* Special:Analytics */
$(".analytics_table").each(function() {
    $(this).html($(this).html()
        .replace('Brunei Darussalam',                                    'Brunei')
        .replace('Bolivia (Plurinational State of)',                     'Bolivia')
        .replace('China',                                                'Mainland China')
        .replace('中国',                                                  '中国大陆')
        .replace('中華人民共和國',                                         '中國大陸')
        .replace('Iran (Islamic Republic of)',                           'Iran')
        .replace('Korea (Democratic People\'s Republic of)',             'Democratic People\'s Republic of Korea (North Korea)')
        .replace('Korea, Republic of',                                   'Republic of Korea (South Korea)')
        .replace('Moldova, Republic of',                                 'Moldova')
        .replace('Tanzania, United Republic of',                         'Tanzania')
        .replace('Taiwan, Province of China',                            'Taiwan')
        .replace('Taiwan, Province of Mainland China',                   'Taiwan')
        .replace('台灣',                                                  '臺灣')
        .replace('China',                                                'Mainland China')
        .replace('Mainland Mainland China',                              'Mainland China')
        .replace('Venezuela (Bolivarian Republic of)',                   'Venezuela')
        .replace('Viet Nam',                                             'Vietnam')
    );
});

// </nowiki>