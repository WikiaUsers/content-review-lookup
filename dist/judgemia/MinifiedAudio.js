$.fn.minifiedAudioPlayer = function (fileName) {
    
    'use strict';
    
    var $button = $(this).first();
    if (!$button.length || !window.wgOggPlayer) {return $button;}

    $('#audio-popup').remove();
    
    $button
    .click(function () {
        
        var $popup = $('<div id="audio-popup" style="position: absolute; top: 0; left: 0; border: none; z-index: 10; background-color: transparent; display: block;"> </div>')
        .appendTo(document.body)
        .css({
            left: Math.round( $button.offset().left - 100) + 'px',
            top:  Math.round( $button.offset().top -  5) + 'px'
        })
        .mouseleave(function () {
            $popup.css('display', 'none');
        });
        
        window.wgOggPlayer.init(false, {
            id: 'audio-popup',
            videoUrl: fileName,
            width: 180,
            height: 35,
            length: 190,
            isVideo: false
        });
        
        $popup.children().eq(1)
        .css('display', 'none');
        
        $button
        .css('background-image', 'url("/extensions/OggHandler/info.png")')
        .mouseenter(function () {
            $popup.css('display', 'block');
        });
    })
    .css({
        background: 'url("/extensions/OggHandler/play.png") no-repeat scroll 0 0 transparent',
        cursor: 'pointer',
        display: 'inline-block',
        height: '22px',
        verticalAlign: 'middle',
        width: '22px'
    });
    
    return $button;
};


$('.mini-audioplayer')
.each(function () {
    var $this = $(this);
    $this.minifiedAudioPlayer(
        $this.attr('data-file')
    );
});