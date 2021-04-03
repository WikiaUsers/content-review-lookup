/**
 * <nowiki>
 * @name        HashAnchorInTabView
 * @version     1.0.0
 * @author      Effan_R (https://disneymagickingdomswiki.fandom.com/wiki/User:Effan_R)
 * @desc        Enables #anchor linking to sections inside TabView tabs
 * 
 * The links of format 'PAGE#TAB-NAME/SECTION-NAME' will link to PAGE and
 * switch to TabView tab TAB-NAME and scroll to section SECTION-NAME.
 * 
 * If only TAB-NAME is specified, it will switch to the TAB-NAME but
 * will not scroll to any section
 * 
 * If the TAB-NAME is 'auto', and SECTION-NAME has episode no. at the 
 * end in format #ddd, will automaticall select the tab with name including
 * range of episodes as #sss - #eee, where #sss < #ddd < #eee.
 * 
 * If the TAB-NAME is not specified and the config value AutoSelecTabs = true (default)
 * automatic selection of tab will be tried like above. If SECTION-NAME matches
 * a tab name, it will be considered tab name.
 */

require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    'use strict';
 
    window.HashAnchorInTabView = window.HashAnchorInTabView || {};
    if (typeof window.HashAnchorInTabView.Load !== 'undefined' 
            || $('body').hasClass('editor')
            || window.location.hash === ''
            || !$('div[id^="flytabs"]')) {
        return; // prevent second load, or if not needed
    }
 
    window.HashAnchorInTabView = $.extend({
        Load: true,
        AutoSelectTabs: true,
    }, window.HashAnchorInTabView);
 
    //Split hash into tab-name and (section heading if present)
    //Matches with or without the starting # ??
    var res = location.hash.match(/^#?(.+?)(?:(?:[\.%]2f|\/)(.+))?$/i);
 
    var tabPart = res[1];
    var sectPart = res[2];
 
    var autoMode = false;
    var episode;
    
    if (tabPart.toLowerCase() == 'auto' && sectPart) {
        // search for episode number
        res = sectPart.replace(/[\.%]\d\d/g, '').match(/\(?#?(\d+)\)?$/);
 
         // Auto option is invalid if no episode number in hash section
        if (res === null) {
            return;
        }
        episode = parseInt(res[1], 10);
        autoMode = true;
    } else if (!sectPart && window.HashAnchorInTabView.AutoSelectTabs) {
        res = tabPart.replace(/[\.%]\d\d/g, '').match(/\(?#?(\d+)\)?$/);
 
        if (res !== null) {
            episode = parseInt(res[1], 10);
            autoMode = true;
        }
    }

    // check if tab data loaded after tab activation
    // in this case wait for throbber to finish before scrolling
    var loadAfterClick = false;
 
     function watchThrobber(elem, condition, callback) {
        var cb = function() {
            if (condition()) {
                callback();
                observer.disconnect();
            }
        };
        var observer = new MutationObserver(cb);
        
        observer.observe(elem, { childList: true, subtree: true });
    }

    function processHash() {
        // Not done till Tab structure populated
        var done = false;
        
        var myTab = tabPart.replace(/\./g, "%");
        var mySect = sectPart;

        // find the required Tab 
        var $tab = $('.tabs>li[data-tab^="flytabs"]').filter(function() {
                // The tab structure has been populated
                done = true;

                return (mw.util.wikiUrlencode($(this).prop('innerText')) == myTab);
            });

        // Try auto select mode if tab name not matched
        if (!$tab.length && autoMode) {
            $tab = $('.tabs>li[data-tab^="flytabs"]').filter(function() {
                    // The tab structure has been populated
                    done = true;

                    // auto mode, match episode number in Tab start-end range
                    var startEnd = $(this).prop('innerText')
                                    .match(/(\d+?)[^\d]*\-[^\d]*(\d+)?/);

                    if (startEnd && (episode >= parseInt(startEnd[1], 10))
                            && (!startEnd[2] || episode <= parseInt(startEnd[2], 10))
                        ) {
                        if (!mySect) {
                            mySect = tabPart;
                        }
                        return true;
                    }
                    return false;
                });
        }

        // Tab Name match found
        if ($tab.length) {
            // find the tab content-wrapper
            var $dataTab = $('#' + $tab.closest('div').attr('id')
                    + '-content-wrapper > [data-tab-body="'
                    + $tab.attr('data-tab') + '"]');

            var loaded = ($dataTab.length
                    && $dataTab.data('loaded') === true);

            // No need to wait for lazy-load if Tab data 
            // already loaded before Tab activation (click)
            // or no section part
            done = (loaded || !mySect);
 
            if (!$tab.hasClass('selected')) {
                // Activate the required Tab
                $tab.children('a').click();
 
                // Tab data was not loaded and will be
                // loaded after Tab activation (click)
                loadAfterClick = !loaded;
            }
            
            if (loaded && mySect && $tab.hasClass('selected')) {
                var anchorElement = $dataTab.find('[id="' + mySect + '"]').get(0);

                if (anchorElement) {
                    if (loadAfterClick) {
                        // content lazy-loaded after click?
                        // wait for rendering to finish
                        var tabElement = $dataTab.get(0);

                        watchThrobber(tabElement, function() {
                            return !tabElement.querySelector('.WikiaThrobber');
                        }, function() {
                            anchorElement.scrollIntoView(true);
                        });
                    } else {
                        anchorElement.scrollIntoView(true);
                    }
                }
            }
        }
 
        // If done processing, don't wait for content lazy-load
        // This is done so that further lazy-load possibly triggered when
        // user clicks on other tab, should not start process again.
        if (done) {
            mw.hook('wikipage.content').remove(processHash);
        }
    }
 
    // add hook to process after content ready
    mw.hook('wikipage.content').add(processHash);
});