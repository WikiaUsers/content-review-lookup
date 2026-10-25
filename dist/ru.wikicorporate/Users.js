/**
 * Кастомные плашки и теги участников в профиле, комментариях и лидерборде
 * Источник данных: MediaWiki:Custom-Users.json
 */
(() => {
    'use strict';
    if (window.isCustomUsersTagsLoaded) return;
    window.isCustomUsersTagsLoaded = true;

    const JSON_PAGE = 'MediaWiki:Custom-Users.json';

    const renderProfileTags = (data) => {
        const profileUser = mw.config.get('profileUserName');
        if (!profileUser) return;

        const userData = data.users[profileUser];
        if (!userData || !Array.isArray(userData.tags) || !userData.tags.length) return;

        const containerSelector = '.user-identity-box .user-identity-header__attributes';

        const build = (cnt) => {
            if (cnt.dataset.customTagsRendered === 'true') return;
            cnt.dataset.customTagsRendered = 'true';

            if (userData.hideDefault) cnt.classList.add('hide-default-tags');

            userData.tags.forEach(tagId => {
                const tagDef = data.tags[tagId];
                if (!tagDef) return;

                const span = document.createElement('span');
                let className = `user-identity-header__tag custom-profile-tag ${tagDef.class || ''}`;
                if (tagDef.tooltip) className += ' has-tooltip';
                span.className = className.trim();

                if (tagDef.icon) {
                    const icon = document.createElement('i');
                    icon.className = tagDef.icon;
                    span.appendChild(icon);
                }

                if (tagDef.tooltip) {
                    const tooltipDiv = document.createElement('div');
                    tooltipDiv.className = 'custom-profile-tooltip';
                    tooltipDiv.textContent = tagDef.tooltip;
                    span.appendChild(tooltipDiv);
                }

                cnt.appendChild(span);
                cnt.appendChild(document.createTextNode(' '));
            });
        };

        const container = document.querySelector(containerSelector);
        if (container) {
            build(container);
        } else {
            const observer = new MutationObserver((mutations, obs) => {
                const found = document.querySelector(containerSelector);
                if (found) {
                    obs.disconnect();
                    build(found);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
            setTimeout(() => observer.disconnect(), 10000);
        }
    };

    const renderInlineTags = (data) => {
        const selector = [
            '[class^="EntityHeader_name"] a:not(.custom-inline-processed)',
            'a[class^="EntityHeader_name"]:not(.custom-inline-processed)',
            '.LeaderboardTable .user a:not(.custom-inline-processed)'
        ].join(', ');

        const scanLinks = () => {
            const links = document.querySelectorAll(selector);
            if (!links.length) return;

            links.forEach(link => {
                link.classList.add('custom-inline-processed');

                const username = link.textContent.trim();
                if (!username) return;

                const userData = data.users[username];
                if (userData && Array.isArray(userData.tags) && userData.tags.length > 0) {
                    const inlineTagId = userData.mainTag || userData.tags[0];
                    const tagDef = data.tags[inlineTagId];

                    if (tagDef) {
                        const prefixSpan = document.createElement('span');
                        prefixSpan.className = 'custom-inline-prefix';

                        const suffixSpan = document.createElement('span');
                        suffixSpan.className = 'custom-inline-suffix';

                        if (tagDef.icon) {
                            const icon = document.createElement('i');
                            icon.className = `${tagDef.icon} custom-inline-icon`;
                            prefixSpan.appendChild(icon);
                            prefixSpan.appendChild(document.createTextNode(' '));
                        }

                        if (tagDef.tooltip) {
                            const txt = document.createElement('span');
                            txt.className = `custom-inline-text ${tagDef.class || ''}`.trim();
                            txt.textContent = tagDef.tooltip;
                            suffixSpan.appendChild(document.createTextNode(' '));
                            suffixSpan.appendChild(txt);
                        }

                        if (prefixSpan.childNodes.length > 0) {
                            link.insertBefore(prefixSpan, link.firstChild);
                        }
                        if (suffixSpan.childNodes.length > 0) {
                            link.appendChild(suffixSpan);
                        }
                    }
                }
            });
        };

        let debounceTimer;
        const observer = new MutationObserver(() => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(scanLinks, 100);
        });
        observer.observe(document.body, { childList: true, subtree: true });
        scanLinks();
    };

    const init = () => {
        const rawUrl = `${mw.util.wikiScript()}?title=${encodeURIComponent(JSON_PAGE)}&action=raw&ctype=application/json`;
        fetch(rawUrl)
            .then(res => (res.ok ? res.json() : null))
            .then(data => {
                if (!data || !data.users || !data.tags) return;
                renderProfileTags(data);
                renderInlineTags(data);
            })
            .catch(error => {
                console.warn('Ошибка загрузки MediaWiki:Custom-Users.json:', error);
            });
    };

    mw.loader.using('mediawiki.util').then(init);
})();