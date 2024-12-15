/*-----------------------------------------------------------------------------
//Tutorial Hints
//-----------------------------------------------------------------------------*/
var tips = {};
var initialized = false;
var cursorPosition = { x: 0, y: 0 };
var tooltipState = {
    locked: false,
    lastPosition: { x: 0, y: 0 },
    selectable: false,
    persistOnHover: false
};

function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

// Track cursor position
document.addEventListener('mousemove', debounce(function(e) {
    cursorPosition.x = e.clientX;
    cursorPosition.y = e.clientY;
}, 16));

function handleTooltipFocus() {
    var tooltipContainer = document.getElementById('tooltip-container');
    if (tooltipContainer && tooltipContainer.style.visibility === 'visible') {
        // Make entire document unselectable except tooltip
        var allElements = document.getElementsByTagName('*');
        for (var i = 0; i < allElements.length; i++) {
            if (allElements[i] !== tooltipContainer && !tooltipContainer.contains(allElements[i])) {
                allElements[i].style.userSelect = 'none';
            }
        }
        
        tooltipContainer.style.userSelect = 'text';
        tooltipContainer.style.pointerEvents = 'auto';
        tooltipContainer.style.cursor = 'text';
        
        // Set tabIndex for keyboard focus
        tooltipContainer.setAttribute('tabindex', '0');
        tooltipContainer.focus({preventScroll: true});
    }
}

function resetDocumentSelection() {
    var allElements = document.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++) {
        allElements[i].style.userSelect = '';
    }
}

// Updated key event listeners
document.addEventListener('keydown', function(e) {
    if (e.key === 'Alt') {
        tooltipState.locked = true;
        e.preventDefault();
    }
    if (e.key === 'Control' && tooltipState.locked) {
        tooltipState.selectable = true;
        tooltipState.persistOnHover = true;
        updateTooltipSelectableState();
        handleTooltipFocus();
        e.preventDefault();
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'Alt') {
        tooltipState.locked = false;
        if (!e.ctrlKey) {
            tooltipState.persistOnHover = false;
            tooltipState.selectable = false;
            updateTooltipSelectableState();
            resetDocumentSelection();
        }
    }
    if (e.key === 'Control') {
        tooltipState.selectable = false;
        tooltipState.persistOnHover = false;
        updateTooltipSelectableState();
        resetDocumentSelection();
        
        var tooltipContainer = document.getElementById('tooltip-container');
        if (tooltipContainer) {
            var elementsAtPoint = document.elementsFromPoint(cursorPosition.x, cursorPosition.y);
            var isOverTooltipElement = elementsAtPoint.some(function(el) {
                return el.classList && (
                    el.classList.contains('has-tooltip') || 
                    el.id === 'tooltip-container'
                );
            });
            
            if (!isOverTooltipElement && !tooltipState.locked) {
                hideTooltip();
            }
        }
    }
});

function updateTooltipSelectableState() {
    var tooltipContainer = document.getElementById('tooltip-container');
    if (tooltipContainer) {
        if (tooltipState.selectable) {
            handleTooltipFocus();
        } else {
            tooltipContainer.style.userSelect = 'none';
            tooltipContainer.style.pointerEvents = 'none';
            tooltipContainer.style.cursor = 'default';
            tooltipContainer.blur();
            resetDocumentSelection();
        }
    }
}

// Add wheel event listener for Alt+Scroll
document.addEventListener('wheel', function(e) {
    var tooltipContainer = document.getElementById('tooltip-container');
    if (tooltipContainer && tooltipContainer.style.visibility === 'visible' && e.altKey) {
        e.preventDefault();
        var delta = e.deltaY || e.detail || e.wheelDelta;
        tooltipContainer.scrollTop += (delta > 0) ? 40 : -40;
        return false;
    }
}, { passive: false });

function addTooltipControl() {
    var actionGroup = document.querySelector('.ve-ui-summaryPanel-showChangesOrPreviewGroup');
    if (actionGroup) {
        var control = document.createElement('div');
        control.className = 'tooltip-position-control';
        
        // Create refresh button
        var refreshButton = document.createElement('button');
        refreshButton.className = 'tooltip-refresh-button';
        refreshButton.type = 'button'; // This prevents form submission
        refreshButton.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Refresh Tips';
        refreshButton.title = 'Refresh tooltips';
        refreshButton.onclick = function(e) {
            e.preventDefault(); // Prevent any bubbling/default behavior
            e.stopPropagation(); // Stop event propagation
            updateTips();
            processLines();
            return false;
};

        // Create sync button
        var syncButton=true;
        //var syncButton = document.createElement('button');
        //syncButton.className = 'tooltip-refresh-button';
        //syncButton.innerHTML = '<i class="fa-solid fa-sync"></i> Sync Text';
        //syncButton.title = 'Sync editors text';
        //syncButton.onclick = function() {
            //syncEditors();
           // return false;
        //};
        
        control.innerHTML = [
            '<label for="tooltipLock"><small>Please wait for a few seconds to load the tips. <br/>Lock tooltip position by pressing the ctrl + alt key!</small></label>',
            '<span class="tooltip-shortcut-hint"></span>'
        ].join('');
        
        // Insert both buttons after the label
        //control.insertBefore(syncButton, control.querySelector('.tooltip-shortcut-hint'));
        control.insertBefore(refreshButton, control.querySelector('.tooltip-shortcut-hint'));
        actionGroup.parentNode.insertBefore(control, actionGroup);

        //var tooltipLockCheckbox = document.getElementById('tooltipLock');
        //if (tooltipLockCheckbox) {
           // tooltipLockCheckbox.addEventListener('change', function(e) {
              //  tooltipState.locked = e.target.checked;
            //});
        //}
    }
}

var eventCache = {
    _data: {},
    set: function(element, data) {
        var id = element.getAttribute('data-tooltip-id');
        if (!id) {
            id = 'tooltip-' + Math.random().toString(36).substr(2, 9);
            element.setAttribute('data-tooltip-id', id);
        }
        this._data[id] = data;
    },
    get: function(element) {
        var id = element.getAttribute('data-tooltip-id');
        return id ? this._data[id] : null;
    },
    delete: function(element) {
        var id = element.getAttribute('data-tooltip-id');
        if (id) {
            delete this._data[id];
            element.removeAttribute('data-tooltip-id');
        }
    },
    clear: function() {
        this._data = {};
    }
};

function cleanupEventListeners(element) {
    var listeners = eventCache.get(element);
    if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
            element.removeEventListener(listeners[i].type, listeners[i].fn);
        }
        eventCache.delete(element);
    }
}

function addTooltipEvents(element, content) {
    cleanupEventListeners(element);
    
    var handlers = {
        mouseenter: function() { 
            if (!tooltipState.persistOnHover) {
                showTooltip(content); 
            }
        },
        mouseleave: function() {
            if (!tooltipState.persistOnHover) {
                hideTooltip();
            }
        }
    };
    
    var listeners = [];
    for (var type in handlers) {
        if (handlers.hasOwnProperty(type)) {
            element.addEventListener(type, handlers[type]);
            listeners.push({ type: type, fn: handlers[type] });
        }
    }
    
    eventCache.set(element, listeners);
}

function processLinesChunk(lines, startIndex, chunkSize) {
    var endIndex = Math.min(startIndex + chunkSize, lines.length);
    var chunk = Array.prototype.slice.call(lines, startIndex, endIndex);
    
    for (var i = 0; i < chunk.length; i++) {
        var line = chunk[i];
        var text = line.textContent.trim();
        
        if (!text || text.indexOf('<!--') === 0) {
            continue;
        }
        
        // Remove any existing wrapper spans
        var existingWrappers = line.querySelectorAll('.tooltip-highlight-wrapper');
        for (var j = 0; j < existingWrappers.length; j++) {
            var wrapper = existingWrappers[j];
            while (wrapper.firstChild) {
                wrapper.parentNode.insertBefore(wrapper.firstChild, wrapper);
            }
            wrapper.parentNode.removeChild(wrapper);
        }
        
        for (var pattern in tips) {
            if (tips.hasOwnProperty(pattern) && text.indexOf(pattern) !== -1 && tips[pattern]) {
                // Find the position of the equals sign, ignoring leading equal signs
                var equalIndex;
                if (text.match(/^=+\s*[^=\s]/)) {
                    // For lines starting with equal signs, find the first equals after the header
                    var headerMatch = text.match(/^=+\s*[^=\s].*?=+\s*/);
                    var headerLength = headerMatch ? headerMatch[0].length : 0;
                    var restOfLine = text.substring(headerLength);
                    equalIndex = restOfLine.indexOf('=');
                    if (equalIndex !== -1) {
                        equalIndex += headerLength;
                    } else {
                        equalIndex = text.length;
                    }
                } else {
                    // Normal processing for lines not starting with equal signs
                    equalIndex = text.indexOf('=');
                    if (equalIndex === -1) equalIndex = text.length;
                }
                
                // Create a wrapper for the content before the equals sign
                var wrapper = document.createElement('span');
                wrapper.className = 'tooltip-highlight-wrapper has-tooltip';
                
                // Get the text nodes and elements before the equals sign
                var walker = document.createTreeWalker(
                    line,
                    NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
                    null,
                    false
                );
                
                var currentNode;
                var currentLength = 0;
                var nodesToWrap = [];
                
                while ((currentNode = walker.nextNode()) && currentLength < equalIndex) {
                    if (currentNode.nodeType === Node.TEXT_NODE) {
                        var nodeText = currentNode.textContent;
                        if (currentLength + nodeText.length <= equalIndex) {
                            nodesToWrap.push(currentNode);
                            currentLength += nodeText.length;
                        } else {
                            // Split the text node at the equals sign
                            var splitPoint = equalIndex - currentLength;
                            var beforeText = nodeText.substring(0, splitPoint);
                            var afterText = nodeText.substring(splitPoint);
                            
                            var beforeNode = document.createTextNode(beforeText);
                            var afterNode = document.createTextNode(afterText);
                            
                            currentNode.parentNode.insertBefore(beforeNode, currentNode);
                            currentNode.parentNode.insertBefore(afterNode, currentNode);
                            currentNode.parentNode.removeChild(currentNode);
                            
                            nodesToWrap.push(beforeNode);
                            break;
                        }
                    } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
                        currentLength += currentNode.textContent.length;
                        nodesToWrap.push(currentNode);
                    }
                }
                
                // Wrap the nodes
                if (nodesToWrap.length > 0) {
                    var firstNode = nodesToWrap[0];
                    firstNode.parentNode.insertBefore(wrapper, firstNode);
                    
                    for (var k = 0; k < nodesToWrap.length; k++) {
                        wrapper.appendChild(nodesToWrap[k]);
                    }
                    
                    // Add tooltip events to the wrapper
                    addTooltipEvents(wrapper, formatTipContent(tips[pattern]));
                }
                
                break;
            }
        }
    }
    
    if (endIndex < lines.length) {
        setTimeout(function() {
            processLinesChunk(lines, endIndex, chunkSize);
        }, 0);
    }
}

function syncEditors() {
    var cmEditor = document.querySelector('.cm-content');
    var veEditor = document.querySelector('.ve-ce-documentNode');
    
    if (cmEditor && veEditor) {
        // Get content from both editors
        var cmLines = cmEditor.querySelectorAll('.cm-line');
        
        cmLines.forEach(function(line) {
            var lineText = line.textContent;
            var normalizedText = normalizeText(lineText);
            if (lineText !== normalizedText) {
                // Create a new text node with normalized content
                var textNode = document.createTextNode(normalizedText);
                
                // Replace the line's content
                while (line.firstChild) {
                    line.removeChild(line.firstChild);
                }
                line.appendChild(textNode);
                
                // Trigger CodeMirror update
                var event = new Event('input', {
                    bubbles: true,
                    cancelable: true
                });
                line.dispatchEvent(event);
            }
        });
    }
}

function processLines() {
    var cmLines = document.querySelectorAll('.cm-content .cm-line');
    var veLines = document.querySelectorAll('.ve-ce-paragraphNode');
    
    if (!cmLines.length && !veLines.length) {
        cmLines = document.querySelectorAll('.cm-line');
        veLines = document.querySelectorAll('.ve-ce-branchNode.ve-ce-paragraphNode');
    }
    
    var allLines = Array.prototype.slice.call(cmLines).concat(Array.prototype.slice.call(veLines));
    processLinesChunk(allLines, 0, 50);
    
    // Add synchronization after processing
    syncEditors();
}

function addCMObserver() {
    var cmContent = document.querySelector('.cm-content');
    if (cmContent) {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    var node = mutation.target;
                    if (node.nodeType === Node.TEXT_NODE || 
                        node.classList.contains('cm-line')) {
                        requestAnimationFrame(function() {
                            syncEditors();
                        });
                    }
                }
            });
        });
        
        observer.observe(cmContent, {
            childList: true,
            subtree: true,
            characterData: true
        });
        
        // Add immediate normalization on input
        cmContent.addEventListener('input', function(event) {
            requestAnimationFrame(function() {
                syncEditors();
            });
        });
    }
}



var updateTips = debounce(processLines, 20000);

function formatTipContent(content) {
    if (!content) return '';
    
    var tipContent = Array.isArray(content) ? content.join('\n') : content;
    return tipContent
        .replace(/'/g, "&#39;")
        .replace(/"/g, "&quot;")
        .replace(/<(\/?)(?:small|ref|br|tabber)>/g, '&lt;$1&gt;')
        .replace(/<span style=(info|use|ex|imp|ph|warning)>/g, function(match, type) {
            var colors = {
                info: '#179e0a',
                use: '#0a689e',
                ex: '#9e0a9b',
                imp: 'red',
                ph: '#707070',
                warning: 'red'
            };
            return '<span class="tooltip-' + type + '">';
        });
}

function showTooltip(content) {
    var tooltipContainer = document.getElementById('tooltip-container');
    if (!tooltipContainer) {
        createTooltipContainer();
        tooltipContainer = document.getElementById('tooltip-container');
    }
    
    // Only update content if not in persist mode
    if (!tooltipState.persistOnHover) {
        tooltipContainer.innerHTML = content;
        updateTooltipSelectableState();
    }
    
    if (!tooltipState.locked) {
        var x = cursorPosition.x + 20;
        var y = cursorPosition.y + 10;
        
        var rect = tooltipContainer.getBoundingClientRect();
        if (x + rect.width > window.innerWidth - 20) {
            x = cursorPosition.x - rect.width - 20;
        }
        
        if (y + rect.height > window.innerHeight - 20) {
            y = window.innerHeight - rect.height - 20;
        }
        
        tooltipState.lastPosition = { x: x, y: y };
        tooltipContainer.style.left = x + 'px';
        tooltipContainer.style.top = y + 'px';
    }
    
    tooltipContainer.style.visibility = 'visible';
}


function hideTooltip() {
    if (!tooltipState.persistOnHover) {
        var tooltipContainer = document.getElementById('tooltip-container');
        if (tooltipContainer) {
            tooltipContainer.style.visibility = 'hidden';
        }
    }
}


function cleanTooltip(tooltipHtml) {
    return tooltipHtml
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function createTooltipContainer() {
    var existing = document.getElementById('tooltip-container');
    if (existing) {
        existing.remove();
    }
    
    var tooltipContainer = document.createElement('div');
    tooltipContainer.id = 'tooltip-container';
    tooltipContainer.className = 'tooltip-content';
    tooltipContainer.style.visibility = 'hidden';
    tooltipContainer.style.userSelect = 'none';
    tooltipContainer.style.pointerEvents = 'none';
    tooltipContainer.style.zIndex = '2147483647';
    
    // Prevent tooltip from being hidden when clicking inside it
    tooltipContainer.addEventListener('mousedown', function(e) {
        if (tooltipState.selectable) {
            e.stopPropagation();
        }
    });
    
    tooltipContainer.addEventListener('click', function(e) {
        if (tooltipState.selectable) {
            e.stopPropagation();
        }
    });
    
    document.body.appendChild(tooltipContainer);
    return tooltipContainer;
}

function addStyles() {
    var existingStyles = document.getElementById('tooltip-styles');
    if (existingStyles) {
        existingStyles.remove();
    }

    var style = document.createElement('style');
    style.id = 'tooltip-styles';
    style.textContent = [
        '.cm-line .tooltip-highlight-wrapper.has-tooltip, .ve-ce-paragraphNode .tooltip-highlight-wrapper.has-tooltip {',
        '    background-color: rgba(255, 255, 0, 0.2) !important;',
        '    cursor: help !important;',
        '    display: inline !important;',
        '}',
        '.cm-line .tooltip-highlight-wrapper.has-tooltip:hover, .ve-ce-paragraphNode .tooltip-highlight-wrapper.has-tooltip:hover {',
        '    background-color: rgba(255, 255, 0, 0.35) !important;',
        '}',
        '.tooltip-content {',
        '    position: fixed !important;',
        '    z-index: 100000 !important;',
        '    width: 400px !important;',
        '    max-width: calc(100vw - 40px) !important;',
        '    max-height: 300px !important;',
        '    overflow-y: auto !important;',
        '    overflow-x: hidden !important;',
        '    background: #ffffff !important;',
        '    border: 1px solid #ccc !important;',
        '    border-radius: 4px !important;',
        '    padding: 8px !important;',
        '    box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;',
        '    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif !important;',
        '    font-size: 13px !important;',
        '    line-height: 1.4 !important;',
        '    color: #333 !important;',
        '    text-align: left !important;',
        '    white-space: pre-wrap !important;',
        '    scrollbar-width: thin !important;',
        '    scrollbar-color: #888 #f1f1f1 !important;',
        '}',
        '.tooltip-content::-webkit-scrollbar {',
        '    width: 8px !important;',
        '}',
        '.tooltip-content::-webkit-scrollbar-track {',
        '    background: #f1f1f1 !important;',
        '}',
        '.tooltip-content::-webkit-scrollbar-thumb {',
        '    background: #888 !important;',
        '    border-radius: 4px !important;',
        '}',
        '.tooltip-content::-webkit-scrollbar-thumb:hover {',
        '    background: #555 !important;',
        '}',
        '.tooltip-info { color: #179e0a !important; font-size: larger !important; }',
        '.tooltip-use { color: #0a689e !important; font-size: larger !important; }',
        '.tooltip-ex { color: #9e0a9b !important; font-size: larger !important; }',
        '.tooltip-imp { color: red !important; font-size: larger !important; }',
        '.tooltip-ph { color: #707070 !important; font-size: larger !important; }',
        '.tooltip-warning {',
        '    color: red !important;',
        '    font-weight: bold !important;',
        '    font-size: larger !important;',
        '    background-color: rgba(255, 0, 0, 0.2) !important;',
        '    width: 100% !important;',
        '    display: block !important;',
        '}',
       '.tooltip-refresh-button {',
        '    margin-left: 10px;',
        '    padding: 4px 8px;',
        '    background-color: #f8f9fa;',
        '    border: 1px solid #a2a9b1;',
        '    border-radius: 3px;',
        '    cursor: pointer;',
        '    font-size: 13px;',
        '    line-height: 1;',
        '    color: #202122;',
        '    display: inline-flex;',
        '    align-items: center;',
        '    gap: 4px;',
        '}',
       '.tooltip-refresh-button:hover {',
        '    background-color: #ffffff;',
        '    border-color: #72777d;',
        '}',
       '.tooltip-refresh-button:active {',
        '    background-color: #c8ccd1;',
        '    border-color: #72777d;',
        '}',
        '.tooltip-refresh-button + .tooltip-refresh-button {',
        '    margin-left: 5px;',
        '}',
        '.tooltip-position-control {',
        '    display: flex;',
        '    align-items: center;',
        '    margin-right: 15px;',
        '    padding: 5px;',
        '}',
        '.tooltip-position-control label {',
        '    margin-left: 5px;',
        '    cursor: pointer;',
        '}',
        '.tooltip-shortcut-hint {',
        '    margin-left: 10px;',
        '    color: #666;',
        '    font-style: italic;',
        '}'
    ].join('\n');
    
    document.head.appendChild(style);
}

function getTips() {
    $.ajax({
        url: 'https://utaite.fandom.com/wiki/Utaite_Wiki:Archive/Tips.json?action=raw',
        success: function(html) {
            try {
                tips = JSON.parse(html);
                console.log('Tips loaded:', Object.keys(tips).length);
                updateTips();
            } catch(e) {
                console.error('Failed to parse tips JSON:', e);
            }
        },
        error: function(error) {
            console.error('Failed to fetch tips:', error);
        }
    });
}

function checkForEditor() {
    var cmContent = document.querySelector('.cm-content');
    var veContent = document.querySelector('.ve-ce-documentNode');
    
    if (cmContent && veContent && !initialized) {
        console.log('Both editors found, initializing...');
        initialized = true;
        addStyles();
        getTips();
        addTooltipControl();
        initializeObserver();
        addCMObserver(); // Add the new observer
        processLines();
        
        // Add input event listener for CodeMirror
        cmContent.addEventListener('input', debounce(function() {
            syncEditors();
        }, 100));
    }
}

function initializeObserver() {
    // Remove automatic updates from observer
    var observer = new MutationObserver(function() {
        // Do nothing on mutations - updates will be manual only
    });
    
    var editorContainer = document.querySelector('.ve-init-target-source');
    var cmContent = document.querySelector('.cm-content');
    
    if (editorContainer) {
        observer.observe(editorContainer, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: false
        });
    }
    
    if (cmContent) {
        observer.observe(cmContent, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: false
        });
    }
    
    return observer;
}

// Initialize on page load
$(document).ready(function() {
    var initInterval = setInterval(function() {
        checkForEditor();
        if (initialized) {
            clearInterval(initInterval);
        }
    }, 500);
    
    // Cleanup on page unload
    window.addEventListener('unload', function() {
        eventCache.clear();
        if (window.observer) {
            window.observer.disconnect();
        }
    });
});

// Add the text normalization function to handle scrambled text
function normalizeText(text) {
    if (!text) return text;
    
    // Create text decoder/encoder to handle potential encoding issues
    var decoder = new TextDecoder('utf-8', { fatal: false });
    var encoder = new TextEncoder();
    
    // Normalize text using NFKC form which handles both compatibility and composition
    var normalized = text.normalize('NFKC');
    
    // Handle potential binary data corruption
    try {
        var bytes = encoder.encode(normalized);
        normalized = decoder.decode(bytes);
    } catch (e) {
        console.warn('Text normalization failed:', e);
        return text; // Return original if normalization fails
    }
    
    return normalized;
}

// Add text normalization to the processLines function
function processLinesWithNormalization() {
    var cmLines = document.querySelectorAll('.cm-content .cm-line');
    var veLines = document.querySelectorAll('.ve-ce-paragraphNode');
    
    if (!cmLines.length && !veLines.length) {
        cmLines = document.querySelectorAll('.cm-line');
        veLines = document.querySelectorAll('.ve-ce-branchNode.ve-ce-paragraphNode');
    }
    
    var allLines = Array.prototype.slice.call(cmLines).concat(Array.prototype.slice.call(veLines));
    
    allLines.forEach(function(line) {
        var walker = document.createTreeWalker(
            line,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        var node;
        while (node = walker.nextNode()) {
            var normalizedText = normalizeText(node.textContent);
            if (normalizedText !== node.textContent) {
                node.textContent = normalizedText;
            }
        }
    });
}

// Initialize normalization
document.addEventListener('DOMContentLoaded', processLinesWithNormalization);
setInterval(processLinesWithNormalization, 30000);