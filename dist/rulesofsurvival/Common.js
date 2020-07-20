/* Import */
window.PurgeButtonText = 'Refresh';
window.InactiveUsers = {
    days: 30
};

importScriptPage('https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js');
importScriptPage('https://code.jquery.com/jquery-1.10.2.js');

importArticles({
    type: 'script',
    articles: [
        'u:outcast:MediaWiki:wikia.js/Slider.js'
    ]
});


/*********************************************************************************/
/* sliders using jquery by Dragon Age wiki User:Tierrie . All credit goes to him. */
/*********************************************************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});

/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/* configuration section for tooltips */
var tooltips_config = {
    offsetX: 20,
    offsetY: 20,
    waitForImages: true,
    noCSS: true,
};

var tooltips_list = [
    {
        classname: 'tooltip-weapon',
        parse: '{'+'{WeaponData|<#weapon#>|<#capt#>|<#damage#>|<#fire-rate#>|<#fire-range#>|<#mag-size#>}}'
    }, {
        classname: 'tooltip-equipment',
        parse: '{'+'{Tooltip/Equipment|<#equipment#>|<#type#>|<#damred#>|<#cap#>}}'
    }, {
        classname: 'tooltip-vehicle',
        parse: '{'+'{Tooltip/Vehicle|<#vehicle#>|<#type#>|<#terrain#>|<#seats#>|<#speed#>|<#protection#>}}'
    }, {
        classname: 'tooltip-consumable',
        parse: '{'+'{Tooltip/Consumable|<#consumable#>|<#type#>|<#damred#>|<#durability#>|<#cast#>}}'
    }, {
        classname: 'tooltip-ammunition',
        parse: '{'+'{Tooltip/Ammunition|<#Ammunition#>}}'
    }
];

/* end of configuration section for tooltips */