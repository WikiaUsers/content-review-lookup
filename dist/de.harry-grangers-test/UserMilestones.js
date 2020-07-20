(function() {
    var config = {
        'membership-period': {
            1: 'one-day',
            7: 'one-week',
            30: 'one-month',
            91: 'quarter-year',
            365: 'one-year',
            '*': 'n-years'
        },
        'contribution-count': {
            10: ''
        }
    };
    console.log('config',config);
    mw.hook('dev.i18n').add(function (i18n) {
        console.log(i18n);
    });

    importArticle({ type: 'script', article: 'u:dev:I18n-js/code.js' });
})();