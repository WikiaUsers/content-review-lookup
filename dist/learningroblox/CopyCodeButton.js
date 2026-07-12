;(function () {
    'use strict';

    // Đã bỏ chặn navigator.clipboard ở đây để đảm bảo nút luôn được render trên Mobile
    if (window.copyButtonLoaded) return;
    window.copyButtonLoaded = true;

    function init() {
        const classNames = {
            copyButton: 'copy-code',
            toggleButton: 'toggle-code',
            copyIcon: 'copy-icon',
            toggleIcon: 'toggle-icon'
        };

        const copyIconHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="${classNames.copyIcon}" height="18" viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
        const expandIconHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="${classNames.toggleIcon}" height="18" viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
        const collapseIconHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="${classNames.toggleIcon}" height="18" viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;

        // --- ĐÃ FIX TRIỆT ĐỂ: TÁCH BIỆT MŨI TÊN DỌC VÀ MŨI TÊN NGANG ---
        const customStyles = document.createElement('style');
        customStyles.innerHTML = `
            /* Cấu hình chung cho thanh cuộn */
            .roblox-code-card ::-webkit-scrollbar {
                width: 6px;   
                height: 6px;
            }
            .roblox-code-card ::-webkit-scrollbar-track {
                background: transparent;
            }
            .roblox-code-card ::-webkit-scrollbar-thumb {
                background-color: #808080;
                border-radius: 4px;
            }
            .roblox-code-card ::-webkit-scrollbar-thumb:hover {
                background-color: #595a5b;
            }
            
            .roblox-code-card ::-webkit-scrollbar-corner {
                background: transparent;
            }

            /* ==================== 1. THANH CUỘN DỌC (:vertical) ==================== */
            /* Mũi tên LÊN */
            .roblox-code-card ::-webkit-scrollbar-button:vertical:single-button:decrement {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6' fill='%23a0a0a0'%3E%3Cpolygon points='5,0 0,6 10,6'/%3E%3C/svg%3E") !important;
                background-repeat: no-repeat;
                background-position: center center;
                display: block;
                height: 12px;        
                background-size: 8px 5px;
            }
            /* Mũi tên XUỐNG */
            .roblox-code-card ::-webkit-scrollbar-button:vertical:single-button:increment {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6' fill='%23a0a0a0'%3E%3Cpolygon points='0,0 10,0 5,6'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: center center;
                display: block;
                height: 12px;        
                background-size: 8px 5px;
            }

            /* ==================== 2. THANH CUỘN NGANG (:horizontal) ==================== */
            /* Mũi tên SANG TRÁI */
            .roblox-code-card ::-webkit-scrollbar-button:horizontal:single-button:decrement {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 10' fill='%23a0a0a0'%3E%3Cpolygon points='6,0 6,10 0,5'/%3E%3C/svg%3E") !important;
                background-repeat: no-repeat;
                background-position: center center;
                display: block;
                width: 12px;        /* Thanh ngang thì chỉnh độ rộng vùng bấm */
                background-size: 5px 8px; /* Hình tam giác nằm ngang tương ứng */
            }
            /* Mũi tên SANG PHẢI */
            .roblox-code-card ::-webkit-scrollbar-button:horizontal:single-button:increment {
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 6 10' fill='%23a0a0a0'%3E%3Cpolygon points='0,0 0,10 6,5'/%3E%3C/svg%3E") !important;
                background-repeat: no-repeat;
                background-position: center center;
                display: block;
                width: 12px;        
                background-size: 5px 8px;
            }
        `;
        document.head.appendChild(customStyles);

        function showNotification(msg, isError) {
            let toast = document.getElementById('roblox-toast-notify');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'roblox-toast-notify';
                toast.style.cssText = "position: fixed; bottom: 60px; left: 50%; transform: translateX(-50%); padding: 12px 24px; border-radius: 30px; font-family: Builder Sans,Helvetica, Arial, san-serif; font-size: 14px;color: #ffffff; z-index: 9999999 !important; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; box-shadow: 0 4px 16px rgba(0,0,0,0.4); text-align: center; width: max-content; max-width: 85%;";
                document.body.appendChild(toast);
            }
            toast.style.backgroundColor = isError ? "#F44336" : "#25272c";
            toast.innerText = msg;
            toast.style.opacity = '1';
            setTimeout(() => { toast.style.opacity = '0'; }, 2500);
        }

        // --- PHƯƠNG ÁN DỰ PHÒNG CHO MOBILE ---
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
                if (successful) {
                    showNotification("Text copied to clipboard", false);
                } else {
                    showNotification("Unable Copy", true);
                }
            } catch (err) {
                showNotification("Error", true);
            }
            document.body.removeChild(textArea);
        }

        // --- HÀM COPY CHÍNH ---
        function copyCode(button) {
            const table = button._table;
            if (!table) return;

            const rows = table.querySelectorAll('.roblox-code-content');
            let content = Array.from(rows).map(row => row.innerText).join('\n');

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(content).then(function() {
                    showNotification("Text copied to clipboard", false);
                }).catch(function() {
                    fallbackCopyTextToClipboard(content);
                });
            } else {
                fallbackCopyTextToClipboard(content);
            }
        }

        const commonButtonStyle = "position: relative !important; cursor: pointer !important; border: none !important; background: transparent !important; display: flex !important; align-items: center !important; justify-content: center !important; padding: 8px !important; margin: 0 !important; color: #a0a0a0 !important; height: 36px !important; width: 36px !important; border-radius: 8px !important; outline: none !important; z-index: 99999 !important; -webkit-tap-highlight-color: transparent !important; touch-action: manipulation !important;";

        mw.hook('wikipage.content').add(function($content) {
            $content.find('.roblox-code-card').each(function() {
                const card = this;
                const header = card.querySelector('.roblox-header');
                const table = card.querySelector('.roblox-code-table');
                const scrollWrapper = card.querySelector('.roblox-code-scroll');

                if (!table || card.querySelector('.' + classNames.copyButton)) return;

                const lineCount = table.querySelectorAll('.roblox-code-row').length;
                const isLongCode = lineCount >= 18;

                if (isLongCode && scrollWrapper) {
                    scrollWrapper.style.maxHeight = "400px";
                    scrollWrapper.style.overflowY = "auto";
                }

                const actionGroup = document.createElement('div');
                actionGroup.style.cssText = "display: flex !important; gap: 8px !important; align-items: center !important; z-index: 99999 !important;";

                // Nút Copy
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

                // Nút Toggle
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
                    });
                    actionGroup.appendChild(toggleButton);
                }

                // Gắn vào Header
                if (header) {
                    header.style.display = "flex";
                    header.style.justifyContent = "space-between";
                    header.style.alignItems = "center";
                    header.appendChild(actionGroup);
                } else {
                    card.insertBefore(actionGroup, table);
                }
            });
        });
    }

    if (window.mw) init();
})();