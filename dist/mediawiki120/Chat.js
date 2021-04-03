eTimes = 0;
$(document).on('keypress', function(e) {
    if ( e.which == 9 ) {
        console.log('test');
    }
    if ( eTimes > 5 ) {
        location.reload(true);
    }
});