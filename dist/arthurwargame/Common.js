/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "style",
    articles: [
        "w:c:dev:FontAwesome/code.css"
    ]
});

/****************************************************/
/*          Custom tooltip implementation           */
/* We're using the Tooltips script from dev:        */
/* http://dev.wikia.com/wiki/Tooltips#Configuration */
/****************************************************/

var tooltips_list = [
//  {
//      classname: '', // CSS class that will trigger the tooltip of this type. Required.
//      text: '',      // String or function determining the contents of the tooltip.
//      parse: '',     // Similar to text, resulting text will be parsed, allowing wiki syntax.
//                     // An API call will be used, so this will result in a short delay.
//      onParsed: '',  // Will be executed when the parsed text has been fetched (this = tooltip).
//  },
    {
        classname: 'tooltip-trait',
        alignment: 'tooltip',
        parse: '{| class="trait-tooltip"\n| class="trait-tooltip-description" | <#description#>\n|-\n| class="trait-tooltip-explanation" | <#explanation#>\n|}'
    }
];