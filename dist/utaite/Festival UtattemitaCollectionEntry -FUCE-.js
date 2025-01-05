(function() {
    'use strict';

    // Only run on Festival/Utattemita Collection pages
    if (!mw.config.get('wgPageName').includes('Festival/Utattemita_Collection')) {
        return;
    }

    var style = document.createElement('style');
    style.textContent = '\
        :root {\
            --FUCE-modal-bg: #ffffff;\
            --FUCE-modal-text: #333333;\
            --FUCE-input-bg: #ffffff;\
            --FUCE-input-border: #cccccc;\
            --FUCE-input-text: #333333;\
            --FUCE-button-bg: #3366cc;\
            --FUCE-button-hover: #2850a7;\
            --FUCE-button-text: #ffffff;\
            --FUCE-button-disabled-bg: #94a3b8;\
            --FUCE-button-disabled-text: #e2e8f0;\
            --FUCE-error-text: #dc2626;\
            --FUCE-toast-bg: #333333;\
            --FUCE-toast-text: #4ade80;\
        }\
        [data-theme="dark"] {\
            --FUCE-modal-bg: #1f2937;\
            --FUCE-modal-text: #e5e7eb;\
            --FUCE-input-bg: #374151;\
            --FUCE-input-border: #4b5563;\
            --FUCE-input-text: #e5e7eb;\
            --FUCE-button-bg: #3b82f6;\
            --FUCE-button-hover: #2563eb;\
            --FUCE-button-text: #ffffff;\
            --FUCE-button-disabled-bg: #475569;\
            --FUCE-button-disabled-text: #94a3b8;\
            --FUCE-error-text: #ef4444;\
            --FUCE-toast-bg: #1f2937;\
            --FUCE-toast-text: #34d399;\
        }\
        .fuce-generate-button {\
            background: var(--FUCE-button-bg) !important;\
            color: var(--FUCE-button-text) !important;\
            padding: 8px 16px !important;\
            border-radius: 4px !important;\
            border: none !important;\
            cursor: pointer !important;\
            font-weight: 500 !important;\
            transition: background-color 0.2s ease !important;\
            margin-left: 8px !important;\
        }\
        .fuce-generate-button:hover {\
            background: var(--FUCE-button-hover) !important;\
        }\
        .fuce-copy-button {\
            width: 100%;\
            padding: 8px;\
            background: var(--FUCE-button-bg);\
            color: var(--FUCE-button-text);\
            border: none;\
            border-radius: 4px;\
            cursor: pointer;\
            font-weight: 500;\
            transition: all 0.2s ease;\
        }\
        .fuce-copy-button:hover {\
            background: var(--FUCE-button-hover);\
        }\
        .fuce-copy-button:disabled {\
            background: var(--FUCE-button-disabled-bg);\
            color: var(--FUCE-button-disabled-text);\
            cursor: not-allowed;\
            opacity: 0.8;\
        }';
    document.head.appendChild(style);

    function createButton() {
        var button = document.createElement('button');
        button.className = 'oo-ui-buttonElement-button fuce-generate-button';
        button.textContent = 'Generate FUCE';
        button.type = 'button';
        
        var previewButton = document.querySelector('.ve-ui-summaryPanel-previewButton');
        if (previewButton) {
            previewButton.parentNode.insertBefore(button, previewButton.nextSibling);
        }

        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showModal();
        });
    }

    function createModal() {
        var modal = document.createElement('div');
        modal.innerHTML = '\
            <div class="fuce-modal-overlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10000;">\
                <div class="fuce-modal-content" style="background: var(--FUCE-modal-bg); color: var(--FUCE-modal-text); padding: 20px; border-radius: 8px; width: 400px; max-width: 90%; position: relative;">\
                    <button type="button" class="fuce-modal-close" style="position: absolute; right: 10px; top: 10px; border: none; background: none; color: var(--FUCE-modal-text); cursor: pointer;">×</button>\
                    <h2 style="margin-bottom: 15px;">FUCE Generator</h2>\
                    <div style="margin-bottom: 10px;">\
                        <label style="display: block; margin-bottom: 5px;">Ranking</label>\
                        <input type="number" id="fuce-rank" style="width: 100%; padding: 5px; margin-bottom: 5px; background: var(--FUCE-input-bg); color: var(--FUCE-input-text); border: 1px solid var(--FUCE-input-border); border-radius: 4px;">\
                        <div id="fuce-rank-error" style="color: var(--FUCE-error-text); font-size: 12px; display: none;">Ranking must not exceed 100</div>\
                    </div>\
                    <div style="margin-bottom: 10px;">\
                        <label style="display: block; margin-bottom: 5px;">Song Title</label>\
                        <input type="text" id="fuce-title" style="width: 100%; padding: 5px; margin-bottom: 10px; background: var(--FUCE-input-bg); color: var(--FUCE-input-text); border: 1px solid var(--FUCE-input-border); border-radius: 4px;">\
                    </div>\
                    <div style="margin-bottom: 10px;">\
                        <label style="display: block; margin-bottom: 5px;">Utaite</label>\
                        <input type="text" id="fuce-utaite" value=[[utaite]] style="width: 100%; padding: 5px; margin-bottom: 10px; background: var(--FUCE-input-bg); color: var(--FUCE-input-text); border: 1px solid var(--FUCE-input-border); border-radius: 4px;">\
                    </div>\
                    <div style="margin-bottom: 10px;">\
                        <label style="display: block; margin-bottom: 5px;">NND Video ID</label>\
                        <input type="text" id="fuce-videoid" style="width: 100%; padding: 5px; margin-bottom: 10px; background: var(--FUCE-input-bg); color: var(--FUCE-input-text); border: 1px solid var(--FUCE-input-border); border-radius: 4px;">\
                    </div>\
                    <button type="button" id="fuce-copy" class="fuce-copy-button">Copy FUCE</button>\
                </div>\
            </div>';

        document.body.appendChild(modal);
        
        var closeBtn = modal.querySelector('.fuce-modal-close');
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.remove();
        });

        // Rank validation
        var rankInput = modal.querySelector('#fuce-rank');
        var rankError = modal.querySelector('#fuce-rank-error');
        var copyBtn = modal.querySelector('#fuce-copy');
        
        rankInput.addEventListener('input', function() {
            var value = parseInt(this.value);
            if (value > 100) {
                rankError.textContent = 'Ranking must not exceed 100';
                rankError.style.display = 'block';
                copyBtn.disabled = true;
            } else if (value <= 0) {
                rankError.textContent = 'Ranking must be a positive number';
                rankError.style.display = 'block';
                copyBtn.disabled = true;
            } else {
                rankError.style.display = 'none';
                copyBtn.disabled = false;
            }
        });

        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            var rank = document.querySelector('#fuce-rank').value;
            // Additional validation before copying
            var rankValue = parseInt(rank);
            if (rankValue > 100 || rankValue <= 0) {
                return;
            }
            
            var title = document.querySelector('#fuce-title').value;
            var utaite = document.querySelector('#fuce-utaite').value;
            var videoId = document.querySelector('#fuce-videoid').value;

            var fuceText = '{{FUCE|' + rank + '|' + title + '|' + utaite + '|' + videoId + '}}';
            
            navigator.clipboard.writeText(fuceText).then(function() {
                showToast();
                modal.remove();
            });
        });

        var overlay = modal.querySelector('.fuce-modal-overlay');
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                modal.remove();
            }
        });
    }

    function showModal() {
        createModal();
    }

    function showToast() {
        var toast = document.createElement('div');
        toast.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: var(--FUCE-toast-bg); color: var(--FUCE-toast-text); padding: 10px 20px; border-radius: 4px; z-index: 10001;';
        toast.textContent = 'Copied to clipboard!';
        
        document.body.appendChild(toast);
        
        setTimeout(function() {
            toast.remove();
        }, 2000);
    }

    // Initialize when the edit interface is ready
    mw.hook('ve.activationComplete').add(function() {
        createButton();
    });
})();