$('.mp-item').click(function(box) {
    e.preventDefault();
    var article = $(this).attr('data-href'); 
    window.location.href = mw.util.wikiGetlink(article);
});