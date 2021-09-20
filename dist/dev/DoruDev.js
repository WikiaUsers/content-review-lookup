/* DoruDev
 *
 * Development tool for running code on document ready
 *
 * @author Dorumin
 */

(function() {
    var loading = [
        'preact',
        'dorui',
        'modal',
        'api',
        'css'
    ];
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
    var ui;
    var preact;
    var h;
    var tags;
    var useEffect;
    var useState;

    function TextZone(props) {
        var changed = useState(false);
        var errored = useState(false);
        var input = useState(settings.get(props.type) || '');

        useEffect(function() {
            try {
                settings.set(props.type, input.value);
            } catch(e) {
                errored.set(true);
            }
        }, [props.type, input.value]);

        return tags.div({
            children: [
                'Add your ' + props.type + ' to the following textarea',
                tags.textarea({
                    class: 'code-textarea',
                    value: input.value,
                    onInput: function(e) {
                        changed.set(true);
                        input.set(e.target.value);
                    },
                    onFocus: function(e) {
                        e.target.select();
                    }
                }),
                changed.value && tags.div({
                    child: 'You will have to reload the page for the ' + props.type + ' to take effect'
                }),
                errored.value && tags.div({
                    child: 'Storing to localStorage failed. Your browser is blocking the script from being saved, please clear your browsing data.'
                })
            ]
        });
    }

    function EnabledCheckbox() {
        var enabled = useState(settings.get('enabled') === true);

        useEffect(function() {
            settings.set('enabled', enabled.value);
        }, [enabled.value]);

        return tags.div({
            children: [
                tags.input({
                    type: 'checkbox',
                    id: 'DoruDev-enable-checkbox',
                    checked: enabled.value,
                    onInput: function(e) {
                        enabled.set(e.target.checked);
                    }
                }),
                tags.label({
                    for: 'DoruDev-enable-checkbox',
                    child: 'Let the script run code'
                })
            ]
        });
    }

    function DoruDev() {
        return preact.frag([
            'I hope your code is not as bad as last time',
            h(EnabledCheckbox),
            h(TextZone, { type: 'js' }),
            h(TextZone, { type: 'css' })
        ]);
    }

    function showModal() {
        var root;
        var $modal = dev.showCustomModal('DoruDev', {
            width: 500,
            content: root = ui.div({
                id: 'DoruDev-root'
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

        preact.render(
            h(DoruDev),
            root
        );
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
            case 'preact':
                preact = arg;
                h = preact.h;
                tags = preact.tags;
                useEffect = preact.useEffect;
                useState = preact.useState;
                break;
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
                'u:dev:MediaWiki:Preact.js',
                'u:dev:MediaWiki:ShowCustomModal.js'
            ]
        });

        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:DoruDev.css'
        }).then(onload.bind(null, 'css'));

        mw.hook('doru.ui').add(onload.bind(null, 'dorui'));
        mw.hook('dev.preact').add(onload.bind(null, 'preact'));
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