/* DoruDev
 *
 * Development tool for running code on document ready
 *
 * @author Dorumin
 */

(function() {
    var loading = [
        'dorui',
        'modal',
        'api',
        'css'
    ];
    var ui;
    var settings = {
        inner: JSON.parse(localStorage.getItem('DoruDev-state') || '{}'),
        get: function(key) {
            return settings.inner[key];
        },
        set: function(key, value) {
            settings.inner[key] = value;
            localStorage.setItem('DoruDev-state',
                JSON.stringify(settings.inner)
            );
        }
    };

    function buildTextZone(type) {
        var reload;

        return ui.div({
            children: [
                'Add your ' + type + ' in the following textarea',
                ui.textarea({
                    class: 'code-textarea',
                    props: {
                        value: settings.get(type) || ''
                    },
                    events: {
                        input: function(e) {
                            settings.set(type, e.target.value);

                            reload.style.display = '';
                        }
                    }
                }),
                reload = ui.div({
                    style: {
                        display: 'none'
                    },
                    text: 'You will have to reload the page for the ' + type + ' to take effect'
                })
            ]
        });
    }

    function showModal() {
        var $modal = dev.showCustomModal('DoruDev', {
            width: 500,
            content: ui.div({
                children: [
                    'I hope your code is not as bad as last time',
                    ui.div({
                        children: [
                            ui.input({
                                type: 'checkbox',
                                id: 'DoruDev-enable-checkbox',
                                props: {
                                    checked: settings.get('enabled') === true
                                },
                                events: {
                                    input: function(e) {
                                        settings.set('enabled', e.target.checked);
                                    }
                                }
                            }),
                            ui.label({
                                for: 'DoruDev-enable-checkbox',
                                text: 'Let the script run code'
                            })
                        ]
                    }),
                    buildTextZone('js'),
                    buildTextZone('css')
                ]
            }),
            buttons: [
                {
                    message: 'Reload',
                    defaultButton: true,
                    handler: function() {
                        location.reload();
                    }
                },
                {
                    message: 'Close',
                    handler: function() {
                        dev.showCustomModal.closeModal($modal);
                    }
                }
            ]
        });
    }

    function init() {
        var tools = document.getElementById('my-tools-menu');
        if (tools === null) return;

        tools.appendChild(
            ui.li({
                class: 'custom',
                child: ui.a({
                    id: 'DoruDev-tools-button',
                    href: '#',
                    text: 'DoruDev'
                }),
                events: {
                    click: function(e) {
                        e.preventDefault();
                        showModal();
                    }
                }
            })
        );
    }

    function onload(label, arg) {
        switch (label) {
            case 'dorui':
                ui = arg;
                break;
            case 'api':
                api = new mw.Api();
                break;
        }

        var index = loading.indexOf(label);
        if (index === -1) {
            throw new Error('Unregistered dependency loaded: ' + label);
        }

        loading.splice(index, 1);

        if (loading.length === 0) {
            init();
        }
    }

    function preload() {
        importArticles({
            type: 'script',
            articles: [
                'u:dev:MediaWiki:Dorui.js',
                'u:dev:MediaWiki:ShowCustomModal.js'
            ]
        });

        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:DoruDev.css'
        }).then(onload.bind(null, 'css'));

        mw.hook('doru.ui').add(onload.bind(null, 'dorui'));
        mw.hook('dev.showCustomModal').add(onload.bind(null, 'modal'));
        mw.loader.using('mediawiki.api').then(onload.bind(null, 'api'));
    }

    function runScripts() {
        if (settings.get('enabled')) {
            if (settings.get('js')) {
                eval(settings.get('js'));
            }

            if (settings.get('css')) {
                mw.util.addCSS(settings.get('css'));
            }
        }
    }

    preload();
    runScripts();
})();