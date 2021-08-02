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
    event: function () {
       $(this).text('This event has ended');
    }
};
window.countdownTimer = {
  tryouts: function () {
       $(this).text('This tryouts has ended');
    }
};

window.countdownTimer = {
endtextmaintenance: function () {
       $(this).text('This maintenance has ended');
    }
};

/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* Adding categories to customized upload page */
if (['MultipleUpload', 'Upload'].indexOf(mw.config.get('wgCanonicalSpecialPageName')) > -1) {
        importScript('MediaWiki:Common.js/uploadform.js');
    }