/* Any JavaScript here will be loaded for all users on every page load. */

/* Back to Top button */

window.BackToTopModern = true;

/* AddRailModule on top */
window.AddRailModule = [{prepend: true}];

/* For card details on card icon hover */
window.tooltips_config = {
    offsetX: 10,
    offsetY: 10
};

window.tooltips_list = [
    {
        classname: 'card-images',
        parse: '{'+'{Card_Images|Character=<#character#>|Rarity=<#rarity#>|Card Title=<#cardtitle#>}}'
    }
];

/* Countdown code */
window.countdownTimer = {
endtextmaintenance: function () {
       $(this).text('This has ended');
    }
};

/* Adding categories to customized upload page */
if (['MultipleUpload', 'Upload'].indexOf(mw.config.get('wgCanonicalSpecialPageName')) > -1) {
        importScript('MediaWiki:Common.js/uploadform.js');
    }