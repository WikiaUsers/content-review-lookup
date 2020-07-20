importArticles({
   type: 'script',
   articles: [  "w:c:dev:BackToTopButton/code.js" ]});
 
$('.left').click(function () {
    scroll = $('#scroll').scrollLeft();
    $('#scroll').animate({'scrollLeft': scroll-600},800);
});
$('.right').click(function () {
    scroll = $('#scroll').scrollLeft();
    $('#scroll').animate({'scrollLeft': scroll+600},800);
});