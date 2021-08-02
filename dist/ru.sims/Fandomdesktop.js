/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

importArticles({    type: 'script',    articles: [
        'u:dev:MediaWiki:AdminDashboard JS-Button/code.js',
        'u:dev:MediaWiki:UserBadge/code.js',
    ]});

/* Блокировка ссылки конфигурации */

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;