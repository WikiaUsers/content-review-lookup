/* Any JavaScript here will be loaded for all users on every page load. */
/* Calculators */
if (mw.config.get('wgPageName') === 'Recruit_Calculator') {
    $(function () {
        importScriptPage('MediaWiki:Calculators/Code.js');
    });
}
if (mw.config.get('wgPageName') === 'Training_Calculator') {
    $(function () {
        importScriptPage('MediaWiki:Calculators/Training.js');
    });
}
if (mw.config.get('wgPageName') === 'Elimination_Calculator') {
    $(function () {
        importScriptPage('MediaWiki:Calculators/Elimination.js');
    });
}
if (mw.config.get('wgPageName') === 'Ascending_Calculator') {
    $(function () {
        importScriptPage('MediaWiki:Calculators/Ascending.js');
    });
}