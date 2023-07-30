// add the original english title as a subtitle for the article, linking to Wookieepedia's corresponding page.
$(function() {
    if($('#enTitle').length > 0 && !mw.config.get('wgIsMainPage')) {
        console.log($('#enTitle'));
        $('#enTitle').clone().appendTo('.page-header__main').css('display', 'block');
    }
});