/*
    TabberLinks.js (InfoboxTabberLinks.js)
    Author: Macklin
*/
(function()
{
    if (document.readyState == "loading")
        document.addEventListener("readystatechange", tabberLinks);
    else
        tabberLinks();

    function tabberLinks()
    {
        // Script was already loaded in this window
        if (window.dev && window.dev.tabberLinks && window.dev.tabberLinks.loaded == true)
        {
            console.error("TabberLinks - Not running script more than once on page!");
            return;
        }

        var tabsModuleName = getModuleName("tabs");
        var tabsModule = mw.loader.moduleRegistry[tabsModuleName];
        
        var config = Object.assign({
        	luaTabberOnly: false,
        	scrollToTab: true,
        	alwaysScroll: false,
        	neverScroll: false,
        	descendantSwitching: true,
            prioritizeIds: false
        }, window.tabberLinks);

        window.dev = window.dev || {};
        window.dev.tabberLinks = { loaded: true };
        window.dev.tabberLinks.config = config;
        delete window.tabberLinks;
        
        var tabsWithHashCache = new Map();
        
        var tabbers = document.querySelectorAll(".tabber");
        var panels = document.querySelectorAll((config.luaTabbersOnly ? ".pi-theme-tabber" : "") + ":is(.pi-panel, .pi-image-collection).wds-tabber");
        
        if (tabbers.length > 0 || panels.length > 0)
        {
            window.addEventListener("hashchange", switchTabToCurrentHash);
        }
        
        if (panels.length > 0)
        {
            panels.forEach(function(p)
            {
                // Add tabber class so the panel is considered by ext.fandom.Tabber.js
                p.classList.add("tabber");
                
                // Add data-hash to each tab, using the label
                var tabs = p.querySelectorAll(".wds-tabs__tab");
                tabs.forEach(function(t)
                {
                    var tabLabel = t.querySelector(".wds-tabs__tab-label");
                    t.dataset.hash = tabLabel.textContent.trim();
                });
            });
        }

        // This listener is used in the event that a user clicks on a link to a tab
        // that is already shown. Because doing so doesn't fire the hashchange event,
        // the tab won't be scrolled to, so we need to manually check for this case
        window.addEventListener("click", function(e)
        {
            var target = e.target.closest("a");

            // Check if this is a selflink with a hash
            if (target && target.hostname == location.hostname &&
                          target.pathname == location.pathname &&
                          target.hash.length > 0)
            {
                // Check if it points to a hash that is currently-selected, and if so - switch!
                var hash = decodeURIComponent(target.hash.substr(1));
                if (hasTabsWithHash(hash, true)) switchTabToHash(hash);
            }
        });

        // Do a few unique things with the initial hash's tab
        var initialHash = decodeURIComponent(window.location.hash.substr(1));
        var hasInitialHashTab = isHashTabOrWithinTab(initialHash);
        if (hasInitialHashTab && !config.neverScroll)
        {
            // Poison trackLinks' anchorScrollWithOffsetOnLoadEvent_1 export so it does not fire
            var trackLinksName = getModuleName("trackLinks");
            mw.loader.using(trackLinksName, function(require)
            {
                require(trackLinksName).anchorScrollWithOffsetOnLoadEvent_1 = function(){};
            });
        }
        
        // If ext.fandom.Tabber.js isn't loaded, load and run it
        
        // If there are non-infobox tabbers on the page, it will already be loaded

        // Otherwise, it will not be loaded. Because we've added the requisite data above,
        // it should treat the panel/sections as any other tabber and switch to them automatically
        // this will mean the tab is switched to twice, but this doesn't matter
        mw.loader.using("ext.fandom.Tabber.js", switchTabToCurrentHashOnPageLoad);
        
        function switchTabToCurrentHashOnPageLoad()
        {
            if (!hasInitialHashTab) return;
            
            // If the page has collapsibles, we have to wait for the collapsibles to be
			// created and (potentially) collapsed before scrolling, otherwise the scroll
            // position may be offset.
			if (document.querySelector(".mw-collapsible:not(.mw-made-collapsible)"))
			{
				var deferred = function()
				{
                    switchTabToHash(initialHash);
                    
					// We're can't trust wikipage.collapsibleContent to not fire more
					// than once here so remove it inside the callback
					mw.hook("wikipage.collapsibleContent").remove(deferred);
				};
				
				mw.hook("wikipage.collapsibleContent").add(deferred);
                return;
			}
            else
            {
                switchTabToHash(initialHash);
            }
        }
    
        // Switches to the tab(s) specified in the document hash
        function switchTabToCurrentHash()
        {
            var hash = decodeURIComponent(window.location.hash.substr(1));
            switchTabToHash(hash);
        }

        // Switches to the tab(s) matching a specific hash
        // Ensure that "hash" has been URL decoded with decodeURIComponent, and that it does not contain a leading '#'
        function switchTabToHash(hash)
        {
            // Don't do anything there's no actual hash
            if (!hash || hash == "") return;

            var target;
            var switchTabs = [];

            // Get the element whose ID matches this hash
            var targetId = document.getElementById(hash);
            
            // Get all tabs whose data-hash matches this hash
            var targetTabs = getTabsWithHash(hash);

            // Hash refers to element
            // If tabs with this data-hash also exist, only switch to the element with this ID if prioritizeIds is true
            if (targetId && ((targetTabs.length > 0 && config.prioritizeIds) || targetTabs.length == 0))
            {
                if (config.descendantSwitching)
                {
                    target = targetId;
                    
                	// Get all tabs that the target is a descendant of
                    switchTabs = getAncestorTabs(targetId);

                    // Don't do anything if this ID isn't contained in a tab
                    if (switchTabs.length == 0) return;
                }
                else
                    target = null;
            }

            // Hash may refer to tab
            else if (targetTabs.length > 0)
            {
                switchTabs = targetTabs;
                
                // Scroll to the first matching tab
                if (config.scrollToTab)
                    target = targetTabs[0];
                
                var ancestorTabs = [];
                
                // Also switch to the ancestors of all tabs
                for (var i = 0; i < switchTabs.length; i++)
                {
                    var ats = getAncestorTabs(switchTabs[i]);
                    for (var j = 0; j < ats.length; j++)
                        ancestorTabs.push(ats[j]);
                }

                // Combine endpoint and ancestor tabs and make unique by making it a set
                switchTabs = Array.from(new Set(switchTabs.concat(ancestorTabs)));
            }
            
            switchTabs.forEach(function(t){ tabsModule.module.exports.tabs.switchTab(t); });
            scrollToElem(target);
        }

        function isHashTabOrWithinTab(hash)
        {
            if (!hash || hash == "") return;
            
            var targetId = document.getElementById(hash);
            return (targetId && hasAncestorTabs(targetId)) || hasTabsWithHash(hash);
        }

        function hasAncestorTabs(element)
        {
            return getAncestorTabs(element, true) != null;
        }

        // Given an element, goes up the DOM and collects every .wds-tab__tab that must be enabled in order for that element to be visible
        function getAncestorTabs(element, firstOnly)
        {
            var ancestorTabs = [];
            
            while (true)
            {
                var content = element && element.closest(".wds-tab__content");
                
                if (content)
                {
                    // Get the index of the content so that we can pick the tab with the same index
                    var index = Array.from(content.parentNode.children).indexOf(content);
                    var tabber = content.closest(".wds-tabber");
    
                    // Get tabs of this tabber
                    var tabs = tabber && tabber.querySelectorAll(":scope > .wds-tabs__wrapper .wds-tabs__tab");

                    // Get the tab with the same index as the content
                    var tab = tabs && tabs[index - 1];
                    
                    if (tab)
                    {
                        ancestorTabs.push(tab);

                        // Short circuit if we're only returning the first
                        if (firstOnly) return tab;
                    }
                    element = content.parentElement;
                }
                else
                {
                    return ancestorTabs;
                }
            }
        }

        function hasTabsWithHash(hash, activeOnly)
        {
            return (!activeOnly && tabsWithHashCache.has(hash)) || Array.from(document.querySelectorAll(".wds-tabs__tab"))
            .some(function(t){ return t.matches((activeOnly ? ".wds-is-current" : "") + '[data-hash="' + hash + '"]'); });
        }

        // Returns an array of all tab elements with the data-hash matching the hash passed
        // Ensure that "hash" has been URL decoded with decodeURIComponent, and that it does not contain a leading '#'
        function getTabsWithHash(hash, activeOnly)
        {
            if (!hash || hash == "#" || hash == "") return [];

            var tabs = [];

            // Return cached tabs
            if (!activeOnly && tabsWithHashCache.has(hash))
            {
                tabs = tabsWithHashCache.get(hash);
            }
            else
            {
                tabs = Array.from(document.querySelectorAll(".wds-tabs__tab"))
                            .filter(function(t){ return t.matches((activeOnly ? ".wds-is-current" : "") + '[data-hash="' + hash + '"]'); });

                // Cache these tab(s)
                if (!activeOnly)
                    tabsWithHashCache.set(hash, tabs);
            }

            return tabs;
        }

        function scrollToElem(element)
        {
            if (config.neverScroll || element == null) return;

            // Scroll on the next frame to override browser scroll
            requestAnimationFrame(function()
            {
                var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
                var rect = element.getBoundingClientRect();

                // Don't scroll if the tab is already on the screen
                if (rect.bottom < 0 || rect.top - viewportHeight >= 0 || config.alwaysScroll)
                    window.scrollTo(0, window.scrollY + rect.top - 46);
            });
        }
    
        function getModuleName(name)
        {
            return mw.loader.getModuleNames().find(function(n){ return n === name || n.startsWith(name + "-"); });
        }
    }

})();