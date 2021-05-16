window.AddRailModule = [{prepend: true}];

mw.hook('Discord.widget.rail').add(function() {
  if ($('section.rail-module.activity-module').length)
    $('section.rail-module.discord-module').insertAfter('section.rail-module.activity-module');
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:SeeMoreActivityButton/code.js',
        'u:dev:MediaWiki:Sofix.js',
    ]
});