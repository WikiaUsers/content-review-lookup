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



mw.hook('wikipage.content').add(function () {
    var $container = $('#cnsdr-recent-edits');
    if (!$container.length) return;

    $.getJSON(mw.util.wikiScript('api'), {
        action: 'query',
        list: 'recentchanges',
        rclimit: 15,
        rcnamespace: 0,
        rcprop: 'title|user|timestamp',
        format: 'json'
    }).done(function (data) {
        var changes = data.query.recentchanges;
        if (!changes || changes.length === 0) {
            $container.html('<span style="color: #ffffff;">No recent edits found.</span>');
            return;
        }

        var mainPageTitle = mw.config.get('wgMainPageTitle') || 'Combat Noobs Siege Defense: Reborn Wiki';
        var groupedByDate = {};

        changes.forEach(function (edit) {
            var dateObj = new Date(edit.timestamp);
            var dateKey = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
            
            if (!groupedByDate[dateKey]) {
                groupedByDate[dateKey] = [];
            }
            groupedByDate[dateKey].push(edit);
        });

        var html = '';

        for (var dateHeader in groupedByDate) {
            html += '<div style="margin-top: 10px; margin-bottom: 5px; font-weight: bold; font-size: 13px; color: #ffffff; border-bottom: 1px solid rgba(255, 255, 255, 0.3); padding-bottom: 3px;">' + mw.html.escape(dateHeader) + '</div>';
            html += '<ul style="list-style: none; margin: 0 0 10px 0; padding: 0;">';
            
            groupedByDate[dateHeader].forEach(function (edit) {
                var time = new Date(edit.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                var pageUrl = mw.util.getUrl(edit.title);
                var userUrl = mw.util.getUrl('User:' + edit.user);
                
                var rawTitle = edit.title === mainPageTitle ? 'Main Page' : edit.title;
                var displayTitle = rawTitle.length > 18 ? rawTitle.substring(0, 18) + '...' : rawTitle;

                html += '<li style="padding: 4px 0; border-bottom: 1px dashed rgba(255, 255, 255, 0.15); font-size: 12px; line-height: 1.4; color: #ffffff;">';
                html += '<span style="color: #ffffff; margin-right: 6px;">' + time + '</span>';
                html += '<a href="' + pageUrl + '" title="' + mw.html.escape(edit.title) + '" style="font-weight: bold; text-decoration: none; margin-right: 6px;">' + mw.html.escape(displayTitle) + '</a>';
                html += '<span style="color: #ffffff; margin-right: 6px;">edited by</span>';
                html += '<a href="' + userUrl + '" style="font-weight: bold; text-decoration: none;">' + mw.html.escape(edit.user) + '</a>';
                html += '</li>';
            });

            html += '</ul>';
        }

        $container.html(html);
    }).fail(function () {
        $container.html('<span style="color: #ffffff;">Failed to load recent edits.</span>');
    });
});

mw.loader.using(['mediawiki.api'], function() {
    var container = document.getElementById('cnsdr-latest-patch');
    if (!container) return;

    var ACTIVE_BG = '#00b4d8'; 

    new mw.Api().get({
        action: 'parse',
        page: 'Update Logs',
        prop: 'text',
        format: 'json',
        disablepp: true
    }).done(function(data) {
        if (!data || !data.parse || !data.parse.text) {
            container.innerHTML = '<span style="color:#ff4d4d;">No data returned.</span>';
            return;
        }

        var rawHtml = data.parse.text['*'];
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawHtml;

        var tables = tempDiv.querySelectorAll('table.wikitable');
        if (!tables || tables.length === 0) {
            container.innerHTML = '<span style="color:#cccccc;">No update tables found.</span>';
            return;
        }

        var majorTable = null;
        var patchTable = null;

        tables.forEach(function(table) {
            var th = table.querySelector('th');
            var titleText = th ? th.textContent.toLowerCase() : '';
            var listItems = table.querySelectorAll('li');

            if (!patchTable && (titleText.includes('fix') || titleText.includes('hotfix') || (titleText.includes('patch') && listItems.length <= 3))) {
                patchTable = table;
            } else if (!majorTable) {
                majorTable = table;
            }
        });

        if (!majorTable) majorTable = tables[0];
        if (!patchTable) patchTable = tables[tables.length > 1 ? 1 : 0];

        function renderTableContent(targetTable) {
            var header = targetTable.querySelector('th');
            var patchTitle = header ? header.innerHTML.trim() : 'Update Log';
            
            var contentCell = targetTable.querySelector('td') || targetTable;
            var clone = contentCell.cloneNode(true);

            var garbage = clone.querySelectorAll('th, #toc, .toc, .mw-headline-number');
            garbage.forEach(function(el) { el.remove(); });

            if (!clone.textContent.trim()) {
                return '<div style="font-size: 13px; font-weight: bold; color: #ffcc00; margin-bottom: 6px;">' + patchTitle + '</div><span style="color:#cccccc; font-size: 13px;">No details listed.</span>';
            }

            var out = '<div style="font-size: 13px; font-weight: bold; color: #ffcc00; margin-bottom: 8px; border-bottom: 1px solid rgba(255,204,0,0.2); padding-bottom: 4px;">' + patchTitle + '</div>';
            out += '<div class="cnsd-patch-body" style="color: #ffffff; font-size: 13px; line-height: 1.5;">' + clone.innerHTML + '</div>';
            return out;
        }

        var majorHtml = renderTableContent(majorTable);
        var patchHtml = renderTableContent(patchTable);

        var tabUi = '<div style="display: flex; gap: 6px; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 6px;">' +
            '<button id="cnsd-tab-major" style="flex: 1; background: ' + ACTIVE_BG + '; color: #ffffff; border: none; padding: 6px; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer;">Major Updates</button>' +
            '<button id="cnsd-tab-patch" style="flex: 1; background: rgba(255,255,255,0.1); color: #cccccc; border: none; padding: 6px; border-radius: 4px; font-size: 12px; font-weight: bold; cursor: pointer;">Patches & Fixes</button>' +
            '</div>' +
            '<div id="cnsd-tab-content" style="max-height: 220px; overflow-y: auto; padding-right: 4px;">' + majorHtml + '</div>';

        container.innerHTML = tabUi;

        var styleTag = document.getElementById('cnsd-patch-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'cnsd-patch-style';
            styleTag.innerHTML = 
                '#cnsd-tab-content h3 { font-size: 13px !important; color: #00b4d8 !important; margin: 6px 0 2px 0 !important; border: none !important; padding: 0 !important; }\n' +
                '#cnsd-tab-content ul { margin: 0 0 6px 14px !important; padding: 0 !important; color: #ffffff !important; }\n' +
                '#cnsd-tab-content li { margin-bottom: 2px !important; color: #ffffff !important; }\n' +
                '#cnsd-tab-content b, #cnsd-tab-content strong { color: #ffffff !important; }\n' +
                '#cnsd-tab-content #toc, #cnsd-tab-content .toc { display: none !important; }';
            document.head.appendChild(styleTag);
        }

        var btnMajor = document.getElementById('cnsd-tab-major');
        var btnPatch = document.getElementById('cnsd-tab-patch');
        var contentDiv = document.getElementById('cnsd-tab-content');

        btnMajor.addEventListener('click', function() {
            contentDiv.innerHTML = majorHtml;
            btnMajor.style.background = ACTIVE_BG;
            btnMajor.style.color = '#ffffff';
            btnPatch.style.background = 'rgba(255,255,255,0.1)';
            btnPatch.style.color = '#cccccc';
        });

        btnPatch.addEventListener('click', function() {
            contentDiv.innerHTML = patchHtml;
            btnPatch.style.background = ACTIVE_BG;
            btnPatch.style.color = '#ffffff';
            btnMajor.style.background = 'rgba(255,255,255,0.1)';
            btnMajor.style.color = '#cccccc';
        });

    }).fail(function(err) {
        console.error('CNSD Patch Notes Error:', err);
        container.innerHTML = '<span style="color:#ff4d4d;">Error loading patch notes.</span>';
    });
});