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
            'wgAction',
            'wgCanonicalNamespace',
            'wgCanonicalSpecialPageName',
            'wgNamespaceNumber',
            'wgTitle',
            'wgUserName'
        ]),

        // variable to not hide existing tags
        noHideTags = !!((window.dev || {}).profileTags || {}).noHideTags;

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
            // noRemove = ['staff', 'vstf', 'council', 'authenticated', 'helper'];

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
        var $masthead = $('.UserProfileMasthead hgroup, .user-identity-box .user-identity-header__attributes'),
            linkTestRe = /\[\[.+?\|.+?\]\]/;

        if (!noHideTags) {
            hideTags($masthead);
        }

        tags.forEach(function (tag) {
            var $span = $('<span>').addClass('tag');
            $span.addClass('user-identity-header__tag');

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
     * Get the target user's name from the page title.
     *
     * @return {string} The user's name.
     */
    function getUserName() {
        var user = conf.wgTitle,
            target = mw.util.getParamValue('target'),
            parts = mw.config.get('wgTitle').split('/'),
            username = conf.wgUserName;

        if (
            conf.wgCanonicalSpecialPageName === 'Contributions' ||
            conf.wgCanonicalSpecialPageName === 'UserProfileActivity'
        ){if (target) {
                user = decodeURIComponent(target).replace(/_/g, ' ');
            } else {
                user = parts[1];
            	if (user === '') {
            		user = username;
            	}
            }
}
        return user;
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

            var user = (mw.util.escapeRegExp||(mw.RegExp||{}).escape||$.escapeRE)(getUserName()),
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
        // wait for site RL module to load to ensure config is picked up correctly
        mw.loader.using(['mediawiki.util', 'site'], function() {
            if ($('.UserProfileMasthead').length) {
                // Pre-UCP, Masthead is loaded reliably without JS can be assumed to be there
                getUserTags();
            } else {
                // UCP, User box may take forever to load and there is no event that fires when it does load
                // so we must continually check for its existence until it loads
                var namespace = conf.wgCanonicalNamespace,
                    specialName = conf.wgCanonicalSpecialPageName,
                   notSubpage = (conf.wgTitle || '').indexOf('/') === -1;

                if (
                    ((namespace === 'User') && notSubpage) ||
                    ((namespace === 'User_talk') && notSubpage) ||
                    (namespace === 'Message_Wall') ||
                    ((namespace === 'User_blog') && notSubpage) ||
                    (specialName === 'Contributions') ||
                    (specialName === 'UserProfileActivity')
                ) {
                    var __init = function() {
                        if ($('.user-identity-box').length) {
                            getUserTags();
                        } else {
                            setTimeout(__init, 500);
                        }
                    };
                    __init();
                }
            }
        });
    }

    $(init);
}(jQuery, mediaWiki));