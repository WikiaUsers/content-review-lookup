$(function() {
    $('.MainPageNavIcon-1').hover(
        function() {
            $(this).find('img').attr('src','https://images.wikia.nocookie.net/__cb20111217151113/tulensandbox/ru/images/1/18/Button_flea_market.png');
        },
        function() {
            $(this).find('img').attr('src','https://images.wikia.nocookie.net/__cb20111217151124/tulensandbox/ru/images/5/5c/Button_community.png');
        }
    );
});