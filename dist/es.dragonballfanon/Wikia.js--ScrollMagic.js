// Burbuja Frotante - Scrollbar
$(function(){
    $('<div id="burbuja-scroll"></div>') // A�adiendo la burbuja frotante
    .appendTo('body')
});

// Funcionalidades de la burbuja frotante

var scrollTimer = null;

$(window).scroll(function() {
   var viewportHeight = $(this).height(),
       scrollbarHeight = viewportHeight / $(document).height() * viewportHeight,
       progress = $(this).scrollTop() / ($(document).height() - viewportHeight),
       distance = progress * (viewportHeight - scrollbarHeight) + scrollbarHeight / 2 - $('#burbuja-scroll').height() / 2
       ;
 
    $('#burbuja-scroll')
        .css('top', distance)
        .text('Progreso (' + Math.round(progress * 100) + '%)')
        .fadeIn(100)  
    ;

    // Desvanecimiento de la burbuja despu�s de 1 segundo de no desplazamiento.
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(function() {
        $('#burbuja-scroll').fadeOut();
    }, 1000);
});

// A�adiendo la barra de progreso a los art�culos.

$(function(){
    $('<div class="DBFW-ProgesoContenido"><div class="DBFW-ProgesoBarra"></div></div>')
    .appendTo('.WikiaPageHeader')
});

// Funcionalidades de la barra.

$(window).load(function(){
  $(window).scroll(function() {
    var wintop = $(window).scrollTop(), docheight = $('.WikiaArticle').height(), winheight = $(window).height();
    console.log(wintop);
    var totalScroll = (wintop/(docheight-winheight))*100;
    console.log("total scroll" + totalScroll);
    $(".DBFW-ProgesoBarra").css("width",totalScroll+"%");
  });

});

// Desvanecimiento de la barra de progreso
// despu�s de 2 segundo de no desplazamiento.

var barraTimer = null;

$(window).scroll(function() {
    
    $('.DBFW-ProgesoContenido')
        .fadeIn(100)  
    ;

    if (barraTimer !== null) {
        clearTimeout(barraTimer);
    }
    barraTimer = setTimeout(function() {
        $('.DBFW-ProgesoContenido').fadeOut();
    }, 2000);
});