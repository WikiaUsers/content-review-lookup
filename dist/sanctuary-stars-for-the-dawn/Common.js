/* Any JavaScript here will be loaded for all users on every page load. */
// <syntaxhighlight lang="javascript" defer requires="jquery">
$(document).ready(function() {
    console.log('CopytxtScript loaded - v1.4.7');
    var debug = true;
    var PREVIEW_CONTAINER_SELECTOR = '.oo-ui-window-content-setup';
    var BUTTON_SELECTOR = '.copy-to-clipboard-button';
    var PASTEBIN_API = 'https://api.allorigins.win/get?url='; // Changed to /get for JSON
    var SYMBOLS = {
        DEFAULT: '▶',
        SUCCESS: '✔',
        ERROR: '❌'
    };

    // Function to copy text with fallback
    function copyText(text, button) {
        return new Promise((resolve, reject) => {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(resolve).catch(reject);
            } else {
                var $input = $('<textarea>').val(text).appendTo('body').select();
                var success = document.execCommand('Copy');
                $input.remove();
                success ? resolve() : reject(new Error('Fallback copy failed'));
            }
        });
    }

    // Function to initialize button
    function initializeButton(button) {
        if (button.dataset.initialized) return;

        button.dataset.symbol = SYMBOLS.DEFAULT;
        // Ensure tooltip is always present
        if (!button.title) {
            button.title = button.dataset.content || 'Copy text';
        }
        button.addEventListener('click', function(event) {
            event.preventDefault();
            var content = button.dataset.content || '';
            if (debug) console.log('Copying text from button:', content.substring(0, 100) + (content.length > 100 ? '...' : ''));

            var isPastebinUrl = content.startsWith('http://pastebin.com/') || content.startsWith('https://pastebin.com/');
            var textToCopy = content;

            var handleClick = function() {
                if (isPastebinUrl) {
                    var controller = new AbortController();
                    var timeoutId = setTimeout(() => controller.abort(), 5000);
                    fetch(PASTEBIN_API + encodeURIComponent(content), { signal: controller.signal })
                        .then(response => {
                            clearTimeout(timeoutId);
                            if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
                            return response.json(); // Get JSON from /get
                        })
                        .then(data => {
                            var rawText = data.contents.trim();
                            if (rawText.startsWith('<!DOCTYPE html>') || rawText.includes('Just a moment')) {
                                throw new Error('Cloudflare CAPTCHA detected');
                            }
                            textToCopy = rawText;
                            return copyText(textToCopy, button);
                        })
                        .then(() => {
                            button.dataset.symbol = SYMBOLS.SUCCESS;
                        })
                        .catch(error => {
                            console.error('Failed to fetch or copy text:', error);
                            button.dataset.symbol = SYMBOLS.ERROR;
                            if (error.message.includes('CAPTCHA') || error.message.includes('Cloudflare')) {
                                button.title = 'Cloudflare CAPTCHA, try manually'; // Temporary tooltip
                                setTimeout(() => {
                                    button.title = button.dataset.content || 'Copy text';
                                    button.dataset.symbol = SYMBOLS.DEFAULT;
                                }, 5000);
                            } else {
                                setTimeout(() => {
                                    button.dataset.symbol = SYMBOLS.DEFAULT;
                                }, 2000);
                            }
                        });
                } else {
                    copyText(textToCopy, button)
                        .then(() => {
                            button.dataset.symbol = SYMBOLS.SUCCESS;
                        })
                        .catch(error => {
                            console.error('Failed to copy text:', error);
                            button.dataset.symbol = SYMBOLS.ERROR;
                        })
                        .then(() => {
                            setTimeout(() => {
                                button.dataset.symbol = SYMBOLS.DEFAULT;
                            }, 2000);
                        });
                }
            };

            handleClick();
        }, false);

        button.dataset.initialized = 'true';
        if (debug) console.log('Initialized button in preview:', button.dataset.content);
    }

    // Activation of buttons via animation (limited to preview)
    document.addEventListener('animationstart', function(e) {
        if (e.target.classList.contains('copy-to-clipboard-button')) {
            var previewContainer = document.querySelector(PREVIEW_CONTAINER_SELECTOR);
            if (previewContainer && previewContainer.contains(e.target)) {
                if (debug) console.log('Button detected via animation:', e.target.dataset.content);
                initializeButton(e.target);
            }
        }
    }, false);

    // Initialization of buttons on static pages (outside editor)
    if (!window.location.href.includes('action=edit')) {
        findAndInitializeButtons(document.body);
        if (debug) console.log('Initial scan for static page buttons complete.');
    }

    // Function to find and initialize buttons (used for static pages)
    function findAndInitializeButtons(container) {
        var buttons = container.querySelectorAll(BUTTON_SELECTOR);
        for (var i = 0; i < buttons.length; i++) {
            initializeButton(buttons[i]);
        }
    }
});
// </syntaxhighlight>