/*Script for RatedReasons that allows people to select the admins they want to send their ratings to*/
(function () {
    'use strict';

    if (window.RatedReasonsAdminSelectorLoaded) {
        return;
    }
    window.RatedReasonsAdminSelectorLoaded = true;

    if (typeof importArticle === 'function') {
        importArticle({ type: 'style', article: 'u:dev:MediaWiki:RatedReasons/AdminSelect.css' });
    }

    let closeCurrent = null;

    function create(tag, className, text) {
        const node = document.createElement(tag);

        node.className = className;

        if (text !== undefined) {
            node.textContent = text;
        }

        return node;
    }

    function createButton(className, text) {
        const node = create('button', 'ratedreasons-select-button ' + className, text);

        node.type = 'button';

        return node;
    }

    window.RatedReasonsRecipientSelector = function (users) {
        return new Promise(function (resolve) {
            if (closeCurrent) {
                closeCurrent(null);
            }

            const previousFocus = document.activeElement;

            const sorted = users.slice().sort(function (a, b) {
                return String(a.name).localeCompare(String(b.name), undefined, { sensitivity: 'base' });
            });

            const overlay = create('div', 'ratedreasons-select-overlay');
            overlay.id = 'ratedreasons-admin-selector';

            const panel = create('div', 'ratedreasons-select-panel');
            panel.setAttribute('role', 'dialog');
            panel.setAttribute('aria-modal', 'true');
            panel.setAttribute('aria-labelledby', 'ratedreasons-select-title');
            panel.setAttribute('aria-describedby', 'ratedreasons-select-description');

            const heading = create('h2', 'ratedreasons-select-title', 'Choose administrators to notify');
            heading.id = 'ratedreasons-select-title';

            const description = create(
                'p',
                'ratedreasons-select-description',
                'Select one or more administrators who should receive this rating reason.'
            );
            description.id = 'ratedreasons-select-description';

            const tools = create('div', 'ratedreasons-select-tools');
            const list = create('div', 'ratedreasons-select-list');
            const hint = create('p', 'ratedreasons-select-hint');
            hint.setAttribute('aria-live', 'polite');

            const actions = create('div', 'ratedreasons-select-actions');
            const cancel = createButton('ratedreasons-select-skip', 'Skip notification');
            const send = createButton('ratedreasons-select-send', 'Send to selected');

            const checkboxes = sorted.map(function (user) {
                const label = create('label', 'ratedreasons-select-item');
                const checkbox = document.createElement('input');

                checkbox.type = 'checkbox';
                checkbox.value = user.name;
                checkbox.addEventListener('change', update);

                label.appendChild(checkbox);
                label.appendChild(create('span', 'ratedreasons-select-name', user.name));
                list.appendChild(label);

                return checkbox;
            });

            function selectedNames() {
                return checkboxes.filter(function (box) {
                    return box.checked;
                }).map(function (box) {
                    return box.value;
                });
            }

            function setAll(checked) {
                checkboxes.forEach(function (box) {
                    box.checked = checked;
                });

                update();
            }

            function update() {
                const count = selectedNames().length;

                send.disabled = count === 0;
                hint.textContent = count
                    ? count + ' selected.'
                    : 'Select at least one administrator, or choose Skip notification.';
            }

            function finish(value) {
                document.removeEventListener('keydown', onKeydown, true);
                document.documentElement.classList.remove('ratedreasons-select-open');
                overlay.remove();
                closeCurrent = null;

                if (
                    previousFocus &&
                    previousFocus !== document.body &&
                    document.contains(previousFocus) &&
                    typeof previousFocus.focus === 'function'
                ) {
                    previousFocus.focus();
                }

                resolve(value);
            }

            function onKeydown(event) {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    event.stopPropagation();
                    finish(null);
                    return;
                }

                if (event.key !== 'Tab') {
                    return;
                }

                const focusable = Array.prototype.filter.call(
                    panel.querySelectorAll('input, button'),
                    function (node) {
                        return !node.disabled;
                    }
                );

                if (!focusable.length) {
                    event.preventDefault();
                    return;
                }

                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                const active = document.activeElement;

                if (!panel.contains(active)) {
                    event.preventDefault();
                    first.focus();
                } else if (event.shiftKey && active === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && active === last) {
                    event.preventDefault();
                    first.focus();
                }
            }

            cancel.addEventListener('click', function () {
                finish(null);
            });

            send.addEventListener('click', function () {
                const selected = selectedNames();

                if (selected.length) {
                    finish(selected);
                }
            });

            overlay.addEventListener('mousedown', function (event) {
                if (event.target === overlay) {
                    event.preventDefault();
                }
            });

            if (checkboxes.length > 1) {
                const all = createButton('ratedreasons-select-all', 'Select all');
                const none = createButton('ratedreasons-select-none', 'Clear');

                all.addEventListener('click', function () {
                    setAll(true);
                });

                none.addEventListener('click', function () {
                    setAll(false);
                });

                tools.appendChild(all);
                tools.appendChild(none);
            }

            if (!checkboxes.length) {
                list.appendChild(create('p', 'ratedreasons-select-empty', 'No eligible administrators were found.'));
                hint.hidden = true;
            }

            update();

            actions.appendChild(cancel);
            actions.appendChild(send);
            panel.appendChild(heading);
            panel.appendChild(description);
            panel.appendChild(tools);
            panel.appendChild(list);
            panel.appendChild(hint);
            panel.appendChild(actions);
            overlay.appendChild(panel);

            closeCurrent = finish;
            document.addEventListener('keydown', onKeydown, true);
            document.documentElement.classList.add('ratedreasons-select-open');
            document.body.appendChild(overlay);

            (checkboxes[0] || cancel).focus();
        });
    };
}());