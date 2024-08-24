/* Adds secondary themes to single-mode Pokémon PIs with a secondary type */
$('aside.portable-infobox.type-pokemon').has('.pi-item[data-source="type"] img').each(function() {
    var $second = $(this).find('.pi-item[data-source="type"] img').eq(1);
    var attr    = $second.attr("data-image-name");
    if ($second.length === 0 || !attr) return;

    var type = attr.match(/Type (.*).gif/);

    if (type) {
        $(this).addClass('pi-theme-secondary-' + type[1]);
    }
});

/* Switches multi-mode (paneled) PI themes based on the types in each mode */
mw.loader.using('mediawiki.util').then(function () {
    var InfoboxTypeThemes = {
        updateInfoboxTypes: function(infobox, types) {
            if (!types.length) return; // fail silently if none are found

            for (var i = 0; i < infobox.classList.length; i++) {
                var cls = infobox.classList.item(i);

                if (cls && cls.slice(0, 9) === 'pi-theme-') {
                    // Note: .replace could be used, but browser support is abysmal
                    // Yes, even compared to MutationObserver and .classList
                    // You'd also need to deal with mutating the underlying data while looping over it, though inline replace should be safe
                    infobox.classList.remove(cls);
                    i--;
                }
            }

            if (types[1]) {
                infobox.classList.add('pi-theme-secondary-' + types[1]);
            }

            if (types[0]) {
                infobox.classList.add('pi-theme-' + types[0]);
            }
        },
        getInfoboxTypes: function(infobox) {
            var activeSection = infobox.querySelector('.pi-panel > .wds-is-current');
            var anchors = activeSection.querySelectorAll('.pi-data[data-item-name="type"] .pi-data-value a');
            var types = [];

            for (var i = 0; i < anchors.length; i++) {
                types.push(anchors[i].title.slice(0, -5));
            }

            return types;
        },
        updateTabs: function(infobox) {
            var types = this.getInfoboxTypes(infobox);

            this.updateInfoboxTypes(infobox, types);
        },
        observeChanges: function(target, infobox) {
            var observer = new MutationObserver(function(mutations) {
                this.updateTabs(infobox);
            }.bind(this));

            observer.observe(target, {
                // TODO: substitute subtree for childList and manual handling of child MOs
                attributes: true,
                subtree: true
            });
        },
        processInfobox: function(infobox) {
            var tabContainer = infobox.querySelector('.pi-panel');
            this.observeChanges(tabContainer, infobox);
            this.updateTabs(infobox);
        },
        findPanels: function(container) {
            var pokemonPanels = container.querySelectorAll('.type-pokemon[data-item-name="panel"]');
            
            for (var i = 0; i < pokemonPanels.length; i++) {
                this.processInfobox(pokemonPanels[i]);
            }
        },
        onContent: function($content, initial) {
            var content = $content.get(0);//,
            //mwContent = mw.util.$content.get(0);
            //if (!initial & content === mwContent) return;

            this.findPanels(content);
        },
        init: function() {
            //this.onContent(mw.util.$content, true);
            mw.hook('wikipage.content').add(this.onContent.bind(this));
        }
    };

    InfoboxTypeThemes.init();
});