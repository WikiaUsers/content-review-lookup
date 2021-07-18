/**
 * Custom profile masthead tags
 *
 * Documentation: <https://dev.fandom.com/wiki/ProfileTags>
 *
 * @author Rappy
 * @author Cqm
 */

/* jshint
  
    bitwise:true, camelcase:true, curly:true, eqeqeq:true, latedef:true, maxdepth:3,
    maxlen:120, newcap:true, noarg:true, noempty:true, nonew:true, onevar:true,
    plusplus:false, quotmark:single, undef:true, unused:true, strict:true, trailing:true,

    asi:false, boss:false, debug:false, eqnull:false, evil:false, expr:false,
    lastsemic:false, loopfunc:false, moz:false, proto:false, scripturl:false,

    browser:true, devel:false, jquery:true
*/

/*global mediaWiki */

(function ($, mw) {
    'use strict';

    var conf = mw.config.get([
            'debug',
            'profileUserName',
            'wgCanonicalNamespace',
            'wgTitle'
        ]),

        // variable to not hide existing tags
        noHideTags = !!((window.dev || {}).profileTags || {}).noHideTags;

    if (conf.wgCanonicalNamespace === 'MediaWiki' && conf.wgTitle === 'ProfileTags') {
        var content = $('#mw-content-text .mw-parser-output');
        if (!content.length) {
            return;
        }
        var pre = $('<pre>', {
            text: content.text().trim()
        });
        content.replaceWith(pre);        
    } else if (!conf.profileUserName) {
        return;
    }

    /**
     * Hide tags from the user profile masthead.
     *
     * @todo enable ability conditionally remove tags
     *
     * @param $masthead {jquery.object} A reference to the user profile masthead.
     */
    function hideTags($masthead) {
        var $tags = $masthead.find('[class*="tag"]');
            // whitelist of which tags not to remove
            // noRemove = ['staff', 'soap', 'council', 'authenticated', 'helper'];

        /*
        // this tests if the tag is one of the tags not to remove
        // however, there's nothing reliable to hook off at the moment
        // so this is commented out until that's done
        $tags.each(function () {
            var $this = $(this),

            noRemove.forEach(function (tag) {
                if (!$this.hasClass(tag)) {
                    $this.remove();
                }
            });
        });
        */

        // @todo remove when above code goes live
        $tags.remove();
    }

    /**
     * Get a class to add to the user tag.
     *
     * @param tag {string} The text of the user tag.
     * @return {string} A string representing the tag's class.
     */
    function getTagClass(tag) {
        var tagClass = 'tag-' + tag.toLowerCase().replace(/\s/g, '_');
        return tagClass;
    }

    /**
     * Get a user tag with a link within.
     *
     * @param $span {jquery.object} A reference to the user tag.
     * @param tag {string} The user tag to turn into a link.
     * @return {jquery.object} The linked user tag.
     */
    function getLinkTag($span, tag) {
        var re = /\[\[(.+?)\|(.+?)\]\]/,
            match = re.exec(tag),
            href = mw.util.getUrl(match[1]),
            text = match[2],
            $a = $('<a>')
                .attr('href', href)
                .css('color', 'inherit')
                .text(text);

        $span.addClass(getTagClass(tag)).append($a);
        return $span;
    }

    /**
     * Add a user's tags to their profile masthead.
     *
     * @param tags {array} The tags to add to the user masthead.
     */
    function addProfileTags(tags) {
        var $masthead = $('.user-identity-box .user-identity-header__attributes'),
            linkTestRe = /\[\[.+?\|.+?\]\]/;

        if (!noHideTags) {
            hideTags($masthead);
        }

        tags.forEach(function (tag) {
            var $span = $('<span>').addClass('user-identity-header__tag');

            if (linkTestRe.test(tag)) {
                $span = getLinkTag($span, tag);
            } else {
                $span.addClass(getTagClass(tag)).text(tag);
            }

            // add a space because otherwise the padding isn't right
            // when existing tags aren't hidden
            $masthead.append($span, ' ');
        });
        mw.hook('dev.profile-tags').fire();
    }

    /**
     * Get the user tag configuration for a user.
     */
    function getUserTags() {
        var params = {
                action: 'raw',
                title: 'MediaWiki:ProfileTags'
            };

        // get uncached page in debug mode
        if (conf.debug) {
            params.maxage = 0;
            params.smaxage = 0;
        }

        $.get(mw.util.wikiScript(), params, function(data) {

            if (!data.length) {
                return;
            }

            if (/^!nohide/.test(data)) {
                noHideTags = true;
            }

            // syntax:
            // $username | $tag1, $tag2, $tag3

            var escapeRegExp = mw.util.escapeRegExp||(mw.RegExp||{}).escape,
                user = escapeRegExp(conf.profileUserName),
                re = new RegExp('(?:^|\\n)\\s*' + user + '\\s*\\|\\s*(.*?)\\s*(?:\\n|$)'),
                match = re.exec(data),
                tags;

            if (match === null) {
                return;
            }

            tags = match[1].split(/\s*,\s*/);

            if (tags.length) {
                addProfileTags(tags);
            }
        });
    }

    /**
     * Check for the correct environment and load the required dependencies.
     */
    function init() {
        var __init = function() {
            if ($('.user-identity-box').length) {
                getUserTags();
            } else {
                setTimeout(__init, 500);
            }
        };
        __init();
    }

    // wait for site RL module to load to ensure config is picked up correctly
    mw.loader.using(['mediawiki.util', 'site']).then(init);
}(jQuery, mediaWiki));