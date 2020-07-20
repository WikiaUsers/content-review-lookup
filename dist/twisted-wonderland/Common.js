/* Any JavaScript here will be loaded for all users on every page load. */
//Custom Tooltips
var tooltips_config = {
    offsetX: 0,
    offsetY: 20,
    waitForImages: true,
    events: ['CustomEvent'],
    noCSS: true,
};
 
var tooltips_list = [
{
    classname: 'magic-tooltip',
    parse: '{| \n!<#name#>\n|-\n|<#skill#>\n|}', 
    delay: 500,
},
{
    classname: 'buddy-tooltip',
    text: '<#buddy#>', 
    delay: 500,
},
];

//back to top button
window.BackToTopModern = true;

window.ajaxSpecialPages = ["Recentchanges", "WikiActivity"];