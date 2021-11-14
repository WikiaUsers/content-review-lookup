/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* Анимация фавикона */
importArticles({
    type: 'script',
    articles: [
        'u:ru.sociophobiatest:MediaWiki:IconAnimation.js',
    ]
});

/* Анимация стрелочки при клике */
$('.arrow').on('click', function() {
    $(this).toggleClass('clicked');
});