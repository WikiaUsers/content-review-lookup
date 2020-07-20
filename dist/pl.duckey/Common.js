/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* moveToRail */
$(function(){
    if($('.moveToRail').length) {
        $('.moveToRail').each(function(){
            $('<section class="railModule rail-module">' + ($(this).data('title') ? ('<h2>' + $(this).data('title') + '</h2>') : '') + $(this).html() + '</section>').appendTo('#WikiaRail');
            
            $(this).remove();
        });
    }
});