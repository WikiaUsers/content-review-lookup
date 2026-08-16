(function() {
    'use strict';

    if (window.mw && mw.config) {
        const action = mw.config.get('wgAction');
        if (['edit', 'submit'].includes(action)) return;
    }

    if (window.inlineCopyableLoaded) return;
    window.inlineCopyableLoaded = true;

    const config = Object.assign({
        maxLength: 60,
        excludeSelectors: [
            'pre code',
            '.no-copy',
            '.ace_editor',
            '.CodeMirror',
            '.ve-ui-surface',
            '.mw-editform'
        ],
        tooltipText: '✔️',
        requireExplicitClass: true
    }, window.inlineCopyableConfig || {});

    const initInlineCopyable = () => {
        if (!document.getElementById('inline-copyable-styles')) {
            const style = document.createElement('style');
            style.id = 'inline-copyable-styles';
            style.textContent = `
                .inline-copyable {
                    font-family: "Consolas", "Monaco", "Andale Mono", monospace;
                    background-color: var(--ic-bg-static, rgba(var(--theme-accent-color--rgb, 36, 129, 204), 0.1));
                    color: var(--ic-fg-static, var(--theme-accent-color, #2481cc));
                    border: 1px solid var(--ic-border-static, rgba(var(--theme-accent-color--rgb, 36, 129, 204), 0.2));
                    padding: 1px 5px;
                    border-radius: 4px;
                    cursor: pointer;
                    display: inline-block;
                    position: relative;
                    -webkit-tap-highlight-color: transparent;
                    transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, transform 0.1s ease;
                }
                .inline-copyable:active,
                .inline-copyable.is-active {
                    transform: scale(0.96);
                    background-color: var(--ic-bg-active, rgba(var(--theme-accent-color--rgb, 36, 129, 204), 0.25));
                }
                .inline-copyable.is-success {
                    color: var(--ic-fg-success, #31b545) !important;
                    background-color: var(--ic-bg-success, rgba(49, 181, 69, 0.15)) !important;
                    border-color: var(--ic-border-success, rgba(49, 181, 69, 0.3)) !important;
                }
                .inline-copyable[data-tooltip]:not([data-tooltip=""])::after {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: calc(100% + 6px);
                    left: 50%;
                    transform: translateX(-50%) translateY(4px);
                    background-color: #111;
                    color: #fff;
                    padding: 3px 6px;
                    font-size: 11px;
                    font-family: sans-serif;
                    border-radius: 3px;
                    white-space: nowrap;
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;
                    transition: opacity 0.2s ease, transform 0.2s ease;
                    z-index: 999999;
                }
                .inline-copyable.is-success[data-tooltip]:not([data-tooltip=""])::after {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(-50%) translateY(0);
                }
            `;
            document.head.appendChild(style);
        }

        const processContent = (root = document) => {
            const excludes = Array.isArray(config.excludeSelectors) 
                ? config.excludeSelectors 
                : (typeof config.excludeSelectors === 'string' ? config.excludeSelectors.split(',').map(s => s.trim()) : []);
            
            const notClauses = excludes.map(sel => `:not(${sel})`).join('');
            const baseSelector = config.requireExplicitClass 
                ? '.inline-copyable' 
                : `code:not(.inline-copyable)${notClauses}, .inline-copyable`;
            const selector = config.requireExplicitClass 
                ? `${baseSelector}${notClauses}` 
                : baseSelector;
            
            const container = (window.jQuery && root instanceof jQuery) ? root.get(0) : root;
            if (!container || typeof container.querySelectorAll !== 'function') return;

            container.querySelectorAll(selector).forEach((el) => {
                if (el.dataset.icProcessed === 'true') return;

                const text = el.textContent.trim();
                if (text.length > 0 && text.length <= config.maxLength && !el.querySelector('div, p, br')) {
                    el.dataset.icProcessed = 'true';
                    el.classList.add('inline-copyable');
                    if (!el.hasAttribute('data-tooltip')) {
                        el.setAttribute('data-tooltip', config.tooltipText);
                    }
                }
            });
        };

        const animateSuccess = (element) => {
            element.classList.add('is-success');
            setTimeout(() => element.classList.remove('is-success'), 800);
        };

        const fallbackCopyText = (text, target) => {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                if (document.execCommand('copy')) {
                    animateSuccess(target);
                } else {
                    console.error('InlineCopyable: Fallback copy failed');
                }
            } catch (err) {
                console.error('InlineCopyable: Fallback error:', err);
            }
            document.body.removeChild(textarea);
        };

        const copyText = (target) => {
            if (!target.hasAttribute('data-tooltip')) {
                target.setAttribute('data-tooltip', config.tooltipText);
            }

            const textToCopy = target.textContent.trim();

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy)
                    .then(() => animateSuccess(target))
                    .catch(() => fallbackCopyText(textToCopy, target));
            } else {
                fallbackCopyText(textToCopy, target);
            }
        };

        processContent(document);

        if (window.mw && mw.hook) {
            mw.hook('wikipage.content').add(($content) => {
                processContent($content);
            });
        }

        if (!window.inlineCopyableEventBound) {
            window.inlineCopyableEventBound = true;
            
            const handleCopyAction = (event) => {
                const target = event.target.closest('.inline-copyable');
                if (target) {
                    event.preventDefault();
                    copyText(target);
                }
            };

            document.addEventListener('click', handleCopyAction);
            document.addEventListener('touchend', handleCopyAction, { passive: false });
        }
    };

    if (window.mw && mw.loader) {
        mw.loader.using(['mediawiki.util'], () => {
            initInlineCopyable();
        });
    } else {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initInlineCopyable);
        } else {
            initInlineCopyable();
        }
    }
})();