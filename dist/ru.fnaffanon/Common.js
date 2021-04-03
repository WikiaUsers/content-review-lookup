/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/* Скрытие удалённых комментариев и их контента */
var interval = setInterval(function() {
    var $posts = $('#articleComments div[class^="Comment_wrapper"], #MessageWall div[class^="Message__wrapper"]');
    if ($posts.length) {
        clearInterval(interval);
        $posts.has('div[title="Deleted"]').hide();
    }
}, 100);