/* Any JavaScript here will be loaded for all users on every page load. */

if (wgPageName === 'Experience') {
    $(function () {
        importScriptPage('MediaWiki:Calculators/Code.js');
    });
}

if (wgPageName === 'Bonuses') {
    $(function () {
        importScriptPage('MediaWiki:Calculators/BonusCode.js');
    });
}