/* Any JavaScript here will be loaded for all users on every page load. */
/* Calculators */
if (mw.config.get('wgPageName') === 'Recruit_Calculator') {
    $(function () {
        importScriptPage('MediaWiki:Calculators/Code.js');
    });
}