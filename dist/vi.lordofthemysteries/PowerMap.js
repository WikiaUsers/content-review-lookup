importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Dorui.js'
    ]
});

mw.hook('doru.ui').add(function(ui) {
    // Create title element
    var title = ui.h2({
        classes: ['welcome-title'],
        text: 'Welcome to My Wiki!'
    });

    // Create description element
    var description = ui.span({
        classes: ['welcome-description'],
        text: 'We’re glad you’re here. Explore and contribute!'
    });

    // Create container
    var widget = ui.div({
        classes: ['welcome-widget'],
        children: [title, description]
    });

    // Add to page content
    mw.util.$content.prepend(widget);
});