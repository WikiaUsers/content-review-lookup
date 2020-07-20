/* Any JavaScript here will be loaded for all users on every page load. */

/*
 * 18:12, September 18, 2014 (UTC)
 * http://dev.wikia.com/wiki/MessageWallUserTags
 * User tags for names on Message Wall + [[Special:Forum|forum]] posts
 * @author: RyaNayR (http://dev.wikia.com/wiki/User:RyaNayR)
 * @edited-by: SuperSajuuk (http://dev.wikia.com/wiki/User:SuperSajuuk)
 *
 * This script is OpenSource —
 * It is completely free for anyone to use or modify in any way.
 * All modifications and improvements are welcome and appreciated.
 */
 
(function($, config) {
    //Setup configuration options, internal variables, and default values:
    var tagColor = config.tagColor || 'red',
        glow = config.glow || true, //Text-shadow effect: true/false
        glowColor = config.glowColor || '#f77',
        glowSize = config.glowSize || '20px', //Text-shadow size
        txtSize = config.txtSize || '10px', //Text size
        users = config.users || {}, //List of users to tag and what the tag will say
        txtShadow = '', //Internal text shadow variable — nothing by default
        selector = 'a.subtle[href$="' + mw.config.get('wgFormattedNamespaces')[1200].replace(/ /g, '_') + ':$1"],' + //Message Wall namespace
            'a.subtle[href$="' + mw.config.get('wgFormattedNamespaces')[3].replace(/ /g, '_') + ':$1"]'; //User talk namespace
 
    //Set the size and color of the text shadow if it's enabled
    if (glow === true) {
        txtShadow = '0 0 ' + glowSize + ' ' + glowColor;
    }
 
    //Main function
    function init() {
        for (var name in users) {
            $(selector.replace(/\$1/g, mw.util.wikiUrlencode(name)))
                .after('<span class="MessageWallUserTag">' + mw.html.escape(users[name]) + '</span>');
            $('.MessageWallUserTag').css({
                color: tagColor,
                marginLeft: '-2px',
                fontSize: txtSize,
                textShadow: txtShadow,
                verticalAlign: 'top'
            });
        }
    }
    init();
}(jQuery, window.MessageWallUserTags = window.MessageWallUserTags || {}));