nkch_gst_gadgets = [{
    name: "PoziomyWon", // Title of the gadget from MediaWiki:Gadgets-definition; required
    title: "Nie wyświetlaj poziomów", // Name of the gadget in dropdown
    description: "Nie wyświetlaj informacji o poziomach artykułu" // Description of the gadget on hover
}, {
    name: "CollapseTools",
    title: "Zwijaj moduł narzędzi",
    description: "Zezwól na zwijanie modułu narzędzi, aby zaoszczędzić miejsce"
}];

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:GadgetsStateToggler.js',
    ]
});