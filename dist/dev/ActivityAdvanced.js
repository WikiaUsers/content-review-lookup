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

    const waitForMw = () => {
        if (window.mw && mw.loader && typeof mw.loader.using === 'function') {
            mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.user']).done(init).fail((err) => {
                console.error('[ActAdv] Module load failed:', err);
            });
        } else {
            setTimeout(waitForMw, 100);
        }
    };

    function init() {
        if (!/\.fandom\.com$/.test(location.hostname) || !window.mw || !mw.Api || !mw.config || window.top !== window.self) return;

        // --- Constants & Config ---
        const LANG = ((mw.config.get('wgUserLanguage') || 'en') + '').indexOf('ru') === 0 ? 'ru' : 'en';
        const FALLBACK_STRINGS = {
            ru: { pageTitle: 'Активность вики', subtitle: 'Служебная страница', loading: 'Загрузка…', settings: 'Настройки', close: 'Закрыть', sourcesFailed: 'Не удалось загрузить: {list}. Показаны остальные данные.', sourceRc: 'правки', sourceLog: 'логи', sourcePost: 'обсуждения' },
            en: { pageTitle: 'Wiki activity', subtitle: 'Special page', loading: 'Loading…', settings: 'Settings', close: 'Close', sourcesFailed: 'Failed to load: {list}. Showing the rest.', sourceRc: 'recent changes', sourceLog: 'logs', sourcePost: 'discussions' }
        };
        const DEFAULTS = {
            filters: { edit: true, new: true, log: true, af: true, forum: true, wall: true, comment: true, newusers: false, patrol: false },
            excludeUsers: [], includeUsers: [], namespaces: [], ignoreTalk: true,
            limit: 100, showBots: false, expandDetails: false, autoLoad: true, hideRail: false, onlyUnpatrolled: false
        };
        const FILTER_KEYS = ['edit', 'new', 'log', 'af', 'forum', 'wall', 'comment'];
        const ACTION_ICON = { edit: 'edit', new: 'new', delete: 'delete', restore: 'restore', protect: 'protect', unprotect: 'protect', move: 'move', block: 'block', unblock: 'block', reblock: 'block', rights: 'rights', upload: 'upload', newusers: 'newusers', patrol: 'patrol', other: 'quiz', forum: 'forum', wall: 'wall', comment: 'comment', poll: 'poll', quiz: 'quiz', af: 'shield' };
        const FILTER_ICON = { edit: 'edit', new: 'new', log: 'quiz', af: 'shield', forum: 'forum', wall: 'wall', comment: 'comment', poll: 'poll' };
        const FILTER_OF_TYPE = { edit: 'edit', new: 'new', log: 'log', af: 'af', forum: 'forum', wall: 'wall', comment: 'comment', poll: 'forum', quiz: 'forum' };
        const LOG_ACTIONS = { delete: 1, restore: 1, protect: 1, unprotect: 1, move: 1, block: 1, unblock: 1, reblock: 1, rights: 1, upload: 1, newusers: 1, patrol: 1, other: 1 };
        const FALLBACK_NAMESPACES = [
            { id: 0, name: '(Main)' }, { id: 1, name: 'Talk' }, { id: 2, name: 'User' }, { id: 3, name: 'User talk' }, { id: 4, name: 'Project' }, { id: 5, name: 'Project talk' }, { id: 6, name: 'File' }, { id: 7, name: 'File talk' }, { id: 8, name: 'MediaWiki' }, { id: 9, name: 'MediaWiki talk' }, { id: 10, name: 'Template' }, { id: 11, name: 'Template talk' }, { id: 12, name: 'Help' }, { id: 13, name: 'Help talk' }, { id: 14, name: 'Category' }, { id: 15, name: 'Category talk' }, { id: 110, name: 'Forum' }, { id: 111, name: 'Forum talk' }, { id: 420, name: 'GeoJson' }, { id: 421, name: 'GeoJson talk' }, { id: 500, name: 'User blog' }, { id: 501, name: 'User blog comment' }, { id: 502, name: 'Blog' }, { id: 503, name: 'Blog talk' }, { id: 828, name: 'Module' }, { id: 829, name: 'Module talk' }, { id: 1200, name: 'Message Wall' }, { id: 1201, name: 'Thread' }, { id: 1202, name: 'Message Wall Greeting' }, { id: 1203, name: 'Message Wall Greeting Talk' }, { id: 2000, name: 'Board' }, { id: 2001, name: 'Board Thread' }, { id: 2002, name: 'Topic' }, { id: 2900, name: 'Map' }, { id: 2901, name: 'Map talk' }
        ];

        // --- State & Utilities ---
        let STR = {};
        let els = {};
        let observer = null;
        const cardIndexByUser = new Map();
        const api = new mw.Api();
        const esc = (s) => mw.html.escape(String(s == null ? '' : s));
        const wikiId = mw.config.get('wgCityId');
        const state = { pool: [], seen: {}, rendered: 0, lastDayKey: '', loading: false, errors: [], railDone: false, sources: { rc: { cont: null, done: false, patrolAllowed: null }, log: { cont: null, done: false }, post: { page: 0, done: false }, af: { cont: null, done: false, allowed: null } } };

        // --- Cache Class ---
        class TTLCache {
            constructor(storageKey, ttlMs, maxItems = 0) {
                this.key = storageKey;
                this.ttl = ttlMs;
                this.max = maxItems;
                this.data = new Map();
                this.load();
            }
            load() {
                try {
                    const raw = localStorage.getItem(this.key);
                    if (!raw) return;
                    const parsed = JSON.parse(raw);
                    const now = Date.now();
                    if (Array.isArray(parsed)) {
                        parsed.forEach(([k, v]) => { if (v && v.ts && (now - v.ts) < this.ttl) this.data.set(k, v); });
                    } else if (parsed && typeof parsed === 'object') {
                        Object.keys(parsed).forEach(k => { if (parsed[k] && parsed[k].ts && (now - parsed[k].ts) < this.ttl) this.data.set(k, parsed[k]); });
                    }
                } catch (e) { console.warn('[ActAdv] Cache load fail:', e); }
            }
            save() {
                try {
                    const obj = {};
                    this.data.forEach((v, k) => obj[k] = v);
                    localStorage.setItem(this.key, JSON.stringify(obj));
                } catch (e) {}
            }
            get(key) {
                const entry = this.data.get(key);
                if (!entry) return undefined;
                if ((Date.now() - entry.ts) >= this.ttl) { this.data.delete(key); return undefined; }
                return entry.val;
            }
            set(key, val) {
                if (this.max && this.data.size >= this.max && !this.data.has(key)) {
                    const firstKey = this.data.keys().next().value;
                    this.data.delete(firstKey);
                }
                this.data.set(key, { val, ts: Date.now() });
            }
            clear() { this.data.clear(); try { localStorage.removeItem(this.key); } catch(e){} }
        }

        const avatarCache = new TTLCache('actAdv-avatar-cache', 24 * 60 * 60 * 1000, 500);
        const rightsCacheKey = 'actAdv-user-rights-' + (mw.config.get('wgCityId') || location.hostname);
        const rightsCache = new TTLCache(rightsCacheKey, 60 * 60 * 1000);
        let patrolToken = null;

        // --- Localization & Settings ---
        const T = (key, params) => {
            let s = STR[key] || (FALLBACK_STRINGS[LANG] && FALLBACK_STRINGS[LANG][key]) || key;
            if (params) Object.keys(params).forEach(k => s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]));
            return s;
        };
        const plural = (forms, n) => {
            if (!forms) return String(n);
            const f = forms.split('|');
            if (LANG !== 'ru') return (f[1] || f[0]).replace('{n}', n);
            const m10 = n % 10, m100 = n % 100;
            let idx = 2;
            if (m10 === 1 && m100 !== 11) idx = 0;
            else if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) idx = 1;
            return (f[idx] || f[f.length - 1] || '{n}').replace('{n}', n);
        };

        const Store = {
            settings: null,
            load() {
                let user = {};
                try { user = JSON.parse(localStorage.getItem('actAdv-settings')) || {}; } catch (e) {}
                this.settings = Object.assign({}, DEFAULTS, user);
                this.settings.filters = Object.assign({}, DEFAULTS.filters, user.filters || {});
                this.settings.limit = Math.min(Math.max(parseInt(this.settings.limit, 10) || 100, 10), 500);
                ['excludeUsers', 'includeUsers'].forEach(k => {
                    if (!Array.isArray(this.settings[k])) this.settings[k] = [];
                    this.settings[k] = this.settings[k].map(u => String(u).trim()).filter(Boolean);
                });
                if (!Array.isArray(this.settings.namespaces)) this.settings.namespaces = [];
                this.settings.namespaces = this.settings.namespaces.map(Number).filter(n => !isNaN(n));
                return this.settings;
            },
            save() { try { localStorage.setItem('actAdv-settings', JSON.stringify(this.settings)); } catch (e) {} }
        };

        // --- Asset Loading ---
        const fetchRawPage = (title) => {
            const params = new URLSearchParams({ action: 'query', prop: 'revisions', rvprop: 'content', rvslots: 'main', format: 'json', formatversion: 2, titles: title, origin: '*' });
            return fetch(`https://yandere-simulator.fandom.com/ru/api.php?${params}`, { headers: { 'Accept': 'application/json' } })
                .then(r => r.ok ? r.json() : Promise.reject(r.status))
                .then(d => { const p = d.query.pages; const id = Object.keys(p)[0]; return (p[id] && p[id].revisions && p[id].revisions[0]) ? p[id].revisions[0].slots.main.content : null; })
                .catch(() => null);
        };

        const loadAssets = () => {
            const PAGE_CSS = 'Участница:Ŝenezala/debugging.css';
            const PAGE_ICONS = 'Участница:Ŝenezala/icons.css';
            const PAGE_JSON = 'Участница:Ŝenezala/debugging.json';

            return fetchRawPage(PAGE_CSS).then(css => { if (css) { const s = document.createElement('style'); s.id = 'actAdv-style-ext'; s.textContent = css; document.head.appendChild(s); } return fetchRawPage(PAGE_ICONS); })
                .then(icons => { if (icons) { const s = document.createElement('style'); s.id = 'actAdv-style-icons'; s.textContent = icons; document.head.appendChild(s); } return fetchRawPage(PAGE_JSON); })
                .then(jsonText => {
                    let jsonData = {};
                    if (jsonText) try { jsonData = JSON.parse(jsonText); } catch (e) {}
                    const fb = FALLBACK_STRINGS[LANG] || {};
                    const jl = jsonData[LANG] || {};
                    STR = Object.assign({}, fb, jl);
                })
                .catch(() => { STR = Object.assign({}, FALLBACK_STRINGS[LANG] || {}); });
        };

        // --- Unified Fetch Driver ---
        const normalizeUser = (name) => {
            const anon = !!name && mw.util.isIPAddress(name);
            return { name: name || T('deletedUser'), anonymous: anon, url: anon ? mw.util.getUrl('Special:Contributions/' + name) : mw.util.getUrl('User:' + name), avatarUrl: null };
        };

        const SOURCE_CONFIG = {
            rc: {
                checkRights: () => {
					if (state.sources.rc.patrolAllowed !== null) return Promise.resolve(state.sources.rc.patrolAllowed);
					return api.get({ action: 'query', meta: 'userinfo', uiprop: 'rights', formatversion: 2 })
						.then(r => { state.sources.rc.patrolAllowed = (r.query.userinfo.rights || []).includes('patrol'); return state.sources.rc.patrolAllowed; })
						.catch(() => { state.sources.rc.patrolAllowed = false; return false; });
				},
                buildParams: (cont, allowed) => {
                    const base = 'title|timestamp|ids|flags|comment|redirect|tags|userid|user|sizes|parsedcomment';
                    const p = { action: 'query', list: 'recentchanges', rcprop: allowed ? base + '|patrolled' : base, rclimit: Math.min(Math.max(Store.settings.limit, 10), 500), rctype: 'edit|new', formatversion: 2 };
                    if (!Store.settings.showBots) p.rcshow = '!bot';
                    if (cont) p.rccontinue = cont;
                    return p;
                },
                extract: (res) => res.query.recentchanges || [],
                contKey: 'rccontinue',
                normalize: (rc) => {
                    if (!rc || !rc.title || rc.type === 'log') return null;
                    const ts = Math.floor(Date.parse(rc.timestamp) / 1000);
                    if (!ts) return null;
                    const isNew = rc.type === 'new';
                    return { id: `rc:${rc.rcid || rc.revid || rc.title + ts}`, type: isNew ? 'new' : 'edit', action: isNew ? 'new' : 'edit', ns: rc.ns, title: rc.title, titleUrl: mw.util.getUrl(rc.title), user: normalizeUser(rc.user), timestamp: ts, sizeDelta: (typeof rc.newlen === 'number' && typeof rc.oldlen === 'number') ? rc.newlen - rc.oldlen : null, oldSize: rc.oldlen, newSize: rc.newlen, comment: rc.parsedcomment, tags: rc.tags, extra: { revid: rc.revid, diffUrl: mw.util.getUrl('Special:Diff/' + rc.revid), isFile: rc.ns === 6, fileName: rc.ns === 6 ? rc.title : null, unpatrolled: !!rc.unpatrolled, autopatrolled: !!rc.autopatrolled } };
                },
                onResult: (res, src) => { src.patrolAllowed = state.sources.rc.patrolAllowed; }
            },
            log: {
                buildParams: (cont) => {
                    const p = { action: 'query', list: 'logevents', lelimit: Math.min(Math.max(Store.settings.limit, 10), 500), leprop: 'ids|title|type|user|timestamp|comment|parsedcomment|details|tags|userid', formatversion: 2 };
                    if (cont) p.lecontinue = cont;
                    return p;
                },
                extract: (res) => res.query.logevents || [],
                contKey: 'lecontinue',
                normalize: (le) => {
                    if (!le || !le.logid) return null;
                    const ts = Math.floor(Date.parse(le.timestamp) / 1000);
                    if (!ts) return null;
                    const lt = le.logtype || le.type;
                    const la = le.logaction || le.action || '';
                    if (le.ns === 6 && lt === 'create') return null;
                    let action = 'other';
                    if (lt === 'delete') action = la === 'restore' ? 'restore' : 'delete';
                    else if (lt === 'move') action = 'move';
                    else if (lt === 'protect') action = la === 'unprotect' ? 'unprotect' : 'protect';
                    else if (lt === 'block') action = la === 'unblock' ? 'unblock' : (la === 'reblock' ? 'reblock' : 'block');
                    else if (lt === 'rights') action = 'rights';
                    else if (lt === 'upload') action = 'upload';
                    else if (lt === 'newusers') action = 'newusers';
                    else if (lt === 'patrol') action = 'patrol';
                    if (!LOG_ACTIONS[action]) action = 'other';
                    const p = le.params || {};
                    const isFile = lt === 'upload' || (le.ns === 6 && lt === 'modify');
                    let displayTitle = le.title || T('logOther');
                    if (action === 'move' && le.title) displayTitle = T('renamedTitle', { t: le.title });
                    else if (action === 'patrol' && le.title) displayTitle = T('patrolledTitle', { t: le.title });
                    return { id: `log:${le.logid}`, type: 'log', action, ns: le.ns, title: displayTitle, titleUrl: le.title ? mw.util.getUrl(le.title) : '#', user: normalizeUser(le.user), timestamp: ts, sizeDelta: null, oldSize: null, newSize: null, comment: le.parsedcomment, tags: le.tags, extra: { logType: lt, isFile, fileName: isFile ? le.title : null, userId: le.userid, params: { target: p.target_title || p.target, duration: p.duration || p.expiry, oldGroups: p.oldgroups, newGroups: p.newgroups, description: p.description } } };
                }
            },
            af: {
                checkRights: () => {
					if (state.sources.af.allowed !== null) return Promise.resolve(state.sources.af.allowed);
					return api.get({ action: 'query', meta: 'userinfo', uiprop: 'rights', formatversion: 2 })
						.then(r => { const rights = r.query.userinfo.rights || []; state.sources.af.allowed = rights.includes('abusefilter-view') || rights.includes('abusefilter-log'); return state.sources.af.allowed; })
						.catch(() => { state.sources.af.allowed = false; return false; });
				},
                buildParams: (cont) => {
                    const p = { action: 'query', list: 'abuselog', aflimit: Math.min(Math.max(Store.settings.limit, 10), 500), aflprop: 'ids|filter|user|title|action|result|timestamp|hidden|ns', formatversion: 2 };
                    if (cont) p.aflstart = cont;
                    return p;
                },
                extract: (res) => res.query.abuselog || [],
                contKey: 'aflstart',
                normalize: (af) => {
                    if (!af || !af.id || af.hidden) return null;
                    const ts = Math.floor(Date.parse(af.timestamp) / 1000);
                    if (!ts) return null;
                    const result = af.result || '';
                    let desc = T('afOther', { r: result });
                    if (result === 'disallow') desc = T('afDisallow');
                    else if (result === 'warn') desc = T('afWarn');
                    else if (result === 'tag') desc = T('afTag');
                    else if (result === 'block') desc = T('afBlock');
                    else if (result === 'degroup') desc = T('afDegroup');
                    return { id: `af:${af.id}`, type: 'af', action: 'af', ns: af.ns, title: af.title || T('logOther'), titleUrl: af.title ? mw.util.getUrl(af.title) : '#', user: normalizeUser(af.user), timestamp: ts, sizeDelta: null, oldSize: null, newSize: null, comment: null, tags: null, extra: { filterId: af.filter_id, afAction: af.action, afResult: result, afDescription: desc, isFile: af.ns === 6, fileName: af.ns === 6 ? af.title : null } };
                },
                skipIfNoRights: true
            }
        };

        const fetchSource = (name) => {
            const src = state.sources[name];
            const cfg = SOURCE_CONFIG[name];
            if (src.done) return Promise.resolve([]);

            const runFetch = (allowed) => {
                if (cfg.skipIfNoRights && !allowed) { src.done = true; return Promise.resolve([]); }
                const params = cfg.buildParams(src.cont, allowed);
                return api.get(params).then(res => {
                    const list = cfg.extract(res);
                    if (res.continue && res.continue[cfg.contKey]) src.cont = res.continue[cfg.contKey];
                    else src.done = true;
                    if (cfg.onResult) cfg.onResult(res, src);
                    return list.map(cfg.normalize).filter(Boolean);
                }).catch(e => {
                    if (name === 'rc' && allowed && e && e.code === 'permissiondenied') {
                        src.patrolAllowed = false;
                        return runFetch(false);
                    }
                    throw e;
                });
            };

            const rightsPromise = cfg.checkRights ? cfg.checkRights().catch(() => false) : Promise.resolve(true);
            return rightsPromise.then(runFetch);
        };

        // Posts require special handling due to Wikia API
        const fetchPosts = () => {
            const src = state.sources.post;
            if (src.done || !wikiId) { src.done = true; return Promise.resolve([]); }
            const limit = Math.min(Math.max(Store.settings.limit, 10), 100);
            return new Promise(resolve => {
                $.ajax({ url: mw.util.wikiScript("wikia"), type: "GET", dataType: "json", xhrFields: { withCredentials: true }, data: { controller: "DiscussionPost", method: "getPosts", viewableOnly: true, sortKey: "creation_date", limit, format: "json" } }).done(resolve).fail(() => { src.done = true; resolve([]); });
            }).then(res => {
                let list = (res && res._embedded && res._embedded["doc:posts"]) || (res && res.items) || (Array.isArray(res) ? res : []);
                if (!list.length) { src.done = true; return []; }
                const posts = list.map(normalizePost).filter(Boolean);
                const needingTitles = posts.filter(p => p.type === 'comment' && (p.title === '__ENRICH_COMMENT__' || p.title === T('untitled')) && p.extra.forumId);
                if (needingTitles.length > 0) {
                    const ids = [...new Set(needingTitles.map(c => c.extra.forumId))];
                    return new Promise(r => $.ajax({ url: mw.util.wikiScript("wikia"), type: "GET", dataType: "json", xhrFields: { withCredentials: true }, data: { controller: "FeedsAndPosts", method: "getArticleNamesAndUsernames", stablePageIds: ids.join(','), format: "json" } }).done(r).fail(() => r(null)))
                        .then(enrich => {
                            if (enrich && enrich.articleNames) needingTitles.forEach(post => {
                                const info = enrich.articleNames[post.extra.forumId];
                                if (info && info.title) { post.title = T('commentOn', { page: info.title }); post.titleUrl = (info.relativeUrl || mw.util.getUrl(info.title)) + '?commentId=' + encodeURIComponent(post.extra.threadId || post.extra.postId); post.extra.pageTitle = info.title; }
                                else { post.title = T('commentOn', { page: T('untitled') }); post.titleUrl = '#'; }
                            });
                            if (list.length < limit) src.done = true;
                            return posts;
                        });
                }
                if (list.length < limit) src.done = true;
                return posts;
            });
        };

        const normalizePost = (p) => {
            if (!p || !p.id) return null;
            const ts = p.creationDate && typeof p.creationDate.epochSecond === 'number' ? p.creationDate.epochSecond : 0;
            if (!ts) return null;
            const authorName = (p.createdBy && p.createdBy.name) ? p.createdBy.name : T('deletedUser');
            const threadData = (p._embedded && Array.isArray(p._embedded.thread) && p._embedded.thread[0]) || {};
            const containerType = (threadData.containerType || '').toUpperCase();
            let type = 'forum', pageTitle = null, wallOwner = null, title = p.title || threadData.title;
            if (containerType === 'WALL') { type = 'wall'; const fn = p.forumName || ''; wallOwner = fn.endsWith(' Message Wall') ? fn.replace(/ Message Wall$/, '') : (fn || authorName); }
            else if (containerType === 'ARTICLE_COMMENT' || containerType === 'PAGE_COMMENT') { type = 'comment'; if (threadData.tags && threadData.tags[0] && threadData.tags[0].articleTitle) pageTitle = threadData.tags[0].articleTitle; }
            const threadId = p.threadId || (threadData.id) || null;
            if (type === 'comment') title = pageTitle ? T('commentOn', { page: pageTitle }) : '__ENRICH_COMMENT__';
            else if (type === 'wall' && !title) title = T('msgWall') + ': ' + (wallOwner || authorName);
            else if (!title) title = T('untitled');
            let text = p.rawContent || '';
            if (!text && p.jsonModel) try { const m = JSON.parse(p.jsonModel); if (m.content && Array.isArray(m.content)) text = m.content.map(b => (b.content || []).map(c => c.text || '').join('')).join('\n'); } catch(e){}
            const atts = (p._embedded && p._embedded.attachments && p._embedded.attachments[0]) || threadData.attachments || {};
            const images = (atts.contentImages || []).map(i => i.url).filter(Boolean);
            let titleUrl = '#';
            if (type === 'comment' && pageTitle) titleUrl = mw.util.getUrl(pageTitle) + '?commentId=' + encodeURIComponent(threadId || p.id);
            else if (type === 'wall' && wallOwner) titleUrl = mw.util.getUrl('Message Wall:' + wallOwner) + '?threadId=' + encodeURIComponent(threadId || p.id);
            else if (type === 'forum' && threadId) titleUrl = mw.config.get('wgScriptPath') + '/f/p/' + threadId;
            return { id: `post:${p.id}`, type, action: type, ns: null, title, titleUrl, user: normalizeUser(authorName), timestamp: ts, sizeDelta: null, oldSize: null, newSize: null, comment: null, tags: (threadData.tags || []).map(t => t.articleTitle || t.tag || '').filter(Boolean), extra: { postId: p.id, threadId, forumId: p.forumId, forumName: p.forumName, text, images: images.slice(0, 20), upvotes: p.upvoteCount, poll: (p.poll && Array.isArray(p.poll.answers)) ? { answers: p.poll.answers.map(a => ({ text: a.text || a.label || '', votes: a.votes || 0 })) } : null, pageTitle, isReply: !!p.isReply, userId: p.createdBy && p.createdBy.id } };
        };

        // --- Avatar Resolution ---
        const resolveAvatarsAsync = (entries) => {
            const toResolve = [];
            const idToUsername = new Map();
            entries.forEach(e => {
                if (!e.user || e.user.anonymous || e.user.avatarUrl) return;
                const uname = e.user.name;
                const cached = avatarCache.get(uname);
                if (cached !== undefined) { e.user.avatarUrl = cached; return; }
                if (e.extra && e.extra.userId) idToUsername.set(e.extra.userId, uname);
                else if (toResolve.indexOf(uname) === -1) toResolve.push(uname);
            });
            if (!toResolve.length && !idToUsername.size) return;

            const usernameToId = new Map();
            const chunks = [];
            for (let i = 0; i < toResolve.length; i += 50) chunks.push(toResolve.slice(i, i + 50));
            Promise.all(chunks.map(chunk => api.get({ action: 'query', list: 'users', ususers: chunk.join('|'), formatversion: 2 }).then(r => (r.query.users || []).forEach(u => { if (u.userid && u.name) usernameToId.set(u.name, u.userid); })).catch(() => {})))
                .then(() => {
                    const uniqueIds = [...new Set([...idToUsername.keys(), ...usernameToId.values()])];
                    if (!uniqueIds.length) return;
                    const CONCURRENCY = 5;
                    let index = 0;
                    const processBatch = () => {
                        if (index >= uniqueIds.length) return Promise.resolve();
                        const batch = uniqueIds.slice(index, index + CONCURRENCY);
                        index += CONCURRENCY;
                        return Promise.all(batch.map(uid => fetch(`/wikia.php?controller=UserProfile&method=getUserData&format=json&userId=${uid}`, { credentials: 'same-origin' }).then(r => r.ok ? r.json() : null).then(d => {
                            const av = d && d.userData && d.userData.avatar;
                            const unameById = idToUsername.get(uid);
                            if (unameById) avatarCache.set(unameById, av);
                            usernameToId.forEach((mappedId, mappedName) => { if (mappedId === uid) avatarCache.set(mappedName, av); });
                        }).catch(() => {}))).then(processBatch);
                    };
                    return processBatch();
                })
                .then(() => { avatarCache.save(); updateRenderedAvatars(); });
        };

        const updateRenderedAvatars = () => {
            if (!els.feed || !cardIndexByUser.size) return;
            cardIndexByUser.forEach((cards, username) => {
                const url = avatarCache.get(username);
                if (!url) return;
                cards.forEach(card => {
                    const span = card.querySelector('.actAdv-avatar');
                    if (span && !span.querySelector('img')) span.innerHTML = `<img src="${esc(url)}" alt="" loading="lazy">`;
                });
            });
        };

        // --- HTML Generators ---
        const iconSvg = (name, cls) => `<span class="actAdv-icon ${cls} actAdv-icon--${name}" aria-hidden="true"></span>`;
        const two = (n) => (n < 10 ? '0' : '') + n;
        const dayKey = (ts) => { const d = new Date(ts * 1000); return `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())}`; };
        const timeHM = (ts) => { const d = new Date(ts * 1000); return `${two(d.getHours())}:${two(d.getMinutes())}`; };
        const DATE_FMT = new Intl.DateTimeFormat(LANG === 'ru' ? 'ru-RU' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        const formatNumber = (num) => num == null ? '' : new Intl.NumberFormat(LANG === 'ru' ? 'ru-RU' : 'en-US').format(num);
        const relativeTime = (ts) => {
            const diff = Date.now() / 1000 - ts;
            if (diff < 60) return T('justNow');
            if (diff < 3600) return plural(T('minAgo'), Math.floor(diff / 60));
            if (diff < 86400) return plural(T('hourAgo'), Math.floor(diff / 3600));
            if (diff < 172800) return T('yesterday', { t: timeHM(ts) });
            if (diff < 7 * 86400) return plural(T('daysAgo'), Math.floor(diff / 86400));
            return DATE_FMT.format(new Date(ts * 1000));
        };
        const timeTag = (ts, linkUrl) => {
            const d = new Date(ts * 1000);
            const inner = esc(relativeTime(ts));
            const attrs = `datetime="${d.toISOString()}" title="${esc(d.toLocaleString())}"`;
            return linkUrl ? `<a class="actAdv-timelink" href="${esc(linkUrl)}"><time ${attrs}>${inner}</time></a>` : `<time ${attrs}>${inner}</time>`;
        };
        const formatPostText = (raw) => {
            let s = esc(String(raw == null ? '' : raw).replace(/\r\n?/g, '\n').replace(/\n{2,}/g, '\n').replace(/^\n+|\n+$/g, '').slice(0, 250));
            if (String(raw || '').length > 250) s += '…';
            return s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<i>$2</i>').replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>').replace(/\n/g, '<br>');
        };

        const userLineHtml = (e) => {
            let avatar = '<span class="actAdv-avatar"></span>';
            if (e.user && e.user.avatarUrl) avatar = `<span class="actAdv-avatar"><img src="${esc(e.user.avatarUrl)}" alt="" loading="lazy"></span>`;
            else if (e.user && !e.user.anonymous) { const c = avatarCache.get(e.user.name); if (c) { e.user.avatarUrl = c; avatar = `<span class="actAdv-avatar"><img src="${esc(c)}" alt="" loading="lazy"></span>`; } }
            const un = e.user.name;
            return `<div class="actAdv-userline">${avatar} <a class="actAdv-user" href="${esc(e.user.url)}">${esc(un)}</a> <span class="actAdv-userlinks"><a href="${esc(mw.util.getUrl('User_talk:' + un))}">${esc(T('msgWall'))}</a> | <a href="${esc(mw.util.getUrl('Special:Contributions/' + un))}">${esc(T('contribs'))}</a> | <a href="${esc(mw.util.getUrl('Special:Block/' + un))}">${esc(T('blockUser'))}</a></span></div>`;
        };

        const bodyContentHtml = (e) => {
            const parts = [];
            if (e.comment) parts.push(`<div class="actAdv-summaryline"><strong>${esc(T('summaryLabel'))}</strong> ${e.comment.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>').replace(/^(\s*<br\s*\/?>\s*)+/i, '').replace(/(\s*<br\s*\/?>\s*)+$/i, '')}</div>`);
            if (e.extra && e.extra.isFile && e.action !== 'delete') parts.unshift(`<div class="actAdv-file-preview"><a href="${esc(e.titleUrl)}" target="_blank" rel="noopener noreferrer"><img src="${location.origin}/wiki/Special:Redirect/file?wpvalue=${encodeURIComponent(e.extra.fileName)}" alt="${esc(e.title)}" loading="lazy" onerror="this.parentNode&&this.parentNode.parentNode&&this.parentNode.parentNode.removeChild(this.parentNode.parentNode)" /></a></div>`);
            if (e.type === 'log' && e.extra.params) {
                const p = e.extra.params, bits = [];
                if (e.action === 'move' && p.target) bits.push(`<strong>${esc(T('newTitleLabel'))}:</strong> ${esc(p.target)}`);
                if ((e.action === 'block' || e.action === 'reblock') && p.duration) bits.push(esc(T('blockDuration', { d: p.duration })));
                if (e.action === 'rights' && (p.oldGroups || p.newGroups)) bits.push(esc(T('rightsFromTo', { a: (p.oldGroups || []).join(', ') || '—', b: (p.newGroups || []).join(', ') || '—' })));
                if (bits.length) parts.push(`<div class="actAdv-logparams">${bits.join('<br>')}</div>`);
            }
            if (e.type === 'af' && e.extra) {
                const bits = [];
                if (e.extra.filterId) bits.push(esc(T('afFilterLabel', { n: e.extra.filterId })));
                if (e.extra.afAction) bits.push(esc(T('afActionLabel', { a: e.extra.afAction })));
                if (e.extra.afDescription) bits.push(esc(e.extra.afDescription));
                if (bits.length) parts.push(`<div class="actAdv-logparams">${bits.join('<br>')}</div>`);
            }
            if (e.extra.text) parts.push(`<div class="actAdv-posttext">${formatPostText(e.extra.text)}</div>`);
            if (e.extra.images && e.extra.images.length) {
                const shown = e.extra.images.slice(0, 3);
                const rem = e.extra.images.length - 3;
                let g = '<div class="actAdv-gallery">';
                shown.forEach(src => g += `<a href="${esc(e.titleUrl)}" class="actAdv-thumb" target="_blank" rel="noopener"><img loading="lazy" src="${esc(src)}" alt="" onerror="this.parentNode&&this.parentNode.removeChild(this.parentNode)"></a>`);
                if (rem > 0) g += `<a href="${esc(e.titleUrl)}" class="actAdv-morelink">${esc(T('moreImages', { n: rem }))}</a>`;
                parts.push(g + '</div>');
            }
            if (e.type === 'poll' && e.extra.poll && e.extra.poll.answers.length) {
                const total = e.extra.poll.answers.reduce((a, x) => a + (x.votes || 0), 0);
                let pol = `<div class="actAdv-poll"><div class="actAdv-poll-title">${esc(T('pollResults'))}</div>`;
                e.extra.poll.answers.forEach(a => { const pct = total > 0 ? Math.round((a.votes / total) * 100) : 0; pol += `<div class="actAdv-poll-row"><span class="actAdv-poll-text">${esc(a.text)}</span><span class="actAdv-poll-track"><span class="actAdv-poll-bar" style="width:${pct}%"></span></span><span class="actAdv-poll-pct">${pct}%</span></div>`; });
                parts.push(pol + `<div class="actAdv-poll-votes">${esc(T('votes', { n: total }))}</div></div>`);
            }
            return parts.join('');
        };

        const actionsHtml = (e) => {
            if (e.type !== 'edit' && e.type !== 'new') return '';
            const revid = e.extra && e.extra.revid;
            const links = [];
            if (e.extra && e.extra.unpatrolled === true) links.push(`<button type="button" class="actAdv-act-btn actAdv-patrol-btn" data-revid="${esc(revid)}" title="${esc(T('actPatrol'))}" aria-label="${esc(T('actPatrol'))}">${iconSvg('shield', 'actAdv-act-svg')}</button>`);
            links.push(`<a class="actAdv-act-btn" href="${esc(mw.util.getUrl(e.title))}?action=edit" target="_blank" rel="noopener noreferrer" title="${esc(T('actEdit'))}">${iconSvg('edit', 'actAdv-act-svg')}</a>`);
            if (e.extra.diffUrl) links.push(`<a class="actAdv-act-btn" href="${esc(e.extra.diffUrl)}" target="_blank" rel="noopener noreferrer" title="${esc(T('actDiff'))}">${iconSvg('eye', 'actAdv-act-svg')}</a>`);
            if (revid) links.push(`<a class="actAdv-act-btn" href="${esc(mw.util.getUrl('Special:Thanks/' + revid))}" target="_blank" rel="noopener noreferrer" title="${esc(T('actThanks'))}">${iconSvg('heart', 'actAdv-act-svg')}</a>`);
            links.push(`<a class="actAdv-act-btn" href="${esc(mw.util.getUrl(e.title))}?action=history" target="_blank" rel="noopener noreferrer" title="${esc(T('actHistory'))}">${iconSvg('history', 'actAdv-act-svg')}</a>`);
            return `<div class="actAdv-card-actions">${links.join('')}</div>`;
        };

        const cardHtml = (e) => {
            const iconName = ACTION_ICON[e.type === 'log' ? e.action : e.type] || 'quiz';
            const delta = e.sizeDelta !== null ? `<span class="actAdv-delta ${e.sizeDelta > 0 ? 'actAdv-delta--pos' : e.sizeDelta < 0 ? 'actAdv-delta--neg' : 'actAdv-delta--zero'}" ${(e.oldSize !== null && e.newSize !== null) ? `title="${esc(T('sizeTip', { old: e.oldSize, new: e.newSize }))}"` : ''}>${esc(e.sizeDelta > 0 ? '+' + e.sizeDelta : String(e.sizeDelta))}</span>` : '';
            const body = bodyContentHtml(e);
            return `<article class="actAdv-card actAdv-card--${esc(e.type)}" data-id="${esc(e.id)}"><span class="actAdv-ico">${iconSvg(iconName, 'actAdv-ico-svg')}</span><div class="actAdv-card-body"><div class="actAdv-card-top"><div class="actAdv-card-info"><div class="actAdv-titleline"><a class="actAdv-title" href="${esc(e.titleUrl)}">${esc(e.title)}</a>${delta}${delta ? ' <span class="actAdv-star">*</span>' : ''} ${timeTag(e.timestamp, (e.type === 'edit' || e.type === 'new') ? e.extra.diffUrl : null)}</div>${userLineHtml(e)}${e.tags && e.tags.length ? `<div class="actAdv-tagsline">(${esc(T('tagsLabel'))}: ${esc(e.tags.join(', '))})</div>` : ''}</div>${actionsHtml(e)}</div>${body ? `<hr class="actAdv-hr">${body}` : ''}</div></article>`;
        };

        // --- Shell & Events ---
        const buildShell = () => {
            const content = document.getElementById('mw-content-text') || document.body;
            const old = document.getElementById('actAdv-root');
            if (old) old.remove();
            [...content.querySelectorAll(':scope > *:not(script)')].forEach(c => { if (c.id !== 'actAdv-root') c.remove(); });
            const root = document.createElement('div');
            root.id = 'actAdv-root';
            root.className = 'actAdv' + (Store.settings.hideRail ? ' actAdv-hide-rail' : '');
            const chips = FILTER_KEYS.map(k => `<button type="button" class="actAdv-chip" data-filter="${k}" aria-pressed="${!!Store.settings.filters[k]}" title="${esc(T('filter' + k.charAt(0).toUpperCase() + k.slice(1)))}">${iconSvg(FILTER_ICON[k] || 'quiz', 'actAdv-chip-svg')}</button>`).join('');
            root.innerHTML = `<div class="actAdv-head"><div class="actAdv-head-left"><h1 class="actAdv-heading">${esc(T('pageTitle'))}</h1><span class="actAdv-subtitle">${esc(T('subtitle'))}</span></div><div class="actAdv-head-right"><div class="actAdv-chips" role="group">${chips}</div><button type="button" class="actAdv-settings-btn" aria-label="${esc(T('openSettings'))}">${iconSvg('settings', 'actAdv-chip-svg')}</button></div></div><div class="actAdv-errors"></div><div class="actAdv-layout"><div class="actAdv-main"><div class="actAdv-feed" role="feed"></div><div class="actAdv-morewrap"><button type="button" class="actAdv-more">${esc(T('loadMore'))}</button></div><div class="actAdv-loading" style="display:none">${esc(T('loading'))}</div><div class="actAdv-allloaded" style="display:none">${esc(T('allLoaded'))}</div><div class="actAdv-sentinel" style="height:1px"></div></div><aside class="actAdv-rail"><div class="actAdv-box actAdv-rail-stats" style="display:none"><h2>${esc(T('communityStats'))}</h2><div class="actAdv-stats-avatars"></div><div class="actAdv-stats-counts"></div></div><div class="actAdv-box actAdv-rail-top" style="display:none"><h2>${esc(T('popularPages'))}</h2><ol class="actAdv-toplist"></ol></div><div class="actAdv-box actAdv-rail-corner actAdv-corner" style="display:none"><h2>${esc(T('communityCorner'))}</h2><div class="actAdv-corner-body"></div></div></aside></div><div class="actAdv-overlay"><div class="actAdv-modal" role="dialog" aria-modal="true"><h2>${esc(T('settings'))}</h2><label><input type="checkbox" data-set="showBots"> ${esc(T('setShowBots'))}</label><label><input type="checkbox" data-set="expandDetails"> ${esc(T('setExpand'))}</label><label><input type="checkbox" data-set="autoLoad"> ${esc(T('setAutoLoad'))}</label><label><input type="checkbox" data-set="hideRail"> ${esc(T('setHideRail'))}</label><label>${esc(T('setLimit'))} <input type="number" min="10" max="500" step="10" data-set="limit"></label><div class="actAdv-modal-subhead">${esc(T('setFilters'))}</div><label><input type="checkbox" data-filter="newusers"> ${esc(T('filterNewusers'))}</label><label><input type="checkbox" data-set="onlyUnpatrolled"> ${esc(T('setOnlyUnpatrolled'))}</label><label><input type="checkbox" data-filter="patrol"> ${esc(T('filterPatrol'))}</label><label class="actAdv-modal-userfilter">${esc(T('setExcludeUsers'))}<input type="text" data-set="excludeUsers" placeholder="${esc(T('usersPlaceholder'))}"></label><label class="actAdv-modal-userfilter">${esc(T('setIncludeUsers'))}<input type="text" data-set="includeUsers" placeholder="${esc(T('usersPlaceholder'))}"></label><label><input type="checkbox" data-set="ignoreTalk"> ${esc(T('setIgnoreTalk'))}</label><details class="actAdv-ns-details"><summary>${esc(T('setNamespaces'))}</summary><div class="actAdv-modal-note">${esc(T('nsHint'))}</div><div class="actAdv-ns-list"></div></details><div class="actAdv-modal-note">${esc(T('setApplyNext'))}</div><button type="button" class="actAdv-modal-close actAdv-clear-cache">${esc(T('clearCache'))}</button><button type="button" class="actAdv-modal-close">${esc(T('close'))}</button></div></div>`;
            content.appendChild(root);
            els = { root, feed: root.querySelector('.actAdv-feed'), chips: [...root.querySelectorAll('.actAdv-chip')], moreBtn: root.querySelector('.actAdv-more'), loading: root.querySelector('.actAdv-loading'), allLoaded: root.querySelector('.actAdv-allloaded'), sentinel: root.querySelector('.actAdv-sentinel'), errorsBox: root.querySelector('.actAdv-errors'), overlay: root.querySelector('.actAdv-overlay'), railStats: root.querySelector('.actAdv-rail-stats'), railStatsAvatars: root.querySelector('.actAdv-stats-avatars'), railStatsCounts: root.querySelector('.actAdv-stats-counts'), railTop: root.querySelector('.actAdv-rail-top'), railCorner: root.querySelector('.actAdv-rail-corner'), nsList: root.querySelector('.actAdv-ns-list') };
            bindEvents();
        };

        const bindEvents = () => {
            els.chips.forEach(ch => ch.addEventListener('click', () => { const k = ch.dataset.filter; Store.settings.filters[k] = !Store.settings.filters[k]; Store.save(); ch.setAttribute('aria-pressed', String(!!Store.settings.filters[k])); renderAll(); }));
            els.feed.addEventListener('click', (e) => { const btn = e.target.closest('.actAdv-patrol-btn'); if (!btn || btn.disabled) return; const revid = parseInt(btn.dataset.revid, 10); if (revid) patrolRevision(revid, btn); });
            els.moreBtn.addEventListener('click', loadMore);
            const modal = els.root.querySelector('.actAdv-modal');
            modal.addEventListener('change', (e) => {
                const inp = e.target;
                const setKey = inp.dataset.set;
                const filterKey = inp.dataset.filter;
                if (setKey) {
                    if (inp.type === 'checkbox') { Store.settings[setKey] = inp.checked; if (setKey === 'hideRail') els.root.classList.toggle('actAdv-hide-rail', inp.checked); if (setKey === 'showBots') resetSource('rc'); if (setKey === 'ignoreTalk') buildNsList(); if (setKey === 'onlyUnpatrolled') renderAll(); }
                    else if (inp.type === 'number') { Store.settings[setKey] = Math.min(Math.max(parseInt(inp.value, 10) || 100, 10), 500); inp.value = Store.settings[setKey]; }
                    else { Store.settings[setKey] = String(inp.value || '').split(/[\n,]+/).map(s => s.trim()).filter(Boolean); inp.value = Store.settings[setKey].join(', '); renderAll(); }
                    Store.save();
                } else if (filterKey) { Store.settings.filters[filterKey] = inp.checked; Store.save(); renderAll(); }
                else if (inp.dataset.ns) {
                    const id = parseInt(inp.dataset.ns, 10);
                    const arr = Store.settings.namespaces;
                    const idx = arr.indexOf(id);
                    if (inp.checked && idx === -1) arr.push(id);
                    else if (!inp.checked && idx !== -1) arr.splice(idx, 1);
                    Store.save(); renderAll();
                }
            });
            els.root.querySelector('.actAdv-settings-btn').addEventListener('click', () => els.overlay.classList.add('actAdv-open'));
            els.root.querySelector('.actAdv-modal-close:not(.actAdv-clear-cache)').addEventListener('click', closeModal);
            els.root.querySelector('.actAdv-clear-cache').addEventListener('click', (e) => {
                e.stopPropagation();
                avatarCache.clear(); rightsCache.clear(); state.railDone = false;
                if (els.railStats) { els.railStats.style.display = 'none'; els.railStatsAvatars.innerHTML = ''; els.railStatsCounts.innerHTML = ''; }
                renderRail();
                e.target.textContent = T('cacheCleared'); setTimeout(() => e.target.textContent = T('clearCache'), 2000);
            });
            els.overlay.addEventListener('click', (e) => { if (e.target === els.overlay) closeModal(); });
            document.addEventListener('keydown', onEsc);
            els.feed.addEventListener('error', handleImageError, true);
            if (observer) observer.disconnect();
            observer = new IntersectionObserver(onIntersect, { rootMargin: '800px 0px' });
            observer.observe(els.sentinel);
        };

		const onEsc = (e) => { if (e.key === 'Escape') closeModal(); };
        const closeModal = () => { if (els.overlay) els.overlay.classList.remove('actAdv-open'); };
        const onIntersect = (entries) => { if (Store.settings.autoLoad && !state.loading && entries.some(e => e.isIntersecting)) loadMore(); };
        const handleImageError = (event) => {
            const img = event.target;
            if (!img || img.tagName !== 'IMG' || !els.feed.contains(img) || img.dataset.actAdvErrorHandled) return;
            img.dataset.actAdvErrorHandled = '1';
            const parent = img.parentElement;
            if (parent && (parent.classList.contains('actAdv-thumb') || parent.classList.contains('actAdv-avatar') || parent.classList.contains('actAdv-top-thumb'))) parent.remove();
            else if (parent && parent.parentElement && parent.parentElement.classList.contains('actAdv-file-preview')) parent.parentElement.remove();
            else img.remove();
            const card = img.closest('.actAdv-card');
            if (card) { const hr = card.querySelector('.actAdv-hr'); if (hr && (!hr.nextElementSibling || !hr.nextElementSibling.textContent.trim())) hr.remove(); }
        };

        // --- Rendering & Logic ---
        const filteredEntries = () => {
            const f = Store.settings.filters;
            const inc = (Store.settings.includeUsers || []).map(s => s.toLowerCase());
            const exc = (Store.settings.excludeUsers || []).map(s => s.toLowerCase());
            const nsSel = Store.settings.namespaces || [];
            const ignoreTalk = Store.settings.ignoreTalk !== false;
            return state.pool.filter(e => {
                if (e.type === 'log' && e.action === 'newusers') return f.log !== false && f.newusers !== false;
                if (e.type === 'log' && e.action === 'patrol') return f.log !== false && f.patrol !== false;
                if (Store.settings.onlyUnpatrolled) {
                    if ((e.type === 'edit' || e.type === 'new') && (e.extra.autopatrolled === true || e.extra.unpatrolled === false)) return false;
                    if (e.type === 'log' && e.action === 'patrol') return false;
                }
                const fk = FILTER_OF_TYPE[e.type] || e.type;
                if (f[fk] === false) return false;
                const uname = ((e.user && e.user.name) || '').toLowerCase();
                if (inc.length && inc.indexOf(uname) === -1) return false;
                if (exc.length && exc.indexOf(uname) !== -1) return false;
                if (e.ns != null) { if (ignoreTalk && e.ns % 2 === 1) return false; if (nsSel.length && nsSel.indexOf(e.ns) === -1) return false; }
                return true;
            });
        };

        const renderAll = () => {
            if (!els.feed) return;
            els.feed.innerHTML = ''; cardIndexByUser.clear(); state.rendered = 0; state.lastDayKey = '';
            appendChunk(100); updateFooter();
        };

        const appendChunk = (n) => {
            const fe = filteredEntries();
            const slice = fe.slice(state.rendered, state.rendered + n);
            if (!slice.length) { updateFooter(); return; }
            const frag = document.createDocumentFragment();
            slice.forEach(e => {
                const dk = dayKey(e.timestamp);
                if (dk !== state.lastDayKey) { state.lastDayKey = dk; const div = document.createElement('div'); div.className = 'actAdv-daydivider'; div.textContent = DATE_FMT.format(new Date(e.timestamp * 1000)); frag.appendChild(div); }
                const wrap = document.createElement('div'); wrap.innerHTML = cardHtml(e); frag.appendChild(wrap.firstElementChild);
            });
            state.rendered += slice.length;
            els.feed.appendChild(frag);
            rebuildCardIndex(); updateFooter();
            requestAnimationFrame(() => { if (!els.feed) return; els.feed.querySelectorAll('img').forEach(img => { if (img.complete && img.naturalWidth === 0 && !img.dataset.actAdvErrorHandled) handleImageError({ target: img }); }); });
        };

        const rebuildCardIndex = () => {
            cardIndexByUser.clear(); if (!els.feed) return;
            els.feed.querySelectorAll('.actAdv-card').forEach(card => {
                const link = card.querySelector('.actAdv-user'); if (!link) return;
                const un = link.textContent; if (!un) return;
                if (!cardIndexByUser.has(un)) cardIndexByUser.set(un, []);
                cardIndexByUser.get(un).push(card);
            });
        };

        const updateFooter = () => {
            const fe = filteredEntries();
            const exhausted = state.sources.rc.done && state.sources.log.done && state.sources.post.done && state.sources.af.done;
            const nothingLeft = exhausted && state.rendered >= fe.length;
            els.moreBtn.style.display = nothingLeft ? 'none' : '';
            els.allLoaded.style.display = nothingLeft && fe.length ? '' : 'none';
        };

        const renderErrors = () => { if (els.errorsBox) els.errorsBox.innerHTML = state.errors.length ? `<div class="actAdv-error">${esc(T('sourcesFailed', { list: state.errors.join(', ') }))}</div>` : ''; };

        const mergeEntries = (list) => {
            let added = 0;
            list.forEach(e => { if (e && !state.seen[e.id]) { state.seen[e.id] = true; state.pool.push(e); added++; } });
            if (added) state.pool.sort((a, b) => b.timestamp - a.timestamp);
            return added;
        };

        const resetSource = (which) => {
            const s = state.sources[which];
            s.cont = null; s.done = false;
            if (which === 'post') s.page = 0;
            if (which === 'af') s.allowed = null;
            if (which === 'rc') s.patrolAllowed = null;
            const prefix = which === 'rc' ? 'rc:' : which === 'log' ? 'log:' : which === 'af' ? 'af:' : 'post:';
            state.pool = state.pool.filter(e => e.id.indexOf(prefix) !== 0);
            state.seen = {}; state.pool.forEach(e => state.seen[e.id] = true);
            state.railDone = false; initialLoad();
        };

        const failSource = (which) => {
            const label = T({ rc: 'sourceRc', log: 'sourceLog', post: 'sourcePost', af: 'sourceAf' }[which]);
            if (state.errors.indexOf(label) === -1) state.errors.push(label);
            if (state.sources[which]) state.sources[which].done = true;
        };

        const patrolRevision = (revid, btn) => {
            if (!revid || !btn) return;
            btn.disabled = true; btn.classList.add('actAdv-patrol-loading');
            const getToken = () => patrolToken ? Promise.resolve(patrolToken) : api.get({ action: 'query', meta: 'tokens', type: 'watch|patrol', formatversion: 2 }).then(r => { patrolToken = r.query.tokens.patroltoken; return patrolToken; }).catch(() => null);
            getToken().then(token => {
                if (!token) throw new Error('No token');
                return api.post({ action: 'patrol', revid, token, formatversion: 2 });
            }).then(() => {
                btn.classList.remove('actAdv-patrol-loading'); btn.classList.add('actAdv-patrolled'); btn.title = '✓ Patrolled'; btn.setAttribute('aria-label', 'Patrolled');
                const entry = state.pool.find(e => e.extra && e.extra.revid === revid);
                if (entry) { entry.extra.unpatrolled = false; entry.extra.autopatrolled = true; }
            }).catch(() => { btn.disabled = false; btn.classList.remove('actAdv-patrol-loading'); btn.title = 'Patrol failed — click to retry'; });
        };

        const initialLoad = () => {
            state.loading = true; els.loading.style.display = ''; renderErrors();
            Promise.all([fetchSource('rc').catch(() => { failSource('rc'); return []; }), fetchSource('log').catch(() => { failSource('log'); return []; }), fetchPosts().catch(() => { failSource('post'); return []; }), fetchSource('af').catch(() => { failSource('af'); return []; })])
                .then(results => { results.forEach(l => mergeEntries(l)); state.loading = false; els.loading.style.display = 'none'; renderAll(); renderErrors(); resolveAvatarsAsync(state.pool); });
        };

        const loadMore = () => {
            if (state.loading) return;
            const fe = filteredEntries();
            if (state.rendered < fe.length) { appendChunk(100); return; }
            if (state.sources.rc.done && state.sources.log.done && state.sources.post.done && state.sources.af.done) { updateFooter(); return; }
            state.loading = true; els.loading.style.display = ''; els.moreBtn.disabled = true;
            Promise.all([fetchSource('rc').catch(() => { failSource('rc'); return []; }), fetchSource('log').catch(() => { failSource('log'); return []; }), fetchPosts().catch(() => { failSource('post'); return []; }), fetchSource('af').catch(() => { failSource('af'); return []; })])
                .then(results => {
                    const newEntries = []; results.forEach(l => { if (mergeEntries(l)) newEntries.push(...l); });
                    state.loading = false; els.loading.style.display = 'none'; els.moreBtn.disabled = false; renderAll(); renderErrors();
                    if (newEntries.length) resolveAvatarsAsync(newEntries);
                });
        };

        // --- Rail & Namespaces ---
        const fetchNamespaces = () => api.get({ action: 'query', meta: 'siteinfo', siprop: 'namespaces', uselang: mw.config.get('wgUserLanguage') || 'en', formatversion: 2 }).then(r => (r.query.namespaces || []).map(n => ({ id: n.id, name: n.name, canonical: n.canonical }))).catch(() => null);
        const buildNsList = () => {
            if (!els.nsList) return;
            const ignoreTalk = Store.settings.ignoreTalk !== false;
            const selected = Store.settings.namespaces || [];
            const list = (NS_LIST || []).filter(n => !ignoreTalk || n.id % 2 === 0);
            els.nsList.innerHTML = list.map(n => `<label class="actAdv-ns-item"><input type="checkbox" data-ns="${n.id}"${selected.indexOf(n.id) !== -1 ? ' checked' : ''}> ${esc(n.id === 0 ? T('nsMain') : (n.canonical || n.name || ('NS ' + n.id)))}</label>`).join('');
        };
        let NS_LIST = [];
        const initNamespaces = () => fetchNamespaces().then(f => { NS_LIST = (f && f.length ? f : FALLBACK_NAMESPACES).slice().sort((a, b) => a.id - b.id); buildNsList(); });

        const renderRail = () => {
            if (state.railDone) return;
            state.railDone = true;
            fetch(mw.util.wikiScript('wikia') + '?controller=FeedsAndPosts&method=getAll', { credentials: 'same-origin' }).then(r => r.ok ? r.json() : null).catch(() => null).then(data => {
                if (!data) return;
                const details = data.wikiDetails || {};
                const topUsers = details.topUsers || [];
                if (topUsers.length || details.editCount || details.pageCount) {
                    const avatars = topUsers.slice(0, 5).map(u => { if (u.avatarUrl) avatarCache.set(u.name, u.avatarUrl); return `<a href="${esc(mw.util.getUrl('User:' + u.name))}" title="${esc(u.name)}"><img loading="lazy" src="${esc(u.avatarUrl || 'https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/400/height/400')}" alt="${esc(u.name)}" onerror="this.onerror=null;this.src='https://static.wikia.nocookie.net/663e53f7-1e79-4906-95a7-2c1df4ebbada/thumbnail/width/400/height/400'"></a>`; }).join('');
                    const counts = (details.editCount || details.pageCount) ? `<div class="actAdv-stats-row">${details.editCount ? `<span>${formatNumber(details.editCount)} ${esc(T('edits'))}</span>` : ''}${details.editCount && details.pageCount ? ' <span class="actAdv-separator">•</span> ' : ''}${details.pageCount ? `<span>${formatNumber(details.pageCount)} ${esc(T('articles'))}</span>` : ''}</div>` : '';
                    if (avatars || counts) { els.railStatsAvatars.innerHTML = `<div class="actAdv-avatars-row">${avatars}</div>`; els.railStatsCounts.innerHTML = counts; els.railStats.style.display = ''; }
                    avatarCache.save();
                }
                const topArticles = data.topArticles || [];
                if (Array.isArray(topArticles) && topArticles.length) {
                    els.railTop.querySelector('.actAdv-toplist').innerHTML = topArticles.slice(0, 10).map(a => `<li>${a.image ? `<div class="actAdv-top-thumb"><img loading="lazy" src="${esc(a.image)}" alt="" onerror="this.parentNode&&this.parentNode.removeChild(this.parentNode)"></div>` : '<div class="actAdv-top-thumb actAdv-top-thumb--empty"></div>'}<a class="actAdv-top-title" href="${esc(a.url || mw.util.getUrl(a.title))}">${esc(a.title)}</a></li>`).join('');
                    els.railTop.style.display = '';
                }
            });
        };

        // --- Init ---
        const cleanup = () => { if (observer) { observer.disconnect(); observer = null; } document.removeEventListener('keydown', onEsc); cardIndexByUser.clear(); const root = document.getElementById('actAdv-root'); if (root) root.remove(); };
        const start = () => {
            if (mw.config.get('wgNamespaceNumber') !== -1 && mw.config.get('wgCanonicalNamespace') !== 'Special') return;
            const title = mw.config.get('wgTitle') || '';
            if (title !== 'ActivityAdvanced' && title !== 'AA') return;
            if (title === 'AA') try { history.replaceState(history.state, '', mw.util.getUrl('Special:ActivityAdvanced')); } catch (e) {}
            fetch(mw.util.wikiScript('wikia') + '?controller=FeedsAndPosts&method=getAll', { credentials: 'same-origin' }).then(r => r.ok ? r.json() : null).then(d => { if (d && d.wikiVariables && d.wikiVariables.name) document.title = 'Activity Advanced | ' + d.wikiVariables.name; }).catch(() => {});
            Store.load(); cleanup();
            loadAssets().then(() => { buildShell(); renderErrors(); initNamespaces(); initialLoad(); renderRail(); });
        };

        window.ActivityAdvanced = window.ActivityAdvanced || {};
        window.ActivityAdvanced.init = start;
        window.ActivityAdvanced.cleanup = cleanup;
        window.ActivityAdvanced._state = state;
        start();
    }

    waitForMw();
})();