/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function() {
    console.log('CopytxtScript loaded - v1.5.20');

    const BUTTON_SELECTOR = '.copy-to-clipboard-button';
    const PREVIEW_CONTAINER_SELECTOR = '.oo-ui-window-content-setup';
    const ALLOWED_NAMESPACES = ['User', 'Data'];
    const BATCH_SIZE = 5;
    const BATCH_DELAY = 100;
    const MAX_CACHE_SIZE = 1024 * 1024; // 1 МБ
    const cacheKeys = [];

    function fetchJsonFromWiki(pageName, variableName) {
        return new Promise((resolve, reject) => {
            if (!pageName.match(/^(User:|Data:)/)) {
                reject(new Error(`Invalid namespace: ${pageName}`));
                return;
            }
            const cacheKey = `${pageName}:${variableName}`;
            if (sessionStorage.getItem(cacheKey)) {
                console.log(`Cache hit: ${cacheKey}`);
                resolve(sessionStorage.getItem(cacheKey));
                return;
            }
            $.ajax({
                url: `/api.php?action=query&prop=revisions&titles=${encodeURIComponent(pageName)}&rvprop=content&format=json`,
                dataType: 'json',
                cache: false
            }).then(data => {
                const pageId = Object.keys(data.query.pages)[0];
                if (pageId === '-1') throw new Error(`Page not found: ${pageName}`);
                const wikitext = data.query.pages[pageId].revisions[0]['*'].replace(/<(?:pre|syntaxhighlight)[^>]*>|<\/(?:pre|syntaxhighlight)>/g, '').trim();
                if (!wikitext) throw new Error(`No content: ${pageName}`);
                const json = JSON.parse(wikitext);
                if (!json[variableName] || !json[variableName].match(/^[A-Za-z0-9+/=]+$/)) {
                    throw new Error(`Invalid or missing Base64 for ${variableName}`);
                }
                if (json[variableName].length > MAX_CACHE_SIZE) {
                    console.warn(`Skipping cache for ${cacheKey}: size ${json[variableName].length} exceeds ${MAX_CACHE_SIZE}`);
                    resolve(json[variableName]);
                } else {
                    try {
                        sessionStorage.setItem(cacheKey, json[variableName]);
                        cacheKeys.push(cacheKey);
                        console.log(`Cached: ${cacheKey} (${json[variableName].length} chars)`);
                        resolve(json[variableName]);
                    } catch (e) {
                        console.warn(`Cache failed for ${cacheKey}: ${e.message}`);
                        resolve(json[variableName]);
                    }
                }
            }).fail(error => reject(new Error(`API error: ${error.statusText || 'Unknown'} (${error.status})`)));
        });
    }

    function copyText(text, button) {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    console.log(`Copied via Clipboard API: ${text.substring(0, 50)}...`);
                    resolve();
                }).catch(reject);
            } else {
                console.log('Using document.execCommand');
                const textarea = $('<textarea>').val(text).appendTo('body').select();
                const success = document.execCommand('copy');
                textarea.remove();
                if (success) resolve();
                else reject(new Error('Copy failed'));
            }
        });
    }

    function handleButtonState(button, success, errorMsg) {
        button.classList.add(success ? 'success' : 'error');
        console[success ? 'log' : 'error'](`${success ? 'Copied' : 'Failed'}: ${errorMsg || button.dataset.content || button.dataset.pre || `${button.dataset.jsonpage}|${button.dataset.jsonvar}`}`);
        setTimeout(() => button.classList.remove(success ? 'success' : 'error'), 2000);
    }

    function initializeButton(button) {
        if (button.dataset.initialized) return;
        const jsonPage = button.dataset.jsonpage || '';
        const jsonVar = button.dataset.jsonvar || '';
        const preId = button.dataset.pre || '';
        const content = button.dataset.content || '';
        console.log(`Init: ${jsonPage && jsonVar ? `json=${jsonPage}|${jsonVar}` : preId ? `pre=${preId}` : `content=${content.substring(0, 50)}...`}`);

        if (jsonPage && jsonVar) {
            fetchJsonFromWiki(jsonPage, jsonVar).catch(error => console.error(`Pre-cache failed: ${error.message}`));
        }

        button.addEventListener('click', function(event) {
            event.preventDefault();
            if (!navigator.clipboard && !document.execCommand) {
                handleButtonState(button, false, 'No clipboard support');
                return;
            }

            if (jsonPage && jsonVar) {
                fetchJsonFromWiki(jsonPage, jsonVar)
                    .then(base64 => copyText(decodeURIComponent(atob(base64)), button))
                    .then(() => handleButtonState(button, true, `JSON: ${jsonPage}|${jsonVar}`))
                    .catch(error => handleButtonState(button, false, `JSON error: ${error.message}`));
            } else if (preId) {
                const preElement = document.getElementById(preId);
                if (!preElement) {
                    handleButtonState(button, false, `No <pre> with id=${preId}`);
                    return;
                }
                copyText(preElement.textContent, button)
                    .then(() => handleButtonState(button, true, `<pre id=${preId}>`))
                    .catch(error => handleButtonState(button, false, `Pre error: ${error.message}`));
            } else if (content) {
                copyText(content, button)
                    .then(() => handleButtonState(button, true, `Content: ${content.substring(0, 50)}...`))
                    .catch(error => handleButtonState(button, false, `Content error: ${error.message}`));
            } else {
                handleButtonState(button, false, 'No valid data source');
            }
        });

        button.dataset.initialized = 'true';
    }

    function processButtonsWithRateLimit() {
        const buttons = document.querySelectorAll(BUTTON_SELECTOR);
        console.log(`Found ${buttons.length} buttons to initialize`);
        let index = 0;
        function processNext() {
            if (index >= buttons.length) {
                console.log('Button scan complete');
                return;
            }
            initializeButton(buttons[index]);
            index++;
            setTimeout(processNext, BATCH_DELAY);
        }
        const concurrent = Math.min(buttons.length, BATCH_SIZE);
        for (let i = 0; i < concurrent; i++) {
            processNext();
        }
    }

    if (!window.location.href.includes('action=edit')) {
        processButtonsWithRateLimit();
    }

    document.addEventListener('animationstart', function(e) {
        if (e.target.classList.contains('copy-to-clipboard-button')) {
            const previewContainer = document.querySelector(PREVIEW_CONTAINER_SELECTOR);
            if (previewContainer && previewContainer.contains(e.target)) {
                console.log(`Detected in preview: ${e.target.dataset.jsonpage && e.target.dataset.jsonvar ? `${e.target.dataset.jsonpage}|${e.target.dataset.jsonvar}` : e.target.dataset.pre || e.target.dataset.content}`);
                initializeButton(e.target);
            }
        }
    });

    window.addEventListener('unload', function() {
        cacheKeys.forEach(key => sessionStorage.removeItem(key));
        console.log('Cache cleared');
    });
});