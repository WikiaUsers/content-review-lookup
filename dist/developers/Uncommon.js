(function() {
    if (window.DiscardLoaded) return;
    if (mw.config.get('skin') !== 'fandommobile') return;

    window.DiscardLoaded = true;

    let ui;
    let discarding = false;
    function onload() {
        ui = window.dev.dorui;

        const nav = document.querySelector('.mobile-community-bar__menu-item[data-path="root"] ul');
        if (!nav) return;

        insert(nav);
        trackPointer();
    }

    function insert(nav) {
        let styles = mw.util.addCSS('').ownerNode;
        let anchor;
        const li = ui.li({
            children: [
                anchor = ui.a({
                    class: 'discard-button',
                    href: '#',
                    text: 'Discard',
                    events: {
                        click: function(e) {
                            e.preventDefault();

                            toggle(anchor, styles);
                        }
                    }
                })
            ]
        });

        nav.append(li);
    }

    function toggle(anchor, styles) {
        discarding = !discarding;

        if (discarding) {
            anchor.textContent = 'Discarding';
            styles.textContent = `
                .discarded {
                    display: none !important;
                    pointer-events: none !important;
                }
            `;
        } else {
            anchor.textContent = 'Discard';
            styles.textContent = '';
        }
    }

    function trackPointer() {
        document.addEventListener('click', function(e) {
            if (!discarding) return;
            if (!e.target) return;
            if (e.target.querySelector('.discard-button')) return;
            if (e.target.closest('.discard-button')) return;
            if (e.target.closest('.wds-dropdown__toggle') && e.target.closest('.wds-dropdown').querySelector('.discard-button')) return;

            e.preventDefault();
            e.stopPropagation();

            e.target.classList.add('discarded');
        }, { capture: true });
    }

    function main() {
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:Dorui.js'
            ]
        });

        mw.hook('doru.ui').add(onload);
    }

    main();
})();