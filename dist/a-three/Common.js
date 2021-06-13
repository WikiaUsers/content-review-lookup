/* Any JavaScript here will be loaded for all users on every page load. */

/* Back to Top button */

window.BackToTopModern = true;

/* AddRailModule on top */
window.AddRailModule = [
    {page: 'Template:CurrentBirthday', prepend: true},
];

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