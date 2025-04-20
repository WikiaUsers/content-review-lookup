/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
importArticles({
    type: 'script',
    articles: [
        'u:dev:AddRailModule/code.js'
    ]
});


window.AddRailModule = [
    {page: 'Template:Foo', prepend: true},
    'Template:Bar',
    'Template:Baz',
];