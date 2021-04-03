/* Any JavaScript here will be loaded for all users on every page load. */

/* configuration section for tooltips */
window.tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true,
};

window.tooltips_list = [
    {
        classname: 'item-tooltip',
        parse: '{'+'{Tooltip/Item|<#item#>}}'
    }, {
        classname: 'weapon-tooltip',
        parse: '{'+'{Tooltip/Weapon|<#weapon#>}}'
    }, {
        classname: 'armor-tooltip',
        parse: '{'+'{Tooltip/Armor|<#armor#>}}'
    }, {
        classname: 'accessory-tooltip',
        parse: '{'+'{Tooltip/Accessory|<#accessory#>}}'
    }, {
        classname: 'offhand-tooltip',
        parse: '{'+'{Tooltip/Offhand|<#offhand#>}}'
    }, {
        classname: 'ability-tooltip',
        parse: '{'+'{Tooltip/Ability|job=<#job#>|ability=<#ability#>}}'
    }, {
        classname: 'monster-tooltip',
        parse: '{'+'{Tooltip/Monster|<#monster#>}}'
    }, {
        classname: 'npc-tooltip',
        parse: '{'+'{Tooltip/Npc|<#npc#>}}'
    }, {
        classname: 'legendary-tooltip',
        parse: '{'+'{Tooltip/Legendary|<#legendary#>}}'
    }, {
        classname: 'gear-set-tooltip',
        parse: '{'+'{Tooltip/Gear set|<#set#>}}'
    },
];

/* end of configuration section for tooltips */

/* clickable elements */
/* should use css class .link, and have an attribute data-linkto= */
function linkMe(element) {
    window.location.href = "https://tangledeep.wikia.com/wiki/" + element.dataset.linkto;
}

window.addEventListener('load', function() {
    var links = document.querySelectorAll(".link");
    for (i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function() {
            linkMe(this);
        });
    }
});

/* end clickable elements */


/* EOF */