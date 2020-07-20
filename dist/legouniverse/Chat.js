$('.Write textarea').attr( 'placeholder', 'Click here to chat!' );

var filter = setInterval(function(){ 
    $('.Chat .message img').removeAttr("title"); $('.Chat .message img').removeAttr("alt");
}, 500);