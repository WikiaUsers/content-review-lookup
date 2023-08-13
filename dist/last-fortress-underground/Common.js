/* Any JavaScript here will be loaded for all users on every page load. */
/* Calculators */

switch (mw.config.get('wgPageName')) {
    case 'Recruit_Calculator':
        $(function () {
            importScriptPage('MediaWiki:Calculators/Code.js');
        });
        break;
    case 'Training_Calculator':
        $(function () {
            importScriptPage('MediaWiki:Calculators/Training.js');
        });
        break;
    case 'Elimination_Calculator':
        $(function () {
            importScriptPage('MediaWiki:Calculators/Elimination.js');
        });
        break;
    case 'Ascending_Calculator':
        $(function () {
        importScriptPage('MediaWiki:Calculators/Ascending.js');
        });
        break;
}