/* ============================================================
   IGDRASYL WIKI - LOCAL NAVIGATION JAVASCRIPT
   MediaWiki:Local-navigation.js
   
   Enhancements for the local navigation bar.
   Includes:
   - Active tab highlighting based on current page
   - Keyboard navigation for dropdowns
   - Touch device support for dropdowns
   - Dropdown close on outside click
   
   Project: Igdrasyl / Tamer Chronicles
   Last Updated: April 2026
   ============================================================ */

(function() {
    'use strict';
    
    /* --------------------------------------------------------
       UTILITY
       -------------------------------------------------------- */
    
    function log(message) {
        if (window.IgdrasylWiki && window.IgdrasylWiki.utils) {
            window.IgdrasylWiki.utils.log(message);
        }
    }
    
    function getPageName() {
        if (window.IgdrasylWiki && window.IgdrasylWiki.utils) {
            return window.IgdrasylWiki.utils.getPageName();
        }
        try {
            var config = mw.config.get('wgPageName');
            return config ? config.replace(/_/g, ' ') : '';
        } catch (e) {
            return '';
        }
    }
    
    /* --------------------------------------------------------
       ACTIVE TAB HIGHLIGHTING
       Marks the current navigation tab as active based
       on the page being viewed
       -------------------------------------------------------- */
    
    function initActiveTabHighlight() {
        var currentPage = getPageName().toLowerCase();
        if (!currentPage) return;
        
        var navLinks = document.querySelectorAll(
            '.fandom-community-header__local-navigation a, ' +
            '.wds-tabs__tab-label, ' +
            '.wds-dropdown__content .wds-list a'
        );
        
        var matchFound = false;
        
        navLinks.forEach(function(link) {
            var href = link.getAttribute('href');
            if (!href) return;
            
            /* Extract page name from href */
            var linkPage = '';
            
            /* Handle /wiki/Page_Name format */
            var wikiMatch = href.match(/\/wiki\/([^?#]+)/);
            if (wikiMatch) {
                linkPage = decodeURIComponent(wikiMatch[1]).replace(/_/g, ' ').toLowerCase();
            }
            
            /* Check for match */
            if (linkPage && currentPage === linkPage) {
                /* Mark the link as active */
                link.classList.add('is-active');
                link.setAttribute('aria-current', 'page');
                
                /* Also mark the parent tab if this is a dropdown item */
                var parentTab = link.closest('.wds-tabs__tab');
                if (parentTab) {
                    parentTab.classList.add('wds-is-current');
                }
                
                /* Mark the parent dropdown toggle if inside a dropdown */
                var parentDropdown = link.closest('.wds-dropdown');
                if (parentDropdown) {
                    var toggle = parentDropdown.querySelector('.wds-tabs__tab-label, .wds-dropdown__toggle');
                    if (toggle) {
                        toggle.classList.add('is-active-parent');
                    }
                }
                
                matchFound = true;
            }
        });
        
        log('Active tab highlighting: ' + (matchFound ? 'match found' : 'no match'));
    }
    
    /* --------------------------------------------------------
       KEYBOARD NAVIGATION
       Arrow key support for dropdown menus
       -------------------------------------------------------- */
    
    function initKeyboardNavigation() {
        var nav = document.querySelector('.fandom-community-header__local-navigation');
        if (!nav) return;
        
        nav.addEventListener('keydown', function(e) {
            var activeElement = document.activeElement;
            if (!activeElement) return;
            
            /* Check if we're inside a dropdown */
            var dropdown = activeElement.closest('.wds-dropdown');
            var dropdownContent = dropdown ? dropdown.querySelector('.wds-dropdown__content') : null;
            
            switch (e.key) {
                case 'Enter':
                case ' ':
                    /* Open dropdown on Enter/Space if on a toggle */
                    if (activeElement.classList.contains('wds-tabs__tab-label') ||
                        activeElement.classList.contains('wds-dropdown__toggle')) {
                        if (dropdown && !dropdown.classList.contains('wds-is-active')) {
                            e.preventDefault();
                            dropdown.classList.add('wds-is-active');
                            
                            /* Focus first link in dropdown */
                            var firstLink = dropdownContent ? dropdownContent.querySelector('a') : null;
                            if (firstLink) {
                                setTimeout(function() { firstLink.focus(); }, 50);
                            }
                        }
                    }
                    break;
                    
                case 'Escape':
                    /* Close dropdown on Escape */
                    if (dropdown) {
                        e.preventDefault();
                        dropdown.classList.remove('wds-is-active');
                        
                        /* Return focus to the toggle */
                        var toggle = dropdown.querySelector('.wds-tabs__tab-label, .wds-dropdown__toggle');
                        if (toggle) {
                            toggle.focus();
                        }
                    }
                    break;
                    
                case 'ArrowDown':
                    /* Move to next item in dropdown */
                    if (dropdownContent) {
                        e.preventDefault();
                        var links = dropdownContent.querySelectorAll('a');
                        var currentIndex = Array.prototype.indexOf.call(links, activeElement);
                        
                        if (currentIndex < links.length - 1) {
                            links[currentIndex + 1].focus();
                        }
                    }
                    break;
                    
                case 'ArrowUp':
                    /* Move to previous item in dropdown */
                    if (dropdownContent) {
                        e.preventDefault();
                        var upLinks = dropdownContent.querySelectorAll('a');
                        var upIndex = Array.prototype.indexOf.call(upLinks, activeElement);
                        
                        if (upIndex > 0) {
                            upLinks[upIndex - 1].focus();
                        } else {
                            /* At top of dropdown — return focus to toggle */
                            var upToggle = dropdown.querySelector('.wds-tabs__tab-label, .wds-dropdown__toggle');
                            if (upToggle) {
                                upToggle.focus();
                            }
                        }
                    }
                    break;
                    
                case 'ArrowRight':
                    /* Move to next tab */
                    if (!dropdownContent || !activeElement.closest('.wds-dropdown__content')) {
                        var tabs = nav.querySelectorAll('.wds-tabs__tab-label, .wds-dropdown__toggle');
                        var tabIndex = Array.prototype.indexOf.call(tabs, activeElement);
                        
                        if (tabIndex >= 0 && tabIndex < tabs.length - 1) {
                            e.preventDefault();
                            tabs[tabIndex + 1].focus();
                        }
                    }
                    break;
                    
                case 'ArrowLeft':
                    /* Move to previous tab */
                    if (!dropdownContent || !activeElement.closest('.wds-dropdown__content')) {
                        var leftTabs = nav.querySelectorAll('.wds-tabs__tab-label, .wds-dropdown__toggle');
                        var leftIndex = Array.prototype.indexOf.call(leftTabs, activeElement);
                        
                        if (leftIndex > 0) {
                            e.preventDefault();
                            leftTabs[leftIndex - 1].focus();
                        }
                    }
                    break;
            }
        });
        
        log('Keyboard navigation initialized');
    }
    
    /* --------------------------------------------------------
       TOUCH DEVICE SUPPORT
       Convert hover-based dropdowns to tap-based on touch
       -------------------------------------------------------- */
    
    function initTouchSupport() {
        /* Detect touch device */
        var isTouchDevice = ('ontouchstart' in window) ||
                           (navigator.maxTouchPoints > 0) ||
                           (navigator.msMaxTouchPoints > 0);
        
        if (!isTouchDevice) return;
        
        var dropdowns = document.querySelectorAll(
            '.fandom-community-header__local-navigation .wds-dropdown'
        );
        
        dropdowns.forEach(function(dropdown) {
            var toggle = dropdown.querySelector('.wds-tabs__tab-label, .wds-dropdown__toggle');
            if (!toggle) return;
            
            toggle.addEventListener('click', function(e) {
                /* If dropdown has a link, first tap opens dropdown, second tap follows link */
                var isOpen = dropdown.classList.contains('wds-is-active');
                
                /* Close all other dropdowns first */
                dropdowns.forEach(function(other) {
                    if (other !== dropdown) {
                        other.classList.remove('wds-is-active');
                    }
                });
                
                if (!isOpen) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.add('wds-is-active');
                }
                /* If already open, let the default click behavior happen (follow link) */
            });
        });
        
        log('Touch support initialized');
    }
    
    /* --------------------------------------------------------
       CLOSE DROPDOWN ON OUTSIDE CLICK
       -------------------------------------------------------- */
    
    function initOutsideClickClose() {
        document.addEventListener('click', function(e) {
            /* If click is outside any dropdown, close all dropdowns */
            var clickedDropdown = e.target.closest('.wds-dropdown');
            
            if (!clickedDropdown) {
                var openDropdowns = document.querySelectorAll(
                    '.fandom-community-header__local-navigation .wds-dropdown.wds-is-active'
                );
                
                openDropdowns.forEach(function(dropdown) {
                    dropdown.classList.remove('wds-is-active');
                });
            }
        });
        
        log('Outside click close initialized');
    }
    
    /* --------------------------------------------------------
       MAKE TAB LABELS FOCUSABLE
       Ensure all tab labels can receive keyboard focus
       -------------------------------------------------------- */
    
    function initFocusability() {
        var tabLabels = document.querySelectorAll(
            '.fandom-community-header__local-navigation .wds-tabs__tab-label'
        );
        
        tabLabels.forEach(function(label) {
            if (!label.getAttribute('tabindex') && label.tagName !== 'A' && label.tagName !== 'BUTTON') {
                label.setAttribute('tabindex', '0');
                label.setAttribute('role', 'button');
            }
        });
        
        log('Tab focusability initialized: ' + tabLabels.length + ' tabs');
    }
    
    /* --------------------------------------------------------
       INITIALIZATION
       -------------------------------------------------------- */
    
    function initLocalNavigation() {
        var nav = document.querySelector('.fandom-community-header__local-navigation');
        
        if (!nav) {
            /* Navigation may not have loaded yet — retry */
            setTimeout(initLocalNavigation, 500);
            return;
        }
        
        initActiveTabHighlight();
        initKeyboardNavigation();
        initTouchSupport();
        initOutsideClickClose();
        initFocusability();
        
        log('Local navigation enhancements initialized');
    }
    
    /* --------------------------------------------------------
       RUN INITIALIZATION
       -------------------------------------------------------- */
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initLocalNavigation, 150);
        });
    } else {
        setTimeout(initLocalNavigation, 150);
    }
    
})();