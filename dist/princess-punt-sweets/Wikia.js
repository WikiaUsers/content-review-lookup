/* ====================================================================== */
/* ========================== Mono B2T Button =========================== */
/* I'm on the top of the world */
var startPos = 600;
var scrollSpeed = 700;
 
if (skin == 'monobook') {
    $('<div />', {
            id: 'b2t-btn',
            class: 'b2t-btn',
            title: 'Back to Top',
            style: 'position: fixed; z-index: 9999; bottom: 15px; left: 15px',
            text: '>'
        })
        .appendTo('#column-one');
 
    $("#b2t-btn").hide();
    $(window).scroll(function() {
        if ($(this).scrollTop() > startPos)
            $('#b2t-btn').fadeIn();
        else
            $('#b2t-btn').fadeOut();
    });
}
 
$('#b2t-btn').click(function() {
    $('body, html').animate({
        scrollTop: 0
    }, scrollSpeed);
    return false;
});