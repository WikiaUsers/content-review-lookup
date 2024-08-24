(function () {
    var contentZone = document.getElementById('FTFCharacterGenerator_zone');
    // Double runs
    if (contentZone === null || (window.FanonCharacterGenerator && FanonCharacterGenerator.loaded)) return;

    var ui;

    window.FanonCharacterGenerator = {
        loaded: true,
        personnalityTraits: [],
        chosenTraits: [],

        // List of dependencies
        loading: [
            'dorui'
        ],

        // Callback for each loaded dependency
        onload: function (key, arg) {
            switch (key) {
                case 'dorui':
                    ui = arg;
                    break;
            }

            var index = this.loading.indexOf(key);
            if (index === -1) throw new Error('Unregistered dependency loaded: ' + key);

            this.loading.splice(index, 1);

            if (this.loading.length !== 0) return;

            this.loadTraits();
        },

        // Import dependencies and bind to their hooks
        preload: function () {
            importArticles({
                type: 'script',
                articles: [
                    'u:dev:MediaWiki:Dorui.js'
                ]
            });
            mw.hook('doru.ui').add(this.onload.bind(this, 'dorui'));
        },

        loadTraits: function () {
            $.ajax({
                url: mw.util.wikiScript(),
                type: 'GET',
                data: {
                    action: 'raw',
                    title: 'MediaWiki:Custom-Personality-Traits',
                },
                success: function (settings) {
                    try {
                        this.personnalityTraits = JSON.parse(settings);
                    } catch (ex) {
                        console.error('Can\'t parse json', {
                            ex: ex,
                            data: settings
                        });
                    }
                }
            }).done(this.init);
        },

        // Function that will be called when all dependencies are loaded
        init: function () {
            var textarea = ui.textarea({
                class: 'wds-input__field',
                id: 'FTFCharacterGenerator__traits',
                rows: '10'
            });
            var self = this;
            contentZone.append(
                ui.frag([
                    ui.div({
                        class: 'wds-pill',
                        child: ui.span({
                            class: 'wds-pill__label',
                            text: 'Nombre de traits disponibles : ' + this.personnalityTraits.length
                        })
                    }),
                    ui.div({
                        class: 'wds-input',
                        children: [
                            ui.label({
                                for: 'FTFCharacterGenerator__traits',
                                class: 'wds-input__label',
                                text: 'Traits de caractères:'
                            }),
                            textarea
                        ]
                    }),
                    ui.div({
                        classes: ['wds-input', 'has-hint'],
                        children: [
                            ui.label({
                                for: 'FTFCharacterGenerator__input-quantity',
                                class: 'wds-input__label',
                                text: 'Nombre de traits à générer :'
                            }),
                            ui.input({
                                id: 'FTFCharacterGenerator__input-quantity',
                                class: 'wds-input__field',
                                type: 'number',
                                value: '3'
                            }),
                            ui.div({
                                class: 'wds-input__hint-container',
                                child: ui.div({
                                    class: 'wds-input__hint',
                                    text: 'Saisissez un nombre > 0'
                                })
                            })
                        ]
                    }),
                    ui.div({
                        classes: ['wds-input', 'has-hint'],
                        child:
                            ui.button({
                                id: 'FTFCharacterGenerator__button',
                                class: 'wds-button',
                                text: 'Générer Caractère',
                                events: {
                                    click: function () {
                                        var copy = self.personnalityTraits.slice(0);
                                        var max = $("#FTFCharacterGenerator__input-quantity").val();
                                        if (max === undefined || max <= 0) { max = 3; }
                                        $("#FTFCharacterGenerator__traits").val('\n');

                                        for (var i = 0; i < max; i++) {
                                            if (copy.length < 1) { copy = self.personnalityTraits.slice(0); }
                                            var index = Math.floor(Math.random() * copy.length);
                                            var item = copy[index];
                                            copy.splice(index, 1);
                                            var textarea = $("#FTFCharacterGenerator__traits");
                                            textarea.val(textarea.val() + item + '\n');
                                        }
                                    },
                                }
                            })
                    })
                ]
                )
            )
        }
    }
    FanonCharacterGenerator.preload();
})();