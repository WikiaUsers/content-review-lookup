/**
 * InterwikiMap Dashboard - v2.5 User Layout Fix
 * @author Antonio R. Castro
 */

(function ($, mw) {
    'use strict';

    console.log("🚀 Loading Interwiki Dashboard v2.5...");

    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Blankpage') {
        console.warn("❌ Stop! Go to 'Special:BlankPage' to run this.");
        return;
    }

    document.title = 'Interwiki Suite v2.5 | ' + mw.config.get('wgSiteName');

    // ==========================================
    // 📖 DICTIONARY
    // ==========================================
    const CUSTOM_DICTIONARY = {
        'Ejemplo Español': 'Example English',
    };

    // --- CONFIGURATION ---
    const savedConfig = JSON.parse(localStorage.getItem('iw-config')) || {};

    const state = {
        limit: 25,
        nextPageParams: null, 
        localApi: new mw.Api(),
        localLang: mw.config.get('wgContentLanguage'),
        userGroups: mw.config.get('wgUserGroups'),
        
        namespace: savedConfig.namespace || 0, 
        showRedirects: savedConfig.showRedirects || false,
        showDisambigs: savedConfig.showDisambigs !== false,
        strictMode: savedConfig.strictMode || false,
        
        searchQuery: '',
        sortMode: 'title', 
        sortDir: 'ascending',

        targetWiki: {
            lang: savedConfig.targetLang || 'en',
            apiUrl: '',
            name: 'English' 
        }
    };

    function calculateTargetApi(langCode) {
        const server = mw.config.get('wgServer');
        if (langCode === 'en') return server + '/api.php';
        return server + '/' + langCode + '/api.php';
    }
    state.targetWiki.apiUrl = calculateTargetApi(state.targetWiki.lang);

    function saveConfig() {
        localStorage.setItem('iw-config', JSON.stringify({
            namespace: state.namespace,
            showRedirects: state.showRedirects,
            showDisambigs: state.showDisambigs,
            strictMode: state.strictMode,
            targetLang: state.targetWiki.lang
        }));
    }

    function canUserEdit(protection) {
        if (!protection || protection.length === 0) return true;
        const editProt = protection.find(p => p.type === 'edit');
        if (!editProt) return true;
        const level = editProt.level;
        if (level === 'sysop' && !state.userGroups.includes('sysop')) return false;
        if (level === 'autoconfirmed' && !state.userGroups.includes('autoconfirmed')) return false;
        return true;
    }

    // --- LOGGING ---
    function logActivity(msg, type = 'info') {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const color = type === 'success' ? '#155724' : (type === 'error' ? '#721c24' : '#333');
        const bg = type === 'success' ? '#d4edda' : (type === 'error' ? '#f8d7da' : '#fff');
        $('#iw-log-content').prepend($('<div>', { 
            style: `padding:5px; font-size:0.85em; color:${color}; background:${bg}; border-bottom:1px solid #eee;` 
        }).html(`<b>[${time}]</b> ${msg}`));
    }

    // --- I18N ---
    const MESSAGES = {
        en: { name: 'English', summary: 'Adding interwiki link to $1' },
        es: { name: 'Español', summary: 'Añadiendo enlace interwiki a $1' },
        fr: { name: 'Français', summary: 'Ajout du lien interwiki vers $1' },
        de: { name: 'Deutsch', summary: 'Interwiki-Link zu $1 hinzugefügt' },
        ru: { name: 'Русский', summary: 'Добавление интервики-ссылки на $1' },
        it: { name: 'Italiano', summary: 'Aggiunto collegamento interwiki a $1' },
        pt: { name: 'Português', summary: 'Adicionando link interwiki para $1' },
        pl: { name: 'Polski', summary: 'Dodanie linku interwiki do $1' },
        default: { summary: 'Adding interwiki link to $1' }
    };

    if (MESSAGES[state.targetWiki.lang]) {
        state.targetWiki.name = MESSAGES[state.targetWiki.lang].name;
    }

    function getSummary(langCode, linkedPage) {
        const msg = MESSAGES[langCode] || MESSAGES['default'];
        return msg.summary.replace('$1', state.localLang + ':' + linkedPage);
    }
    
    function getLocalSummary(targetLang, linkedPage) {
        const msg = MESSAGES[state.localLang] || MESSAGES['default'];
        return msg.summary.replace('$1', targetLang + ':' + linkedPage);
    }

    // --- UI INIT ---
    function init() {
        $('#mw-content-text').empty();
        $('.page-header__title').text('Interwiki Suite v2.5');
        injectStyles();

        // LAYOUT PRINCIPAL
        const $mainLayout = $('<div>', { class: 'iw-layout' }); 
        
        const $appColumn = $('<div>', { id: 'iw-app' });
        const $sidebarColumn = $('<div>', { class: 'iw-sidebar-column' }); 
        
        const $logPanel = $('<div>', { id: 'iw-log-panel' }); 

        $logPanel.append(
            $('<h3>', { style: 'margin-top:0; border-bottom: 2px solid #ccc; padding-bottom:5px; font-size: 1.1em;' }).text('Activity Log'),
            $('<div>', { id: 'iw-log-content' }).html('<div style="color:#999; font-style:italic; padding:5px;">Ready...</div>')
        );

        $sidebarColumn.append($logPanel);

        // --- TOOLBARS ---
        const $toolbar1 = $('<div>', { class: 'iw-controls' });
        const $searchInput = $('<input>', { type: 'text', id: 'iw-search-input', placeholder: 'Search...', style: 'flex-grow: 1; padding: 6px;' })
            .on('keypress', function(e) { if(e.which === 13) handleSearch(); });
        const $sortSelect = $('<select>', { id: 'iw-sort-select' }).append('<option value="title|ascending">Name (A-Z)</option><option value="title|descending">Name (Z-A)</option><option value="created|descending">Newest</option><option value="edited|descending">Edited</option>').change(handleSortChange);
        $toolbar1.append($searchInput, $('<button>', { class: 'wds-button wds-is-small' }).text('🔍').click(handleSearch), $('<span>').css('width','10px'), $('<label>').text('Sort:'), $sortSelect);

        const $toolbar2 = $('<div>', { class: 'iw-controls' });
        const $nsSelect = $('<select>', { id: 'iw-ns-select' }).append('<option value="0">Articles</option><option value="14">Cats</option><option value="10">Templ</option><option value="6">Files</option>').val(state.namespace).change(handleFilterChange);
        const $redirCheck = $('<input>', { type: 'checkbox', id: 'iw-redir-check' }).prop('checked', state.showRedirects).change(handleFilterChange);
        const $disCheck = $('<input>', { type: 'checkbox', id: 'iw-dis-check' }).prop('checked', state.showDisambigs).change(handleFilterChange);
        const $strictCheck = $('<input>', { type: 'checkbox', id: 'iw-strict-check' }).prop('checked', state.strictMode).change(handleFilterChange);
        const $langSelect = $('<select>', { id: 'iw-lang-select' });
        Object.keys(MESSAGES).forEach(l => { if (l !== 'default' && l !== state.localLang) $langSelect.append($('<option>', { value: l, text: MESSAGES[l].name, selected: l === state.targetWiki.lang })); });
        $langSelect.change(handleFilterChange);
        const $batchBtn = $('<button>', { class: 'wds-button wds-is-secondary', style: 'margin-left: auto;', text: '⚡ Scan Visible' }).click(runBatchScan);

        $toolbar2.append($('<label>').text('Ns:'), $nsSelect, $('<span class="iw-chk-grp">').append($redirCheck, 'Redir'), $('<span class="iw-chk-grp">').append($disCheck, 'Disamb'), $('<span class="iw-chk-grp" title="Strict Mode">').append($strictCheck, 'Strict'), $('<label>').text('Target:'), $langSelect, $batchBtn);

        const $listContainer = $('<div>', { id: 'iw-list-container' });
        const $loadMoreBtn = $('<button>', { id: 'iw-load-more', class: 'wds-button', text: 'Load Next Batch' }).click(loadPages).hide();

        $appColumn.append($toolbar1, $toolbar2, $listContainer, $loadMoreBtn);
        
        $mainLayout.append($appColumn, $sidebarColumn);
        $('#mw-content-text').append($mainLayout);

        loadPages();
    }

    function handleSearch() { state.searchQuery = $('#iw-search-input').val().trim(); resetAndLoad(); }
    function handleSortChange() { const val = $('#iw-sort-select').val().split('|'); state.sortMode = val[0]; state.sortDir = val[1]; resetAndLoad(); }
    function handleFilterChange() {
        state.namespace = $('#iw-ns-select').val(); state.showRedirects = $('#iw-redir-check').is(':checked');
        state.showDisambigs = $('#iw-dis-check').is(':checked'); state.strictMode = $('#iw-strict-check').is(':checked');
        const newLang = $('#iw-lang-select').val(); state.targetWiki.lang = newLang;
        state.targetWiki.apiUrl = calculateTargetApi(newLang); state.targetWiki.name = MESSAGES[newLang] ? MESSAGES[newLang].name : newLang;
        saveConfig(); resetAndLoad();
    }
    function resetAndLoad() { $('#iw-list-container').empty(); state.nextPageParams = null; loadPages(); }

    // --- Pages loading ---
    function loadPages() {
        const $btn = $('#iw-load-more');
        $btn.prop('disabled', true).text('Loading...');

        let params = {
            action: 'query',
            prop: 'langlinks|pageprops|info', 
            inprop: 'protection',
            ppprop: 'disambiguation',
            lllimit: 'max',
            format: 'json'
        };

        const isCatSearch = state.searchQuery.startsWith('Category:') || state.searchQuery.startsWith('Categoría:');
        
        if (state.searchQuery && !isCatSearch) {
            params.generator = 'search'; params.gsrsearch = state.searchQuery; params.gsrlimit = state.limit; params.gsrnamespace = state.namespace;
        } else if (isCatSearch) {
            params.generator = 'categorymembers'; params.gcmtitle = state.searchQuery; params.gcmLimit = state.limit; params.gcmnamespace = state.namespace;
            params.gcmsort = (state.sortMode === 'created') ? 'timestamp' : 'sortkey';
            params.gcmdir = (state.sortDir === 'descending' && state.sortMode !== 'title') ? 'older' : (state.sortDir === 'descending' ? 'descending' : 'ascending');
        } else if (state.sortMode === 'created' || state.sortMode === 'edited') {
            params.generator = 'recentchanges'; params.grcnamespace = state.namespace; params.grclimit = state.limit; params.grctype = (state.sortMode === 'created') ? 'new' : 'edit|new';
        } else {
            params.generator = 'allpages'; params.gaplimit = state.limit; params.gapnamespace = state.namespace;
            params.gapfilterredir = state.showRedirects ? 'all' : 'nonredirects'; params.gapdir = state.sortDir;
        }

        if (state.nextPageParams) { Object.assign(params, state.nextPageParams); }

        state.localApi.get(params).then(function (data) {
            if (data.continue) {
                state.nextPageParams = Object.assign({}, data.continue);
                delete state.nextPageParams.continue; 
                state.nextPageParams = data.continue;
                $btn.show().prop('disabled', false).text('Load Next Batch');
            } else {
                state.nextPageParams = null;
                $btn.hide();
            }

            if (data.query && data.query.pages) {
                const pages = Object.values(data.query.pages);
                renderList(pages);
                detectLanguageGaps(pages);
            } else {
                if ($('#iw-list-container').children().length === 0) $('#iw-list-container').append('<div class="iw-msg">No pages found.</div>');
                if (!state.nextPageParams) $btn.hide();
            }
        }).catch(function(err){
             $btn.text('Error. Retry?').prop('disabled', false);
             console.error("API Error:", err);
        });
    }

    // --- GAP DETECTION LOGIC ---
    function detectLanguageGaps(pages) {
        const linkedPages = pages.filter(p => p.langlinks && p.langlinks.some(l => l.lang === state.targetWiki.lang));
        if (linkedPages.length === 0) return;

        const titleMap = {};
        const remoteTitles = [];

        linkedPages.forEach(p => {
            const link = p.langlinks.find(l => l.lang === state.targetWiki.lang);
            if (link) {
                titleMap[p.pageid] = link['*'];
                remoteTitles.push(link['*']);
            }
        });

        if (remoteTitles.length === 0) return;

        const foreignApi = new mw.ForeignApi(state.targetWiki.apiUrl);
        const chunks = [];
        while (remoteTitles.length > 0) chunks.push(remoteTitles.splice(0, 40));

        chunks.forEach(chunk => {
            foreignApi.get({
                action: 'query', titles: chunk.join('|'), prop: 'langlinks', lllimit: 'max', redirects: 1
            }).then(data => {
                if (!data.query || !data.query.pages) return;
                
                Object.values(data.query.pages).forEach(remotePage => {
                    const localPage = linkedPages.find(p => titleMap[p.pageid] === remotePage.title || titleMap[p.pageid] === remotePage.title.replace(/_/g, ' '));
                    
                    if (localPage && remotePage.langlinks) {
                        const localLangs = localPage.langlinks ? localPage.langlinks.map(l => l.lang) : [];
                        const missingLinks = remotePage.langlinks.filter(link => 
                            !localLangs.includes(link.lang) && link.lang !== state.localLang
                        );
                        if (missingLinks.length > 0) renderGaps(localPage, missingLinks);
                    }
                });
            });
        });
    }

    function renderGaps(localPage, missingLinks) {
        const $card = $('#card-' + localPage.pageid);
        const $badges = $card.find('.iw-badges-container');
        
        if ($card.find('.iw-gap-btn').length > 0) return;

        missingLinks.forEach(link => {
            if ($badges.find(`.iw-badge-gap[data-lang="${link.lang}"]`).length === 0) {
                $badges.append($('<span>', { class: 'iw-badge iw-badge-gap', title: link['*'] }).text(link.lang.toUpperCase()));
            }
        });

        const $btn = $('<button>', { 
            class: 'wds-button wds-is-text wds-is-small iw-gap-btn', 
            style: 'margin-left: 10px; color: #d33; font-weight:bold;',
            text: `[+ ADD ${missingLinks.length}]`
        }).click(function() {
            executeAddMissing(localPage, missingLinks, $(this));
        });

        $badges.append($btn);
    }

    function executeAddMissing(localPage, linksToAdd, $btn) {
        $btn.text('Saving...').prop('disabled', true);
        
        const newLinksWikitext = linksToAdd.map(l => `\n[[${l.lang}:${l['*']}]]`).join('');
        const langsAdded = linksToAdd.map(l => l.lang.toUpperCase()).join(', ');

        state.localApi.postWithEditToken({
            action: 'edit',
            title: localPage.title,
            appendtext: newLinksWikitext,
            summary: `Adding missing interwiki links: ${langsAdded}`,
            minor: true
        }).then(() => {
            $btn.remove();
            const $badges = $('#card-' + localPage.pageid).find('.iw-badges-container');
            $badges.find('.iw-badge-gap').removeClass('iw-badge-gap').addClass('iw-badge-new');
            logActivity(`Imported ${linksToAdd.length} links for <b>${localPage.title}</b>`, 'success');
        }).fail(() => {
            $btn.text('Error').prop('disabled', false);
            alert('Failed to save links.');
        });
    }

    function renderList(pages) {
        const $container = $('#iw-list-container');
        const pageArray = pages.sort((a, b) => {
            if (state.sortDir === 'ascending') return a.title.localeCompare(b.title);
            return b.title.localeCompare(a.title);
        });

        pageArray.forEach(function (page) {
            const isDisambig = page.pageprops && page.pageprops.hasOwnProperty('disambiguation');
            if (isDisambig && !state.showDisambigs) return;

            const cardId = 'card-' + page.pageid;
            const $existingCard = $('#' + cardId);
            if ($existingCard.length > 0) { updateCard($existingCard, page); return; }

            const $card = createCard(page, cardId);
            $container.append($card);
        });
    }

    function createCard(page, cardId) {
        const $card = $('<div>', { class: 'iw-card', id: cardId });
        $card.data('pageData', page);

        const $header = $('<div>', { class: 'iw-card-header' });
        $header.append($('<h3>').append(
            $('<a>', { href: mw.util.getUrl(page.title), text: page.title, target: '_blank' }),
            $('<span>', { class: 'iw-badges-container' })
        ));

        const $status = $('<div>', { class: 'iw-status' });
        const $recBox = $('<div>', { class: 'iw-rec-box' });

        $card.append($header, $status, $recBox);
        updateCard($card, page);
        return $card;
    }

    function updateCard($card, newPageData) {
        const oldData = $card.data('pageData') || {};
        const mergedData = { ...oldData, ...newPageData };
        if (newPageData.langlinks) {
            const existingLinks = oldData.langlinks || [];
            newPageData.langlinks.forEach(nl => { if (!existingLinks.some(el => el.lang === nl.lang)) existingLinks.push(nl); });
            mergedData.langlinks = existingLinks;
        }
        $card.data('pageData', mergedData);
        
        const page = mergedData;
        const isProtected = !canUserEdit(page.protection);
        const isDisambig = page.pageprops && page.pageprops.hasOwnProperty('disambiguation');
        const alreadyLinked = page.langlinks && page.langlinks.some(l => l.lang === state.targetWiki.lang);

        let badgesHtml = '';
        if (isProtected) badgesHtml += '<span class="iw-badge iw-badge-lock">🔒 LOCKED</span>';
        if (isDisambig) badgesHtml += '<span class="iw-badge iw-badge-dis">[DIS]</span>';
        
        const $badgesContainer = $card.find('.iw-badges-container');
        let standardBadges = '';
        if (page.langlinks) {
            page.langlinks.sort((a,b) => a.lang.localeCompare(b.lang));
            standardBadges = page.langlinks.map(l => `<span class="iw-badge">${l.lang.toUpperCase()}</span>`).join('');
        }
        
        const $extras = $badgesContainer.find('.iw-badge-gap, .iw-gap-btn, .iw-badge-new');
        $badgesContainer.html(badgesHtml + standardBadges).append($extras);

        const $status = $card.find('.iw-status');
        const $recBox = $card.find('.iw-rec-box');

        if (alreadyLinked) {
            $status.html('<span class="iw-ok">✔ Linked to ' + state.targetWiki.lang.toUpperCase() + '</span>');
            if (!$card.hasClass('iw-done')) {
                $card.addClass('iw-done');
                $recBox.empty().append($('<button>', { class: 'wds-button wds-is-text wds-is-small', text: 'Check Backlink' }).click(function() { 
                    findMatches(page, $recBox); 
                }));
            }
        } else {
            if ($recBox.is(':empty') || ($recBox.find('.iw-spinner').length === 0 && $recBox.find('.iw-candidate-row').length === 0)) {
                $status.html('<span class="iw-missing">⚠ Missing ' + state.targetWiki.lang.toUpperCase() + ' link</span>');
                $recBox.empty();
                const $scanBtn = $('<button>', { 
                    class: 'wds-button wds-is-secondary wds-is-small iw-scan-trigger', text: 'Scan ' + state.targetWiki.name 
                }).click(function() { findMatches(page, $recBox); });
                
                if (isProtected) $scanBtn.prop('disabled', true).text('🔒 Protected');
                $recBox.append($scanBtn);
            }
        }
    }

    // --- MATCH LOGIC ---
    function findMatches(page, $container, manualSearchTerm) {
        let searchTitle = manualSearchTerm || page.title;
        let isManual = !!manualSearchTerm;
        let usedDictionary = false;

        if (!isManual && CUSTOM_DICTIONARY[page.title]) {
            searchTitle = CUSTOM_DICTIONARY[page.title];
            usedDictionary = true;
        }

        $container.html('<div class="iw-spinner">Analyzing...</div>');
        
        state.localApi.get({ action: 'query', titles: page.title, prop: 'images', imlimit: 'max' }).then(function(localData) {
            const localPageId = Object.keys(localData.query.pages)[0];
            const localImgs = localData.query.pages[localPageId].images ? localData.query.pages[localPageId].images.map(i => i.title.replace(/^File:/, '')) : [];
            
            const foreignApi = new mw.ForeignApi(state.targetWiki.apiUrl);
            
            if (isManual) {
                performFuzzySearch(page, $container, searchTitle, 5, 'Manual Results', localImgs);
                return;
            }

            foreignApi.get({
                action: 'query', titles: searchTitle, redirects: 1,
                prop: 'langlinks|pageprops|info|images', inprop: 'protection', ppprop: 'disambiguation', imlimit: 10, lllimit: 'max', format: 'json'
            }).then(function(data) {
                const rId = Object.keys(data.query.pages)[0];
                if (rId !== "-1") {
                    const rPage = data.query.pages[rId];
                    $container.empty();
                    if (usedDictionary) $container.append('<div class="iw-sub-head" style="color:green">✔ Found via Dictionary</div>');
                    renderCandidateRow(page, rPage, 'exact', $container, localImgs);
                } else {
                    if (state.strictMode) { showManualInput(page, $container, 'Strict Mode: No match.'); return; }
                    performFuzzySearch(page, $container, searchTitle, 5, 'Suggestions', localImgs);
                }
            });
        });
    }

    function performFuzzySearch(page, $container, term, limit, label, localImgs) {
        const foreignApi = new mw.ForeignApi(state.targetWiki.apiUrl);
        foreignApi.get({ action: 'query', list: 'search', srsearch: term, srlimit: limit, format: 'json' }).then(function(sData) {
            if (sData.query.search.length > 0) {
                const titles = sData.query.search.map(r => r.title).join('|');
                foreignApi.get({ 
                    action: 'query', titles: titles, 
                    prop: 'langlinks|pageprops|info|images', inprop: 'protection', ppprop: 'disambiguation', imlimit:10, lllimit: 'max' 
                }).then(function(dData) {
                    $container.empty();
                    $container.append(`<div class="iw-sub-head">${label}:</div>`);
                    sData.query.search.forEach(res => {
                        const detailId = Object.keys(dData.query.pages).find(id => dData.query.pages[id].title === res.title);
                        if (detailId) renderCandidateRow(page, dData.query.pages[detailId], 'fuzzy', $container, localImgs);
                    });
                    showManualInput(page, $container, '', true);
                });
            } else { showManualInput(page, $container, 'No matches found.'); }
        });
    }

    function renderCandidateRow(localPage, remotePage, method, $container, localImgs) {
        const isRemoteProtected = !canUserEdit(remotePage.protection);
        const remoteLinks = remotePage.langlinks || [];
        const linkToUs = remoteLinks.find(l => l.lang === state.localLang);
        
        const remoteImgs = remotePage.images ? remotePage.images.map(i => i.title.replace(/^File:/, '')) : [];
        const sharedImgs = localImgs.filter(img => remoteImgs.includes(img));

        let linkStatus = 'missing'; let conflictTitle = null;
        if (linkToUs) {
            if (linkToUs['*'].replace(/_/g, ' ') === localPage.title.replace(/_/g, ' ')) linkStatus = 'correct';
            else { linkStatus = 'conflict'; conflictTitle = linkToUs['*']; }
        }

        const isDisambig = remotePage.pageprops && remotePage.pageprops.hasOwnProperty('disambiguation');
        const otherLangs = remoteLinks.map(l => l.lang).filter(l => l !== state.localLang).join(', ').toUpperCase();

        const $row = $('<div>', { class: 'iw-candidate-row' });
        let titleHtml = '<b><a href="' + state.targetWiki.apiUrl.replace('api.php','') + 'wiki/' + remotePage.title + '" target="_blank">' + remotePage.title + '</a></b>';
        if (isDisambig) titleHtml += ' <span class="iw-badge iw-badge-dis">DIS</span>';
        if (isRemoteProtected) titleHtml += ' <span class="iw-badge iw-badge-lock">🔒</span>';
        if (sharedImgs.length > 0) titleHtml += ` <span class="iw-badge iw-badge-img">📷 ${sharedImgs.length} Shared</span>`;
        
        const $info = $('<div>').html(titleHtml);
        const $network = $('<div>', { style: 'font-size:0.8em; color:#666;' }).text(otherLangs ? 'Links: ' + otherLangs : 'No other links');

        let statusHtml = ''; let btnText = 'Link'; let allowRemote = !isRemoteProtected;
        if (linkStatus === 'correct') { statusHtml = '<span style="color:green; font-size:0.8em">✔ Remote OK</span>'; btnText = 'Link Local'; allowRemote = false; }
        else if (linkStatus === 'conflict') { statusHtml = '<span style="color:red; font-size:0.8em">⛔ Links to: ' + conflictTitle + '</span>'; btnText = 'Link Local (Ignore)'; allowRemote = false; }
        else { statusHtml = '<span style="color:orange; font-size:0.8em">⚠ Needs link</span>'; btnText = 'Link Both'; if(isRemoteProtected){ statusHtml+=' (Locked)'; btnText='Link Local Only';} }

        const $btn = $('<button>', { class: 'wds-button wds-is-small', style: 'margin-left: auto' }).text(btnText).click(function() { executeSmartConnection(localPage, remotePage, $(this), allowRemote); });
        if (method === 'fuzzy' || linkStatus === 'conflict' || isRemoteProtected) $btn.addClass('wds-is-secondary');

        $row.append($('<div>').append($info, $network, $('<div>').html(statusHtml)), $btn);
        $container.append($row);
    }
    
    function showManualInput(page, $container, errorMsg, isAppend) {
        if (!isAppend) $container.empty();
        const $wrap = $('<div>', { style: 'margin-top:10px; border-top:1px dashed #ccc; padding-top:5px;' });
        if(errorMsg) $wrap.append($('<div>', {style:'color:red; font-size:0.9em'}).text(errorMsg));
        $wrap.append($('<input>', {type:'text', placeholder:'Manual search...', style:'padding:4px;width:60%'}), $('<button>', {class:'wds-button wds-is-text wds-is-small', text:'Search'}).click(function(){ const v = $(this).prev().val(); if(v) findMatches(page, $container, v); }));
        $container.append($wrap);
    }
    
    function runBatchScan() {
        const $btns = $('.iw-card:not(.iw-done) button.iw-scan-trigger:not(:disabled)');
        if ($btns.length === 0) return alert('No scannable pages.');
        let delay = 0;
        $btns.each(function(i, b) { setTimeout(() => { $(b)[0].scrollIntoView({behavior: "smooth", block: "center"}); $(b).click(); }, delay); delay += 800; });
    }

    function executeSmartConnection(localPage, match, $btn, allowRemoteEdit) {
        $btn.text('...').prop('disabled', true);
        const foreignApi = new mw.ForeignApi(state.targetWiki.apiUrl);
        const promises = [];
        if (allowRemoteEdit) {
            promises.push(foreignApi.postWithEditToken({
                action: 'edit', title: match.title, appendtext: '\n[[' + state.localLang + ':' + localPage.title + ']]', summary: getSummary(match.lang, localPage.title), tags: 'manual-interwiki', minor: true
            }));
        }
        promises.push(state.localApi.postWithEditToken({
            action: 'edit', title: localPage.title, appendtext: '\n[[' + match.lang + ':' + match.title + ']]', summary: getLocalSummary(match.lang, match.title), minor: true
        }));

        $.when.apply($, promises).then(() => {
            $btn.replaceWith('<span class="iw-ok">✔ Done</span>');
            $btn.closest('.iw-card').css('opacity', '0.6');
            logActivity(`Synced <b>${localPage.title}</b> ↔ <b>${match.title}</b>`, 'success');
        })
        .fail(() => { 
            $btn.text('Retry').prop('disabled', false); 
            logActivity(`Error syncing <b>${localPage.title}</b>`, 'error');
            alert('Error syncing.'); 
        });
    }

    function injectStyles() {
        mw.util.addCSS(`
            .iw-sidebar-column {
                flex: 0 0 280px;
                min-width: 280px;
                position: absolute;
                height:100%;
                right: 40px; 
            }
            #iw-app {
                flex: 3;
                min-width: 0;
                margin-right: 300px;
            }
            .iw-layout {
                display: flex;
                gap: 20px;
                align-items: stretch;
                position: static;
            }
            #iw-log-panel {
                background: #f8f8f8;
                border: 1px solid #ddd;
                padding: 10px;
                position: sticky;
                top: 60px; 
                max-height: 90vh;
                overflow-y: auto;
                border-radius: 4px;
            }
            
            /* APP STYLES */
            .iw-controls { background: #f0f0f0; padding: 10px; border: 1px solid #ddd; display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; border-radius: 4px;}
            .iw-chk-grp { font-size: 0.9em; display: flex; align-items: center; gap: 5px; margin-right: 10px;}
            .iw-card { 
                background: #fff; border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; 
                display: grid; grid-template-columns: 1fr auto; gap: 10px; align-items: center; 
                transition: opacity 0.5s; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            }
            .iw-rec-box { 
                grid-column: 1 / -1; 
                background: #f9f9f9; padding: 10px; font-size: 0.9em; 
                border-top: 1px solid #eee; margin-top: 5px;
            }
            .iw-candidate-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 5px 0; }
            .iw-badge { background: #eee; color: #555; padding: 1px 4px; border-radius: 3px; font-size: 0.7em; margin-left: 3px; border: 1px solid #ccc; display:inline-block; margin-bottom:2px;}
            .iw-badge-gap { background: #d33; color: #fff; border-color: #b00; cursor: help; font-weight: bold; }
            .iw-badge-new { background: #e6ffe6; color: #006400; border-color: #ccffcc; }
            .iw-badge-lock { background: #333; color: #fff; border-color: #000; }
            .iw-badge-dis { background: #fff3cd; color: #856404; border-color: #ffeeba; }
            .iw-badge-img { background: #d1e7dd; color: #0f5132; border-color: #badbcc; }
            .iw-sub-head { color: #e67e22; font-weight: bold; margin-bottom: 5px; font-size: 0.9em; }
            .iw-ok { color: green; font-weight: bold; }
            .iw-missing { color: #d33; font-weight: bold; }
            #iw-load-more { width: 100%; padding: 15px; margin-top: 20px;}
        `);
    }

    mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.ForeignApi'], function () { $(init); });
}(jQuery, mediaWiki));