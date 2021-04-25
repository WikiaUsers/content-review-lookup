/** MediaWiki:Wikia.js - Loads for every user using the Oasis skin. **/

/* Configuration for AddRailModule */
window.AddRailModule = [
    {page: "Template:RailModule", prepend: true, maxAge: 86000},
];
/* this was taken from w:c:bokunoheroacademia - should make the "Join Now!" text readable */
mw.hook('wikipage.content').add(function ($elem) {
    $elem.filter('section.railModule.rail-module')
         .find('span.wds-button>a:only-child')
         .attr('class', 'wds-button')
         .unwrap();
});

/* Configuration for AjaxRC */
window.ajaxSpecialPages = ["Log", "Log/upload", "Log/newusers"];
window.ajaxRefresh = 30000;