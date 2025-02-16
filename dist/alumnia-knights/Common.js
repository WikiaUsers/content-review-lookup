/* Any JavaScript here will be loaded for all users on every page load. */
/* Username replace feature <Installed>
 * Inserts viewing user's name into <span class="insertusername"></span>
 * Put text inside the spans to be viewed by logged out users
 * Originally by [[wikia:User:Splarka|Splarka]], then by [[User:Spang|Spang]],
 * This (jQuery) version by [[wikia:User:Joeyaa]], written to be backwards compatible
 */
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) { return; }
    $('span.insertusername').text(mw.config.get('wgUserName'));
});

/* For Knight Icon Hover */
window.tooltips_list = [
    {
        classname: 'chartooltip',
        parse: '{{CharTooltip|<#aurorian#>|<#image#>}}'
    }
];
window.tooltips_config = {
    offsetX: 10,
    offsetY: 10
};