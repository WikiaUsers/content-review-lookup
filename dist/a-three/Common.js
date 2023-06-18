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
        classname: 'icon_img',
        parse: '{'+'{Card_ID/Image|<#card#>}}'
    }
];