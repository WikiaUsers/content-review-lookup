/*
 * 18:12, September 18, 2014 (UTC)
 * https://dev.fandom.com/wiki/MessageWallUserTags
 * User tags for names on Message Wall + [[Special:Forum|forum]] posts
 * @author: RyaNayR (https://dev.fandom.com/wiki/User:RyaNayR)
 * @edited-by: SuperSajuuk (https://dev.fandom.com/wiki/User:SuperSajuuk)
 * @edited-by: Caburum (https://dev.fandom.com/wiki/User:Caburum)
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
        isUCP = mw.config.get('wgVersion') !== '1.19.24', //Detects whether wiki is legacy or UCP
        margin = '-2px', //The default margin, will be changed for UCP
        selector = 'a.subtle[href$="' + mw.config.get('wgFormattedNamespaces')[1200].replace(/ /g, '_') + ':$1"],' + //Message Wall namespace
            'a.subtle[href$="' + mw.config.get('wgFormattedNamespaces')[3].replace(/ /g, '_') + ':$1"],' + //User talk namespace
            'a[class*="EntityHeader_name__"][href$="' + mw.config.get('wgFormattedNamespaces')[2].replace(/ /g, '_') + ':$1"]'; //Message Wall namespace on UCP
 
    //Set the size and color of the text shadow if it's enabled
    if (glow === true) {
        txtShadow = '0 0 ' + glowSize + ' ' + glowColor;
    }
 
    //Uses different spacing for UCP
    if (isUCP) {
        margin = '6px';
    }
 
    //Main function
    function init() {
        for (var name in users) {
            $(selector.replace(/\$1/g, mw.util.wikiUrlencode(name)))
                .after('<span class="MessageWallUserTag">(' + mw.html.escape(users[name]) + ')</span>');
            $('.MessageWallUserTag').css({
                color: tagColor,
                marginLeft: margin,
                fontSize: txtSize,
                textShadow: txtShadow,
                verticalAlign: 'top'
            });
        }
    }
    if (isUCP) {
        // Message walls are lazy loading on UCP
        var messageWallLoader = setInterval(function() {
            if ($('#MessageWall').length) {
                clearInterval(messageWallLoader);
                init();
            }
        // Change 1000 to the amount of seconds you want to be rechecking
        // whether the masthead exists.
        }, 1000);
    } else {
        init();
    }
}(jQuery, window.MessageWallUserTags = window.MessageWallUserTags || {}));