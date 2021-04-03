//additional selector
mw.loader.using('mediawiki.util').then(function() {
 
function zselector( $content ) {
    var ActiveID = '';
    $(function () {
        $('[class|="ez"]').click(function () {
            var cn = $(this).attr('class');
            if (typeof cn !== 'undefined') {
                ZContent(cn, '0');
            }
        });
        $('[class|="ee"]').each(function (i, elem) {
            if ($(this).css('display') == 'none') {
                $(this).css('opacity', 0);
            }
        });
    });
    function ZContent(classValue, effect) {
        if (classValue.split) {
            var ID = '';
            var elemClasses = classValue.split(' ');
            for (var i = 0; i < elemClasses.length; i++) {
                var elemClass = elemClasses[i];
                if (elemClass.substring(0, 3) == 'hh-' || elemClass.substring(0, 3) == 'ez-') {
                    ID = elemClass.substring(3);
                    if (effect == '0') {
                        ActiveID = ID;
                        ZEffect(ID);
                        SelectElem('ez', ID)
                        break;
                    } 
                }
            }
        }
    }
    function ZEffect(ID) {
        $('[class|="ee"]').each(function (i, elem) {
            if ($(this).hasClass('ee-' + ID)) {
                $(this).css('display', 'block');
                $(window).trigger('scroll');
                $(this).stop();
                $(this).animate({
                    opacity: 1,
                    queue: false
                }, 0);
            } else {
                $(this).css('display', 'none');
                $(this).stop();
                $(this).animate({
                    opacity: 0,
                    queue: false
                }, 0);
            }
        });
    }
    function SelectElem(type, ID) {
        $('[class|="ez"]').each(function (i, elem) {
            if ($(this).hasClass(type + '-' + ID)) {
                $(this).removeClass('sn');
                $(this).addClass('sy');
            } else {
                $(this).removeClass('sy');
                $(this).addClass('sn');
            }
        });
    }
}
 
    mw.hook( 'wikipage.content' ).add( zselector );
    zselector( mw.util.$content );
});