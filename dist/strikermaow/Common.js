console.log('COMMON.JS FILE LOADED - v2');

mw.loader.using(['jquery'], function () {
    var STORAGE_PREFIX = 'wikiCheckbox_';

    function getId(el) {
        return el.getAttribute('data-id') || 'idx_' + Array.prototype.indexOf.call(
            document.querySelectorAll('.wiki-checkbox'), el
        );
    }

    function applyState(el) {
        var id = getId(el);
        var saved = localStorage.getItem(STORAGE_PREFIX + id);
        if (saved === '1') {
            el.classList.add('checked');
            el.textContent = '✓';
        }
    }

    function toggle(el) {
        var id = getId(el);
        el.classList.toggle('checked');
        var isChecked = el.classList.contains('checked');
        el.textContent = isChecked ? '✓' : '';
        localStorage.setItem(STORAGE_PREFIX + id, isChecked ? '1' : '0');
    }

    function init() {
        document.querySelectorAll('.wiki-checkbox').forEach(applyState);
    }

    $(document).ready(function () {
        init();
        $(document).on('click', '.wiki-checkbox', function () {
            toggle(this);
        });
    });
});