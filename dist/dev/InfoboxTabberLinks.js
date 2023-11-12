/*
    InfoboxTabberLinks.js
    Author: Macklin

    Adds Fandom tabber extension logic to portable infobox tabs (created by using
    <panel> / <section> and <gallery> within <image>), and by extension Lua
    module-created Tabbers.

    This automatically switches to the tab specified by the URL hash when the
    document is loaded, and changes the document hash whenever a tab is clicked.

    Also adds a new feature, which makes the URL history states useful, switching
    the tab whenever the hash changes (i.e. the user clicks the back and forward
    buttons in their browser, or clicks an anchor on the page).
    
    Additionally allows linking to ID's contained within any tabs. Doing so will 
    switch to the tab (or nested tabs) before scrolling to the element with said ID.

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
            console.error("InfoboxTabberLinks - Not running script more than once on page!");
            return;
        }

        var tabsModuleName = getModuleName("tabs");
        var tabsModule = mw.loader.moduleRegistry[tabsModuleName];
        
        var config = Object.assign({ luaTabberOnly: false, scrollToTab: true, alwaysScroll: false, descendantSwitching: true }, window.tabberLinks);

        window.dev = window.dev || {};
        window.dev.tabberLinks = { loaded: true };
        window.dev.tabberLinks.config = config;
        
        var tabbers = document.querySelectorAll(".tabber");
        var panels = document.querySelectorAll((config.luaTabbersOnly ? ".pi-theme-tabber" : "") + ":is(.pi-panel, .pi-image-collection).wds-tabber");
        
        if (tabbers.length > 0 || panels.length > 0)
        {
            window.addEventListener("hashchange", switchTabToHash);
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
            
            var tabberJs = mw.loader.moduleRegistry["ext.fandom.Tabber.js"];
        
            // If ext.fandom.Tabber.js isn't loaded, load and run it
            
            // If there are non-infobox tabbers on the page, it will already be loaded

            // Otherwise, it will not be loaded. Because we've added the requisite data above,
            // it should treat the panel/sections as any other tabber and switch to them automatically
            // this will mean the tab is switched to twice, but this doesn't matter
            mw.loader.using("ext.fandom.Tabber.js", switchTabToHash);
        }

        // Given an element, goes up the DOM and collects every .wds-tab__tab that must be enabled in order for that element to be visible
        function getAncestorTabs(element)
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
                    
                    if (tab) ancestorTabs.push(tab);
                    element = content.parentElement;
                }
                else
                {
                    return ancestorTabs;
                }
            }
        }

        function scrollToElem(element)
        {
        	if (element == null) return;
        	
            var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            var rect = element.getBoundingClientRect();

            // Don't scroll if the tab is already on the screen
            if (rect.bottom < 0 || rect.top - viewportHeight >= 0 || config.alwaysScroll)
                window.scrollTo(0, window.scrollY + rect.top - 46);
        }

        // Switches to the tab specified in the document hash
        function switchTabToHash()
        {
            var hash = decodeURIComponent(window.location.hash.substr(1));
            
            var target = document.getElementById(hash);
            var switchTabs = [];

            // Hash refers to element
            if (target)
            {
                if (config.descendantSwitching)
                {
                	// Get all tabs that the target is a descendant of
                    switchTabs = getAncestorTabs(target);

                    // Don't do anything if this ID isn't contained in a tab
                    if (switchTabs.length == 0) return;
                }
                else
                    target = null
            }

            // Hash may refer to tab
            else
            {
                // Get all tabs whose data-hash matches this hash
                switchTabs = Array.from(document.querySelectorAll(".wds-tabs__tab")).filter(function(t){ return t.matches('[data-hash="' + hash + '"]'); });
                
                // Scroll to the first matching tab
                if (config.scrollToTab && switchTabs.length > 0)
                    target = switchTabs[0];
            }
            
            switchTabs.forEach(function(t){ tabsModule.module.exports.tabs.switchTab(t); });
            scrollToElem(target);
        }
    
        function getModuleName(name)
        {
            return mw.loader.getModuleNames().find(function(n){ return n === name || n.startsWith(name + "-"); });
        }
    }

})();