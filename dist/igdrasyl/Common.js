/* ============================================================
   IGDRASYL WIKI - MASTER JAVASCRIPT
   MediaWiki:Common.js
   
   Master JavaScript file that loads all modular JS.
   
   Project: Igdrasyl / Tamer Chronicles
   Theme: Dark Fantasy — Towers, Espers, and the World Tree
   
   Last Updated: April 2026
   ============================================================ */

/* ============================================================
   INITIALIZATION
   Wait for DOM to be ready before executing scripts
   ============================================================ */

(function() {
    'use strict';
    
    /* --------------------------------------------------------
       CONFIGURATION
       Global settings for Igdrasyl Wiki scripts
       -------------------------------------------------------- */
    
    window.IgdrasylWiki = window.IgdrasylWiki || {};
    
    window.IgdrasylWiki.config = {
        wikiName: 'Igdrasyl Wiki',
        projectName: 'Tamer Chronicles',
        currentYear: 647,
        calendar: 'A.S.',
        theme: 'Dark Fantasy',
        version: '1.0.0',
        debug: false,
        
        /* World constants */
        world: {
            towers: 108,
            kingdoms: 20,
            elements: 108,
            domains: 12,
            creatureFamilies: 8,
            tamerRanks: 8
        },
        
        /* Font stack reference */
        fonts: {
            display: "'MedievalSharp', cursive",
            heading: "'Kelly Slab', serif",
            accent: "'Jim Nightshade', cursive",
            subhead: "'Iceberg', cursive",
            body: "'Yuji Syuku', serif",
            label: "'Nova Square', sans-serif",
            mono: "'Nova Mono', monospace"
        },
        
        /* Color palette reference */
        colors: {
            gold: '#c9a84c',
            goldBright: '#e6c35c',
            goldDim: '#8a6d2b',
            goldFaint: '#5c4a1e',
            crimson: '#8b1a1a',
            crimsonBright: '#b22222',
            crimsonDim: '#5a1111',
            white: '#f0ece4',
            whiteWarm: '#e8e0d0',
            whiteDim: '#b8b2a6',
            whiteMuted: '#6e6a62',
            whiteFaint: '#3a3830',
            black: '#0a0a0a',
            blackSoft: '#0e0e0e',
            blackCard: '#121210',
            parchment: '#1a1810'
        }
    };
    
    /* --------------------------------------------------------
       UTILITY FUNCTIONS
       Reusable helper functions for all scripts
       -------------------------------------------------------- */
    
    window.IgdrasylWiki.utils = {
        
        /**
         * Log messages to console (only in debug mode)
         */
        log: function(message, type) {
            if (window.IgdrasylWiki.config.debug) {
                type = type || 'log';
                console[type]('[Igdrasyl] ' + message);
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
                
                var observer = new MutationObserver(function() {
                    var el = document.querySelector(selector);
                    if (el) {
                        observer.disconnect();
                        resolve(el);
                    }
                });
                
                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
                
                setTimeout(function() {
                    observer.disconnect();
                    reject(new Error('[Igdrasyl] Element not found: ' + selector));
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
                                if (attributes[key].hasOwnProperty(styleKey)) {
                                    element.style[styleKey] = attributes[key][styleKey];
                                }
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
                } else if (content instanceof Node) {
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
            try {
                var config = mw.config.get('wgPageName');
                return config ? config.replace(/_/g, ' ') : '';
            } catch (e) {
                return '';
            }
        },
        
        /**
         * Get current namespace
         */
        getNamespace: function() {
            try {
                return mw.config.get('wgNamespaceNumber') || 0;
            } catch (e) {
                return 0;
            }
        },
        
        /**
         * Check if user is an admin
         */
        isAdmin: function() {
            try {
                var userGroups = mw.config.get('wgUserGroups') || [];
                return userGroups.indexOf('sysop') !== -1 ||
                       userGroups.indexOf('bureaucrat') !== -1 ||
                       userGroups.indexOf('staff') !== -1 ||
                       userGroups.indexOf('wiki-manager') !== -1 ||
                       userGroups.indexOf('content-team-member') !== -1;
            } catch (e) {
                return false;
            }
        },
        
        /**
         * Convert Igdrasyl year to display format
         * e.g., 647 -> "Year 647 A.S."
         */
        formatYear: function(year) {
            if (year < 0) {
                return 'Year ' + Math.abs(year) + ' B.S.';
            }
            return 'Year ' + year + ' A.S.';
        }
    };
    
    /* --------------------------------------------------------
       BACK TO TOP BUTTON
       Floating button that appears after scrolling down
       -------------------------------------------------------- */
    
    function initBackToTop() {
        var scrollThreshold = 400;
        
        var button = window.IgdrasylWiki.utils.createElement('button', {
            className: 'igdrasyl-back-to-top',
            'aria-label': 'Back to top',
            title: 'Back to top'
        }, '▲');
        
        /* Inline styles to avoid needing another CSS file */
        button.style.cssText = [
            'position: fixed',
            'bottom: 30px',
            'right: 30px',
            'width: 40px',
            'height: 40px',
            'background-color: ' + window.IgdrasylWiki.config.colors.goldDim,
            'color: ' + window.IgdrasylWiki.config.colors.white,
            'border: 1px solid ' + window.IgdrasylWiki.config.colors.gold,
            'border-radius: 0',
            'font-family: ' + window.IgdrasylWiki.config.fonts.label,
            'font-size: 16px',
            'cursor: pointer',
            'opacity: 0',
            'visibility: hidden',
            'transition: opacity 0.3s ease, visibility 0.3s ease, background-color 0.2s ease',
            'z-index: 500',
            'display: flex',
            'align-items: center',
            'justify-content: center',
            'clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)'
        ].join('; ');
        
        document.body.appendChild(button);
        
        button.addEventListener('mouseenter', function() {
            button.style.backgroundColor = window.IgdrasylWiki.config.colors.gold;
            button.style.color = window.IgdrasylWiki.config.colors.black;
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.backgroundColor = window.IgdrasylWiki.config.colors.goldDim;
            button.style.color = window.IgdrasylWiki.config.colors.white;
        });
        
        button.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        var handleScroll = window.IgdrasylWiki.utils.throttle(function() {
            if (window.pageYOffset > scrollThreshold) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
        
        window.IgdrasylWiki.utils.log('Back to top button initialized');
    }
    
    /* --------------------------------------------------------
       SMOOTH SCROLL FOR ANCHOR LINKS
       Intercept anchor clicks for smooth scrolling
       -------------------------------------------------------- */
    
    function initSmoothScroll() {
        document.addEventListener('click', function(e) {
            var link = e.target.closest('a[href^="#"]');
            if (!link) return;
            
            var targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                /* Update URL hash without jumping */
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
        
        window.IgdrasylWiki.utils.log('Smooth scroll initialized');
    }
    
    /* --------------------------------------------------------
       EXTERNAL LINK HANDLER
       Add rel="noopener noreferrer" and target="_blank"
       to external links for security
       -------------------------------------------------------- */
    
    function initExternalLinks() {
        var externalLinks = document.querySelectorAll('.mw-parser-output a.external');
        
        externalLinks.forEach(function(link) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
        
        window.IgdrasylWiki.utils.log('External links processed: ' + externalLinks.length);
    }
    
    /* --------------------------------------------------------
       COLLAPSIBLE INFOBOX GROUPS
       Enable click-to-collapse on infobox section headers.
       
       Fandom's portable infobox structure places headers
       and data rows as SIBLINGS, not inside a wrapper div.
       So we toggle visibility on all sibling .pi-data and
       .pi-smart-group elements that follow each header
       until we hit the next header or the end of the infobox.
       -------------------------------------------------------- */
    
    function initCollapsibleInfobox() {
        var headers = document.querySelectorAll('.portable-infobox .pi-header');
        
        if (headers.length === 0) return;
        
        headers.forEach(function(header) {
            /* Make it keyboard accessible */
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'true');
            
            header.addEventListener('click', function(e) {
                e.preventDefault();
                toggleInfoboxSection(header);
            });
            
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleInfoboxSection(header);
                }
            });
        });
        
        window.IgdrasylWiki.utils.log('Collapsible infobox headers initialized: ' + headers.length);
    }
    
    function toggleInfoboxSection(header) {
        var isCollapsed = header.classList.contains('igdrasyl-collapsed');
        
        if (isCollapsed) {
            /* EXPAND — show sibling data rows */
            header.classList.remove('igdrasyl-collapsed');
            header.setAttribute('aria-expanded', 'true');
        } else {
            /* COLLAPSE — hide sibling data rows */
            header.classList.add('igdrasyl-collapsed');
            header.setAttribute('aria-expanded', 'false');
        }
        
        /* Walk siblings after this header until next header or end */
        var sibling = header.nextElementSibling;
        while (sibling) {
            /* Stop if we hit another header */
            if (sibling.classList.contains('pi-header')) break;
            
            /* Toggle visibility on data rows, images, smart groups */
            if (sibling.classList.contains('pi-data') ||
                sibling.classList.contains('pi-image') ||
                sibling.classList.contains('pi-smart-group') ||
                sibling.classList.contains('pi-smart-data-value')) {
                
                if (isCollapsed) {
                    sibling.style.display = '';
                } else {
                    sibling.style.display = 'none';
                }
            }
            
            sibling = sibling.nextElementSibling;
        }
    }
    
    /* --------------------------------------------------------
       CUSTOM FIXED TOC
       Builds a collapsible TOC panel from the page's
       headings and injects it as a fixed element on
       the left edge of the viewport.
       -------------------------------------------------------- */
    
    function initCustomTOC() {
        /* Only build TOC on article pages with headings */
        var headings = document.querySelectorAll(
            '.mw-parser-output h2, .mw-parser-output h3, ' +
            '.mw-parser-output h4, .mw-parser-output h5, ' +
            '.mw-parser-output h6'
        );
        
        if (headings.length < 2) return; /* Not enough headings for a TOC */
        if (document.getElementById('igdrasyl-toc')) return; /* Already built */
        
        /* Build the TOC container */
        var toc = document.createElement('nav');
        toc.id = 'igdrasyl-toc';
        toc.setAttribute('aria-label', 'Table of Contents');
        
        /* Toggle tab */
        var toggle = document.createElement('div');
        toggle.id = 'igdrasyl-toc-toggle';
        toggle.setAttribute('tabindex', '0');
        toggle.setAttribute('role', 'button');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-controls', 'igdrasyl-toc-panel');
        toggle.innerHTML = 'Contents';
        toc.appendChild(toggle);
        
        /* Panel */
        var panel = document.createElement('div');
        panel.id = 'igdrasyl-toc-panel';
        
        /* Panel header */
        var header = document.createElement('div');
        header.id = 'igdrasyl-toc-header';
        header.innerHTML = '<span>◆ Contents</span>';
        
        var closeBtn = document.createElement('button');
        closeBtn.id = 'igdrasyl-toc-close';
        closeBtn.innerHTML = '✕';
        closeBtn.setAttribute('aria-label', 'Close table of contents');
        header.appendChild(closeBtn);
        panel.appendChild(header);
        
        /* Link list */
        var list = document.createElement('ul');
        list.id = 'igdrasyl-toc-list';
        
        headings.forEach(function(heading, index) {
            var headlineEl = heading.querySelector('.mw-headline');
            if (!headlineEl) return;
            
            var text = headlineEl.textContent.trim();
            var id = headlineEl.id || heading.id;
            if (!id || !text) return;
            
            var level = parseInt(heading.tagName.charAt(1), 10);
            
            var li = document.createElement('li');
            li.className = 'toc-level-' + level;
            
            var link = document.createElement('a');
            link.href = '#' + id;
            link.textContent = text;
            link.setAttribute('data-toc-index', index);
            
            /* Smooth scroll on click */
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var target = document.getElementById(id);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (history.pushState) {
                        history.pushState(null, null, '#' + id);
                    }
                }
                /* Close TOC on mobile after clicking */
                if (window.innerWidth < 768) {
                    closeTOC();
                }
            });
            
            li.appendChild(link);
            list.appendChild(li);
        });
        
        panel.appendChild(list);
        toc.appendChild(panel);
        document.body.appendChild(toc);
        
        /* Toggle click handler */
        toggle.addEventListener('click', function() {
            if (toc.classList.contains('is-open')) {
                closeTOC();
            } else {
                openTOC();
            }
        });
        
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });
        
        /* Close button handler */
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeTOC();
        });
        
        /* Close on outside click */
        document.addEventListener('click', function(e) {
            if (toc.classList.contains('is-open') && !toc.contains(e.target)) {
                closeTOC();
            }
        });
        
        /* Close on Escape */
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && toc.classList.contains('is-open')) {
                closeTOC();
            }
        });
        
        function openTOC() {
            toc.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
        }
        
        function closeTOC() {
            toc.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
        
        /* Active section tracking while scrolling */
        var tocLinks = list.querySelectorAll('a');
        var scrollHandler = window.IgdrasylWiki.utils.throttle(function() {
            var scrollPos = window.scrollY + 100;
            var activeLink = null;
            
            headings.forEach(function(heading, index) {
                if (heading.offsetTop <= scrollPos) {
                    var matchingLink = list.querySelector('a[data-toc-index="' + index + '"]');
                    if (matchingLink) {
                        activeLink = matchingLink;
                    }
                }
            });
            
            tocLinks.forEach(function(link) {
                link.classList.remove('is-active');
            });
            
            if (activeLink) {
                activeLink.classList.add('is-active');
            }
        }, 100);
        
        window.addEventListener('scroll', scrollHandler);
        scrollHandler(); /* Initial check */
        
        window.IgdrasylWiki.utils.log('Custom TOC built with ' + list.children.length + ' entries');
    }
    
    
    /* --------------------------------------------------------
       ENVIRONMENTAL OVERLAY ELEMENTS
       Inject fixed-position divs for sun, moons, and river
       because Fandom blocks body::before/after pseudo-elements
       -------------------------------------------------------- */
    
    function initEnvironmentalOverlays() {
        var theme = window.IgdrasylWiki.utils.getCurrentTheme();
        
        /* Don't duplicate if already injected */
        if (document.getElementById('igdrasyl-env-overlays')) return;
        
        var container = document.createElement('div');
        container.id = 'igdrasyl-env-overlays';
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9990;';
        
        if (theme === 'light') {
            /* Heilon (Sun) */
            var sun = document.createElement('div');
            sun.id = 'igdrasyl-sun';
            container.appendChild(sun);
        } else {
            /* Selûne (Fixed Moon) */
            var selune = document.createElement('div');
            selune.id = 'igdrasyl-moon-selune';
            container.appendChild(selune);
            
            /* Annû (Wandering Moon) */
            var annu = document.createElement('div');
            annu.id = 'igdrasyl-moon-annu';
            container.appendChild(annu);
        }
        
        /* River (shared — CSS handles light vs dark styling) */
        var river = document.createElement('div');
        river.id = 'igdrasyl-river';
        container.appendChild(river);
        
        document.body.appendChild(container);
        
        window.IgdrasylWiki.utils.log('Environmental overlays injected (' + theme + ' theme)');
    }
    
    /* --------------------------------------------------------
       COMMUNITY HEADER ENHANCEMENTS
       Inject custom buttons, clock, and falling leaves
       into the community header banner
       -------------------------------------------------------- */
    
    function initCommunityHeader() {
        var header = document.querySelector('.fandom-community-header__top-container');
        if (!header) {
            /* Retry — header may not have rendered yet */
            setTimeout(initCommunityHeader, 500);
            return;
        }
        
        /* Don't duplicate */
        if (document.getElementById('igdrasyl-header-tools')) return;
        
        /* ---- CUSTOM BUTTONS ---- */
        var toolsContainer = document.createElement('div');
        toolsContainer.id = 'igdrasyl-header-tools';
        
        /* Add New Page button */
        var addPageBtn = document.createElement('a');
        addPageBtn.href = '/wiki/Special:CreatePage';
        addPageBtn.innerHTML = '✦ New Page';
        addPageBtn.setAttribute('title', 'Create a new page');
        addPageBtn.setAttribute('aria-label', 'Create a new page');
        toolsContainer.appendChild(addPageBtn);
        
        /* Upload File button */
        var uploadBtn = document.createElement('a');
        uploadBtn.href = '/wiki/Special:Upload';
        uploadBtn.innerHTML = '⬆ Upload';
        uploadBtn.setAttribute('title', 'Upload a file');
        uploadBtn.setAttribute('aria-label', 'Upload a file');
        toolsContainer.appendChild(uploadBtn);
        
        /* ---- CLOCK ---- */
        var clockContainer = document.createElement('div');
        clockContainer.id = 'igdrasyl-header-clock';
        
        var clockTime = document.createElement('div');
        clockTime.id = 'igdrasyl-header-clock-time';
        clockContainer.appendChild(clockTime);
        
        var clockDate = document.createElement('div');
        clockDate.id = 'igdrasyl-header-clock-date';
        clockContainer.appendChild(clockDate);
        
        toolsContainer.appendChild(clockContainer);
        
        /* Insert into header */
        header.appendChild(toolsContainer);
        
        /* Start clock updates */
        updateHeaderClock();
        setInterval(updateHeaderClock, 1000);
        
        /* ---- CYCLE OF BOUGHS (Seasonal Animation) ---- */
        cycleOfBoughs.init();
        
        window.IgdrasylWiki.utils.log('Community header enhancements initialized');
    }
    
    function updateHeaderClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        var timeStr = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ampm;
        
        var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        var dateStr = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
        
        var timeEl = document.getElementById('igdrasyl-header-clock-time');
        var dateEl = document.getElementById('igdrasyl-header-clock-date');
        if (timeEl) timeEl.textContent = timeStr;
        if (dateEl) dateEl.textContent = dateStr;
    }
    
    /* --------------------------------------------------------
       CYCLE OF BOUGHS — SEASONAL ANIMATION SYSTEM
       
       Annû's 120-second wander drives the four seasons.
       Every 30 seconds, the header transitions to a new
       season with different particles and color tint.
       
       0-30s:   Verthûn (Spring) — petals
       30-60s:  Solarë (Summer) — firefly motes
       60-90s:  Haelûn (Autumn) — falling leaves
       90-120s: Frothë (Winter) — snowflakes
       -------------------------------------------------------- */
    
    var cycleOfBoughs = {
        container: null,
        label: null,
        currentSeason: null,
        cycleDuration: 120000, /* 120 seconds — matches Annû's wander */
        seasonDuration: 30000, /* 30 seconds per season */
        particleCount: 15,
        
        seasons: {
            spring: {
                name: 'Verthûn',
                subtitle: 'The Season of Bloom',
                cssClass: 'season-spring',
                chars: ['❀', '✿', '❁', '⚘', '✾', '🌸'],
                particleClasses: ['particle-spring', 'particle-spring-alt', 'particle-spring-bud'],
                sizeRange: [10, 16],
                durationRange: [8, 14]
            },
            summer: {
                name: 'Solarë',
                subtitle: 'The Season of Radiance',
                cssClass: 'season-summer',
                chars: ['✦', '✧', '⭑', '·', '•', '✶'],
                particleClasses: ['particle-summer', 'particle-summer-alt', 'particle-summer-spark'],
                sizeRange: [4, 8],
                durationRange: [4, 9]
            },
            autumn: {
                name: 'Haelûn',
                subtitle: 'The Season of Descent',
                cssClass: 'season-autumn',
                chars: ['🍂', '🍁', '🍃', '❦', '✿', '⍋'],
                particleClasses: ['particle-autumn', 'particle-autumn-alt', 'particle-autumn-brown'],
                sizeRange: [12, 18],
                durationRange: [7, 13]
            },
            winter: {
                name: 'Frothë',
                subtitle: 'The Season of Silence',
                cssClass: 'season-winter',
                chars: ['❄', '❅', '❆', '✻', '✼', '·'],
                particleClasses: ['particle-winter', 'particle-winter-alt', 'particle-winter-frost'],
                sizeRange: [8, 14],
                durationRange: [9, 16]
            }
        },
        
        init: function() {
            var headerBg = document.querySelector('.fandom-community-header__background');
            if (!headerBg) return;
            if (document.getElementById('igdrasyl-seasons-container')) return;
            
            /* Create container */
            this.container = document.createElement('div');
            this.container.id = 'igdrasyl-seasons-container';
            headerBg.appendChild(this.container);
            
            /* Create season label */
            this.label = document.createElement('div');
            this.label.id = 'igdrasyl-season-label';
            headerBg.appendChild(this.label);
            
            /* Start the cycle */
            this.tick();
            var self = this;
            setInterval(function() { self.tick(); }, 1000);
            
            window.IgdrasylWiki.utils.log('Cycle of Boughs initialized');
        },
        
        tick: function() {
            /* Calculate current position in the 120s cycle */
            var now = Date.now();
            var position = (now % this.cycleDuration);
            var seasonIndex = Math.floor(position / this.seasonDuration);
            var seasonKeys = ['spring', 'summer', 'autumn', 'winter'];
            var seasonKey = seasonKeys[seasonIndex];
            
            if (seasonKey !== this.currentSeason) {
                this.transitionTo(seasonKey);
            }
        },
        
        transitionTo: function(seasonKey) {
            var season = this.seasons[seasonKey];
            this.currentSeason = seasonKey;
            
            /* Update container class for tint overlay */
            this.container.className = season.cssClass;
            
            /* Update label */
            this.label.innerHTML = season.name + ' <span style="opacity:0.5;font-size:11px;">— ' + season.subtitle + '</span>';
            
            /* Clear old particles */
            while (this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }
            
            /* Generate new particles */
            for (var i = 0; i < this.particleCount; i++) {
                var particle = document.createElement('span');
                var pClass = season.particleClasses[i % season.particleClasses.length];
                particle.className = 'igdrasyl-particle ' + pClass;
                particle.textContent = season.chars[Math.floor(Math.random() * season.chars.length)];
                
                var size = season.sizeRange[0] + Math.random() * (season.sizeRange[1] - season.sizeRange[0]);
                var duration = season.durationRange[0] + Math.random() * (season.durationRange[1] - season.durationRange[0]);
                var delay = Math.random() * season.durationRange[1];
                var left = Math.random() * 100;
                var peakOpacity = 0.3 + Math.random() * 0.5;
                var driftX = 30 + Math.random() * 60;
                var rotation = 180 + Math.random() * 360;
                
                particle.style.cssText = [
                    'left:' + left + '%',
                    'font-size:' + size + 'px',
                    'animation-delay:' + delay + 's',
                    '--particle-duration:' + duration + 's',
                    '--particle-peak-opacity:' + peakOpacity,
                    '--particle-drift-x:' + driftX + 'px',
                    '--particle-fall-distance:' + (110 + Math.random() * 40) + 'px',
                    '--particle-rotation:' + rotation + 'deg'
                ].join(';');
                
                this.container.appendChild(particle);
            }
            
            window.IgdrasylWiki.utils.log('Season changed to: ' + season.name);
        }
    };
    
    /* --------------------------------------------------------
       INITIALIZATION HANDLER
       -------------------------------------------------------- */
    
    function init() {
        window.IgdrasylWiki.utils.log('Igdrasyl Wiki initializing...');
        window.IgdrasylWiki.utils.log('Theme: ' + window.IgdrasylWiki.utils.getCurrentTheme());
        window.IgdrasylWiki.utils.log('Page: ' + window.IgdrasylWiki.utils.getPageName());
        
        /* Environmental overlays FIRST — most visible feature */
        initEnvironmentalOverlays();
        
        /* Community header enhancements */
        initCommunityHeader();
        
        /* Core features */
        initBackToTop();
        initSmoothScroll();
        initExternalLinks();
        initCollapsibleInfobox();
        initCustomTOC();
        
        /* Add initialized class to body */
        document.body.classList.add('igdrasyl-initialized');
        document.body.classList.add('igdrasyl-theme-loaded');
        
        /* Dispatch custom event for other scripts */
        var event = new CustomEvent('igdrasyl:ready', {
            detail: {
                config: window.IgdrasylWiki.config
            }
        });
        document.dispatchEvent(event);
        
        window.IgdrasylWiki.utils.log('Igdrasyl Wiki initialized successfully');
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

/* Wiki Tools — custom buttons, clock, theme toggle */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Wiki-tools.js'
    ]
});

/* Local Navigation — dropdown enhancements */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Local-navigation.js'
    ]
});

/* ============================================================
   END OF MASTER JAVASCRIPT
   ============================================================ */