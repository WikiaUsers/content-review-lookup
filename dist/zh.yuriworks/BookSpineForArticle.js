$(function(){
    var idx = 0;
    $(".volume-table td > a.image img").each(function(){
        var a_url = $(this).parent().parent().html();
        idx = idx + 10;
        var book_name = $(this).attr("alt");
        var series_num = '';
        $(this).parent().parent().html('<div class="book-container" data-spine-color-hue="' + idx + '"><div class="book"><div class="book-cover">' + a_url + '</div><div class="book-spine">' + series_num + '</div></div></div>');
    });
});