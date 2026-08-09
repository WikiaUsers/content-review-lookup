;(function () {
    'use strict';

    if (window.robloxCodeEnhanced) return;
    window.robloxCodeEnhanced = true;

    const classNames = {
        copyButton: 'copy-code',
        toggleButton: 'toggle-code',
        copyIcon: 'copy-icon',
        toggleIcon: 'toggle-icon'
    };

    const copyIconHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="${classNames.copyIcon}" height="18" viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="10" width="10" height="10" rx="1.5" ry="1.5"></rect><path d="M14 10V5.5C14 4.67 13.33 4 12.5 4h-7C4.67 4 4 4.67 4 5.5v7C4 13.33 4.67 14 5.5 14H10"></path></svg>`;
    
    const expandIconHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="${classNames.toggleIcon}" height="18" viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 9 12 5 16 9"></polyline><polyline points="8 15 12 19 16 15"></polyline></svg>`;
    
    const collapseIconHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="${classNames.toggleIcon}" height="18" viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 5 12 9 16 5"></polyline><polyline points="8 19 12 15 16 19"></polyline></svg>`;

    function showNotification(msg, isError) {
        let toast = document.getElementById('roblox-toast-notify');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'roblox-toast-notify';
            toast.style.cssText = "position: fixed; bottom: 60px; left: 50%; transform: translateX(-50%); padding: 12px 24px; border-radius: 30px; font-family: Builder Sans, Helvetica, Arial, sans-serif; font-size: 14px; color: #ffffff; z-index: 9999999 !important; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; box-shadow: 0 4px 16px rgba(0,0,0,0.4); text-align: center; width: max-content; max-width: 85%;";
            document.body.appendChild(toast);
        }
        toast.style.backgroundColor = isError ? "#F44336" : "#25272c";
        toast.innerText = msg;
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.opacity = '0'; }, 2500);
    }

    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            showNotification(successful ? "Text copied to clipboard" : "Unable Copy", !successful);
        } catch (err) {
            showNotification("Error", true);
        }
        document.body.removeChild(textArea);
    }

    function copyCode(button) {
        const table = button._table;
        if (!table) return;
        const rows = table.querySelectorAll('.roblox-code-content');
        let content = Array.from(rows).map(row => row.innerText).join('\n');

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(content).then(() => {
                showNotification("Text copied to clipboard", false);
            }).catch(() => {
                fallbackCopyTextToClipboard(content);
            });
        } else {
            fallbackCopyTextToClipboard(content);
        }
    }

    const commonButtonStyle = "position: relative !important; cursor: pointer !important; border: none !important; background: transparent !important; display: flex !important; align-items: center !important; justify-content: center !important; padding: 6px !important; margin: 0 !important; color: #a0a0a0 !important; height: 32px !important; width: 32px !important; border-radius: 6px !important; outline: none !important; z-index: 99999 !important; -webkit-tap-highlight-color: transparent !important; touch-action: manipulation !important;";

    function initCard(card) {
        if (card.dataset.processed) return;
        const header = card.querySelector('.roblox-header');
        const table = card.querySelector('.roblox-code-table');
        const scrollWrapper = card.querySelector('.roblox-code-scroll');

        if (!table) return;
        card.dataset.processed = "true";

        const lineCount = table.querySelectorAll('.roblox-code-row').length;
        const isLongCode = lineCount >= 18;

        if (isLongCode && scrollWrapper) {
            scrollWrapper.style.maxHeight = "400px";
            scrollWrapper.style.overflowY = "auto";
        }

        const actionGroup = document.createElement('div');
        actionGroup.className = 'action-group';
        actionGroup.style.cssText = "display: flex !important; gap: 4px !important; align-items: center !important; z-index: 99999 !important; margin-left: auto !important;";

        if (isLongCode) {
            const toggleButton = document.createElement('button');
            toggleButton.className = classNames.toggleButton;
            toggleButton.style.cssText = commonButtonStyle;
            toggleButton.innerHTML = expandIconHTML; 

            let isExpanded = false;
            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                isExpanded = !isExpanded;
                scrollWrapper.style.maxHeight = isExpanded ? "none" : "400px";
                
                toggleButton.innerHTML = isExpanded ? collapseIconHTML : expandIconHTML;
                toggleButton.style.color = isExpanded ? "#ffffff" : "#a0a0a0";
            });
            actionGroup.appendChild(toggleButton);
        }

        const copyButton = document.createElement('button');
        copyButton.className = classNames.copyButton;
        copyButton.style.cssText = commonButtonStyle;
        copyButton.innerHTML = copyIconHTML;
        copyButton._table = table;
        copyButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            copyCode(copyButton);
        });
        actionGroup.appendChild(copyButton);

        if (header) {
            header.style.display = "flex";
            header.style.justifyContent = "space-between";
            header.style.alignItems = "center";
            header.appendChild(actionGroup);
        } else {
            card.insertBefore(actionGroup, table);
        }
    }

    function scanAndInit() {
        document.querySelectorAll('.roblox-code-card').forEach(initCard);
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {
                        if (node.classList && node.classList.contains('roblox-code-card')) {
                            initCard(node);
                        } else if (node.querySelectorAll) {
                            node.querySelectorAll('.roblox-code-card').forEach(initCard);
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scanAndInit);
    } else {
        scanAndInit();
    }

    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(() => {
            scanAndInit();
        });
    }
})();