// <nowiki>
// created by Curiouscrab
// key search words: custom buttons, custom page controls, page controls, custom, buttons, custom button, add custom button, add custom buttons, add custom page controls, custom tab, custom tabs, add custom tabs, add custom tab, add tab, add tabs
// use "exclude = [
//          'PAGENAME',
//          'ANOTHERPAGENAME'
//      ];
// to define which pages the button doesn't show on
// use "excludens = [
//          'NAMESPACE#',
//          'ANOTHERNAMESPACE#'
//      ];
// to defined which namespaces the button doesn't show in
// use "link = URL;" to set destination of button
// use "id = ID;" to set the id of the button
// use "tooltip = HOVERTEXT;" to set the text that displays when hovered over
// use "target = TARGETMETHOD;" to set the target location of the page to open in
// use "accesskey = ACCESSKEY;" to set the accesskey
// use "JS = JAVASCRIPT;" to set what actions the button does when clicked on
// use "wikitext = TEXT;" to set the text that displays on the button
var exclude;
var excludens;
var link;
var id;
var tooltip;
var target;
var accesskey;
var JS;
var wikitext;
var config;
config = mw.config.get([
    'wgNamespaceNumber',
    'wgPageName'
]);
if (
    (exclude = exclude || []).indexOf(config.wgPageName) === -1 &&
    (excludens = excludens || []).indexOf(config.wgNamespaceNumber) === -1
) {
    $('.UserProfileActionButton .wikia-menu-button .WikiaMenuElement, .page-header__contribution-buttons .wds-list').append('<li><a href="' + (link || '#') + '" id="' + (id || '') + '" title="' + (tooltip || '') + (accesskey!==undefined ? ' [alt-shift-' + accesskey + ']' :'') + '" target="' + (target || '') + '" accesskey="' + (accesskey || '') + '" onclick=' + (JS || '') + '>' + (wikitext || 'Custom Button') + '</a></li>');
}
console.log('Loaded CustomButton v1.0');