/* ============================================================
   SOURCEVERSE WIKI - MASTER JAVASCRIPT
   MediaWiki:Common.js
   
   This is the master JavaScript file that loads all modular JS.
   
   Project: Source Comics / SourceVerse
   Theme: Art Deco / Retro
   
   Last Updated: February 2026
   ============================================================ */

/* ============================================================
   INITIALIZATION
   Wait for DOM to be ready before executing scripts
   ============================================================ */

(function() {
    'use strict';
    
    /* --------------------------------------------------------
       CONFIGURATION
       Global settings for SourceVerse Wiki scripts
       -------------------------------------------------------- */
    
    window.SourceVerseWiki = window.SourceVerseWiki || {};
    
    window.SourceVerseWiki.config = {
        wikiName: 'Source Comics Wiki',
        projectName: 'SourceVerse',
        currentYear: 2050,
        divergenceYear: 2025,
        theme: 'Art Deco / Retro',
        version: '1.0.0',
        debug: false
    };
    
    /* --------------------------------------------------------
       UTILITY FUNCTIONS
       Reusable helper functions for all scripts
       -------------------------------------------------------- */
    
    window.SourceVerseWiki.utils = {
        
        /**
         * Log messages to console (only in debug mode)
         */
        log: function(message, type) {
            if (window.SourceVerseWiki.config.debug) {
                type = type || 'log';
                console[type]('[SourceVerse] ' + message);
            }
        },
        
        /**
         * Check if an element exists in the DOM
         */
        elementExists: function(selector) {
            return document.querySelector(selector) !== null;
        },
        
        /**
         * Wait for an element to exist in the DOM
         */
        waitForElement: function(selector, timeout) {
            timeout = timeout || 5000;
            return new Promise(function(resolve, reject) {
                var element = document.querySelector(selector);
                if (element) {
                    resolve(element);
                    return;
                }
                
                var observer = new MutationObserver(function(mutations) {
                    var element = document.querySelector(selector);
                    if (element) {
                        observer.disconnect();
                        resolve(element);
                    }
                });
                
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
                
                setTimeout(function() {
                    observer.disconnect();
                    reject(new Error('Element not found: ' + selector));
                }, timeout);
            });
        },
        
        /**
         * Create an element with attributes and content
         */
        createElement: function(tag, attributes, content) {
            var element = document.createElement(tag);
            
            if (attributes) {
                for (var key in attributes) {
                    if (attributes.hasOwnProperty(key)) {
                        if (key === 'className') {
                            element.className = attributes[key];
                        } else if (key === 'style' && typeof attributes[key] === 'object') {
                            for (var styleKey in attributes[key]) {
                                element.style[styleKey] = attributes[key][styleKey];
                            }
                        } else {
                            element.setAttribute(key, attributes[key]);
                        }
                    }
                }
            }
            
            if (content) {
                if (typeof content === 'string') {
                    element.innerHTML = content;
                } else {
                    element.appendChild(content);
                }
            }
            
            return element;
        },
        
        /**
         * Throttle function execution
         */
        throttle: function(func, limit) {
            var inThrottle;
            return function() {
                var args = arguments;
                var context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(function() {
                        inThrottle = false;
                    }, limit);
                }
            };
        },
        
        /**
         * Debounce function execution
         */
        debounce: function(func, wait) {
            var timeout;
            return function() {
                var context = this;
                var args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    func.apply(context, args);
                }, wait);
            };
        },
        
        /**
         * Get current theme (light or dark)
         */
        getCurrentTheme: function() {
            return document.body.classList.contains('theme-fandomdesktop-dark') ? 'dark' : 'light';
        },
        
        /**
         * Check if user is logged in
         */
        isLoggedIn: function() {
            return document.body.classList.contains('is-user-logged-in');
        },
        
        /**
         * Check if current page is main page
         */
        isMainPage: function() {
            return document.body.classList.contains('mainpage');
        },
        
        /**
         * Get current page name
         */
        getPageName: function() {
            var config = mw.config.get('wgPageName');
            return config ? config.replace(/_/g, ' ') : '';
        }
    };
    
    /* --------------------------------------------------------
       INITIALIZATION HANDLER
       -------------------------------------------------------- */
    
    function init() {
        window.SourceVerseWiki.utils.log('SourceVerse Wiki initialized');
        window.SourceVerseWiki.utils.log('Theme: ' + window.SourceVerseWiki.utils.getCurrentTheme());
        window.SourceVerseWiki.utils.log('Page: ' + window.SourceVerseWiki.utils.getPageName());
        
        // Add initialized class to body
        document.body.classList.add('sourceverse-initialized');
        
        // Dispatch custom event for other scripts
        var event = new CustomEvent('sourceverse:ready', {
            detail: {
                config: window.SourceVerseWiki.config
            }
        });
        document.dispatchEvent(event);
    }
    
    /* --------------------------------------------------------
       RUN INITIALIZATION
       -------------------------------------------------------- */
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();

/* ============================================================
   MODULE IMPORTS
   Import additional JavaScript modules
   ============================================================ */

/* Phase 2: Wiki Tools */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Wiki-tools.js'
    ]
});

/* Phase 3: Local Navigation */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Local-navigation.js'
    ]
});

/* Phase 18: Transitions (To be added)
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Transitions.js'
    ]
});
*/

/* Phase 19: Back to Top (To be added)
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Back-to-top.js'
    ]
});
*/

/* Phase 20: Timeline (To be added)
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Timeline.js'
    ]
});
*/

/* ============================================================
   END OF MASTER JAVASCRIPT
   ============================================================ */