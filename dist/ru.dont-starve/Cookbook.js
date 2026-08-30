(function () {
    'use strict';

    var CATEGORY_BUTTON_SELECTOR = [
        '#cb_buttonmeat',
        '#cb_buttonveggie',
        '#cb_buttonall',
        '#cb_buttonother'
    ].join(', ');

    var CATEGORY_MODES = {
        cb_buttonmeat: [
            { selector: '.cbmeat', hidden: false },
            { selector: '.cbveggie', hidden: true },
            { selector: '.cbother', hidden: true }
        ],
        cb_buttonveggie: [
            { selector: '.cbmeat', hidden: true },
            { selector: '.cbother', hidden: true },
            { selector: '.cbveggie', hidden: false }
        ],
        cb_buttonall: [
            { selector: '.cbmeat', hidden: false },
            { selector: '.cbveggie', hidden: false },
            { selector: '.cbother', hidden: false }
        ],
        cb_buttonother: [
            { selector: '.cbmeat', hidden: true },
            { selector: '.cbveggie', hidden: true },
            { selector: '.cbother', hidden: false }
        ]
    };

    function selectAll(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    function markOnce(element, marker) {
        var attribute = 'data-cookbook-' + marker;

        if (element.getAttribute(attribute) === 'true') {
            return false;
        }

        element.setAttribute(attribute, 'true');
        return true;
    }

    function setDisplay(selector, value) {
        selectAll(selector).forEach(function (element) {
            element.style.display = value;
        });
    }

    function applyCategoryMode(activeButtonId) {
        CATEGORY_MODES[activeButtonId].forEach(function (operation) {
            selectAll(operation.selector).forEach(function (element) {
                element.classList.toggle('recipearrow', operation.hidden);
            });
        });

        selectAll(CATEGORY_BUTTON_SELECTOR).forEach(function (button) {
            var isActive = button.id === activeButtonId;

            button.classList.toggle('button', !isActive);
            button.classList.toggle('buttoncb', isActive);
        });
    }

    function applyWarlyMode(mode) {
        if (mode === 'default') {
            setDisplay('.foodlist.cbdefault', '');
            selectAll('#cbdefault').forEach(function (button) {
                button.classList.add('active');
            });
            setDisplay('.foodlist.warly', 'none');
            selectAll('#shef').forEach(function (button) {
                button.classList.remove('active');
            });
            return;
        }

        setDisplay('.foodlist.cbdefault', 'none');
        selectAll('#cbdefault').forEach(function (button) {
            button.classList.remove('active');
        });
        setDisplay('.foodlist.warly', '');
        selectAll('#shef').forEach(function (button) {
            button.classList.add('active');
        });
    }

    function bindCategoryButtons() {
        Object.keys(CATEGORY_MODES).forEach(function (buttonId) {
            selectAll('#' + buttonId).forEach(function (button) {
                if (!markOnce(button, 'category-bound')) {
                    return;
                }

                button.addEventListener('click', function () {
                    applyCategoryMode(buttonId);
                });
            });
        });
    }

    function bindWarlyButtons() {
        selectAll('#cbdefault').forEach(function (button) {
            if (!markOnce(button, 'warly-bound')) {
                return;
            }

            button.addEventListener('click', function () {
                applyWarlyMode('default');
            });
        });

        selectAll('#shef').forEach(function (button) {
            if (!markOnce(button, 'warly-bound')) {
                return;
            }

            button.addEventListener('click', function () {
                applyWarlyMode('warly');
            });
        });
    }

    function initCookbookSorting() {
        bindCategoryButtons();
        bindWarlyButtons();
    }

    function start() {
        if (window.mw && typeof window.mw.hook === 'function') {
            window.mw.hook('wikipage.content').add(function () {
                initCookbookSorting();
            });
            return;
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCookbookSorting, { once: true });
        } else {
            initCookbookSorting();
        }
    }

    start();
}());