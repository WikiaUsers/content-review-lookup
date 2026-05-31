(() => {
    'use strict';

    if (window.EnhancedEditorLoaded) return;
    window.EnhancedEditorLoaded = true;

    const config = mw.config.get([
        'wgArticlePath', 'wgNamespaceNumber', 'wgPageName', 
        'wgServer', 'wgUserLanguage', 'wgUserGroups',
        'articleHasCommentingEnabled', 'profileIsMessageWallPage',
    ]);

    const CENTRAL_WIKI = 'https://wikicorporate.fandom.com/ru';

    if (!config.articleHasCommentingEnabled && !config.profileIsMessageWallPage) return;

    let localApi;

    const EnhancedEditor = {
        templateDB: {}, 

        init() {
            localApi = new mw.Api({
                parameters: { uselang: config.wgUserLanguage, errorformat: 'plaintext', formatversion: '2' },
            });

            this.loadTemplates().then(() => {
                this.linkSuggest();
            });
        },

        loadTemplates() {
            const foreignApi = new mw.ForeignApi(`${CENTRAL_WIKI}/api.php`);

            const fetchModule = (api, moduleName) => {
                return api.get({
                    action: 'expandtemplates',
                    text: '{' + '{#invoke:' + moduleName + '|toJSON}}',
                    prop: 'wikitext'
                }).then(data => {
                    try { 
                        const parsed = JSON.parse(data.expandtemplates.wikitext);
                        for (let key in parsed) {
                            parsed[key].moduleName = moduleName;
                        }
                        return parsed;
                    } catch (e) { 
                        return {}; 
                    }
                }).catch(() => ({}));
            };

            return Promise.all([
                fetchModule(foreignApi, 'Модерация'),
                fetchModule(localApi, 'Дополнительно')
            ]).then(([central, local]) => {
                const merged = Object.assign({}, central, local);
                const userGroups = config.wgUserGroups || [];
                const modGroups = ['bureaucrat', 'sysop', 'threadmoderator', 'content-moderator', 'rollback'];
                const isMod = userGroups.some(g => modGroups.includes(g));

                for (const key in merged) {
                    if (merged[key].modOnly && !isMod) delete merged[key];
                }
                this.templateDB = merged;
            });
        },

        linkSuggest() {
            const URL_REGEX = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
            const WIKILINK_REGEX = /\[\[([^\[\]]*)\]?\]?$/;
            const EXT_LINK_REGEX = /\[([^\[\]]+)\]$/;
            const TEMPLATE_REGEX = /\{\{([^\{\}]*)$/; 

            let search = {};
            let lastRequest = {};
            let resultCount = 0;

            const wrapper = document.createElement('div');
            wrapper.className = 'suggest-box';
            wrapper.id = 'suggest-box-wrapper';

            const suggestBox = document.createElement('ul');
            suggestBox.className = 'suggest-box__list';
            suggestBox.setAttribute('role', 'listbox');

            wrapper.appendChild(suggestBox);
            document.body.appendChild(wrapper);

            const methods = {
                initListeners() {
                    const checkMessageDebounced = mw.util.debounce(methods.checkMessage, 250);
                    const observer = new MutationObserver(checkMessageDebounced);

                    const onSelectOption = () => {
                        if (search.type === 'link') methods.dispatchLink();
                        else if (search.type === 'image') methods.insertImage();
                        else if (search.type === 'template') methods.dispatchTemplate();
                    };

                    document.body.addEventListener('focus', (event) => {
                        if (event.target.classList && event.target.classList.contains('ProseMirror')) {
                            observer.disconnect();
                            observer.observe(event.target, { subtree: true, characterData: true, childList: true });
                        }
                    }, true);

                    document.body.addEventListener('keyup', (event) => {
                        if (event.target.classList && event.target.classList.contains('ProseMirror')) {
                            checkMessageDebounced();
                        }
                    });

                    document.body.addEventListener('click', (event) => {
                        if (event.target.closest('.rich-text-editor__content')) {
                            checkMessageDebounced();
                        }
                    });

                    document.body.addEventListener('mousedown', (event) => {
                        const suggestion = event.target.closest('.suggest-box__item');
                        if (suggestion) {
                            event.preventDefault(); 
                            methods.handleUI(event, suggestion);
                            onSelectOption();
                        } else if (event.target.closest('.suggest-box')) {
                            event.preventDefault();
                        } else if (event.target.closest('.ProseMirror')) {
                            checkMessageDebounced();
                        } else {
                            methods.closeSuggestions();
                        }
                    });

                    document.addEventListener('keydown', (event) => {
                        if (wrapper.style.display === 'none' && !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;

                        switch (event.key) {
                            case 'Enter':
                                if (suggestBox.getAttribute('aria-activedescendant')) {
                                    event.preventDefault();
                                    onSelectOption();
                                } else {
                                    methods.closeSuggestions();
                                }
                                break;
                            case 'Escape': methods.closeSuggestions(); break;
                            case 'ArrowUp': case 'ArrowDown': case 'Home': case 'PageUp': case 'End': case 'PageDown':
                                if (wrapper.style.display !== 'none') {
                                    event.preventDefault();
                                    methods.handleUI(event);
                                }
                                break;
                            case 'ArrowLeft': case 'ArrowRight': checkMessageDebounced(); break;
                        }
                    });

                    suggestBox.addEventListener('mousemove', (event) => {
                        const suggestion = event.target.closest('.suggest-box__item');
                        if (suggestion) methods.handleUI(event, suggestion);
                    });

                    suggestBox.addEventListener('mouseleave', methods.handleUI);
                },

                matchReplace(str, patterns, rep) {
                    const match = patterns.find(p => p.test(str));
                    return match ? str.replace(match, rep) : str;
                },

                checkMessage() {
                    methods.closeSuggestions();
                    const caret = EnhancedEditor.getCaret();

                    if (caret && caret.node.parentNode.closest('.ProseMirror') && !caret.node.parentNode.closest('pre')) {
                        const rawStr = caret.node.data.slice(0, caret.offset);
                        let match;

                        if ((match = TEMPLATE_REGEX.exec(rawStr))) {
                            wrapper.style.left = `${caret.x}px`;
                            wrapper.style.top = `${caret.y + 20}px`;
                            search = { node: caret.node, offsets: [match.index, match[0].length], type: 'template' };
                            
                            const query = match[1].toLowerCase();
                            const results = Object.values(EnhancedEditor.templateDB).filter(t => 
                                t.title.toLowerCase().includes(query) || t.name.toLowerCase().includes(query)
                            ).slice(0, 6);
                            
                            if (results.length) methods.buildSuggestions(results);
                            else methods.appendMessage('Шаблоны не найдены');
                            return;

                        } else if ((match = WIKILINK_REGEX.exec(rawStr))) {
                            wrapper.style.left = `${caret.x}px`;
                            wrapper.style.top = `${caret.y + 20}px`;

                            match[1] = match[1].replace(/^\||\|.*/, '');
                            let isImage = match[1].startsWith(':');
                            if (isImage) match[1] = match[1].replace(':', '');

                            search = { node: caret.node, offsets: [match.index, match[0].length], source: 'wiki', type: isImage ? 'image' : 'link', rawText: match[0] };
                            return methods.getPages(match[1], true);

                        } else if ((match = EXT_LINK_REGEX.exec(rawStr))) {
                            search = { node: caret.node, offsets: [match.index, match[0].length], source: 'external', type: 'link', rawText: match[0] };
                            const url = prompt('Введите URL:');
                            if (URL_REGEX.test(url)) methods.dispatchLink(url, match[1]);
                            else if (url) alert('Неверный URL!');
                        }
                    }
                },

                getPages(prefix, interwikiMode, apiEndpoint, articlePath, offset = 0, retries = 0) {
                    prefix = prefix.replace(/^:+/, '');
                    if (!prefix) return Promise.resolve();

                    const api = apiEndpoint ? new mw.ForeignApi(apiEndpoint, {
                        parameters: { uselang: config.wgUserLanguage, errorformat: 'plaintext', formatversion: '2' }, anonymous: true
                    }) : localApi;

                    const onRejected = () => {};

                    const match = prefix.match(/^(.+?):/);
                    if (match && interwikiMode) {
                        let newPrefix = prefix.replace(/^.+?:/, '');
                        lastRequest = api.get({ meta: 'siteinfo', siprop: 'interwikimap', maxage: '3600' });
                        
                        lastRequest.then(data => {
                            if (!data.query || !data.query.interwikimap) return methods.appendMessage('Ошибка интервики.');
                            
                            const interwiki = data.query.interwikimap.find(iw => iw.prefix.toLowerCase() === match[1].toLowerCase());
                            if (!interwiki) return methods.getPages(prefix, false, apiEndpoint, articlePath);

                            try {
                                const wikiUrl = new URL(interwiki.url);
                                wikiUrl.protocol = 'https:';
                                if (wikiUrl.host.endsWith('.wikia.com')) wikiUrl.host = wikiUrl.host.replace(/wikia\.com$/, 'fandom.com');
                                else if (['mediawiki.org', 'semantic-mediawiki.org'].includes(wikiUrl.host)) wikiUrl.host = `www.${wikiUrl.host}`;

                                let apiUrl = new URL(wikiUrl.origin + methods.matchReplace(wikiUrl.pathname, [/\/wiki\/.*/, /.*/], '/api.php'));
                                methods.getPages(newPrefix, true, apiUrl.href, wikiUrl.href).catch(onRejected);
                            } catch (_) {
                                methods.appendMessage(`Неверный URL интервики: "${interwiki.url}".`);
                            }
                        }).catch(onRejected);

                        return lastRequest;
                    } else if (search.type === 'link') {
                        lastRequest = api.get({ list: 'prefixsearch', pssearch: prefix, pslimit: '6', maxage: '60' });
                        lastRequest.then(data => {
                            if (data.query && data.query.prefixsearch.length) methods.buildSuggestions(data.query.prefixsearch, articlePath);
                            else methods.appendMessage('Ничего не найдено.');
                        }).catch(onRejected);
                        return lastRequest;
                    } else if (search.type === 'image') {
                        lastRequest = api.get({ generator: 'prefixsearch', gpssearch: prefix, gpsnamespace: '6', gpslimit: '6', gpsoffset: offset || undefined, prop: 'imageinfo', iiprop: 'url|mime', maxage: '60' });
                        lastRequest.then(data => {
                            if (data.query && data.query.pages) methods.buildSuggestions(Object.values(data.query.pages), articlePath);
                            else methods.appendMessage('Ничего не найдено.');
                        }).catch(onRejected);
                        return lastRequest;
                    }
                },

                appendMessage(msg) {
                    const li = document.createElement('li');
                    li.className = 'suggest-box__message';
                    li.textContent = msg;
                    suggestBox.appendChild(li);
                    wrapper.style.display = 'block';
                },

                buildSuggestions(items, path) {
                    suggestBox.innerHTML = '';
                    resultCount = 0;

                    for (const item of items) {
                        if (resultCount >= 6) break;
                        resultCount++;
                        const li = document.createElement('li');
                        li.className = 'suggest-box__item';
                        li.id = `suggest-item-${resultCount}`;
                        li.setAttribute('role', 'option');
                        li.setAttribute('aria-selected', 'false');

                        if (search.type === 'template') {
                            li.dataset.template = JSON.stringify(item);
                            li.innerHTML = `<strong>${item.title}</strong><span class="suggest-box__desc">${item.desc || ''}</span>`;
                        } else {
                            const isImage = search.type === 'image';
                            li.dataset.url = isImage ? item.imageinfo[0].url : (path ? path.replace('$1', mw.util.wikiUrlencode(item.title)) : config.wgServer + mw.util.getUrl(item.title));
                            li.textContent = item.title;
                        }
                        suggestBox.appendChild(li);
                    }
                    if (resultCount) wrapper.style.display = 'block';
                },

                handleUI(event, targetNode) {
                    const activeId = suggestBox.getAttribute('aria-activedescendant');
                    const currentNode = activeId ? document.getElementById(activeId) : null;
                    const items = Array.from(suggestBox.querySelectorAll('.suggest-box__item'));
                    let newNode = targetNode;

                    if (event.type === 'mouseleave') {
                        if (currentNode) currentNode.setAttribute('aria-selected', 'false');
                        suggestBox.removeAttribute('aria-activedescendant');
                        return;
                    }

                    if (event.type === 'keydown' && items.length) {
                        const index = currentNode ? items.indexOf(currentNode) : -1;
                        switch (event.key) {
                            case 'ArrowUp': newNode = index > 0 ? items[index - 1] : items[items.length - 1]; break;
                            case 'ArrowDown': newNode = index < items.length - 1 ? items[index + 1] : items[0]; break;
                            case 'Home': case 'PageUp': newNode = items[0]; break;
                            case 'End': case 'PageDown': newNode = items[items.length - 1]; break;
                        }
                    }

                    if (newNode) {
                        if (currentNode) currentNode.setAttribute('aria-selected', 'false');
                        newNode.setAttribute('aria-selected', 'true');
                        suggestBox.setAttribute('aria-activedescendant', newNode.id);
                        newNode.scrollIntoView({ block: 'nearest' });
                    }
                },

                dispatchTemplate() {
                    const activeId = suggestBox.getAttribute('aria-activedescendant');
                    if (!activeId) return;
                    
                    const tpl = JSON.parse(document.getElementById(activeId).dataset.template);
                    
                    const targetNode = search.node;
                    const offsetStart = search.offsets[0];
                    const offsetLength = search.offsets[1];
                    
                    let searchNode = targetNode.splitText(offsetStart);
                    searchNode.splitText(offsetLength);
                    
                    const markerId = 'ee-load-' + Math.random().toString(36).substr(2, 9);
                    const safeMarker = document.createElement('a');
                    safeMarker.href = '#' + markerId;
                    safeMarker.textContent = searchNode.textContent;
                    searchNode.replaceWith(safeMarker);
                    
                    methods.closeSuggestions();

                    const wikitext = '{' + '{#invoke:' + tpl.moduleName + '|main|' + tpl.name + '}}';

                    localApi.get({
                        action: 'parse',
                        text: wikitext,
                        title: config.wgPageName,
                        contentmodel: 'wikitext',
                        disablelimitreport: true,
                        formatversion: '2'
                    }).then(res => {
                        const htmlContent = res.parse && res.parse.text ? res.parse.text : '';
                        
                        const activeMarker = document.querySelector(`a[href="#${markerId}"]`);

                        if (!htmlContent) {
                            if (activeMarker) activeMarker.replaceWith(document.createTextNode(activeMarker.textContent));
                            return;
                        }

                        if (tpl.title && activeMarker) {
                            const wrapper = activeMarker.closest('.rich-text-editor__wrapper');
                            if (wrapper) {
                                const titleInput = wrapper.querySelector('.rich-text-editor__title, textarea[name="title"]');
                                if (titleInput) {
                                    const nativeSetter = Object.getOwnPropertyDescriptor(
                                        window[titleInput.tagName === 'TEXTAREA' ? 'HTMLTextAreaElement' : 'HTMLInputElement'].prototype, 
                                        "value"
                                    ).set;
                                    nativeSetter.call(titleInput, tpl.title);
                                    titleInput.dispatchEvent(new Event('input', { bubbles: true }));
                                }
                            }
                        }

                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = htmlContent;
                        const parserOutput = tempDiv.querySelector('.mw-parser-output') || tempDiv;
                        
                        parserOutput.querySelectorAll(`a[href^="${config.wgArticlePath.replace('$1', '')}"]`).forEach(a => {
                            a.href = config.wgServer + a.getAttribute('href');
                        });

                        let processedHtml = parserOutput.innerHTML
                            .replace(/<br ?\/?><br ?\/?>/g, '</p><p><br /></p><p>')
                            .replace(/<br ?\/?>(?!\s*<\/p>)/g, '</p><p>');

                        processedHtml = processedHtml.replace(/^<p>/, '').replace(/<\/p>$/, '');

                        if (activeMarker) {
                            const editor = activeMarker.closest('.ProseMirror');
                            if (editor) editor.focus(); 

                            const sel = window.getSelection();
                            const range = document.createRange();
                            range.selectNode(activeMarker); 
                            sel.removeAllRanges();
                            sel.addRange(range);

                            document.execCommand('insertHTML', false, processedHtml);
                        }
                    });
                },

                dispatchLink(url, label) {
                    let parentNode = search.node.parentNode;
                    let searchNode = search.node.splitText(search.offsets[0]);
                    searchNode.splitText(search.offsets[1]);

                    if (search.source === 'wiki') {
                        const activeId = suggestBox.getAttribute('aria-activedescendant');
                        const optionNode = document.getElementById(activeId);
                        if (!optionNode) return;
                        
                        url = url || optionNode.dataset.url;
                        if (!label) {
                            const match = search.rawText.match(/\[\[[^\[\]]*?\|([^\[\]]*)\]?\]?$/);
                            if (!match) {
                                label = optionNode.textContent;
                            } else if (!match[1]) {
                                const p1 = /^(?::?.+:|:|)(.+?)(?: ?[\(\uff08].+[\)\uff09])$/;
                                const p2 = /^(?::?.+:|:|)(.+?)(?: ?\(.+\)|)(?:(?:, |\uff0c|\u060c ).+|)$/;
                                label = methods.matchReplace(optionNode.textContent, [p1, p2], '$1');
                            } else {
                                label = match[1];
                            }
                        }
                    }

                    const linkNode = document.createElement('a');
                    linkNode.href = url;
                    linkNode.textContent = label;
                    searchNode.replaceWith(linkNode);
                    parentNode.normalize();

                    while (parentNode.matches('a, em, strong, span')) {
                        if (!parentNode.matches('span')) {
                            Array.from(parentNode.childNodes).forEach(node => {
                                if (node === linkNode) {
                                    if (parentNode.matches('em, strong')) node = node.firstChild;
                                    else if (parentNode.matches('a')) return;
                                }
                                parentNode.parentNode.insertBefore(parentNode.cloneNode(), node).appendChild(node);
                            });
                        }
                        parentNode.before(...parentNode.childNodes);
                        const oldParent = parentNode;
                        parentNode = parentNode.parentNode;
                        oldParent.remove();
                    }

                    const editor = linkNode.closest('.ProseMirror');
                    if (editor) editor.focus();

                    getSelection().setPosition(linkNode, linkNode.childNodes.length);
                    parentNode.appendChild(document.createTextNode('\ufeff')); 
                    methods.closeSuggestions();

                    setTimeout(() => {
                        if (parentNode && parentNode.lastChild) {
                            parentNode.removeChild(parentNode.lastChild.splitText(parentNode.lastChild.length - 1));
                        }
                    }, 0);
                },

                insertImage(url) {
                    const parentNode = search.node.parentNode;
                    const searchNode = search.node.splitText(search.offsets[0]);
                    searchNode.splitText(search.offsets[1]);
                    const inputNode = parentNode.closest('.rich-text-editor__wrapper').querySelector('#rich-text-editor__image-input');

                    if (search.source === 'wiki' && !url) {
                        const activeId = suggestBox.getAttribute('aria-activedescendant');
                        url = document.getElementById(activeId).dataset.url;
                    }

                    searchNode.remove();
                    methods.closeSuggestions();

                    fetch(url).then(res => res.blob()).then(blob => {
                        const transfer = new DataTransfer();
                        transfer.items.add(new File([blob], url));
                        inputNode.files = transfer.files;
                        inputNode.dispatchEvent(new Event('change', { bubbles: true }));
                    });
                },

                closeSuggestions() {
                    suggestBox.innerHTML = '';
                    suggestBox.removeAttribute('aria-activedescendant');
                    wrapper.style.display = 'none';
                    search = {};
                    if (lastRequest.abort) lastRequest.abort();
                    resultCount = 0;
                }
            };
            methods.initListeners();
        },

        getCaret() {
            const sel = getSelection();
            if (!sel.rangeCount) return null;
            const range = sel.getRangeAt(0);
            if (!range.collapsed) return null;

            if (range.endContainer.nodeType !== Node.TEXT_NODE) {
                if (!range.endOffset) return null;
                let newContainer = range.endContainer.childNodes[range.endOffset - 1];
                while (newContainer && newContainer.nodeType !== Node.TEXT_NODE) {
                    newContainer = newContainer.lastChild;
                }
                if (!newContainer) return null;
                range.setEnd(newContainer, newContainer.length);
                range.collapse(false);
            }
            const rect = range.getBoundingClientRect();
            return {
                node: sel.focusNode,
                offset: sel.focusOffset,
                x: rect.x + window.scrollX,
                y: rect.y + window.scrollY,
            };
        },

        parseInsert(str, replaceAll) {
            str = str.replace(/[\n]+\n\n/g, '\n\n').replace(/(?<!\n[\*\#][^\n]*)\n(?![\*\# ])/g, '<br />');

            localApi.get({
                action: 'parse',
                text: str,
                title: config.wgPageName,
                contentmodel: 'wikitext',
                disablelimitreport: true,
                formatversion: '2'
            }).then(res => {
                const htmlContent = res.parse && res.parse.text ? res.parse.text : '';
                if (!htmlContent) return;

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlContent;
                
                const parserOutput = tempDiv.querySelector('.mw-parser-output') || tempDiv;
                
                parserOutput.querySelectorAll(`a[href^="${config.wgArticlePath.replace('$1', '')}"]`).forEach(a => {
                    a.href = config.wgServer + a.getAttribute('href');
                });

                let processedHtml = parserOutput.innerHTML
                    .replace(/<br ?\/?><br ?\/?>/g, '</p><p><br /></p><p>')
                    .replace(/<br ?\/?>(?!\s*<\/p>)/g, '</p><p>');

                const caret = EnhancedEditor.getCaret();
                if (caret && caret.node && !caret.node.parentNode.closest('.ProseMirror')) return;

                if (replaceAll) {
                    const target = caret ? caret.node.parentNode.closest('.ProseMirror') : document.querySelector('.ProseMirror');
                    if (target) {
                        target.innerHTML = processedHtml;
                        target.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                } else if (caret) {
                    const pNode = caret.node.parentNode;
                    const newEl = document.createElement('p');
                    newEl.innerHTML = caret.node.data.slice(0, caret.offset) + 
                                      processedHtml.replace(/^<p>/, '').replace(/<\/p>$/, '') + 
                                      caret.node.data.slice(caret.offset);
                    pNode.replaceWith(newEl);
                } else {
                    const target = document.querySelector('.ProseMirror');
                    if (target && target.lastElementChild) {
                        const lastEl = target.lastElementChild;
                        const newEl = document.createElement('p');
                        newEl.innerHTML = lastEl.innerHTML + processedHtml.replace(/^<p>/, '').replace(/<\/p>$/, '');
                        lastEl.replaceWith(newEl);
                    }
                }
            });
        }
    };

    mw.loader.using(['mediawiki.api', 'mediawiki.ForeignApi', 'mediawiki.util']).then(() => EnhancedEditor.init());

})();