mw.loader.using('jquery.makeCollapsible').then(function () {
  $('.collapsible').makeCollapsible();
});

document.querySelectorAll('.categoria-thumb').forEach(function(span){
    var img = span.getAttribute('data-img');
    if(img){
        span.closest('li').querySelector('img').src = '/images/' + img.replace(/ /g,'_');
    }
});