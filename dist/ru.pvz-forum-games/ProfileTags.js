
Custom profile masthead tags
 * 
 * Documentation: <https://dev.wikia.com/wiki/ProfileTags>
 *
 * @author Rappy 4187
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
        var $tags = $masthead.find('.tag');
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
        $tags.hide();
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
            href = mw.util.wikiGetlink(match[1]),
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
        var $masthead = $('.UserProfileMasthead hgroup'),
            linkTestRe = /\[\[.+?\|.+?\]\]/;
 
        if (!noHideTags) {
            hideTags($masthead);
        }
 
        tags.forEach(function (tag) {
            var $span = $('<span>').addClass('tag');
 
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
            target = $.getUrlVar('target'),
            parts;
 
        if (conf.wgCanonicalSpecialPageName === 'Contributions') {
            parts = user.split('/');
 
            // the username can be specified as Special:Contrbutions/USERNAME
            if (parts.length === 2) {
                user = parts[1];
 
            // or Special:Contributions?target=USERNAME
            } else if (target) {
                user = decodeURIComponent(target).replace(/_/g, ' ');
 
            // otherwise default to plain Special:Contributions
            } else {
                // if no user is specified it defaults to the currently logged in user
                // and to your IP if you're logged out
                user = conf.wgUserName;
 
                // wgUserName is null when the user is logged out
                // default to empty string which won't match anything when we look for a tag
                if (user === null) {
                    user = '';
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
 
            // syntax:
            // $username | $tag1, $tag2, $tag3
 
            var user = $.escapeRE(getUserName()),
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
        // rather than checking the namespace/special page name
        // just look for the masthead
        // which prevents loading on user subpages and monobook
        if ($('.UserProfileMasthead').length) {
            // wait for site RL module to load to ensure config is picked up correctly
            mw.loader.using(['mediawiki.util', 'site'], getUserTags);
        }
    }
 
    $(init);
}(jQuery, mediaWiki));