$(function() {
    $('.WikiaBlogListingPost .author-details span').each(function() {
        var $a = $(this).children('a'), date = $(this).text().split(' by ')[0].split(' ');
        $(this).html(date[1].replace(',', ' ') + date[0] + ' ' + date[2] + ' by ' + $a[0].outerHTML);
    });
});