(function() {
    'use strict';

    /*if (mw.config.get('wgAction') !== 'edit' && mw.config.get('wgAction') !== 'submit') {
        return;
    }*/

    function getCurrentTime() {
        const now = new Date();
        return [
            now.getUTCFullYear(),
            String(now.getUTCMonth() + 1).padStart(2, '0'),
            String(now.getUTCDate()).padStart(2, '0')
        ].join('-') + ' ' + [
            String(now.getUTCHours()).padStart(2, '0'),
            String(now.getUTCMinutes()).padStart(2, '0'),
            String(now.getUTCSeconds()).padStart(2, '0')
        ].join(':');
    }

    mw.hook('mw.templates.insert').add(function(templateName) {
        if (templateName === 'Test') {
            setTimeout(fillTimestamp, 100);
        }
    });

    mw.loader.using('mediawiki.template.mustache').then(function() {
        $(document).on('dialogopen', function(event, dialog) {
            if (dialog.$element.find('[data-template-name="Test"]').length) {
                setTimeout(fillTimestamp, 100);
            }
        });
    });

    function fillTimestamp() {
        const time = getCurrentTime();
        const timestampInput = document.querySelector('input[name="timestamp"]');
        if (timestampInput && !timestampInput.value) {
            timestampInput.value = time;
            timestampInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(fillTimestamp, 1000);
        });
    } else {
        setTimeout(fillTimestamp, 1000);
    }
})();