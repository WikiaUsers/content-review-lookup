/**
 * NSFW Tag
 *
 * Really simple script to display a small notification at the top of NSFW
 * pastas. This does not hide any content, and as such, should not violate ToU.
 *
 * You can configure this script to not run if you really hate these tags, just
 * go to [[Special:MyPage/common.js]] and add the following line:
 *
 * window.nsfwTag = { enabled: false };
 *
 * @author  [[User:Underscorre]]
 * @license MIT
 */

;window.nsfwTag = (typeof window.nsfwTag === 'object') ? window.nsfwTag : {};

(function (nsfwTag, mw, window, document, undefined) {
    /**
     * Determines if we should run on this page
     *
     * Considers if the script has run before, if the user has disabled the
     * script themself, and if the page has the NSFW category
     *
     * @return boolean
     */
    nsfwTag.shouldRun = function () {
        if ((nsfwTag.hasOwnProperty('enabled') && nsfwTag.enabled === false) ||
            (nsfwTag.hasOwnProperty('executed') && nsfwTag.executed === true))
        {
            // Early return if user has manually disabled the script
            // (nsfwTag.enabled is false) or if the script has already run for
            // some reason (nsfwTag.executed is true)
            return false;
        }

        var categories = mw.config.get('wgCategories');
        return categories.indexOf('NSFW') !== -1;
    };

    /**
     * Adds the content warning to the DOM
     */
    nsfwTag.addTag = function () {
        // This is super ugly, but there's no reason to make it any more
        // complicated than this IMO + easier for admins to change down the line
        // if they're unhappy with how it looks, since this is just HTML
        var warning = '<div id="nsfw-tag" style="background-color: #505050; text-align: center; padding: 20px;"> \
            <h2 style="border: 0; margin: 0;">NSFW Content Warning</h2> \
            <p style="margin: 0;">This page contains content that is <em>NSFW</em> (not safe for work) and may not be suitable for all audiences. Please use your own discretion to decide whether to proceed.</p> \
            <p style="margin-bottom: 0;">If you are a parent and want to know more about the suitability of our content for your child, please read our <a href="https://cpw.wikia.com/Creepypasta_Wiki:ParentPage">information for parents</a>.</p> \
        </div>';
       $(warning).prependTo('#mw-content-text');
    };

    // Run on document.ready
    $(function () {
        console.log('NSFW tag active!');
        
        if (!nsfwTag.shouldRun()) {
            console.log('NSFW tag did not run');
            return;
        }

        console.log('NSFW tag running...');
        nsfwTag.executed = true;
        nsfwTag.addTag();
    });
} (window.nsfwTag, window.mw, window, document));