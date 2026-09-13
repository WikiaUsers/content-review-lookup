(function ($, mw) {
    'use strict';

    (function injectStyles() {
        if (document.querySelector('#cw-unified-styles')) return;
        var style = document.createElement('style');
        style.id = 'cw-unified-styles';
        style.innerHTML = `
            #cw-header-btn-group {
                display: flex !important;
                flex-direction: row !important;
                align-items: center !important;
                position: relative !important;
                z-index: 10 !important;
            }
            .cw-header-btn-wrapper {
                display: inline-flex !important;
                align-items: center !important;
                position: relative !important;
            }
            .cw-header-btn {
                display: inline-flex !important;
                align-items: center !important;
                padding: 6px 8px !important;
                color: var(--theme-link-color, var(--theme-page-dynamic-color-1, #ffc500)) !important;
                background: transparent !important;
                border: none !important;
                border-radius: 18px !important;
                cursor: pointer !important;
                transition: background-color 0.15s ease, box-shadow 0.15s ease !important;
                font-family: inherit !important;
                white-space: nowrap !important;
                line-height: 1 !important;
                margin: 0 !important;
                box-shadow: none !important;
            }
            .cw-header-btn:hover {
                background: rgba(255, 197, 0, 0.18) !important;
                box-shadow: 0 0 10px rgba(255, 197, 0, 0.25) !important;
            }
            .cw-header-divider {
                width: 1px !important;
                height: 14px !important;
                background: rgba(255, 255, 255, 0.25) !important;
                margin: 0 4px !important;
                flex-shrink: 0 !important;
            }
            .wikitable th {
                position: sticky !important;
                top: 0 !important;
                z-index: 5 !important;
                background-color: var(--theme-page-background-color, #1a1a1a) !important;
                box-shadow: 0 2px 5px rgba(0,0,0,0.5) !important;
            }
            #cw-back-to-top {
                position: fixed !important;
                bottom: 25px !important;
                right: 25px !important;
                width: 42px !important;
                height: 42px !important;
                border-radius: 50% !important;
                background: var(--theme-link-color, #ffc500) !important;
                color: #000 !important;
                border: none !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                opacity: 0 !important;
                visibility: hidden !important;
                transition: opacity 0.25s ease, visibility 0.25s ease, transform 0.2s ease !important;
                z-index: 9999 !important;
                box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
            }
            #cw-back-to-top.cw-show {
                opacity: 1 !important;
                visibility: visible !important;
            }
            #cw-back-to-top:hover {
                transform: translateY(-3px) scale(1.05) !important;
            }
            .cw-heading-anchor {
                display: inline-block !important;
                margin-left: 8px !important;
                color: var(--theme-link-color, #ffc500) !important;
                opacity: 0 !important;
                transition: opacity 0.2s ease !important;
                text-decoration: none !important;
                font-weight: bold !important;
            }
            h2:hover .cw-heading-anchor, h3:hover .cw-heading-anchor {
                opacity: 0.7 !important;
            }
            .cw-heading-anchor:hover {
                opacity: 1 !important;
            }
            .cw-badge-container {
                display: flex !important;
                flex-wrap: wrap !important;
                gap: 8px !important;
                align-items: center !important;
                margin-top: 6px !important;
            }
            .cw-badge {
                display: inline-flex !important;
                align-items: center !important;
                gap: 5px !important;
                font-size: 12px !important;
                font-weight: 700 !important;
                color: var(--theme-link-color, #ffc500) !important;
                background: rgba(255, 197, 0, 0.1) !important;
                border: 1px solid rgba(255, 197, 0, 0.25) !important;
                padding: 3px 10px !important;
                border-radius: 12px !important;
            }
        `;
        document.head.appendChild(style);
    })();

    function getRelativeTime(timestamp) {
        if (!timestamp) return 'Unknown';
        var now = new Date();
        var past = new Date(timestamp);
        var diffSecs = Math.floor((now - past) / 1000);

        if (diffSecs < 60) return 'Just now';
        var diffMins = Math.floor(diffSecs / 60);
        if (diffMins < 60) return diffMins + 'm ago';
        var diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return diffHours + 'h ago';
        var diffDays = Math.floor(diffHours / 24);
        if (diffDays < 30) return diffDays + 'd ago';
        var diffMonths = Math.floor(diffDays / 30);
        if (diffMonths < 12) return diffMonths + 'mo ago';
        return Math.floor(diffDays / 365) + 'y ago';
    }

    function initAll($content) {
        var wrapper = $content ? $content[0] : document;
        if (!wrapper) return;

        var actionHeader = document.querySelector('.page-header__actions');
        if (actionHeader && !document.querySelector('#cw-header-btn-group')) {
            var btnGroup = document.createElement('div');
            btnGroup.id = 'cw-header-btn-group';

            function createFandomBtn(text, svgIcon, onClick, showDivider) {
                var btnWrapper = document.createElement('div');
                btnWrapper.className = 'cw-header-btn-wrapper';

                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'cw-header-btn wds-button wds-is-text';
                btn.innerHTML = svgIcon + '<span style="margin-left:5px;font-weight:700;letter-spacing:0.5px;font-size:12px;text-transform:uppercase;white-space:nowrap;display:inline-block !important;">' + text + '</span>';
                
                btn.onclick = onClick;
                btnWrapper.appendChild(btn);

                if (showDivider) {
                    var divider = document.createElement('div');
                    divider.className = 'cw-header-divider';
                    btnWrapper.appendChild(divider);
                }

                return btnWrapper;
            }

            var sourceIcon = '<svg class="wds-icon wds-icon-small" width="18" height="18" viewBox="0 0 18 18" fill="currentColor" style="flex-shrink:0;"><path d="M13 2H6c-1.1 0-2 .9-2 2v10h2V4h7V2zm2 4H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H8V8h7v8z"/></svg>';

            var sourceBtn = createFandomBtn('COPY SOURCE', sourceIcon, function() {
                var pageName = mw.config.get('wgPageName');
                if (!pageName) return;

                $.get(mw.util.wikiScript('api'), {
                    action: 'query',
                    prop: 'revisions',
                    titles: pageName,
                    rvprop: 'content',
                    rvslots: 'main',
                    format: 'json'
                }).done(function(data) {
                    var pages = data.query.pages;
                    var pageId = Object.keys(pages)[0];
                    if (pageId && pages[pageId].revisions) {
                        var content = pages[pageId].revisions[0].slots.main['*'];
                        navigator.clipboard.writeText(content).then(function() {
                            var label = sourceBtn.querySelector('span');
                            label.innerText = 'COPIED!';
                            setTimeout(function(){ label.innerText = 'COPY SOURCE'; }, 2000);
                        });
                    }
                });
            }, false);

            btnGroup.appendChild(sourceBtn);
            
            actionHeader.insertBefore(btnGroup, actionHeader.firstChild);
        }

        wrapper.querySelectorAll('.wikitable').forEach(function(table) {
            table.style.overflow = 'visible';
            table.querySelectorAll('tbody tr').forEach(function(row) {
                row.style.transition = 'background-color 0.2s ease';
                row.onmouseenter = function() { this.style.backgroundColor = 'rgba(0, 210, 255, 0.08)'; };
                row.onmouseleave = function() { this.style.backgroundColor = ''; };
            });
        });

        wrapper.querySelectorAll('.mw-collapsible-toggle').forEach(function(t) {
            t.style.cssText = 'color:var(--theme-link-color, #ffc500) !important;font-weight:bold;padding:2px 6px;';
        });

        wrapper.querySelectorAll('a.external').forEach(function(link) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });

        if (!document.querySelector('#cw-back-to-top')) {
            var bttBtn = document.createElement('button');
            bttBtn.id = 'cw-back-to-top';
            bttBtn.type = 'button';
            bttBtn.setAttribute('title', 'Back to Top');
            bttBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor"><path d="M9 5l-6 6 1.41 1.41L9 7.83l4.59 4.58L15 11z"/></svg>';
            document.body.appendChild(bttBtn);

            bttBtn.onclick = function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            window.addEventListener('scroll', function() {
                if (window.scrollY > 400) {
                    bttBtn.classList.add('cw-show');
                } else {
                    bttBtn.classList.remove('cw-show');
                }
            });
        }

        wrapper.querySelectorAll('h2, h3').forEach(function(heading) {
            if (heading.querySelector('.cw-heading-anchor')) return;
            var headline = heading.querySelector('.mw-headline');
            var id = headline ? headline.id : heading.id;
            
            if (id) {
                var anchor = document.createElement('a');
                anchor.className = 'cw-heading-anchor';
                anchor.href = '#' + id;
                anchor.innerText = '#';
                anchor.setAttribute('title', 'Copy link to this section');
                anchor.onclick = function(e) {
                    e.preventDefault();
                    var fullUrl = window.location.href.split('#')[0] + '#' + id;
                    navigator.clipboard.writeText(fullUrl).then(function() {
                        anchor.innerText = '✓';
                        setTimeout(function() { anchor.innerText = '#'; }, 1500);
                    });
                };
                heading.appendChild(anchor);
            }
        });

        var pageHeader = document.querySelector('.page-header__title-wrapper');
        if (pageHeader && !document.querySelector('.cw-badge-container')) {
            var container = document.createElement('div');
            container.className = 'cw-badge-container';

            var badge = document.createElement('div');
            badge.className = 'cw-badge cw-time-spent-badge';
            badge.innerHTML = '⏱️ Reading Time: 0s';
            container.appendChild(badge);

            var pageName = mw.config.get('wgPageName');
            if (pageName) {
                $.get(mw.util.wikiScript('api'), {
                    action: 'query',
                    prop: 'revisions',
                    titles: pageName,
                    rvprop: 'timestamp',
                    format: 'json'
                }).done(function(data) {
                    var pages = data.query.pages;
                    var pageId = Object.keys(pages)[0];
                    if (pageId && pages[pageId].revisions) {
                        var ts = pages[pageId].revisions[0].timestamp;
                        var updatedBadge = document.createElement('div');
                        updatedBadge.className = 'cw-badge';
                        updatedBadge.innerHTML = '📅 Updated ' + getRelativeTime(ts);
                        container.appendChild(updatedBadge);
                    }
                });
            }

            pageHeader.appendChild(container);

            var secondsSpent = 0;
            setInterval(function() {
                secondsSpent++;
                var mins = Math.floor(secondsSpent / 60);
                var secs = secondsSpent % 60;
                
                if (mins > 0) {
                    badge.innerHTML = '⏱️ Reading Time: ' + mins + 'm ' + secs + 's';
                } else {
                    badge.innerHTML = '⏱️ Reading Time: ' + secs + 's';
                }
            }, 1000);
        }

        if (!window.cwSearchShortcutBound) {
            window.cwSearchShortcutBound = true;
            document.addEventListener('keydown', function(e) {
                var activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
                if (activeTag === 'input' || activeTag === 'textarea' || document.activeElement.isContentEditable) {
                    return;
                }

                if (e.key === '/') {
                    var searchInput = document.querySelector('.search-app__input') || document.querySelector('input[type="search"]');
                    if (searchInput) {
                        e.preventDefault();
                        searchInput.focus();
                        searchInput.select();
                    }
                }
            });
        }

        if (!window.cwUnsavedWarningBound) {
            window.cwUnsavedWarningBound = true;
            var isDirty = false;

            document.addEventListener('input', function(e) {
                var target = e.target;
                if (target && (target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && target.type === 'text'))) {
                    if (target.value.trim().length > 5) {
                        isDirty = true;
                    }
                }
            });

            document.addEventListener('submit', function() {
                isDirty = false;
            });

            window.addEventListener('beforeunload', function(e) {
                if (isDirty) {
                    e.preventDefault();
                    e.returnValue = '';
                }
            });
        }
    }

    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(initAll);
    } else {
        document.addEventListener('DOMContentLoaded', function() { initAll(); });
    }

})(window.jQuery, window.mw);

window.UserTagsJS = {
    modules: {
        custom: {
            'ThatOneGuySigma': ['owner']
        }
    },
    tags: {
        owner: { u: 'Wiki Owner' }
    }
};
window.dev = window.dev || {};
window.dev.editSummaries = {
    css: false,
    select: 'Select an edit summary:\n' +
        '* Created page\n' +
        '* Updated stats\n' +
        '* Fixed formatting & layout\n' +
        '* Added images\n' +
        '* Updated patch notes'
};
(function () {
    'use strict';

    function fixCustomWikiNav() {
        var styleId = 'cw-custom-nav-fix';
        if (!document.getElementById(styleId)) {
            var style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
                .wds-dropdown-level-2__submenu,
                .wds-dropdown-level-3__submenu {
                    display: none !important;
                    position: absolute !important;
                    left: 100% !important;
                    top: 0 !important;
                    background: #121212 !important;
                    border: 1px solid var(--theme-link-color, #ffc500) !important;
                    border-radius: 6px !important;
                    padding: 6px 0 !important;
                    min-width: 160px !important;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.6) !important;
                    z-index: 99999 !important;
                }
                .wds-dropdown-level-2:hover > .wds-dropdown-level-2__submenu,
                .wds-dropdown-level-3:hover > .wds-dropdown-level-3__submenu {
                    display: block !important;
                }
                .wds-dropdown-level-2__toggle,
                .wds-dropdown-level-3__toggle {
                    display: flex !important;
                    flex-direction: row !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                    padding: 6px 12px !important;
                    white-space: nowrap !important;
                }
                .wds-dropdown-level-2__toggle .wds-icon,
                .wds-dropdown-level-3__toggle .wds-icon {
                    transform: rotate(-90deg) !important;
                    margin-left: 10px !important;
                    margin-top: 0 !important;
                    display: inline-block !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixCustomWikiNav);
    } else {
        fixCustomWikiNav();
    }
})();