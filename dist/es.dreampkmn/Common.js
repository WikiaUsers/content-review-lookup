/* Código para Collapsibletext by Bloons Wiki */
jQuery(function($) {
    var defaultShowText = '[Show]';
    function toggle() {
        var $this = $(this);
        if ($this.hasClass('inline-collapsible-hidden')) {
            $this.html($this.data('content')).removeClass('inline-collapsible-hidden');
        } else {
            $this.text($this.data('showtext') || defaultShowText).addClass('inline-collapsible-hidden');
        }
    }
    $('.inline-collapsible').each(function() {
         var $this = $(this);
         $this.data('content', $this.html())
             .click(toggle)
             ;
         toggle.call(this);
    });
});

/* Código para el contador de visitas */

$(document).ready(function() {
    if (skin == 'oasis') 
        $('<li>  <img style="padding-top:2px;" title="Contador de Visitas desde el 26/03/13" src="http://contador-de-visitas.com/hit.php?id=1679688&counter=4" />  </li>').appendTo('#GlobalNavigation');
    else
        $('#p-navigation ul').append('<li> <img title="Contador de Visitas desde el 26/03/13" src="http://contador-de-visitas.com/hit.php?id=1679688&counter=4" /></li></li>');
});