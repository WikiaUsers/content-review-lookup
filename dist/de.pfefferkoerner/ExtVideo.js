function insertVideo() {
    $('.insertVideo').append(
        $('<iframe />') 
        .attr('src',$('.insertVideo').data('url'))
        .text('Sie können das Video nicht abspielen.')
        .append(
            $('<embed />').attr('src',$('.insertVideo').data('url'))
        )
    );
    if($('.insertVideo').attr('width')) {
        $('.insertVideo iframe').width($('.insertVideo').attr('width'));
        $('.insertVideo iframe embed').width($('.insertVideo').attr('width'));
    }
    else {
        $('.insertVideo iframe').width($('.insertVideo').width());
        $('.insertVideo iframe embed').width($('.insertVideo').width());
    }
    if(!$('.insertVideo').data('format')) {
        $('.insertVideo iframe').height($('.insertVideo').width() / 16 * 9);
        $('.insertVideo iframe embed').height($('.insertVideo').width() / 16 * 9);
    }
    else if($('.insertVideo').data('format') == '4:3') {
        $('.insertVideo iframe').height($('.insertVideo').width() / 4 * 3);
        $('.insertVideo iframe embed').height($('.insertVideo').width() / 4 * 3);
    }
}
if($('.insertVideo').length) {
    if($('.insertVideo').data('poster')) {
        $('.insertVideo').addClass('withPoster').prepend(
            $('<img />').addClass('poster')
            .attr({
                'src': $('.insertVideo').data('poster'),
                'alt': 'poster',
                'title': 'Videoposter'
            })
        );
        if($('.insertVideo').attr('width')) {
            $('.insertVideo .poster').width($('.insertVideo').attr('width'));
        }
        else {
            $('.insertVideo .poster').width($('.insertVideo').width());
        }
        $('.insertVideo .poster').click(function() {
            console.log($(this));
            $(this).hide();
            addOnloadHook(insertVideo);
        });
    }
    else {
        addOnloadHook(insertVideo);
    }
}