/* CopyCode function, used for Template:CopyCode */

(function () {
    'use strict';

    function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text);
        }

        return new Promise(function (resolve, reject) {
            var textarea = document.createElement('textarea');

            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';

            document.body.appendChild(textarea);

            textarea.focus();
            textarea.select();

            try {
                document.execCommand('copy');
                resolve();
            } catch (e) {
                reject(e);
            }

            document.body.removeChild(textarea);
        });
    }

    function activate(button) {
        var label = button.querySelector('.code-copy-label');
        var before = button.querySelector('.code-copy-before');
        var after = button.querySelector('.code-copy-after');
        var value = button.querySelector('.code-copy-value');

        if (!label || !before || !after || !value) {
            return;
        }

        var duration = parseInt(
            button.getAttribute('data-copy-duration'),
            10
        ) || 1500;

        copyText(value.textContent).then(function () {
            clearTimeout(button.copyCodeTimer);

            label.textContent = after.textContent;
            button.classList.add('code-copy-success');

            button.copyCodeTimer = setTimeout(function () {
                label.textContent = before.textContent;
                button.classList.remove('code-copy-success');
            }, duration);
        });
    }

    document.addEventListener('click', function (event) {
        var button = event.target.closest('.code-copy-button');

        if (button) {
            activate(button);
        }
    });

    document.addEventListener('keydown', function (event) {
        var button = event.target.closest('.code-copy-button');

        if (!button) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            activate(button);
        }
    });
})();