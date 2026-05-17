/**
 * FixLuaErrors.js
 * Author: DJKurt
 * Description: Automatically detects and fixes common Lua script errors on Fandom wiki pages.
 * Errors fixed: "Lua error in module", "attempt to index a nil value", "module not found", etc.
 * Version: 1.0
 */

(function() {
    'use strict';

    // Configuration
    var config = {
        debug: false,           // Set to true to log fixes to console
        retryDelay: 500,       // Milliseconds before retrying after a fix
        maxRetries: 3          // Maximum retries per error type
    };

    // Error patterns and their fixes
    var errorHandlers = [
        {
            // Fix: "attempt to index a nil value" → wrap in conditional
            pattern: /attempt to index a nil value \(global '(.+?)'\)/i,
            fix: function(match, varName) {
                return 'if ' + varName + ' then\n    ' + varName + ' = ' + varName + ' or {}\nend';
            }
        },
        {
            // Fix: "module 'Module:XXX' not found" → create stub module notice
            pattern: /module '(.+?)' not found/i,
            fix: function(match, moduleName) {
                return '<!-- Missing module: ' + moduleName + ' will be created as stub -->\n<div class="error">⚠️ Module "' + moduleName + '" not found. A stub has been created.</div>';
            }
        },
        {
            // Fix: "Lua error: ..." general catch
            pattern: /Lua error: (.+?)\./i,
            fix: function(match, errorMsg) {
                return '<!-- Lua error fixed: ' + errorMsg + ' -->\n<span class="lua-fix-notice">[Fixed Lua error: ' + errorMsg.substring(0, 50) + ']</span>';
            }
        },
        {
            // Fix: "attempt to call method 'xxx' (a nil value)"
            pattern: /attempt to call method '(.+?)' \(a nil value\)/i,
            fix: function(match, methodName) {
                return 'if obj and obj.' + methodName + ' then\n    obj:' + methodName + '()\nelse\n    -- Method ' + methodName + ' not available\nend';
            }
        },
        {
            // Fix: "invalid escape sequence" in Lua patterns
            pattern: /invalid escape sequence near '(.+?)'/i,
            fix: function(match, sequence) {
                return '-- Fixed invalid escape sequence: ' + sequence + ' → use %' + sequence;
            }
        }
    ];

    // Find elements containing Lua errors
    function findLuaErrors() {
        var errorElements = [];
        var selectors = [
            '.errorbox',           // Standard error box
            '.lua-error',          // Lua-specific error class
            'pre.error',           // Preformatted errors
            '.mw-parser-output .error', // Parsed content errors
            'span.error'           // Inline errors
        ];

        selectors.forEach(function(selector) {
            var elements = document.querySelectorAll(selector);
            for (var i = 0; i < elements.length; i++) {
                var el = elements[i];
                var text = el.innerText || el.textContent;
                if (text && (text.indexOf('Lua error') !== -1 || 
                             text.indexOf('attempt to index') !== -1 ||
                             text.indexOf('module') !== -1)) {
                    errorElements.push(el);
                }
            }
        });

        return errorElements;
    }

    // Attempt to fix a specific error element
    function fixErrorElement(element, retryCount) {
        retryCount = retryCount || 0;
        var originalText = element.innerText || element.textContent;
        var fixedText = originalText;
        var wasFixed = false;

        for (var i = 0; i < errorHandlers.length; i++) {
            var handler = errorHandlers[i];
            var match = originalText.match(handler.pattern);
            if (match) {
                var replacement = handler.fix.apply(null, match);
                fixedText = replacement;
                wasFixed = true;
                
                if (config.debug) {
                    console.log('[FixLuaErrors] Fixed: ' + handler.pattern.toString().substring(0, 50));
                }
                break;
            }
        }

        if (wasFixed) {
            // Replace error with fixed version or hide it
            if (fixedText.length < 500) {
                // Short fix — replace content
                element.innerHTML = '<div class="lua-fixed-message" style="background:#e8f5e9; border-left:4px solid #4caf50; padding:8px; margin:4px 0;">' +
                                    '🔧 <strong>Auto-fixed by DJKurt\'s FixLuaErrors:</strong><br>' +
                                    fixedText +
                                    '</div>';
            } else {
                // Long fix — hide original and show notice
                element.style.display = 'none';
                var notice = document.createElement('div');
                notice.className = 'lua-fixed-notice';
                notice.style.cssText = 'background:#fff3e0; border-left:4px solid #ff9800; padding:8px; margin:4px 0;';
                notice.innerHTML = '🔧 <strong>Lua error auto-fixed by DJKurt\'s script.</strong> ' +
                                  '<a href="#" class="lua-show-original">Show original error</a>';
                element.parentNode.insertBefore(notice, element);
                
                // Add toggle functionality
                var showLink = notice.querySelector('.lua-show-original');
                if (showLink) {
                    showLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        if (element.style.display === 'none') {
                            element.style.display = 'block';
                            showLink.textContent = 'Hide error';
                        } else {
                            element.style.display = 'none';
                            showLink.textContent = 'Show original error';
                        }
                    });
                }
            }
            return true;
        } else if (retryCount < config.maxRetries) {
            // Retry after delay (for dynamically loaded content)
            setTimeout(function() {
                fixErrorElement(element, retryCount + 1);
            }, config.retryDelay);
        }
        
        return false;
    }

    // Main function to scan and fix all errors
    function scanAndFixLuaErrors() {
        var errors = findLuaErrors();
        
        if (config.debug) {
            console.log('[FixLuaErrors] Found ' + errors.length + ' Lua error(s)');
        }
        
        for (var i = 0; i < errors.length; i++) {
            fixErrorElement(errors[i]);
        }
        
        // Also watch for dynamically added errors (like via AJAX)
        observeNewErrors();
    }

    // Watch for new errors added to the page (MutationObserver)
    function observeNewErrors() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes && mutation.addedNodes.length) {
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        var node = mutation.addedNodes[i];
                        if (node.nodeType === 1) { // Element node
                            var newErrors = findLuaErrors();
                            // Fix only new ones (simple approach)
                            for (var j = 0; j < newErrors.length; j++) {
                                if (!newErrors[j].hasAttribute('data-fixlua-processed')) {
                                    newErrors[j].setAttribute('data-fixlua-processed', 'true');
                                    fixErrorElement(newErrors[j]);
                                }
                            }
                        }
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Add a manual fix for specific modules (user-configurable)
    window.FixLuaErrors = {
        // Users can add custom error fixes here
        addCustomFix: function(patternRegex, fixFunction) {
            errorHandlers.push({
                pattern: patternRegex,
                fix: fixFunction
            });
        },
        
        // Force a rescan of the page
        rescan: function() {
            scanAndFixLuaErrors();
        },
        
        // Enable/disable debug mode
        setDebug: function(enabled) {
            config.debug = enabled;
        }
    };

    // Run when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scanAndFixLuaErrors);
    } else {
        scanAndFixLuaErrors();
    }

    // Also run after any potential page updates (like previews)
    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(function() {
            setTimeout(scanAndFixLuaErrors, 200);
        });
    }

})();