/* ============================================================
   SOURCEVERSE WIKI - LOCAL NAVIGATION JAVASCRIPT
   MediaWiki:Local-navigation.js
   
   This file enhances the local navigation with:
   - Dynamic icon insertion based on nav item text
   - Dropdown accessibility improvements
   - Keyboard navigation support
   
   Last Updated: February 2026
   ============================================================ */

(function() {
    'use strict';
    
    /* --------------------------------------------------------
       CONFIGURATION
       Map navigation labels to icon classes
       -------------------------------------------------------- */
    
    var iconMap = {
        // Main navigation items (case-insensitive matching)
        'home': 'home',
        'main page': 'home',
        'characters': 'characters',
        'heroes': 'characters',
        'villains': 'characters',
        'locations': 'locations',
        'places': 'locations',
        'geography': 'locations',
        'organizations': 'organizations',
        'teams': 'organizations',
        'factions': 'organizations',
        'powers': 'powers',
        'abilities': 'powers',
        'timeline': 'timeline',
        'history': 'timeline',
        'events': 'timeline',
        'community': 'community',
        'explore': 'explore',
        'browse': 'explore',
        'wiki': 'explore',
        
        // Additional mappings
        'alters': 'powers',
        'invokers': 'powers',
        'capes': 'characters',
        'imma': 'organizations',
        'sentinels': 'organizations',
        'syndicate': 'organizations',
        'occidental': 'locations',
        'meridian': 'locations',
        'oriental': 'locations',
        'resonance': 'timeline'
    };
    
    /* --------------------------------------------------------
       UTILITY FUNCTIONS
       -------------------------------------------------------- */
    
    /**
     * Create an icon element
     */
    function createIcon(iconType) {
        var icon = document.createElement('span');
        icon.className = 'nav-icon nav-icon-' + iconType;
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }
    
    /**
     * Get icon type from text
     */
    function getIconType(text) {
        if (!text) return null;
        
        var normalizedText = text.toLowerCase().trim();
        
        // Check exact match first
        if (iconMap[normalizedText]) {
            return iconMap[normalizedText];
        }
        
        // Check if text contains any of our keywords
        for (var keyword in iconMap) {
            if (iconMap.hasOwnProperty(keyword)) {
                if (normalizedText.indexOf(keyword) !== -1) {
                    return iconMap[keyword];
                }
            }
        }
        
        return null;
    }
    
    /**
     * Add icon to navigation item
     */
    function addIconToNavItem(navItem) {
        // Skip if already has icon
        if (navItem.querySelector('.nav-icon')) {
            return;
        }
        
        // Get the text content
        var textContent = navItem.textContent || navItem.innerText;
        var iconType = getIconType(textContent);
        
        if (iconType) {
            var icon = createIcon(iconType);
            navItem.insertBefore(icon, navItem.firstChild);
        }
    }
    
    /* --------------------------------------------------------
       ACCESSIBILITY ENHANCEMENTS
       -------------------------------------------------------- */
    
    /**
     * Enhance dropdown accessibility
     */
    function enhanceDropdownAccessibility() {
        var dropdowns = document.querySelectorAll('.fandom-community-header__local-navigation .wds-dropdown');
        
        dropdowns.forEach(function(dropdown) {
            var toggle = dropdown.querySelector('.wds-dropdown__toggle');
            var content = dropdown.querySelector('.wds-dropdown__content');
            
            if (!toggle || !content) return;
            
            // Add ARIA attributes
            var dropdownId = 'nav-dropdown-' + Math.random().toString(36).substr(2, 9);
            content.id = dropdownId;
            toggle.setAttribute('aria-haspopup', 'true');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', dropdownId);
            
            // Update aria-expanded on hover/focus
            dropdown.addEventListener('mouseenter', function() {
                toggle.setAttribute('aria-expanded', 'true');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                toggle.setAttribute('aria-expanded', 'false');
            });
            
            // Keyboard support
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                    toggle.setAttribute('aria-expanded', !isExpanded);
                    
                    if (!isExpanded) {
                        // Focus first link in dropdown
                        var firstLink = content.querySelector('a');
                        if (firstLink) {
                            firstLink.focus();
                        }
                    }
                }
                
                if (e.key === 'Escape') {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            });
            
            // Allow arrow key navigation within dropdown
            content.addEventListener('keydown', function(e) {
                var links = content.querySelectorAll('a');
                var currentIndex = Array.prototype.indexOf.call(links, document.activeElement);
                
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    var nextIndex = (currentIndex + 1) % links.length;
                    links[nextIndex].focus();
                }
                
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    var prevIndex = currentIndex - 1;
                    if (prevIndex < 0) prevIndex = links.length - 1;
                    links[prevIndex].focus();
                }
                
                if (e.key === 'Escape') {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.focus();
                }
            });
        });
    }
    
    /* --------------------------------------------------------
       INITIALIZATION
       -------------------------------------------------------- */
    
    function initLocalNavigation() {
        // Find all navigation tab labels
        var navLabels = document.querySelectorAll('.fandom-community-header__local-navigation .wds-tabs__tab-label');
        
        navLabels.forEach(function(label) {
            addIconToNavItem(label);
        });
        
        // Find all dropdown links and add icons
        var dropdownLinks = document.querySelectorAll('.fandom-community-header__local-navigation .wds-dropdown__content a');
        
        dropdownLinks.forEach(function(link) {
            addIconToNavItem(link);
        });
        
        // Enhance accessibility
        enhanceDropdownAccessibility();
        
        // Log success
        if (window.SourceVerseWiki && window.SourceVerseWiki.utils) {
            window.SourceVerseWiki.utils.log('Local navigation initialized');
        }
    }
    
    /* --------------------------------------------------------
       RUN INITIALIZATION
       -------------------------------------------------------- */
    
    // Wait for DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initLocalNavigation, 200);
        });
    } else {
        setTimeout(initLocalNavigation, 200);
    }
    
    // Also run on window load as a fallback
    window.addEventListener('load', function() {
        setTimeout(initLocalNavigation, 500);
    });
    
})();