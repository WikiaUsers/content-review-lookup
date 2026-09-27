/* ============================================================
Activity Advanced

A unified activity feed for Recent Changes, logs and discussions activity
Supports most RC filters, filters by users, namespaces, activity types, and a rail with some stats and the community corner module

Assets (CSS, icons, strings) are loaded from user subpages:
  - ActivityAdvanced.css   — main stylesheet
  - ActivityAdvanced.css/icons.css       — icon font/SVG classes
  - ActivityAdvanced.json  — localized UI strings (JSON overrides fallbacks)
============================================================ */

(function() {
    'use strict';
    
    if (window.__ActivityAdvancedLoaded) return;
    window.__ActivityAdvancedLoaded = true;

    function waitForMw() {
        if (window.mw && mw.loader && typeof mw.loader.using === 'function') {
            mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.user']).done(init).fail(function(err) {
                console.error('[ActAdv] Module load failed:', err);
            });
        } else {
            setTimeout(waitForMw, 100);
        }
    }

    function init() {
        if (!/\.fandom\.com$/.test(location.hostname)) return;
        if (!window.mw || !mw.Api || !mw.config) return;
        if (window.top !== window.self) return;

        var ASSET_PAGES = {
            css: 'MediaWiki:ActivityAdvanced.css',
            icons: 'MediaWiki:ActivityAdvanced.css/icons.css',
            json: 'ActivityAdvanced/ActivityAdvanced.json'
        };
        
        var LANG = ((mw.config.get('wgUserLanguage') || 'en') + '').indexOf('ru') === 0 ? 'ru' : 'en';

        var FALLBACK_STRINGS = {
            ru: { 
                pageTitle: 'Активность вики', 
                subtitle: 'Служебная страница', 
                loading: 'Загрузка…', 
                settings: 'Настройки', 
                close: 'Закрыть',
                sourcesFailed: 'Не удалось загрузить: {list}. Показаны остальные данные.',
                sourceRc: 'правки', 
                sourceLog: 'логи', 
                sourcePost: 'обсуждения'
            },
            en: { 
                pageTitle: 'Wiki activity', 
                subtitle: 'Special page', 
                loading: 'Loading…', 
                settings: 'Settings', 
                close: 'Close',
                sourcesFailed: 'Failed to load: {list}. Showing the rest.',
                sourceRc: 'recent changes', 
                sourceLog: 'logs', 
                sourcePost: 'discussions'
            }
        };

        var STR = {};
        var els = {};
        var observer = null;
        var cardIndexByUser = new Map();

        var api = new mw.Api();

        function fetchRawPage(pageTitle) {
            var params = new URLSearchParams({
                action: 'query', prop: 'revisions', rvprop: 'content', rvslots: 'main',
                format: 'json', formatversion: 2, titles: pageTitle,
                origin: '*'
            });
            
            return fetch('https://yandere-simulator.fandom.com/ru/api.php?' + params.toString(), {
                method: 'GET', 
                headers: { 'Accept': 'application/json' }
            }).then(function(res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            }).then(function(data) {
                var pages = data.query.pages;
                var pageId = Object.keys(pages)[0];
                if (!pageId || !pages[pageId].revisions || !pages[pageId].revisions.length) {
                    console.warn('[ActAdv] Page not found or empty: ' + pageTitle);
                    return null;
                }
                return pages[pageId].revisions[0].slots.main.content;
            }).catch(function(e) {
                console.error('[ActAdv] Failed to fetch ' + pageTitle + ':', e);
                return null;
            });
        }

        function loadAssets() {
            var PAGE_CSS = 'Участница:Ŝenezala/debugging.css';
            var PAGE_ICONS = 'Участница:Ŝenezala/icons.css';
            var PAGE_JSON = 'Участница:Ŝenezala/debugging.json';

            return fetchRawPage(PAGE_CSS).then(function(cssText) {
                if (cssText) {
                    var styleEl = document.createElement('style');
                    styleEl.id = 'actAdv-style-ext';
                    styleEl.textContent = cssText;
                    document.head.appendChild(styleEl);
                }
                return fetchRawPage(PAGE_ICONS);
            }).then(function(iconsText) {
                if (iconsText) {
                    var iconsEl = document.createElement('style');
                    iconsEl.id = 'actAdv-style-icons';
                    iconsEl.textContent = iconsText;
                    document.head.appendChild(iconsEl);
                }
                return fetchRawPage(PAGE_JSON);
            }).then(function(jsonText) {
                var jsonData = {};
                if (jsonText) {
                    try { 
                        jsonData = JSON.parse(jsonText); 
                    } catch (parseErr) { 
                        console.error('[ActAdv] Invalid JSON syntax in debugging.json', parseErr); 
                    }
                }

                STR = {};
                var fallback = FALLBACK_STRINGS[LANG] || {};
                var jsonLang = jsonData[LANG] || {};
                
                for (var key in fallback) {
                    if (fallback.hasOwnProperty(key)) STR[key] = fallback[key];
                }
                for (var key2 in jsonLang) {
                    if (jsonLang.hasOwnProperty(key2)) STR[key2] = jsonLang[key2];
                }
                
                if (!jsonText || !jsonData[LANG]) {
                    console.warn('[ActAdv] JSON strings failed to load, using minimal fallback.');
                }
            }).catch(function(err) {
                console.error('[ActAdv] Critical failure loading assets:', err);
                STR = {};
                var fb = FALLBACK_STRINGS[LANG] || {};
                for (var k in fb) {
                    if (fb.hasOwnProperty(k)) STR[k] = fb[k];
                }
            });
        }

        function T(key, params) {
            var s = STR[key] || (FALLBACK_STRINGS[LANG] && FALLBACK_STRINGS[LANG][key]) || key;
            if (params) {
                for (var k in params) {
                    if (params.hasOwnProperty(k)) {
                        s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
                    }
                }
            }
            return s;
        }

        function plural(forms, n) {
            if (!forms) return String(n);
            var f = forms.split('|');
            if (LANG !== 'ru') {
                return (f[1] || f[0]).replace('{n}', n);
            }
            var m10 = n % 10, m100 = n % 100;
            var idx = 2;
            if (m10 === 1 && m100 !== 11) idx = 0;
            else if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) idx = 1;
            var template = f[idx] || f[f.length - 1] || '{n}';
            return template.replace('{n}', n);
        }

        var LS_KEY = 'actAdv-settings';
        var DEFAULTS = {
            filters: { edit: true, new: true, log: true, af: true, forum: true, wall: true, comment: true, newusers: false, patrol: false },
            excludeUsers: [], includeUsers: [], namespaces: [], ignoreTalk: true,
            limit: 100, showBots: false, expandDetails: false, autoLoad: true, hideRail: false,
            onlyUnpatrolled: false,
        };

        var Store = {
            settings: null,
            load: function() {
                var s = {};
                try { 
                    var raw = localStorage.getItem(LS_KEY);
                    if (raw) s = JSON.parse(raw) || {};
                } catch (e) { 
                    s = {}; 
                }
                
                this.settings = {};
                for (var k in DEFAULTS) {
                    if (DEFAULTS.hasOwnProperty(k)) this.settings[k] = DEFAULTS[k];
                }
                for (var k2 in s) {
                    if (s.hasOwnProperty(k2)) this.settings[k2] = s[k2];
                }
                
                this.settings.filters = {};
                for (var fk in DEFAULTS.filters) {
                    if (DEFAULTS.filters.hasOwnProperty(fk)) this.settings.filters[fk] = DEFAULTS.filters[fk];
                }
                if (s.filters) {
                    for (var fk2 in s.filters) {
                        if (s.filters.hasOwnProperty(fk2)) this.settings.filters[fk2] = s.filters[fk2];
                    }
                }
                
                if (typeof this.settings.limit !== 'number' || this.settings.limit < 10) this.settings.limit = 100;
                this.settings.limit = Math.min(this.settings.limit, 500);
                
                ['excludeUsers', 'includeUsers'].forEach(function(key) {
                    if (!Array.isArray(this.settings[key])) this.settings[key] = [];
                    this.settings[key] = this.settings[key].map(function(u) { return String(u).trim(); }).filter(Boolean);
                }, this);
                
                if (!Array.isArray(this.settings.namespaces)) this.settings.namespaces = [];
                this.settings.namespaces = this.settings.namespaces.map(Number).filter(function(n) { return !isNaN(n); });
                
                return this.settings;
            },
            save: function() {
                try { 
                    localStorage.setItem(LS_KEY, JSON.stringify(this.settings)); 
                } catch (e) {}
            },
        };

        function normalizeUserList(str) {
            return String(str || '').split(/[\n,]+/).map(function(s) { return s.trim(); }).filter(Boolean);
        }

        var FALLBACK_NAMESPACES = [
            { id: 0, name: '(Main)' }, { id: 1, name: 'Talk' }, { id: 2, name: 'User' },
            { id: 3, name: 'User talk' }, { id: 4, name: 'Project' }, { id: 5, name: 'Project talk' },
            { id: 6, name: 'File' }, { id: 7, name: 'File talk' }, { id: 8, name: 'MediaWiki' },
            { id: 9, name: 'MediaWiki talk' }, { id: 10, name: 'Template' }, { id: 11, name: 'Template talk' },
            { id: 12, name: 'Help' }, { id: 13, name: 'Help talk' }, { id: 14, name: 'Category' },
            { id: 15, name: 'Category talk' }, { id: 110, name: 'Forum' }, { id: 111, name: 'Forum talk' },
            { id: 420, name: 'GeoJson' }, { id: 421, name: 'GeoJson talk' },
            { id: 500, name: 'User blog' }, { id: 501, name: 'User blog comment' },
            { id: 502, name: 'Blog' }, { id: 503, name: 'Blog talk' },
            { id: 828, name: 'Module' }, { id: 829, name: 'Module talk' },
            { id: 1200, name: 'Message Wall' }, { id: 1201, name: 'Thread' },
            { id: 1202, name: 'Message Wall Greeting' }, { id: 1203, name: 'Message Wall Greeting Talk' },
            { id: 2000, name: 'Board' }, { id: 2001, name: 'Board Thread' }, { id: 2002, name: 'Topic' },
            { id: 2900, name: 'Map' }, { id: 2901, name: 'Map talk' },
        ];
        
        var NS_LIST = [];

        function fetchNamespaces() {
            return api.get({
                action: 'query', meta: 'siteinfo', siprop: 'namespaces',
                uselang: mw.config.get('wgUserLanguage') || 'en',
                format: 'json', formatversion: 2
            }).then(function(res) {
                var arr = (res && res.query && res.query.namespaces) || null;
                if (!arr || !arr.length) return null;
                return arr.map(function(n) { 
                    return { id: n.id, name: n.name, canonical: n.canonical }; 
                });
            }).catch(function(e) {
                console.warn('[ActAdv] Failed to fetch namespaces:', e);
                return null;
            });
        }

        function buildNsList() {
            if (!els.nsList) return;
            var ignoreTalk = Store.settings.ignoreTalk !== false;
            var selected = Store.settings.namespaces || [];
            var list = NS_LIST.filter(function(n) { return !ignoreTalk || n.id % 2 === 0; });
            
            els.nsList.innerHTML = list.map(function(n) {
                var label = n.id === 0 ? T('nsMain') : (n.canonical || n.name || ('NS ' + n.id));
                var checked = selected.indexOf(n.id) !== -1 ? ' checked' : '';
                return '<label class="actAdv-ns-item"><input type="checkbox" data-ns="' + n.id + '"' + checked + '> ' + esc(label) + '</label>';
            }).join('');
        }

        function initNamespaces() {
            return fetchNamespaces().then(function(fetched) {
                NS_LIST = (fetched && fetched.length ? fetched : FALLBACK_NAMESPACES).slice().sort(function(a, b) { return a.id - b.id; });
                buildNsList();
            });
        }

        var state = {
            pool: [],
            seen: {},
            rendered: 0,
            lastDayKey: '',
            loading: false,
            sources: {
                rc: { cont: null, done: false, patrolAllowed: null },
                log: { cont: null, done: false },
                post: { page: 0, done: false },
                af: { cont: null, done: false, allowed: null },
            },
            errors: [],
            railDone: false,
        };

        var esc = function(s) { return mw.html.escape(String(s == null ? '' : s)); };
        var wikiId = mw.config.get('wgCityId');

        var AVATAR_CACHE_KEY = 'actAdv-avatar-cache';
        var AVATAR_CACHE_TTL = 24 * 60 * 60 * 1000;
        var MAX_AVATAR_CACHE = 500;
        var avatarCache = new Map();
        var pendingAvatars = {};

        var USER_RIGHTS_CACHE_PREFIX = 'actAdv-user-rights-';
        var USER_RIGHTS_CACHE_TTL = 60 * 60 * 1000;
        var userRightsCache = null;
        var userRightsCacheKey = USER_RIGHTS_CACHE_PREFIX + (mw.config.get('wgCityId') || location.hostname);

        function loadAvatarCache() {
            try {
                var raw = localStorage.getItem(AVATAR_CACHE_KEY);
                if (!raw) return;
                var data = JSON.parse(raw);
                var now = Date.now();
                for (var username in data) {
                    if (data.hasOwnProperty(username)) {
                        var entry = data[username];
                        if (entry && typeof entry.ts === 'number' && (now - entry.ts) < AVATAR_CACHE_TTL) {
                            if (avatarCache.size < MAX_AVATAR_CACHE) {
                                avatarCache.set(username, entry);
                            }
                        }
                    }
                }
            } catch (e) {
                console.warn('[ActAdv] Failed to load avatar cache:', e);
            }
        }

        function saveAvatarCache() {
            try {
                var data = {};
                avatarCache.forEach(function(entry, username) {
                    data[username] = entry;
                });
                localStorage.setItem(AVATAR_CACHE_KEY, JSON.stringify(data));
            } catch (e) {}
        }

        function loadUserRightsCache() {
            try {
                var raw = localStorage.getItem(userRightsCacheKey);
                if (!raw) return;
                var data = JSON.parse(raw);
                if (data && typeof data.ts === 'number' && Array.isArray(data.rights)) {
                    if ((Date.now() - data.ts) < USER_RIGHTS_CACHE_TTL) {
                        userRightsCache = data;
                    }
                }
            } catch (e) {}
        }

        function saveUserRightsCache(rights) {
            userRightsCache = { rights: rights, ts: Date.now() };
            try {
                localStorage.setItem(userRightsCacheKey, JSON.stringify(userRightsCache));
            } catch (e) {}
        }

        function clearAllCache() {
            try {
                localStorage.removeItem(AVATAR_CACHE_KEY);
                avatarCache.clear();

                var keysToRemove = [];
                for (var i = 0; i < localStorage.length; i++) {
                    var key = localStorage.key(i);
                    if (key && key.indexOf(USER_RIGHTS_CACHE_PREFIX) === 0) {
                        keysToRemove.push(key);
                    }
                }
                keysToRemove.forEach(function(key) { localStorage.removeItem(key); });
                userRightsCache = null;

                return true;
            } catch (e) {
                console.warn('[ActAdv] Failed to clear cache:', e);
                return false;
            }
        }

        function fetchUserRights() {
            if (userRightsCache && (Date.now() - userRightsCache.ts) < USER_RIGHTS_CACHE_TTL) {
                return Promise.resolve(userRightsCache.rights);
            }
            return api.get({
                action: 'query', meta: 'userinfo', format: 'json', formatversion: 2,
                uiprop: 'rights'
            }).then(function(res) {
                var rights = (res && res.query && res.query.userinfo && res.query.userinfo.rights) || [];
                saveUserRightsCache(rights);
                return rights;
            }).catch(function(e) {
                console.warn('[ActAdv] Failed to fetch user rights:', e);
                return [];
            });
        }

        var patrolToken = null;

        function getPatrolToken() {
            if (patrolToken) return Promise.resolve(patrolToken);
            return api.get({
                action: 'query', meta: 'tokens', type: 'watch|patrol',
                format: 'json', formatversion: 2
            }).then(function(res) {
                patrolToken = res && res.query && res.query.tokens && res.query.tokens.patroltoken;
                return patrolToken;
            }).catch(function(e) {
                console.warn('[ActAdv] Failed to get patrol token:', e);
                return null;
            });
        }

        function patrolRevision(revid, btn) {
            if (!revid || !btn) return;
            btn.disabled = true;
            btn.classList.add('actAdv-patrol-loading');
            
            return getPatrolToken().then(function(token) {
                if (!token) throw new Error('No patrol token');
                return api.post({
                    action: 'patrol',
                    revid: revid,
                    token: token,
                    format: 'json', formatversion: 2
                });
            }).then(function() {
                btn.classList.remove('actAdv-patrol-loading');
                btn.classList.add('actAdv-patrolled');
                btn.title = '✓ Patrolled';
                btn.setAttribute('aria-label', 'Patrolled');
                
                for (var i = 0; i < state.pool.length; i++) {
                    var entry = state.pool[i];
                    if (entry.extra && entry.extra.revid === revid) {
                        entry.extra.unpatrolled = false;
                        entry.extra.autopatrolled = true;
                        break;
                    }
                }
            }).catch(function(e) {
                console.warn('[ActAdv] Patrol failed:', e);
                btn.disabled = false;
                btn.classList.remove('actAdv-patrol-loading');
                btn.title = 'Patrol failed — click to retry';
            });
        }

        function checkAfRights() {
            return fetchUserRights().then(function(rights) {
                return rights.indexOf('abusefilter-view') !== -1 || rights.indexOf('abusefilter-log') !== -1;
            });
        }

        function checkPatrolRights() {
            return fetchUserRights().then(function(rights) {
                return rights.indexOf('patrol') !== -1 || rights.indexOf('patrolmarks') !== -1;
            });
        }

        function getCachedAvatar(username) {
            var entry = avatarCache.get(username);
            if (!entry) return undefined;
            var now = Date.now();
            if ((now - entry.ts) >= AVATAR_CACHE_TTL) {
                avatarCache.delete(username);
                return undefined;
            }
            return entry.url;
        }

        function setCachedAvatar(username, url) {
            if (avatarCache.has(username)) {
                avatarCache.delete(username);
            } else if (avatarCache.size >= MAX_AVATAR_CACHE) {
                var oldest = avatarCache.keys().next().value;
                avatarCache.delete(oldest);
            }
            avatarCache.set(username, { url: url, ts: Date.now() });
        }

        function userInfo(name) {
            var anon = !!name && mw.util && mw.util.isIPAddress ? mw.util.isIPAddress(name) : false;
            var raw = name || '';
            return {
                name: name || T('deletedUser'),
                anonymous: anon,
                url: anon ? mw.util.getUrl('Special:Contributions/' + raw) : mw.util.getUrl('User:' + raw),
                avatarUrl: null
            };
        }

        function resolveAvatarsAsync(entries) {
            var toResolve = [];
            var idToUsername = new Map();

            entries.forEach(function(e) {
                if (!e.user || e.user.anonymous || e.user.avatarUrl) return;
                var uname = e.user.name;

                var cachedAvatar = getCachedAvatar(uname);
                if (cachedAvatar !== undefined) {
                    e.user.avatarUrl = cachedAvatar;
                    return;
                }

                if (pendingAvatars[uname]) return;

                if (e.extra && e.extra.userId) {
                    idToUsername.set(e.extra.userId, uname);
                    pendingAvatars[uname] = true;
                } else if (toResolve.indexOf(uname) === -1) {
                    toResolve.push(uname);
                    pendingAvatars[uname] = true;
                }
            });

            if (toResolve.length === 0 && idToUsername.size === 0) return;

            var usernameToId = new Map();

            function resolveIds() {
                var idPromise = Promise.resolve();
                
                if (toResolve.length > 0) {
                    var chunks = [];
                    for (var i = 0; i < toResolve.length; i += 50) {
                        chunks.push(toResolve.slice(i, i + 50));
                    }

                    var chunkPromises = chunks.map(function(chunk) {
                        return api.get({
                            action: 'query', list: 'users', ususers: chunk.join('|'),
                            format: 'json', formatversion: 2
                        }).then(function(res) {
                            var users = (res && res.query && res.query.users) || [];
                            users.forEach(function(u) {
                                if (u.userid && u.name) usernameToId.set(u.name, u.userid);
                            });
                        }).catch(function() {});
                    });
                    idPromise = Promise.all(chunkPromises);
                }

                return idPromise.then(function() {
                    var allIds = [];
                    idToUsername.forEach(function(uname, uid) { allIds.push(uid); });
                    usernameToId.forEach(function(uid) { allIds.push(uid); });
                    var uniqueIds = allIds.filter(function(v, i, a) { return a.indexOf(v) === i; });

                    if (uniqueIds.length > 0) {
                        var CONCURRENCY = 5;
                        var index = 0;
                        
                        function processBatch() {
                            if (index >= uniqueIds.length) return Promise.resolve();
                            var batch = uniqueIds.slice(index, index + CONCURRENCY);
                            index += CONCURRENCY;
                            
                            var promises = batch.map(function(uid) {
                                return fetch('/wikia.php?controller=UserProfile&method=getUserData&format=json&userId=' + uid, { 
                                    credentials: 'same-origin' 
                                }).then(function(r) { 
                                    return r.ok ? r.json() : null; 
                                }).then(function(d) {
                                    var av = d && d.userData && d.userData.avatar ? d.userData.avatar : null;
                                    var unameById = idToUsername.get(uid);
                                    if (unameById) {
                                        setCachedAvatar(unameById, av);
                                        delete pendingAvatars[unameById];
                                    }

                                    usernameToId.forEach(function(mappedId, mappedName) {
                                        if (mappedId === uid) {
                                            setCachedAvatar(mappedName, av);
                                            delete pendingAvatars[mappedName];
                                        }
                                    });
                                }).catch(function() {
                                    var unameById = idToUsername.get(uid);
                                    if (unameById) delete pendingAvatars[unameById];
                                    usernameToId.forEach(function(mappedId, mappedName) {
                                        if (mappedId === uid) delete pendingAvatars[mappedName];
                                    });
                                });
                            });
                            
                            return Promise.all(promises).then(processBatch);
                        }
                        
                        return processBatch();
                    }
                }).then(function() {
                    saveAvatarCache();
                    updateRenderedAvatars();
                });
            }

            resolveIds();
        }

        function updateRenderedAvatars() {
            if (!els.feed || cardIndexByUser.size === 0) return;

            var updates = [];

            cardIndexByUser.forEach(function(cards, username) {
                var avatarUrl = getCachedAvatar(username);
                if (!avatarUrl) return;

                cards.forEach(function(card) {
                    var avatarSpan = card.querySelector('.actAdv-avatar');
                    if (avatarSpan && !avatarSpan.querySelector('img')) {
                        updates.push({ span: avatarSpan, url: avatarUrl });
                    }
                });
            });

            updates.forEach(function(u) {
                u.span.innerHTML = '<img src="' + esc(u.url) + '" alt="" loading="lazy">';
            });
        }

        function rebuildCardIndex() {
            cardIndexByUser.clear();
            if (!els.feed) return;

            var cards = els.feed.querySelectorAll('.actAdv-card');
            for (var i = 0; i < cards.length; i++) {
                var card = cards[i];
                var userLink = card.querySelector('.actAdv-user');
                if (!userLink) continue;
                var username = userLink.textContent;
                if (!username) continue;

                if (!cardIndexByUser.has(username)) {
                    cardIndexByUser.set(username, []);
                }
                cardIndexByUser.get(username).push(card);
            }
        }

        function fetchRc() {
            var src = state.sources.rc;
            if (src.done) return Promise.resolve([]);

            var patrolCheck = src.patrolAllowed === null ? 
                checkPatrolRights().catch(function(e) {
                    console.warn('[ActAdv] Patrol rights check failed:', e);
                    return false;
                }) : 
                Promise.resolve(src.patrolAllowed);

            return patrolCheck.then(function(allowed) {
                src.patrolAllowed = allowed;
                
                var baseRcprop = 'title|timestamp|ids|flags|comment|redirect|tags|userid|user|sizes|parsedcomment';
                var params = {
                    action: 'query', list: 'recentchanges', format: 'json', formatversion: 2,
                    rcprop: src.patrolAllowed ? baseRcprop + '|patrolled' : baseRcprop,
                    rclimit: Math.min(Math.max(Store.settings.limit, 10), 500),
                    rctype: 'edit|new'
                };
                if (!Store.settings.showBots) params.rcshow = '!bot';
                if (src.cont) params.rccontinue = src.cont;

                return api.get(params).then(function(res) {
                    var list = (res && res.query && res.query.recentchanges) || [];
                    if (res && res.continue && res.continue.rccontinue) src.cont = res.continue.rccontinue;
                    else src.done = true;
                    return list.map(normalizeRc).filter(Boolean);
                }).catch(function(e) {
                    if (src.patrolAllowed && e && typeof e === 'object' && e.code === 'permissiondenied') {
                        console.warn('[ActAdv] patrolled flag rejected, retrying without it');
                        src.patrolAllowed = false;
                        params.rcprop = baseRcprop;
                        return api.get(params).then(function(res) {
                            var list = (res && res.query && res.query.recentchanges) || [];
                            if (res && res.continue && res.continue.rccontinue) src.cont = res.continue.rccontinue;
                            else src.done = true;
                            return list.map(normalizeRc).filter(Boolean);
                        });
                    }
                    throw e;
                });
            });
        }

        function normalizeRc(rc) {
            if (!rc || !rc.title) return null;
            if (rc.type === 'log') return null;
            var ts = Math.floor(Date.parse(rc.timestamp) / 1000);
            if (!ts) return null;
            var isNew = rc.type === 'new';
            var isFileNs = (rc.ns === 6);
            return {
                id: 'rc:' + (rc.rcid || rc.revid || rc.title + ts),
                type: isNew ? 'new' : 'edit',
                action: isNew ? 'new' : 'edit',
                ns: (typeof rc.ns === 'number') ? rc.ns : null,
                title: rc.title,
                titleUrl: mw.util.getUrl(rc.title),
                user: userInfo(rc.user),
                timestamp: ts,
                sizeDelta: (typeof rc.newlen === 'number' && typeof rc.oldlen === 'number') ? rc.newlen - rc.oldlen : null,
                oldSize: typeof rc.oldlen === 'number' ? rc.oldlen : null,
                newSize: typeof rc.newlen === 'number' ? rc.newlen : null,
                comment: rc.parsedcomment || null,
                tags: rc.tags || null,
                extra: { 
                    revid: rc.revid, 
                    diffUrl: mw.util.getUrl('Special:Diff/' + rc.revid),
                    isFile: isFileNs,
                    fileName: isFileNs ? rc.title : null,
                    unpatrolled: !!rc.unpatrolled,
                    autopatrolled: !!rc.autopatrolled,
                },
            };
        }

        function fetchLogs() {
            var src = state.sources.log;
            if (src.done) return Promise.resolve([]);
            
            var params = {
                action: 'query', list: 'logevents', format: 'json', formatversion: 2,
                lelimit: Math.min(Math.max(Store.settings.limit, 10), 500),
                leprop: 'ids|title|type|user|timestamp|comment|parsedcomment|details|tags|userid',
            };
            if (src.cont) params.lecontinue = src.cont;
            
            return api.get(params).then(function(res) {
                var list = (res && res.query && res.query.logevents) || [];
                if (res && res.continue && res.continue.lecontinue) src.cont = res.continue.lecontinue;
                else src.done = true;
                return list.map(normalizeLog).filter(Boolean);
            });
        }

        var LOG_ACTIONS = { delete:1, restore:1, protect:1, unprotect:1, move:1, block:1, unblock:1, reblock:1, rights:1, upload:1, newusers:1, patrol:1, other:1 };

        function normalizeLog(le) {
            if (!le || !le.logid) return null;
            var ts = Math.floor(Date.parse(le.timestamp) / 1000);
            if (!ts) return null;
            var lt = le.logtype || le.type; 
            var la = le.logaction || le.action || ''; 

            if (le.ns === 6 && lt === 'create') return null;

            var action = 'other';
            if (lt === 'delete') action = la === 'restore' ? 'restore' : 'delete';
            else if (lt === 'move') action = 'move';
            else if (lt === 'protect') action = la === 'unprotect' ? 'unprotect' : 'protect';
            else if (lt === 'block') action = la === 'unblock' ? 'unblock' : (la === 'reblock' ? 'reblock' : 'block');
            else if (lt === 'rights') action = 'rights';
            else if (lt === 'upload') action = 'upload';
            else if (lt === 'newusers') action = 'newusers';
            else if (lt === 'patrol') action = 'patrol';
            if (!LOG_ACTIONS[action]) action = 'other';
            
            var p = le.params || {};
            var isFileUpload = (lt === 'upload') || (le.ns === 6 && lt === 'modify');
            var displayTitle = le.title || T('logOther');
            
            if (action === 'move' && le.title) {
                displayTitle = T('renamedTitle', { t: le.title });
            } else if (action === 'patrol' && le.title) {
                displayTitle = T('patrolledTitle', { t: le.title });
            }
            
            return {
                id: 'log:' + le.logid,
                type: 'log',
                action: action,
                ns: (typeof le.ns === 'number') ? le.ns : null,
                title: displayTitle,
                titleUrl: le.title ? mw.util.getUrl(le.title) : '#',
                user: userInfo(le.user),
                timestamp: ts,
                sizeDelta: null, oldSize: null, newSize: null,
                comment: le.parsedcomment || null,
                tags: le.tags || null,
                extra: {
                    logType: lt,
                    isFile: isFileUpload, 
                    fileName: isFileUpload ? le.title : null, 
                    userId: le.userid || null,
                    params: {
                        target: p.target_title || p.target || null,
                        duration: p.duration || p.expiry || null,
                        oldGroups: p.oldgroups || null,
                        newGroups: p.newgroups || null,
                        description: p.description || null,
                    },
                },
            };
        }

        function fetchAf() {
            var src = state.sources.af;
            if (src.done) return Promise.resolve([]);

            var rightsCheck = src.allowed === null ? 
                checkAfRights().catch(function(e) {
                    console.warn('[ActAdv] AF rights check failed:', e);
                    return false;
                }) : 
                Promise.resolve(src.allowed);

            return rightsCheck.then(function(allowed) {
                src.allowed = allowed;
                if (!src.allowed) {
                    src.done = true;
                    return [];
                }

                var params = {
                    action: 'query', list: 'abuselog', format: 'json', formatversion: 2,
                    aflimit: Math.min(Math.max(Store.settings.limit, 10), 500),
                    aflprop: 'ids|filter|user|title|action|result|timestamp|hidden|ns',
                };
                if (src.cont) params.aflstart = src.cont;
                
                return api.get(params).then(function(res) {
                    var list = (res && res.query && res.query.abuselog) || [];
                    if (res && res.continue && res.continue.aflstart) {
                        src.cont = res.continue.aflstart;
                    } else {
                        src.done = true;
                    }
                    return list.map(normalizeAf).filter(Boolean);
                });
            });
        }

        function normalizeAf(af) {
            if (!af || !af.id) return null;
            var ts = Math.floor(Date.parse(af.timestamp) / 1000);
            if (!ts) return null;
            if (af.hidden) return null;

            var result = af.result || '';
            var action = af.action || '';

            var description = '';
            if (result === 'disallow') description = T('afDisallow');
            else if (result === 'warn') description = T('afWarn');
            else if (result === 'tag') description = T('afTag');
            else if (result === 'block') description = T('afBlock');
            else if (result === 'degroup') description = T('afDegroup');
            else description = T('afOther', { r: result });

            return {
                id: 'af:' + af.id,
                type: 'af',
                action: 'af',
                ns: (typeof af.ns === 'number') ? af.ns : null,
                title: af.title || T('logOther'),
                titleUrl: af.title ? mw.util.getUrl(af.title) : '#',
                user: userInfo(af.user),
                timestamp: ts,
                sizeDelta: null, oldSize: null, newSize: null,
                comment: null,
                tags: null,
                extra: {
                    filterId: af.filter_id || null,
                    afAction: action,
                    afResult: result,
                    afDescription: description,
                    isFile: af.ns === 6,
                    fileName: af.ns === 6 ? af.title : null,
                },
            };
        }

        function fetchPosts() {
            var src = state.sources.post;
            if (src.done || !wikiId) { 
                if (!wikiId) src.done = true; 
                return Promise.resolve([]); 
            }
            
            var arrayLength = Math.min(Math.max(Store.settings.limit, 10), 100);
            
            return new Promise(function(resolve) {
                $.ajax({
                    url: mw.util.wikiScript("wikia"),
                    type: "GET", 
                    dataType: "json",
                    xhrFields: { withCredentials: true },
                    data: {
                        controller: "DiscussionPost", 
                        method: "getPosts",
                        viewableOnly: true, 
                        sortKey: "creation_date",
                        limit: arrayLength, 
                        format: "json"
                    }
                }).done(resolve).fail(function(e) {
                    console.warn('[ActAdv] Post fetch failed:', e);
                    src.done = true;
                    resolve([]);
                });
            }).then(function(res) {
                var list = [];
                if (res && res._embedded && res._embedded["doc:posts"]) list = res._embedded["doc:posts"];
                else if (res && res.items) list = res.items;
                else if (Array.isArray(res)) list = res;

                if (!list.length) { 
                    src.done = true; 
                    return []; 
                }

                var posts = list.map(normalizePost).filter(Boolean);

                var commentsNeedingTitles = posts.filter(function(p) { 
                    return p.type === 'comment' && 
                        (p.title === '__ENRICH_COMMENT__' || p.title === T('untitled') || p.title === 'commentOn') &&
                        p.extra.forumId;
                });

                if (commentsNeedingTitles.length > 0) {
                    var pageIds = [];
                    commentsNeedingTitles.forEach(function(c) { 
                        if (pageIds.indexOf(c.extra.forumId) === -1) pageIds.push(c.extra.forumId); 
                    });
                    
                    if (pageIds.length > 0) {
                        return new Promise(function(resolve) {
                            $.ajax({
                                url: mw.util.wikiScript("wikia"),
                                type: "GET", 
                                dataType: "json",
                                xhrFields: { withCredentials: true },
                                data: {
                                    controller: "FeedsAndPosts", 
                                    method: "getArticleNamesAndUsernames",
                                    stablePageIds: pageIds.join(','), 
                                    format: "json"
                                }
                            }).done(resolve).fail(function() { resolve(null); });
                        }).then(function(enrichRes) {
                            if (enrichRes && enrichRes.articleNames) {
                                commentsNeedingTitles.forEach(function(post) {
                                    var pageInfo = enrichRes.articleNames[post.extra.forumId];
                                    if (pageInfo && pageInfo.title) {
                                        post.title = T('commentOn', { page: pageInfo.title });
                                        var baseUrl = pageInfo.relativeUrl || mw.util.getUrl(pageInfo.title);
                                        var commentId = post.extra.threadId || post.extra.postId;
                                        post.titleUrl = baseUrl + '?commentId=' + encodeURIComponent(commentId);
                                        post.extra.pageTitle = pageInfo.title;
                                        post.extra.relativeUrl = pageInfo.relativeUrl;
                                    } else {
                                        post.title = T('commentOn', { page: T('untitled') });
                                        post.titleUrl = '#';
                                    }
                                });
                            }
                            if (list.length < arrayLength) src.done = true;
                            return posts;
                        });
                    }
                }

                if (list.length < arrayLength) src.done = true;
                return posts;
            });
        }

        function normalizePost(p) {
            if (!p || !p.id) return null;
            var ts = 0;
            if (p.creationDate && typeof p.creationDate.epochSecond === 'number') ts = p.creationDate.epochSecond;
            if (!ts) return null;

            var authorName = (p.createdBy && p.createdBy.name) ? p.createdBy.name : T('deletedUser');
            var userObj = userInfo(authorName);
            var userId = (p.createdBy && p.createdBy.id) ? p.createdBy.id : null;

            var embThreadArr = p._embedded && Array.isArray(p._embedded.thread) ? p._embedded.thread : [];
            var threadData = embThreadArr.length > 0 ? embThreadArr[0] : {};
            var containerType = (threadData.containerType || '').toUpperCase();
            var threadTitle = threadData.title || '';
            var tags = threadData.tags || [];

            var type = 'forum';
            var pageTitle = null;
            var wallOwner = null;

            if (containerType === 'WALL') {
                type = 'wall';
                var fName = p.forumName || '';
                if (fName.endsWith(' Message Wall')) wallOwner = fName.replace(/ Message Wall$/, '');
                else wallOwner = fName || authorName;
            } else if (containerType === 'ARTICLE_COMMENT' || containerType === 'PAGE_COMMENT') {
                type = 'comment';
                if (tags.length > 0 && tags[0].articleTitle) pageTitle = tags[0].articleTitle;
            }

            var title = p.title || threadTitle;
            var threadId = p.threadId || (embThreadArr[0] && embThreadArr[0].id) || null;

            if (type === 'comment') {
                title = pageTitle ? T('commentOn', { page: pageTitle }) : '__ENRICH_COMMENT__';
            } else if (type === 'wall' && !title) {
                title = T('msgWall') + ': ' + (wallOwner || authorName);
            } else if (!title) {
                title = T('untitled');
            }

            var text = p.rawContent || '';
            if (!text && p.jsonModel) {
                try {
                    var model = JSON.parse(p.jsonModel);
                    if (model.content && Array.isArray(model.content)) {
                        var parts = [];
                        for (var i = 0; i < model.content.length; i++) {
                            var block = model.content[i];
                            if (block.content) {
                                var texts = [];
                                for (var j = 0; j < block.content.length; j++) {
                                    texts.push(block.content[j].text || '');
                                }
                                parts.push(texts.join(''));
                            }
                        }
                        text = parts.join('\n');
                    }
                } catch (e) {}
            }

            var images = [];
            var atts = (p._embedded && p._embedded.attachments && p._embedded.attachments[0]) || (threadData.attachments) || {};
            if (atts.contentImages && Array.isArray(atts.contentImages)) {
                images = atts.contentImages.map(function(img) { return img.url; }).filter(Boolean);
            }

            var titleUrl = '#';
            if (type === 'comment' && pageTitle) {
                titleUrl = mw.util.getUrl(pageTitle) + '?commentId=' + encodeURIComponent(threadId || p.id);
            } else if (type === 'wall') {
                var wallTitle = wallOwner ? 'Message Wall:' + wallOwner : null;
                if (wallTitle) titleUrl = mw.util.getUrl(wallTitle) + '?threadId=' + encodeURIComponent(threadId || p.id);
            } else if (type === 'forum' && threadId) {
                titleUrl = mw.config.get('wgScriptPath') + '/f/p/' + threadId;
            }

            return {
                id: 'post:' + p.id,
                type: type, 
                action: type,
                ns: null,
                title: title, 
                titleUrl: titleUrl,
                user: userObj,
                timestamp: ts,
                sizeDelta: null, 
                oldSize: null, 
                newSize: null,
                comment: null,
                tags: tags.map(function(t) { return t.articleTitle || t.tag || ''; }).filter(Boolean),
                extra: {
                    postId: p.id, 
                    threadId: threadId,
                    forumId: p.forumId || null, 
                    forumName: p.forumName || '',
                    text: text, 
                    images: images.slice(0, 20),
                    upvotes: typeof p.upvoteCount === 'number' ? p.upvoteCount : null,
                    poll: (p.poll && Array.isArray(p.poll.answers)) ? {
                        answers: p.poll.answers.map(function(a) { 
                            return { text: a.text || a.label || '', votes: a.votes || 0 }; 
                        }),
                    } : null,
                    pageTitle: pageTitle,
                    isReply: !!p.isReply,
                    userId: userId
                },
            };
        }

        function fetchRailData() {
            return fetch(location.origin + '/wikia.php?controller=FeedsAndPosts&method=getAll', { 
                credentials: 'same-origin' 
            }).then(function(res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            }).catch(function() { 
                return null; 
            });
        }

        function fetchCommunityCorner() {
            return api.get({ 
                action: 'parse', 
                page: 'MediaWiki:Community-corner', 
                prop: 'text', 
                format: 'json', 
                formatversion: 2 
            }).then(function(res) {
                var html = res && res.parse && res.parse.text;
                if (!html || html.replace(/<[^>]*>/g, '').trim().length < 10) return null;
                return html;
            }).catch(function() { 
                return null; 
            });
        }

        var ROOT_ID = 'actAdv-root';
        var FILTER_KEYS = ['edit', 'new', 'log', 'af', 'forum', 'wall', 'comment'];

        var FILTER_ICON = {
            edit: 'edit', new: 'new', log: 'quiz', af: 'shield', forum: 'forum',
            wall: 'wall', comment: 'comment', poll: 'poll',
        };
        
        var ACTION_ICON = {
            edit: 'edit', new: 'new',
            delete: 'delete', restore: 'restore', protect: 'protect', unprotect: 'protect',
            move: 'move', block: 'block', unblock: 'block', reblock: 'block',
            rights: 'rights', upload: 'upload', newusers: 'newusers', patrol: 'patrol', other: 'quiz',
            forum: 'forum', wall: 'wall', comment: 'comment', poll: 'poll', quiz: 'quiz',
            af: 'shield',
        };
        
        var FILTER_OF_TYPE = { 
            edit: 'edit', new: 'new', log: 'log', af: 'af', forum: 'forum', 
            wall: 'wall', comment: 'comment', poll: 'forum', quiz: 'forum' 
        };

        function iconSvg(name, cls) {
            return '<span class="actAdv-icon ' + cls + ' actAdv-icon--' + name + '" aria-hidden="true"></span>';
        }

        function two(n) { return (n < 10 ? '0' : '') + n; }
        
        function dayKey(ts) { 
            var d = new Date(ts * 1000); 
            return d.getFullYear() + '-' + two(d.getMonth() + 1) + '-' + two(d.getDate()); 
        }
        
        function timeHM(ts) { 
            var d = new Date(ts * 1000); 
            return two(d.getHours()) + ':' + two(d.getMinutes()); 
        }

        var DATE_FMT = new Intl.DateTimeFormat(LANG === 'ru' ? 'ru-RU' : 'en-US', { 
            day: 'numeric', month: 'long', year: 'numeric' 
        });

        function formatNumber(num) {
            if (num === undefined || num === null) return '';
            return new Intl.NumberFormat(LANG === 'ru' ? 'ru-RU' : 'en-US').format(num);
        }

        function relativeTime(ts) {
            var diff = Date.now() / 1000 - ts;
            if (diff < 60) return T('justNow');
            if (diff < 3600) return plural(T('minAgo'), Math.floor(diff / 60));
            if (diff < 86400) return plural(T('hourAgo'), Math.floor(diff / 3600));
            if (diff < 172800) return T('yesterday', { t: timeHM(ts) });
            if (diff < 7 * 86400) return plural(T('daysAgo'), Math.floor(diff / 86400));
            return DATE_FMT.format(new Date(ts * 1000));
        }

        function timeTag(ts, linkUrl) {
            var d = new Date(ts * 1000);
            var inner = esc(relativeTime(ts));
            var attrs = 'datetime="' + d.toISOString() + '" title="' + esc(d.toLocaleString()) + '"';
            if (linkUrl) {
                return '<a class="actAdv-timelink" href="' + esc(linkUrl) + '"><time ' + attrs + '>' + inner + '</time></a>';
            }
            return '<time ' + attrs + '>' + inner + '</time>';
        }

        function formatPostText(raw) {
            var normalized = String(raw == null ? '' : raw)
                .replace(/\r\n?/g, '\n')
                .replace(/\n{2,}/g, '\n')
                .replace(/^\n+|\n+$/g, '');
            var cut = normalized.length > 250 ? normalized.slice(0, 250) + '…' : normalized;
            var s = esc(cut);
            s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
                 .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<i>$2</i>')
                 .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
            return s.replace(/\n/g, '<br>');
        }

        function userLineHtml(e) {
            var avatar = '<span class="actAdv-avatar"></span>';
            if (e.user && e.user.avatarUrl) {
                avatar = '<span class="actAdv-avatar"><img src="' + esc(e.user.avatarUrl) + '" alt="" loading="lazy"></span>';
            } else if (e.user && !e.user.anonymous) {
                var cachedAv = getCachedAvatar(e.user.name);
                if (cachedAv) {
                    e.user.avatarUrl = cachedAv;
                    avatar = '<span class="actAdv-avatar"><img src="' + esc(cachedAv) + '" alt="" loading="lazy"></span>';
                }
            }
            var name = '<a class="actAdv-user" href="' + esc(e.user.url) + '">' + esc(e.user.name) + '</a>';
            var un = e.user.name;
            var links = '<span class="actAdv-userlinks">' +
                '<a href="' + esc(mw.util.getUrl('User_talk:' + un)) + '">' + esc(T('msgWall')) + '</a>' +
                ' | <a href="' + esc(mw.util.getUrl('Special:Contributions/' + un)) + '">' + esc(T('contribs')) + '</a>' +
                ' | <a href="' + esc(mw.util.getUrl('Special:Block/' + un)) + '">' + esc(T('blockUser')) + '</a>' +
            '</span>';
            return '<div class="actAdv-userline">' + avatar + ' ' + name + ' ' + links + '</div>';
        }

        function tagsLineHtml(e) {
            if (!e.tags || !e.tags.length) return '';
            return '<div class="actAdv-tagsline">(' + esc(T('tagsLabel')) + ': ' + esc(e.tags.join(', ')) + ')</div>';
        }

        function deltaHtml(e) {
            if (e.sizeDelta === null) return '';
            var cls, txt;
            if (e.sizeDelta > 0) { cls = 'actAdv-delta--pos'; txt = '+' + e.sizeDelta; }
            else if (e.sizeDelta < 0) { cls = 'actAdv-delta--neg'; txt = String(e.sizeDelta); }
            else { cls = 'actAdv-delta--zero'; txt = '0'; }
            var tip = (e.oldSize !== null && e.newSize !== null)
                ? ' title="' + esc(T('sizeTip', { old: e.oldSize, new: e.newSize })) + '"' : '';
            return ' <span class="actAdv-delta ' + cls + '"' + tip + '>' + esc(txt) + '</span>';
        }

        function cleanSummary(html) {
            if (!html) return '';
            return String(html)
                .replace(/(<br\s*\/?>\s*){2,}/gi, '<br>')
                .replace(/^(\s*<br\s*\/?>\s*)+/i, '')
                .replace(/(\s*<br\s*\/?>\s*)+$/i, '');
        }

        function bodyContentHtml(e) {
            var parts = [];
            if (e.comment) {
                parts.push('<div class="actAdv-summaryline"><strong>' + esc(T('summaryLabel')) + '</strong> ' + cleanSummary(e.comment) + '</div>');
            }
            if (e.extra && e.extra.isFile && e.action !== 'delete') {
                var safeFileName = encodeURIComponent(e.extra.fileName);
                var imgUrl = location.origin + '/wiki/Special:Redirect/file?wpvalue=' + safeFileName;
                parts.unshift(
                    '<div class="actAdv-file-preview">' +
                        '<a href="' + esc(e.titleUrl) + '" target="_blank" rel="noopener noreferrer">' +
                            '<img src="' + esc(imgUrl) + '" alt="' + esc(e.title) + '" loading="lazy" onerror="this.parentNode&&this.parentNode.parentNode&&this.parentNode.parentNode.removeChild(this.parentNode.parentNode)" />' +
                        '</a>' +
                    '</div>'
                );
            }
            if (e.type === 'log' && e.extra.params) {
                var p = e.extra.params, bits = [];
                if (e.action === 'move' && p.target) bits.push('<strong>' + esc(T('newTitleLabel')) + ':</strong> ' + esc(p.target));
                if ((e.action === 'block' || e.action === 'reblock') && p.duration) bits.push(esc(T('blockDuration', { d: p.duration })));
                if (e.action === 'rights' && (p.oldGroups || p.newGroups))
                    bits.push(esc(T('rightsFromTo', { a: (p.oldGroups||[]).join(', ')||'—', b: (p.newGroups||[]).join(', ')||'—' })));
                if (bits.length) parts.push('<div class="actAdv-logparams">' + bits.join('<br>') + '</div>');
            }
            if (e.type === 'af' && e.extra) {
                var bits = [];
                if (e.extra.filterId) bits.push(esc(T('afFilterLabel', { n: e.extra.filterId })));
                if (e.extra.afAction) bits.push(esc(T('afActionLabel', { a: e.extra.afAction })));
                if (e.extra.afDescription) bits.push(esc(e.extra.afDescription));
                if (bits.length) parts.push('<div class="actAdv-logparams">' + bits.join('<br>') + '</div>');
            }
            if (e.extra.text) {
                parts.push('<div class="actAdv-posttext">' + formatPostText(e.extra.text) + '</div>');
            }
            if (e.extra.images && e.extra.images.length) {
                var shown = e.extra.images.slice(0, 3);
                var rem = e.extra.images.length - 3;
                var g = '<div class="actAdv-gallery">';
                shown.forEach(function(src) {
                    g += '<a href="' + esc(e.titleUrl) + '" class="actAdv-thumb" target="_blank" rel="noopener"><img loading="lazy" src="' + esc(src) + '" alt="" onerror="this.parentNode&&this.parentNode.removeChild(this.parentNode)"></a>';
                });
                if (rem > 0) {
                    g += '<a href="' + esc(e.titleUrl) + '" class="actAdv-morelink">' + esc(T('moreImages', { n: rem })) + '</a>';
                }
                g += '</div>';
                parts.push(g);
            }
            if (e.type === 'poll' && e.extra.poll && e.extra.poll.answers.length) {
                var total = e.extra.poll.answers.reduce(function(a, x) { return a + (x.votes || 0); }, 0);
                var pol = '<div class="actAdv-poll"><div class="actAdv-poll-title">' + esc(T('pollResults')) + '</div>';
                e.extra.poll.answers.forEach(function(a) {
                    var pct = total > 0 ? Math.round((a.votes / total) * 100) : 0;
                    pol += '<div class="actAdv-poll-row"><span class="actAdv-poll-text">' + esc(a.text) + '</span>' +
                        '<span class="actAdv-poll-track"><span class="actAdv-poll-bar" style="width:' + pct + '%"></span></span>' +
                        '<span class="actAdv-poll-pct">' + pct + '%</span></div>';
                });
                pol += '<div class="actAdv-poll-votes">' + esc(T('votes', { n: total })) + '</div></div>';
                parts.push(pol);
            }
            return parts.join('');
        }

        function actionsHtml(e) {
            if (e.type !== 'edit' && e.type !== 'new') return '';

            var revid = e.extra && e.extra.revid;
            var diffUrl = e.extra && e.extra.diffUrl;

            var links = [];
            
            if (e.extra && e.extra.unpatrolled === true) {
                links.push('<button type="button" class="actAdv-act-btn actAdv-patrol-btn" data-revid="' + esc(revid) + '" title="' + esc(T('actPatrol')) + '" aria-label="' + esc(T('actPatrol')) + '">' + iconSvg('shield', 'actAdv-act-svg') + '</button>');
            }
            
            links.push('<a class="actAdv-act-btn" href="' + esc(mw.util.getUrl(e.title)) + '?action=edit" target="_blank" rel="noopener noreferrer" title="' + esc(T('actEdit')) + '">' + iconSvg('edit', 'actAdv-act-svg') + '</a>');
            
            if (diffUrl) {
                links.push('<a class="actAdv-act-btn" href="' + esc(diffUrl) + '" target="_blank" rel="noopener noreferrer" title="' + esc(T('actDiff')) + '">' + iconSvg('eye', 'actAdv-act-svg') + '</a>');
            }
            
            if (revid) {
                links.push('<a class="actAdv-act-btn" href="' + esc(mw.util.getUrl('Special:Thanks/' + revid)) + '" target="_blank" rel="noopener noreferrer" title="' + esc(T('actThanks')) + '">' + iconSvg('heart', 'actAdv-act-svg') + '</a>');
            }
            
            links.push('<a class="actAdv-act-btn" href="' + esc(mw.util.getUrl(e.title)) + '?action=history" target="_blank" rel="noopener noreferrer" title="' + esc(T('actHistory')) + '">' + iconSvg('history', 'actAdv-act-svg') + '</a>');

            return '<div class="actAdv-card-actions">' + links.join('') + '</div>';
        }

        function cardHtml(e) {
            var iconName = ACTION_ICON[e.type === 'log' ? e.action : e.type] || 'quiz';
            var titleLink = '<a class="actAdv-title" href="' + esc(e.titleUrl) + '">' + esc(e.title) + '</a>';
            var delta = deltaHtml(e);
            var star = delta ? ' <span class="actAdv-star">*</span>' : '';
            var diffUrl = (e.type === 'edit' || e.type === 'new') ? e.extra.diffUrl : null;
            var body = bodyContentHtml(e);
            var hasBody = body.length > 0;
            
            return '<article class="actAdv-card actAdv-card--' + esc(e.type) + '" data-id="' + esc(e.id) + '">' +
                '<span class="actAdv-ico">' + iconSvg(iconName, 'actAdv-ico-svg') + '</span>' +
                '<div class="actAdv-card-body">' +
                    '<div class="actAdv-card-top">' +
                        '<div class="actAdv-card-info">' +
                            '<div class="actAdv-titleline">' + titleLink + delta + star + ' ' + timeTag(e.timestamp, diffUrl) + '</div>' +
                            userLineHtml(e) +
                            tagsLineHtml(e) +
                        '</div>' +
                        actionsHtml(e) +
                    '</div>' +
                    (hasBody ? '<hr class="actAdv-hr">' + body : '') +
                '</div></article>';
        }

        function buildShell() {
            var content = document.getElementById('mw-content-text') || document.body;
            var old = document.getElementById(ROOT_ID);
            if (old) old.remove();
            
            var children = content.querySelectorAll(':scope > *:not(script)');
            for (var i = 0; i < children.length; i++) {
                if (children[i].id !== 'actAdv-root') children[i].remove();
            }

            var root = document.createElement('div');
            root.id = ROOT_ID;
            root.className = 'actAdv' + (Store.settings.hideRail ? ' actAdv-hide-rail' : '');

            var chipsHtml = FILTER_KEYS.map(function(k) {
                return '<button type="button" class="actAdv-chip" data-filter="' + k + '"' +
                    ' aria-pressed="' + (!!Store.settings.filters[k]) + '"' +
                    ' title="' + esc(T('filter' + k.charAt(0).toUpperCase() + k.slice(1))) + '">' +
                    iconSvg(FILTER_ICON[k] || 'quiz', 'actAdv-chip-svg') +
                    '</button>';
            }).join('');

            root.innerHTML = 
                '<div class="actAdv-head">' +
                    '<div class="actAdv-head-left">' +
                        '<h1 class="actAdv-heading">' + esc(T('pageTitle')) + '</h1>' +
                        '<span class="actAdv-subtitle">' + esc(T('subtitle')) + '</span>' +
                    '</div>' +
                    '<div class="actAdv-head-right">' +
                        '<div class="actAdv-chips" role="group">' + chipsHtml + '</div>' +
                        '<button type="button" class="actAdv-settings-btn" aria-label="' + esc(T('openSettings')) + '">' +
                            iconSvg('settings', 'actAdv-chip-svg') +
                        '</button>' +
                    '</div>' +
                '</div>' +
                '<div class="actAdv-errors"></div>' +
                '<div class="actAdv-layout">' +
                    '<div class="actAdv-main">' +
                        '<div class="actAdv-feed" role="feed"></div>' +
                        '<div class="actAdv-morewrap"><button type="button" class="actAdv-more">' + esc(T('loadMore')) + '</button></div>' +
                        '<div class="actAdv-loading" style="display:none">' + esc(T('loading')) + '</div>' +
                        '<div class="actAdv-allloaded" style="display:none">' + esc(T('allLoaded')) + '</div>' +
                        '<div class="actAdv-sentinel" style="height:1px"></div>' +
                    '</div>' +
                    '<aside class="actAdv-rail">' +
                        '<div class="actAdv-box actAdv-rail-stats" style="display:none">' +
                            '<h2>' + esc(T('communityStats')) + '</h2>' +
                            '<div class="actAdv-stats-avatars"></div>' +
                            '<div class="actAdv-stats-counts"></div>' +
                        '</div>' +
                        '<div class="actAdv-box actAdv-rail-top" style="display:none"><h2>' + esc(T('popularPages')) + '</h2><ol class="actAdv-toplist"></ol></div>' +
                        '<div class="actAdv-box actAdv-rail-corner actAdv-corner" style="display:none"><h2>' + esc(T('communityCorner')) + '</h2><div class="actAdv-corner-body"></div></div>' +
                    '</aside>' +
                '</div>' +
                '<div class="actAdv-overlay">' +
                    '<div class="actAdv-modal" role="dialog" aria-modal="true">' +
                        '<h2>' + esc(T('settings')) + '</h2>' +
                        '<label><input type="checkbox" data-set="showBots"> ' + esc(T('setShowBots')) + '</label>' +
                        '<label><input type="checkbox" data-set="expandDetails"> ' + esc(T('setExpand')) + '</label>' +
                        '<label><input type="checkbox" data-set="autoLoad"> ' + esc(T('setAutoLoad')) + '</label>' +
                        '<label><input type="checkbox" data-set="hideRail"> ' + esc(T('setHideRail')) + '</label>' +
                        '<label>' + esc(T('setLimit')) + ' <input type="number" min="10" max="500" step="10" data-set="limit"></label>' +
                        '<div class="actAdv-modal-subhead">' + esc(T('setFilters')) + '</div>' +
                        '<label><input type="checkbox" data-filter="newusers"> ' + esc(T('filterNewusers')) + '</label>' +
                        '<label><input type="checkbox" data-set="onlyUnpatrolled"> ' + esc(T('setOnlyUnpatrolled')) + '</label>' +
                        '<label><input type="checkbox" data-filter="patrol"> ' + esc(T('filterPatrol')) + '</label>' +
                        '<label class="actAdv-modal-userfilter">' + esc(T('setExcludeUsers')) + '<input type="text" data-set="excludeUsers" placeholder="' + esc(T('usersPlaceholder')) + '"></label>' +
                        '<label class="actAdv-modal-userfilter">' + esc(T('setIncludeUsers')) + '<input type="text" data-set="includeUsers" placeholder="' + esc(T('usersPlaceholder')) + '"></label>' +
                        '<label><input type="checkbox" data-set="ignoreTalk"> ' + esc(T('setIgnoreTalk')) + '</label>' +
                        '<details class="actAdv-ns-details">' +
                            '<summary>' + esc(T('setNamespaces')) + '</summary>' +
                            '<div class="actAdv-modal-note">' + esc(T('nsHint')) + '</div>' +
                            '<div class="actAdv-ns-list"></div>' +
                        '</details>' +
                        '<div class="actAdv-modal-note">' + esc(T('setApplyNext')) + '</div>' +
                        '<button type="button" class="actAdv-modal-close actAdv-clear-cache">' + esc(T('clearCache')) + '</button>' +
                        '<button type="button" class="actAdv-modal-close">' + esc(T('close')) + '</button>' +
                    '</div>' +
                '</div>';

            content.appendChild(root);
            
            els = {
                root: root,
                feed: root.querySelector('.actAdv-feed'),
                chips: Array.prototype.slice.call(root.querySelectorAll('.actAdv-chip')),
                moreBtn: root.querySelector('.actAdv-more'),
                loading: root.querySelector('.actAdv-loading'),
                allLoaded: root.querySelector('.actAdv-allloaded'),
                sentinel: root.querySelector('.actAdv-sentinel'),
                errorsBox: root.querySelector('.actAdv-errors'),
                overlay: root.querySelector('.actAdv-overlay'),
                railStats: root.querySelector('.actAdv-rail-stats'),
                railStatsAvatars: root.querySelector('.actAdv-stats-avatars'),
                railStatsCounts: root.querySelector('.actAdv-stats-counts'),
                railTop: root.querySelector('.actAdv-rail-top'),
                railCorner: root.querySelector('.actAdv-rail-corner'),
                nsList: root.querySelector('.actAdv-ns-list'),
            };
            
            bindEvents();
        }

        function bindEvents() {
            els.chips.forEach(function(ch) {
                ch.addEventListener('click', function() {
                    var k = ch.getAttribute('data-filter');
                    Store.settings.filters[k] = !Store.settings.filters[k];
                    Store.save();
                    ch.setAttribute('aria-pressed', String(!!Store.settings.filters[k]));
                    renderAll();
                });
            });
            
            els.feed.addEventListener('click', function(e) {
                var btn = e.target.closest('.actAdv-patrol-btn');
                if (!btn || btn.disabled) return;
                var revid = parseInt(btn.getAttribute('data-revid'), 10);
                if (revid) patrolRevision(revid, btn);
            });
            
            els.moreBtn.addEventListener('click', function() { loadMore(); });

            var modal = els.root.querySelector('.actAdv-modal');
            var inputs = modal.querySelectorAll('[data-set]');
            
            for (var i = 0; i < inputs.length; i++) {
                (function(inp) {
                    var key = inp.getAttribute('data-set');
                    if (inp.type === 'checkbox') inp.checked = !!Store.settings[key];
                    else if (inp.type === 'number') inp.value = Store.settings[key];
                    else inp.value = (Store.settings[key] || []).join(', ');
                    
                    inp.addEventListener('change', function() {
                        if (inp.type === 'checkbox') {
                            Store.settings[key] = inp.checked;
                            if (key === 'hideRail') els.root.classList.toggle('actAdv-hide-rail', inp.checked);
                            if (key === 'showBots') resetSource('rc');
                            if (key === 'ignoreTalk') buildNsList();
                            if (key === 'onlyUnpatrolled') renderAll();
                        } else if (inp.type === 'number') {
                            Store.settings[key] = Math.max(10, Math.min(500, parseInt(inp.value, 10) || 100));
                            inp.value = Store.settings[key];
                        } else {
                            Store.settings[key] = normalizeUserList(inp.value);
                            inp.value = Store.settings[key].join(', ');
                            renderAll();
                        }
                        Store.save();
                    });
                })(inputs[i]);
            }

            var filterInputs = modal.querySelectorAll('[data-filter]');
            for (var j = 0; j < filterInputs.length; j++) {
                (function(inp) {
                    var k = inp.getAttribute('data-filter');
                    inp.checked = !!Store.settings.filters[k];
                    inp.addEventListener('change', function() {
                        Store.settings.filters[k] = inp.checked;
                        Store.save();
                        renderAll();
                    });
                })(filterInputs[j]);
            }

            if (els.nsList) {
                els.nsList.addEventListener('change', function(ev) {
                    var cb = ev.target.closest('[data-ns]');
                    if (!cb) return;
                    var id = parseInt(cb.getAttribute('data-ns'), 10);
                    var arr = Store.settings.namespaces;
                    var idx = arr.indexOf(id);
                    if (cb.checked && idx === -1) arr.push(id);
                    else if (!cb.checked && idx !== -1) arr.splice(idx, 1);
                    Store.save();
                    renderAll();
                });
            }

            els.root.querySelector('.actAdv-settings-btn').addEventListener('click', function() {
                els.overlay.classList.add('actAdv-open');
            });
            
            var closeBtn = els.root.querySelector('.actAdv-modal-close:not(.actAdv-clear-cache)');
            if (closeBtn) closeBtn.addEventListener('click', closeModal);
            
            els.root.querySelector('.actAdv-clear-cache').addEventListener('click', function(e) {
                e.stopPropagation();
                var ok = clearAllCache();
                state.railDone = false;
                if (els.railStats) {
                    els.railStats.style.display = 'none';
                    if (els.railStatsAvatars) els.railStatsAvatars.innerHTML = '';
                    if (els.railStatsCounts) els.railStatsCounts.innerHTML = '';
                }
                renderRail();
                this.textContent = ok ? T('cacheCleared') : T('clearCache');
                var self = this;
                setTimeout(function() { self.textContent = T('clearCache'); }, 2000);
            });
            
            els.overlay.addEventListener('click', function(e) { 
                if (e.target === els.overlay) closeModal(); 
            });
            
            document.addEventListener('keydown', onEsc);

            if (els.feed) {
                els.feed.addEventListener('error', handleImageError, true);
            }

            if (observer) observer.disconnect();
            observer = new IntersectionObserver(onIntersect, { rootMargin: '800px 0px' });
            observer.observe(els.sentinel);
        }

        function closeModal() { 
            if (els.overlay) els.overlay.classList.remove('actAdv-open'); 
        }
        
        function onEsc(e) { 
            if (e.key === 'Escape') closeModal(); 
        }
        
        function onIntersect(entries) {
            if (!Store.settings.autoLoad || state.loading) return;
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    loadMore();
                    break;
                }
            }
        }

        function handleImageError(event) {
            var img = event.target;
            if (!img || img.tagName !== 'IMG') return;
            if (!els.feed || !els.feed.contains(img)) return;

            if (img.dataset.actAdvErrorHandled) return;
            img.dataset.actAdvErrorHandled = '1';

            var card = img.closest('.actAdv-card');
            var parent = img.parentElement;

            if (parent && parent.classList.contains('actAdv-thumb')) {
                parent.remove();
            } else if (parent && parent.parentElement && parent.parentElement.classList.contains('actAdv-file-preview')) {
                parent.parentElement.remove();
            } else if (parent && parent.classList.contains('actAdv-avatar')) {
                img.remove();
            } else if (parent && parent.classList.contains('actAdv-top-thumb')) {
                parent.remove();
            } else {
                img.remove();
            }

            if (card) {
                var hr = card.querySelector('.actAdv-hr');
                if (hr) {
                    var next = hr.nextElementSibling;
                    if (!next || next.textContent.trim() === '') {
                        hr.remove();
                    }
                }
            }
        }

        function cleanupBrokenImages() {
            if (!els.feed) return;
            var imgs = els.feed.querySelectorAll('img');
            for (var i = 0; i < imgs.length; i++) {
                if (imgs[i].complete && imgs[i].naturalWidth === 0 && !imgs[i].dataset.actAdvErrorHandled) {
                    handleImageError({ target: imgs[i] });
                }
            }
        }

        function renderErrors() {
            if (!els.errorsBox) return;
            els.errorsBox.innerHTML = state.errors.length
                ? '<div class="actAdv-error">' + esc(T('sourcesFailed', { list: state.errors.join(', ') })) + '</div>'
                : '';
        }

        function sourcesExhausted() {
            var s = state.sources;
            return s.rc.done && s.log.done && s.post.done && s.af.done;
        }

        function updateFooter() {
            var fe = filteredEntries();
            var exhausted = sourcesExhausted();
            var nothingLeft = exhausted && state.rendered >= fe.length;
            els.moreBtn.style.display = nothingLeft ? 'none' : '';
            els.allLoaded.style.display = nothingLeft && fe.length ? '' : 'none';
        }

        function filteredEntries() {
            var f = Store.settings.filters;
            var inc = (Store.settings.includeUsers || []).map(function(s) { return s.toLowerCase(); });
            var exc = (Store.settings.excludeUsers || []).map(function(s) { return s.toLowerCase(); });
            var nsSel = Store.settings.namespaces || [];
            var ignoreTalk = Store.settings.ignoreTalk !== false;
            
            return state.pool.filter(function(e) {
                if (e.type === 'log' && e.action === 'newusers') return f.log !== false && f.newusers !== false;
                if (e.type === 'log' && e.action === 'patrol') return f.log !== false && f.patrol !== false;
                
                if (Store.settings.onlyUnpatrolled) {
                    if (e.type === 'edit' || e.type === 'new') {
                        var ex = e.extra || {};
                        var isPatrolled = ex.autopatrolled === true || ex.unpatrolled === false;
                        if (isPatrolled) return false;
                    } else if (e.type === 'log' && e.action === 'patrol') {
                        return false;
                    }
                }
                
                var filterKey = FILTER_OF_TYPE[e.type] || e.type;
                if (f[filterKey] === false) return false;
                
                var uname = ((e.user && e.user.name) || '').toLowerCase();
                if (inc.length && inc.indexOf(uname) === -1) return false;
                if (exc.length && exc.indexOf(uname) !== -1) return false;
                
                if (e.ns != null) {
                    if (ignoreTalk && (e.ns % 2 === 1)) return false;
                    if (nsSel.length && nsSel.indexOf(e.ns) === -1) return false;
                }
                return true;
            });
        }

        function renderAll() {
            if (!els.feed) return;
            els.feed.innerHTML = '';
            cardIndexByUser.clear();
            state.rendered = 0;
            state.lastDayKey = '';
            appendChunk(100);
            updateFooter();
        }

        function appendChunk(n) {
            var fe = filteredEntries();
            var slice = fe.slice(state.rendered, state.rendered + n);
            if (!slice.length) { updateFooter(); return; }
            
            var frag = document.createDocumentFragment();
            slice.forEach(function(e) {
                var dk = dayKey(e.timestamp);
                if (dk !== state.lastDayKey) {
                    state.lastDayKey = dk;
                    var div = document.createElement('div');
                    div.className = 'actAdv-daydivider';
                    div.textContent = DATE_FMT.format(new Date(e.timestamp * 1000));
                    frag.appendChild(div);
                }
                var wrap = document.createElement('div');
                wrap.innerHTML = cardHtml(e);
                frag.appendChild(wrap.firstElementChild);
            });
            
            state.rendered += slice.length;
            els.feed.appendChild(frag);
            rebuildCardIndex();
            updateFooter();

            requestAnimationFrame(cleanupBrokenImages);
        }

        function renderRail() {
            if (state.railDone) return;
            state.railDone = true;

            fetchRailData().then(function(data) {
                if (!data) return;

                var details = data.wikiDetails || {};
                var topUsers = details.topUsers || [];
                var editCount = details.editCount;
                var pageCount = details.pageCount;

                if (topUsers.length > 0 || editCount || pageCount) {
                    var avatarsHtml = '';
                    
                    if (topUsers.length > 0) {
                        avatarsHtml = topUsers.slice(0, 5).map(function(u) {
                            var un = u.name || '';
                            var av = u.avatarUrl || '';
                            
                            if (av) {
                                setCachedAvatar(un, av);
                                saveAvatarCache();
                            }
                            
                            var imgSrc = av ? esc(av) : 'https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/400/height/400'; 
                            return '<a href="' + esc(mw.util.getUrl('User:' + un)) + '" title="' + esc(un) + '">' +
                                   '<img loading="lazy" src="' + imgSrc + '" alt="' + esc(un) + '" onerror="this.onerror=null;this.src=\'https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/400/height/400\'">' +
                                   '</a>';
                        }).join('');
                    }
                    
                    var countsHtml = '';
                    if (editCount || pageCount) {
                        countsHtml = '<div class="actAdv-stats-row">' +
                                     (editCount ? '<span>' + formatNumber(editCount) + ' ' + esc(T('edits')) + '</span>' : '') +
                                     (editCount && pageCount ? ' <span class="actAdv-separator">•</span> ' : '') +
                                     (pageCount ? '<span>' + formatNumber(pageCount) + ' ' + esc(T('articles')) + '</span>' : '') +
                                     '</div>';
                    }

                    if (avatarsHtml || countsHtml) {
                        els.railStatsAvatars.innerHTML = '<div class="actAdv-avatars-row">' + avatarsHtml + '</div>';
                        els.railStatsCounts.innerHTML = countsHtml;
                        els.railStats.style.display = '';
                    }
                }

                var topArticles = data.topArticles || [];
                if (Array.isArray(topArticles) && topArticles.length) {
                    var listHtml = topArticles.slice(0, 10).map(function(a) {
                        var t = a.title || '';
                        var u = a.url || mw.util.getUrl(t);
                        var img = a.image || '';
                        
                        var thumbHtml = img
                            ? '<div class="actAdv-top-thumb"><img loading="lazy" src="' + esc(img) + '" alt="" onerror="this.parentNode&&this.parentNode.removeChild(this.parentNode)"></div>'
                            : '<div class="actAdv-top-thumb actAdv-top-thumb--empty"></div>';

                        return '<li>' + thumbHtml + '<a class="actAdv-top-title" href="' + esc(u) + '">' + esc(t) + '</a></li>';
                    }).join('');

                    els.railTop.querySelector('.actAdv-toplist').innerHTML = listHtml;
                    els.railTop.style.display = '';
                }
                
                fetchCommunityCorner().then(function(html) {
                    if (html) {
                        els.railCorner.querySelector('.actAdv-corner-body').innerHTML = html;
                        els.railCorner.style.display = '';
                    }
                }).catch(function() {});

            }).catch(function() {});
        }

        function mergeEntries(list) {
            var added = 0;
            list.forEach(function(e) {
                if (!e || state.seen[e.id]) return;
                state.seen[e.id] = true;
                state.pool.push(e);
                added++;
            });
            if (added) state.pool.sort(function(a, b) { return b.timestamp - a.timestamp; });
            return added;
        }

        function resetSource(which) {
            var s = state.sources[which];
            s.cont = null; 
            s.done = false;
            if (which === 'post') s.page = 0;
            if (which === 'af') s.allowed = null;
            if (which === 'rc') s.patrolAllowed = null;
            
            var prefix = which === 'rc' ? 'rc:' : which === 'log' ? 'log:' : which === 'af' ? 'af:' : 'post:';
            state.pool = state.pool.filter(function(e) { return e.id.indexOf(prefix) !== 0; });
            state.seen = {};
            state.pool.forEach(function(e) { state.seen[e.id] = true; });
            state.railDone = false;
            initialLoad();
        }

        function initialLoad() {
            state.loading = true;
            els.loading.style.display = '';
            renderErrors();

            var rcCheck = state.sources.rc.patrolAllowed === null ? 
                checkPatrolRights().catch(function() { return false; }) : 
                Promise.resolve(state.sources.rc.patrolAllowed);
                
            var afCheck = state.sources.af.allowed === null ? 
                checkAfRights().catch(function() { return false; }) : 
                Promise.resolve(state.sources.af.allowed);

            return Promise.all([rcCheck, afCheck]).then(function(results) {
                state.sources.rc.patrolAllowed = results[0];
                state.sources.af.allowed = results[1];
                if (!state.sources.af.allowed) state.sources.af.done = true;

                return Promise.all([
                    fetchRc().catch(function() { failSource('rc'); return []; }),
                    fetchLogs().catch(function() { failSource('log'); return []; }),
                    fetchPosts().catch(function() { failSource('post'); return []; }),
                    fetchAf().catch(function() { failSource('af'); return []; })
                ]);
            }).then(function(results) {
                results.forEach(function(list) { mergeEntries(list); });

                state.loading = false;
                els.loading.style.display = 'none';
                renderAll();
                renderErrors();

                resolveAvatarsAsync(state.pool);
            });
        }

        function failSource(which) {
            var labelKey = { rc: 'sourceRc', log: 'sourceLog', post: 'sourcePost', af: 'sourceAf', rail: 'sourceRail', corner: 'sourceCorner' }[which];
            var label = T(labelKey);
            if (state.errors.indexOf(label) === -1) state.errors.push(label);
            if (state.sources[which]) state.sources[which].done = true;
        }

        function loadMore() {
            if (state.loading) return;
            var fe = filteredEntries();
            if (state.rendered < fe.length) { appendChunk(100); return; }
            if (sourcesExhausted()) { updateFooter(); return; }

            state.loading = true;
            els.loading.style.display = '';
            els.moreBtn.disabled = true;

            return Promise.all([
                fetchRc().catch(function() { failSource('rc'); return []; }),
                fetchLogs().catch(function() { failSource('log'); return []; }),
                fetchPosts().catch(function() { failSource('post'); return []; }),
                fetchAf().catch(function() { failSource('af'); return []; })
            ]).then(function(results) {
                var newEntries = [];
                results.forEach(function(list) { 
                    var added = mergeEntries(list);
                    if (added) newEntries = newEntries.concat(list);
                });

                state.loading = false;
                els.loading.style.display = 'none';
                els.moreBtn.disabled = false;
                renderAll();
                renderErrors();

                if (newEntries.length > 0) {
                    resolveAvatarsAsync(newEntries);
                }
            });
        }

        function cleanup() {
            if (observer) { 
                observer.disconnect(); 
                observer = null; 
            }
            document.removeEventListener('keydown', onEsc);
            cardIndexByUser.clear();
            var root = document.getElementById(ROOT_ID);
            if (root) root.remove();
        }

        function isMaPage() {
            if (mw.config.get('wgNamespaceNumber') !== -1 && mw.config.get('wgCanonicalNamespace') !== 'Special') return false;
            var title = mw.config.get('wgTitle') || '';
            return title === 'ActivityAdvanced' || title === 'AA';
        }

        function start() {
            if (!isMaPage()) return;
            
            if (mw.config.get('wgTitle') === 'AA') {
                try { 
                    history.replaceState(history.state, '', mw.util.getUrl('Special:ActivityAdvanced')); 
                } catch (e) {}
            }
            
            fetch(location.origin + '/wikia.php?controller=FeedsAndPosts&method=getAll', { credentials: 'same-origin' })
                .then(function(r) { return r.ok ? r.json() : null; })
                .then(function(d) {
                    var name = d && d.wikiVariables && d.wikiVariables.name;
                    if (name) document.title = 'Activity Advanced | ' + name;
                })
                .catch(function() {});
                
            Store.load();
            loadAvatarCache();
            loadUserRightsCache();
            cleanup();
            
            loadAssets().then(function() {
                buildShell();
                renderErrors();
                initNamespaces();
                initialLoad();
                renderRail();
            });
        }

        window.ActivityAdvanced = window.ActivityAdvanced || {};
        window.ActivityAdvanced.init = start;
        window.ActivityAdvanced.cleanup = cleanup;
        window.ActivityAdvanced._state = state;

        start();
    }

    waitForMw();
})();