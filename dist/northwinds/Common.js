/* Any JavaScript here will be loaded for all users on every page load. */
(function() {
    'use strict';

    const config = {
        DIALOGUE_PAGE_PREFIX: 'NPCDialogue/',

        DEBUG_LOGGING: false,

        HIDE_ANIMATION_DURATION_MS: 350, 
        DEFAULT_REVEAL_SPEED_MS: 35, 
        ANIMATION_END_TIMER_BUFFER_MS: 50, 

        DEFAULT_CHOICE_MARGIN_TOP_PX: 170, 
        DEFAULT_CHOICE_GAP_PX: 5, 

        AUDIO_ENABLED: false, 

        DEFAULT_HOVER_SOUND_SRC: "https://testingcustomjs.fandom.com/wiki/Special:Redirect/file/Button-hover-sound.wav", 
        DEFAULT_CHOICE_CLICK_SOUND_SRC: "Button-click-sound.wav", 
        DIALOGUE_BOX_CLICK_SOUND_SRC: "Dialogue-box-click.wav", 

        ENABLE_ARIA: true 
    };

    const dialogueCache = {};
    const pendingRequests = {};
    let isSystemInitialized = false; 
    let sharedAudioPlayer = null; 
    const soundUrlCache = {}; 

    function log() {
        if (config.DEBUG_LOGGING) {
            console.log.apply(console, ['DialogueSystem:'].concat(Array.prototype.slice.call(arguments)));
        }
    }

    function logError() {
        console.error.apply(console, ['DialogueSystem ERROR:'].concat(Array.prototype.slice.call(arguments)));
    }

    function resolveSoundUrl(soundNameOrUrl) {
        if (!soundNameOrUrl || typeof soundNameOrUrl !== 'string') return null;
        if (soundUrlCache[soundNameOrUrl]) return soundUrlCache[soundNameOrUrl];

        if (soundNameOrUrl.startsWith('/') || soundNameOrUrl.startsWith('http:') || soundNameOrUrl.startsWith('https:')) {
            soundUrlCache[soundNameOrUrl] = soundNameOrUrl;
            return soundNameOrUrl;
        }

        let resolvedUrl = null;
        if (typeof mw !== 'undefined' && mw.util && mw.util.getUrl) {
            try {
                resolvedUrl = mw.util.getUrl('File:' + soundNameOrUrl);
                log('Resolved sound via mw.util:', soundNameOrUrl, '->', resolvedUrl);
            } catch (e) {
                logError("Error calling mw.util.getUrl for", soundNameOrUrl, e);
            }
        }

        if (!resolvedUrl) {
            resolvedUrl = '/wiki/Special:Redirect/file/' + soundNameOrUrl.replace(/ /g, '_');
            log('Resolved sound via fallback:', soundNameOrUrl, '->', resolvedUrl);
        }

        if (resolvedUrl) soundUrlCache[soundNameOrUrl] = resolvedUrl;
        return resolvedUrl;
    }

    function initializeAudioPlayer() {
        if (!config.AUDIO_ENABLED || sharedAudioPlayer) return;
        try {
            sharedAudioPlayer = new Audio();
            sharedAudioPlayer.preload = 'metadata';
            sharedAudioPlayer.style.position = 'absolute';
            sharedAudioPlayer.style.left = '-9999px';
            sharedAudioPlayer.style.top = '-9999px';
            document.body.appendChild(sharedAudioPlayer);
            log('Audio player initialized.');
        } catch (e) {
            logError('Failed to create Audio object. Disabling audio.', e);
            config.AUDIO_ENABLED = false;
            sharedAudioPlayer = null;
        }
    }

    function playSound(soundNameOrUrl) {
        if (!config.AUDIO_ENABLED || !soundNameOrUrl) return;
        initializeAudioPlayer();
        if (!sharedAudioPlayer) return; 
        const url = resolveSoundUrl(soundNameOrUrl);
        if (!url) {
            logError('Could not resolve sound URL for:', soundNameOrUrl);
            return;
        }

        log('Attempting to play sound:', url);

        try {
            if (sharedAudioPlayer.currentSrc !== url) {
                sharedAudioPlayer.src = url;
                sharedAudioPlayer.load();
            }
            sharedAudioPlayer.currentTime = 0;
            const playPromise = sharedAudioPlayer.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    if (error.name !== 'AbortError') logError('Audio playback failed for:', url, error);
                });
            }
        } catch (e) {
            logError('Error during playSound execution for:', url, e);
        }
    }

    function ensureStructure(containerElement) {
        let wrapper = containerElement.querySelector('.dialogue-box-wrapper');
        let choices = containerElement.querySelector(':scope > .dialogue-choices');
        if (!wrapper) {
            containerElement.innerHTML = `
                <div class="dialogue-box-wrapper" style="margin-top: ${config.DEFAULT_CHOICE_MARGIN_TOP_PX}px; transition: margin-top ${config.HIDE_ANIMATION_DURATION_MS / 1000}s ease;">
                     <div class="dialogue-character" style="display: none;"></div>
                     <div class="dialogue-text">
                         <div class="dialogue-text-content" ${config.ENABLE_ARIA ? 'aria-live="polite" aria-atomic="true"' : ''}></div>
                     </div>
                 </div>
                 <div class="dialogue-choices" ${config.ENABLE_ARIA ? 'role="list"' : ''}></div>
             `;
            log('[STRUCT NoChain] Added basic structure.');
            choices = containerElement.querySelector(':scope > .dialogue-choices');
        } else {
            if (!choices) {
                choices = document.createElement('div');
                choices.className = 'dialogue-choices';
                if (config.ENABLE_ARIA) choices.setAttribute('role', 'list');
                containerElement.appendChild(choices);
                log('[STRUCT NoChain] Added missing choices.');
            }
            const textContent = wrapper.querySelector('.dialogue-text-content');
            if (config.ENABLE_ARIA && textContent && !textContent.hasAttribute('aria-live')) {
                textContent.setAttribute('aria-live', 'polite');
                textContent.setAttribute('aria-atomic', 'true');
                log('[STRUCT NoChain] Added ARIA to text content.');
            }
        }
        if (config.ENABLE_ARIA && !containerElement.hasAttribute('role')) {
            containerElement.setAttribute('role', 'region');
            containerElement.setAttribute('aria-label', 'Interactive Dialogue');
        }
    }

    function initializeDialogueInstance(containerElement, dialogueData) {
        log('[INIT NoChain] Instance for container:', containerElement);

        const wrapper = containerElement.querySelector('.dialogue-box-wrapper');
        const characterDisplay = wrapper.querySelector('.dialogue-character');
        const textDisplayParent = wrapper.querySelector('.dialogue-text');
        const textDisplayContainer = textDisplayParent.querySelector('.dialogue-text-content');
        const choicesDisplay = containerElement.querySelector(':scope > .dialogue-choices');

        if (!wrapper || !characterDisplay || !textDisplayParent || !textDisplayContainer || !choicesDisplay) {
            logError('[VALIDATION FAIL NoChain] Structure error.', containerElement);
            containerElement.innerHTML = '<div style="color:red; padding:10px;">Structure Error!</div>';
            return;
        }
        if (!dialogueData || typeof dialogueData !== 'object' || !dialogueData.start) {
            logError('[VALIDATION FAIL NoChain] Invalid data.', dialogueData);
            displayStatus('Error: Invalid dialogue data.', true, textDisplayContainer || wrapper);
            return;
        }
        if (!dialogueData.error_node) dialogueData.error_node = {
            id: 'error_node',
            character: "System",
            text: "Error: Invalid node.",
            end: true
        };
        Object.keys(dialogueData).forEach(key => {
            if (typeof dialogueData[key] === 'object' && !dialogueData[key].id) dialogueData[key].id = key;
        });

        initializeAudioPlayer();

        let isRevealing = false;
        let revealIntervalId = null;
        let currentTextRevealCompleteCallback = null;
        let characterSpans = [];
        let currentCharIndex = 0;
        let currentRevealSpeedMs = config.DEFAULT_REVEAL_SPEED_MS;
        let isAnimatingChoices = false;

        function updateRevealSpeed() {
            try {
                const speedVar = containerElement.style.getPropertyValue('--reveal-speed-ms') || document.documentElement.style.getPropertyValue('--reveal-speed-ms');
                let speed = parseInt(speedVar || config.DEFAULT_REVEAL_SPEED_MS, 10);
                if (isNaN(speed) || speed <= 0) speed = config.DEFAULT_REVEAL_SPEED_MS;
                currentRevealSpeedMs = speed;
            } catch (e) {
                logError("Error reading reveal speed", e);
                currentRevealSpeedMs = config.DEFAULT_REVEAL_SPEED_MS;
            }
        }
        updateRevealSpeed();

        function stopTextReveal() {
            if (!isRevealing) return;
            isRevealing = false;
            if (revealIntervalId) {
                clearInterval(revealIntervalId);
                revealIntervalId = null;
            }
        }

        function skipTextReveal() {
            if (!isRevealing) {
                if (typeof currentTextRevealCompleteCallback === 'function') {
                    log('Skip: Triggering completion callback.');
                    const cb = currentTextRevealCompleteCallback;
                    currentTextRevealCompleteCallback = null;
                    setTimeout(cb, 0);
                }
                return;
            }
            stopTextReveal();
            for (let i = currentCharIndex; i < characterSpans.length; i++) {
                if (characterSpans[i] && !characterSpans[i].classList.contains('is-visible')) characterSpans[i].classList.add('is-visible');
            }
            currentCharIndex = characterSpans.length;
            if (typeof currentTextRevealCompleteCallback === 'function') {
                const cb2 = currentTextRevealCompleteCallback;
                currentTextRevealCompleteCallback = null;
                setTimeout(cb2, 0);
            }
        }

        function revealText(text, onComplete) {
            log('[REVEAL NoChain]');
            if (!textDisplayContainer) {
                logError("textDisplayContainer missing.");
                if (onComplete) onComplete();
                return;
            }
            stopTextReveal();
            currentTextRevealCompleteCallback = onComplete;
            characterSpans = [];
            currentCharIndex = 0;
            textDisplayContainer.innerHTML = '';
            textDisplayContainer.scrollTop = 0;
            const fullText = text || "";
            if (fullText.trim() === "") {
                if (typeof currentTextRevealCompleteCallback === 'function') {
                    const cbEmpty = currentTextRevealCompleteCallback;
                    currentTextRevealCompleteCallback = null;
                    setTimeout(cbEmpty, 0);
                }
                return;
            }
            updateRevealSpeed();
            fullText.split('').forEach(char => {
                if (char === '\n') {
                    const brSpan = document.createElement('span');
                    brSpan.className = 'dialogue-line-break';
                    brSpan.innerHTML = ' ';
                    textDisplayContainer.appendChild(brSpan);
                } else {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'dialogue-char';
                    charSpan.textContent = char;
                    textDisplayContainer.appendChild(charSpan);
                    characterSpans.push(charSpan);
                }
            });
            if (characterSpans.length === 0) {
                if (typeof currentTextRevealCompleteCallback === 'function') {
                    const cbLB = currentTextRevealCompleteCallback;
                    currentTextRevealCompleteCallback = null;
                    setTimeout(cbLB, 0);
                }
                return;
            }
            isRevealing = true;
            revealIntervalId = setInterval(() => {
                if (currentCharIndex < characterSpans.length) {
                    if (characterSpans[currentCharIndex]) characterSpans[currentCharIndex].classList.add('is-visible');
                    currentCharIndex++;
                } else {
                    stopTextReveal();
                    log('Reveal finished.');
                    if (typeof currentTextRevealCompleteCallback === 'function') {
                        const cb3 = currentTextRevealCompleteCallback;
                        currentTextRevealCompleteCallback = null;
                        cb3();
                    }
                }
            }, currentRevealSpeedMs);
        }

        function handleWrapperMouseEnter() {
            playSound(config.DEFAULT_HOVER_SOUND_SRC);
        }
        wrapper.addEventListener('mouseenter', handleWrapperMouseEnter);

        function handleTextAreaClick(event) {
            if (event.target.tagName === 'A' && event.target.closest('.dialogue-text-content')) return;
            const node = dialogueData[textDisplayParent.dataset.nodeId];
            if (isRevealing) {
                playSound(config.DIALOGUE_BOX_CLICK_SOUND_SRC);
                skipTextReveal();
            } else if (node && node.next && !choicesDisplay.classList.contains('choices-active')) {
                playSound(config.DIALOGUE_BOX_CLICK_SOUND_SRC);
                renderNode(node.next);
            } else {
                log('Text click ignored (no action).');
            }
        }
        textDisplayParent.addEventListener('click', handleTextAreaClick);

        function renderNode(nodeId) {
            log('[RENDER NoChain] Node:', nodeId);
            stopTextReveal();
            const node = dialogueData[nodeId] || dialogueData.error_node;
            const currentNodeId = node.id || nodeId;
            if (!node) {
                logError('Critical node failure:', nodeId);
                if (textDisplayContainer) textDisplayContainer.innerHTML = `<div class='dialogue-status-message' style='color:red; font-weight:bold;'>Critical Error: Node ${nodeId} not found.</div>`;
                return;
            }
            if (textDisplayParent) textDisplayParent.dataset.nodeId = currentNodeId;
            if (characterDisplay) {
                characterDisplay.textContent = node.character || '';
                characterDisplay.style.display = node.character ? '' : 'none';
            }
            if (choicesDisplay) {
                choicesDisplay.classList.remove('choices-active');
                isAnimatingChoices = false;
            }
            if (wrapper && wrapper.style.marginTop !== (config.DEFAULT_CHOICE_MARGIN_TOP_PX + 'px')) {
                wrapper.style.marginTop = config.DEFAULT_CHOICE_MARGIN_TOP_PX + 'px';
            }
            const delayDuration = choicesDisplay && choicesDisplay.innerHTML.length > 0 ? config.HIDE_ANIMATION_DURATION_MS : 0;
            setTimeout(() => {
                log('[RENDER] Post-hide timeout.');
                if (choicesDisplay) choicesDisplay.innerHTML = '';
                const textToDisplay = node.text || "";
                if (textDisplayContainer) {
                    const afterRevealCallback = () => {
                        const latestNodeId = textDisplayParent ? textDisplayParent.dataset.nodeId : null;
                        if (latestNodeId !== currentNodeId) {
                            log('[CALLBACK] Node changed during reveal.');
                            return;
                        }
                        const revealedNodeData = dialogueData[latestNodeId] || dialogueData.error_node;
                        log('[CALLBACK NoChain] Reveal done:', latestNodeId);
                        renderChoices(revealedNodeData, wrapper);
                    };
                    revealText(textToDisplay, afterRevealCallback);
                } else {
                    logError("textDisplayContainer missing.");
                    renderChoices(node, wrapper);
                }
            }, delayDuration);
        }

        function renderChoices(node, dialogueWrapper) {
            log('[CHOICES NoChain] Node:', node.id);
            if (!choicesDisplay) {
                logError("choicesDisplay missing.");
                return;
            }
            if (!node) {
                logError("node data missing.");
                if (dialogueWrapper) dialogueWrapper.style.marginTop = config.DEFAULT_CHOICE_MARGIN_TOP_PX + 'px';
                return;
            }
            isAnimatingChoices = false;
            choicesDisplay.innerHTML = '';
            choicesDisplay.classList.remove('choices-active');
            if (textDisplayParent) {
                textDisplayParent.querySelectorAll('.dialogue-end-indicator, .dialogue-wait-indicator').forEach(ind => ind.remove());
            }
            let targetMarginTop = config.DEFAULT_CHOICE_MARGIN_TOP_PX;
            if (!node.end && node.choices && node.choices.length > 0) {
                log('[CHOICES NoChain] Rendering buttons.');
                const fragment = document.createDocumentFragment();
                node.choices.forEach((choice) => {
                    const button = document.createElement('button');
                    button.className = 'dialogue-choice';
                    button.dataset.nextNode = choice.next;
                    if (config.ENABLE_ARIA) button.setAttribute('role', 'listitem');
                    const textSpan = document.createElement('span');
                    textSpan.className = 'dialogue-choice-text';
                    textSpan.textContent = choice.text || 'Continue';
                    button.appendChild(textSpan);
                    if (choice.icon) {
                        const iconSpan = document.createElement('span');
                        const iconClass = choice.icon.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
                        iconSpan.className = 'dialogue-choice-icon ' + iconClass;
                        button.appendChild(iconSpan);
                    }
                    button.addEventListener('click', () => {
                        const soundToPlay = choice.sound || config.DEFAULT_CHOICE_CLICK_SOUND_SRC;
                        playSound(soundToPlay);
                        renderNode(choice.next);
                    });
                    button.addEventListener('mouseenter', () => {
                        if (isAnimatingChoices) return;
                        playSound(config.DEFAULT_HOVER_SOUND_SRC);
                    });
                    fragment.appendChild(button);
                });
                choicesDisplay.appendChild(fragment);
                requestAnimationFrame(() => {
                    const choicesScrollHeight = choicesDisplay.scrollHeight;
                    let choiceGap = config.DEFAULT_CHOICE_GAP_PX;
                    try {
                        const choiceGapStyle = getComputedStyle(document.documentElement).getPropertyValue('--choice-gap');
                        if (choiceGapStyle) choiceGap = parseInt(choiceGapStyle, 10) || config.DEFAULT_CHOICE_GAP_PX;
                    } catch (e) {
                        logError("Could not read --choice-gap", e);
                    }
                    const requiredMargin = choicesScrollHeight + choiceGap;
                    targetMarginTop = Math.max(config.DEFAULT_CHOICE_MARGIN_TOP_PX, requiredMargin);
                    log('[CHOICES NoChain] Margin:', targetMarginTop + 'px');
                    if (dialogueWrapper && dialogueWrapper.style.marginTop !== (targetMarginTop + 'px')) {
                        dialogueWrapper.style.marginTop = targetMarginTop + 'px';
                    }
                    requestAnimationFrame(() => {
                        const currentRenderedNodeId = textDisplayParent ? textDisplayParent.dataset.nodeId : null;
                        if (currentRenderedNodeId === node.id && choicesDisplay.children.length > 0) {
                            isAnimatingChoices = true;
                            log('[CHOICES NoChain] Set isAnimatingChoices = true');
                            choicesDisplay.classList.add('choices-active');
                            let longestAnimationMs = config.HIDE_ANIMATION_DURATION_MS;
                            try {
                                const transitionDurationStyle = getComputedStyle(choicesDisplay).transitionDuration;
                                const durations = transitionDurationStyle.split(',').map(d => parseFloat(d) * (d.includes('ms') ? 1 : 1000));
                                const validDurations = durations.filter(d => !isNaN(d));
                                if (validDurations.length > 0) longestAnimationMs = Math.max.apply(null, validDurations);
                                log('[CHOICES NoChain] Longest transition:', longestAnimationMs, 'ms');
                            } catch (e) {
                                logError("Could not parse transition duration.", e);
                            }
                            const timerDuration = longestAnimationMs + config.ANIMATION_END_TIMER_BUFFER_MS;
                            log('[CHOICES NoChain] Animation timer:', timerDuration, 'ms');
                            setTimeout(() => {
                                if (isAnimatingChoices) {
                                    log('[CHOICES NoChain] Timer done, isAnimatingChoices = false');
                                    isAnimatingChoices = false;
                                }
                            }, timerDuration);
                        } else {
                            log('[CHOICES NoChain] Node changed before anim.');
                            isAnimatingChoices = false;
                            if (dialogueWrapper && dialogueWrapper.style.marginTop !== (config.DEFAULT_CHOICE_MARGIN_TOP_PX + 'px')) dialogueWrapper.style.marginTop = config.DEFAULT_CHOICE_MARGIN_TOP_PX + 'px';
                        }
                    });
                });
            } else {
                log('[CHOICES NoChain] No choices/end node.');
                isAnimatingChoices = false;
                targetMarginTop = config.DEFAULT_CHOICE_MARGIN_TOP_PX;
                if (dialogueWrapper && dialogueWrapper.style.marginTop !== (targetMarginTop + 'px')) {
                    dialogueWrapper.style.marginTop = targetMarginTop + 'px';
                }
                if (textDisplayParent && !isRevealing) {
                    const existingIndicator = textDisplayParent.querySelector('.dialogue-end-indicator, .dialogue-wait-indicator');
                    if (!existingIndicator) {
                        const indicatorSpan = document.createElement('span');
                        indicatorSpan.style.marginLeft = '8px';
                        if (node.end) {
                            indicatorSpan.className = 'dialogue-end-indicator';
                            indicatorSpan.textContent = '✦';
                            log('[CHOICES NoChain] End indicator');
                            textDisplayParent.appendChild(indicatorSpan);
                        } else if (node.next) {
                            indicatorSpan.className = 'dialogue-wait-indicator';
                            indicatorSpan.textContent = '✦';
                            log('[CHOICES NoChain] Wait indicator');
                            textDisplayParent.appendChild(indicatorSpan);
                        }
                    }
                }
            }
            log('[CHOICES NoChain] renderChoices finished.');
        }

        if (dialogueData && dialogueData.start) renderNode('start');
        else {
            logError('Initial node "start" missing.');
            renderNode('error_node');
        }

    } 

    function displayStatus(message, isError, targetElement) {
        const container = targetElement || document.querySelector('.interactive-dialogue-container .dialogue-text-content') || document.querySelector('.interactive-dialogue-container');
        if (!container) {
            logError("No target for status:", message);
            return;
        }
        const displayArea = container.querySelector('.dialogue-text-content') || container;
        let statusDiv = displayArea.querySelector('.dialogue-status-message');
        if (!statusDiv) {
            statusDiv = document.createElement('div');
            statusDiv.className = 'dialogue-status-message';
            displayArea.insertBefore(statusDiv, displayArea.firstChild);
        }
        statusDiv.textContent = message;
        statusDiv.style.color = isError ? 'red' : '#ccc';
        statusDiv.style.fontWeight = isError ? 'bold' : 'normal';
        statusDiv.style.padding = '10px';
        statusDiv.style.textAlign = 'center';
    }

    function fetchAndInitDialogue(containerElement, apiInstance) {
        log("[FETCH NoChain] Container:", containerElement);
        const dialogueKey = containerElement.dataset.dialogueKey;
        if (!dialogueKey) {
            logError('Missing data-dialogue-key.');
            displayStatus('Error: Missing dialogue key.', true, containerElement);
            return;
        }
        const pageTitle = config.DIALOGUE_PAGE_PREFIX + dialogueKey;
        const initialTargetElement = containerElement.querySelector('.dialogue-text-content') || containerElement;
        displayStatus('Loading dialogue...', false, initialTargetElement);
        if (dialogueCache[pageTitle]) {
            log('[FETCH NoChain] Cache HIT:', pageTitle);
            try {
                ensureStructure(containerElement);
                initializeDialogueInstance(containerElement, JSON.parse(JSON.stringify(dialogueCache[pageTitle])));
            } catch (e) {
                logError("Init from cache error:", e);
                displayStatus('Error initializing from cache.', true, initialTargetElement);
            }
            return;
        }
        if (pendingRequests[pageTitle]) {
            log('[FETCH NoChain] Pending:', pageTitle);
            pendingRequests[pageTitle].then(cachedData => {
                try {
                    ensureStructure(containerElement);
                    initializeDialogueInstance(containerElement, JSON.parse(JSON.stringify(cachedData)));
                } catch (e) {
                    logError("Init from pending error:", e);
                    displayStatus('Error initializing (pending).', true, initialTargetElement);
                }
            }).catch(error => {
                logError('Pending failed:', pageTitle, error);
                displayStatus('Failed loading (pending).', true, initialTargetElement);
            });
            return;
        }
        log('[FETCH NoChain] Fetching API:', pageTitle);
        if (!apiInstance && typeof mw !== 'undefined' && mw.Api) {
            try {
                apiInstance = new mw.Api();
            } catch (e) {
                logError("Error creating mw.Api.", e);
                displayStatus('Error: MW API init failed.', true, initialTargetElement);
                return;
            }
        } else if (!apiInstance) {
            logError('mw.Api unavailable.');
            displayStatus('Error: API unavailable.', true, initialTargetElement);
            return;
        }
        const params = {
            action: 'query',
            prop: 'revisions',
            rvprop: 'content',
            rvslots: 'main',
            titles: pageTitle,
            formatversion: 2,
            format: 'json'
        };
        const fetchPromise = apiInstance.get(params);
        pendingRequests[pageTitle] = fetchPromise;
        fetchPromise.then(data => {
            log('[FETCH NoChain] API response OK:', pageTitle);

            const page = (data && data.query && data.query.pages && data.query.pages[0]) ? data.query.pages[0] : null;
            let content = null;
            if (page && page.revisions && page.revisions[0] && page.revisions[0].slots && page.revisions[0].slots.main && typeof page.revisions[0].slots.main.content === 'string') {
                content = page.revisions[0].slots.main.content;
            }

            if (!page) throw new Error('Invalid API response.');
            if (page.missing) throw new Error(`Page "${pageTitle}" not found.`);
            if (page.invalid) throw new Error(`Page title "${pageTitle}" invalid.`);
            if (content === null || content.trim() === '') throw new Error(`No content on page "${pageTitle}".`);
            let localParsedData;
            try {
                localParsedData = JSON.parse(content);
            } catch (e) {
                throw new Error(`JSON parse error in "${pageTitle}": ${e.message}`);
            }
            if (typeof localParsedData !== 'object' || localParsedData === null || !localParsedData.start) {
                throw new Error(`Invalid data structure in "${pageTitle}".`);
            }
            log('[FETCH NoChain] Parsed OK:', pageTitle);
            dialogueCache[pageTitle] = localParsedData;
            delete pendingRequests[pageTitle];
            ensureStructure(containerElement);
            initializeDialogueInstance(containerElement, JSON.parse(JSON.stringify(localParsedData)));
            return localParsedData;
        }).catch(error => {
            logError('[FETCH NoChain] Error:', pageTitle, error);
            const errorMsg = error instanceof Error ? error.message : String(error);
            displayStatus('Error: ' + errorMsg, true, initialTargetElement);
            if (pendingRequests[pageTitle] === fetchPromise) delete pendingRequests[pageTitle];
        });
    }

    function initializeSystem() {
        log("[SYSTEM NoChain] Init");
        const uninitializedContainers = document.querySelectorAll('.interactive-dialogue-container:not([data-dialogue-initialized])');
        if (isSystemInitialized && uninitializedContainers.length === 0) {
            log("[SYSTEM NoChain] No new containers.");
            return;
        }
        if (!isSystemInitialized) isSystemInitialized = true;
        if (uninitializedContainers.length === 0) {
            log("[SYSTEM NoChain] No uninitialized containers found.");
            return;
        }
        log("[SYSTEM NoChain] Found", uninitializedContainers.length, "new container(s).");
        if (typeof mw !== 'undefined' && mw.loader && typeof mw.loader.using === 'function') {
            mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(() => {
                log('[SYSTEM NoChain] MW modules loaded.');
                let api;
                try {
                    api = new mw.Api();
                } catch (e) {
                    logError("Fatal: Could not create mw.Api.", e);
                    uninitializedContainers.forEach(c => displayStatus('Error: MW API failed.', true, c));
                    return;
                }
                initializeAudioPlayer();
                uninitializedContainers.forEach(el => {
                    if (el.dataset.dialogueInitialized) return;
                    try {
                        ensureStructure(el);
                        if (el.dataset.dialogueKey) {
                            fetchAndInitDialogue(el, api);
                            el.dataset.dialogueInitialized = 'true';
                        } else {
                            logError("Missing key.", el);
                            displayStatus('Error: Missing key.', true, el);
                        }
                    } catch (e) {
                        logError("Init Error:", e, el);
                        el.innerHTML = '<div style="color:red;padding:10px;">Init Error!</div>';
                        el.dataset.dialogueInitialized = 'true';
                    }
                });
            }).catch(loadError => {
                logError('[SYSTEM NoChain] FATAL - MW modules failed.', loadError);
                uninitializedContainers.forEach(c => {
                    if (!c.dataset.dialogueInitialized) displayStatus('Error: MW components failed.', true, c);
                });
            });
        } else {
            logError('[SYSTEM NoChain] MW env not found.');
            initializeAudioPlayer();
            uninitializedContainers.forEach(el => {
                if (el.dataset.dialogueInitialized) return;
                try {
                    ensureStructure(el);
                    if (el.dataset.dialogueKey) {
                        fetchAndInitDialogue(el, null);
                        el.dataset.dialogueInitialized = 'true';
                    } else {
                        logError("Missing key.", el);
                        displayStatus('Error: Missing key.', true, el);
                    }
                } catch (e) {
                    logError("Init Error (fallback):", e, el);
                    el.innerHTML = '<div style="color:red;padding:10px;">Init Error!</div>';
                    el.dataset.dialogueInitialized = 'true';
                }
            });
        }
    }

    if (typeof mw !== 'undefined' && mw.hook && mw.loader && typeof mw.loader.using === 'function') {
        mw.loader.using(['mediawiki.util', 'mediawiki.api']).then(() => {
            mw.hook('wikipage.content').add($content => {
                let containerFound = false;

                if ($content instanceof Element) {
                    if ($content.matches('.interactive-dialogue-container:not([data-dialogue-initialized])') || $content.querySelector('.interactive-dialogue-container:not([data-dialogue-initialized])')) {
                        containerFound = true;
                    }
                } else if ($content && typeof $content.find === 'function') { 
                    if ($content.find('.interactive-dialogue-container:not([data-dialogue-initialized])').length > 0 || ($content.is && $content.is('.interactive-dialogue-container:not([data-dialogue-initialized])'))) { 
                        containerFound = true;
                    }
                }

                if (!containerFound && document.querySelector('.interactive-dialogue-container:not([data-dialogue-initialized])')) {
                    containerFound = true;
                    log('wikipage.content: Found uninitialized via document query.');
                }
                if (containerFound) {
                    log('wikipage.content: Found new container(s). Scheduling init.');
                    requestAnimationFrame(initializeSystem);
                }
            });
            log('wikipage.content hook listener added.');
            requestAnimationFrame(initializeSystem); 
        }).catch(err => {
            logError('Failed loading MW modules. Falling back.', err);
            document.addEventListener('DOMContentLoaded', initializeSystem);
        });
    } else {
        logError('MW hook/loader unavailable. Falling back.');
        document.addEventListener('DOMContentLoaded', initializeSystem);
    }

    log('Dialogue System Script (V-NoChain) Loaded.');

})();