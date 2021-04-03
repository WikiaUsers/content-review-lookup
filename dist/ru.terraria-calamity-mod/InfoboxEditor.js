let coinsTemplate = "{{coins|%p|%g|%s|%c|%d}}";

$( ".ve-ui-mwParameterPage-label:contains('Продажа')" ).each(function() {
    
    var field = $( this ).parents( ".ve-ui-mwParameterPage" ).children( ".ve-ui-mwParameterPage-field" );
   
    field.prepend(
        "<div class='oo-ui-widget oo-ui-widget-enabled oo-ui-inputWidget'>" +
            "<label class='' for='gold-money'>" +
                "<img src='https://vignette.wikia.nocookie.net/terraria-calamity-mod/images/b/b0/Gold_Coin.gif/revision/latest?cb=20170714160142&path-prefix=ru'>" +
            "</label>" +
            "<input type='number' name='gold-coin' min=0 max=100 width='1rem'>" +
        "</div>"
    );
    
    $( ":input[name='gold-coin']" ).change(function() {
        console.log("1" + field.children( "textarea" ).each(function() {
            console.log("2" + $( this ).text());
        }));

    });
    
});