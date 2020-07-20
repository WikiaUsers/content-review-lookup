$(function () {
    $('.nicovideo-box').each(function () {
        var url = $('.nicovideo-box').data('url'); 
        $('.nicovideo-box').html('<iframe width="315" height="180" frameborder="0" style="border:solid 1px #000;" scrolling="no" src="' + url + '"></iframe>');
    });
});
$(function() {
  var asd = $('.colored').css('background-color');
  $('.cv .tabbernav *').css('border-color', '#000').css('border-color', asd);
  $('.cv ul.tabbernav').css('border-bottom', '4px double #000').css('border-color', asd);
});
importArticles({
    type: 'script',
    articles: [
        'u:dev:UserRightsRecord/code.js'
    ]
});