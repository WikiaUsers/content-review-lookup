(function () {
    var ActiveID = '';
    $(function () {
        $('[class|="cc"]').click(function () {
            var cn = $(this).attr('class');
            if (typeof cn !== 'undefined') {
                ZContent(cn, '0');
            }
        });
        $('[class|="hh"]').click(function () {
            var cn = $(this).attr('class');
            if (typeof cn !== 'undefined') {
                ZContent(cn, '1');
            }            
        });        
        $('[class|="zz"]').each(function (i, elem) {
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
                if (elemClass.substring(0, 3) == 'hh-' || elemClass.substring(0, 3) == 'cc-') {
                    ID = elemClass.substring(3);
                    if (effect == '0') {
                        ActiveID = ID;
                        ZEffect(ID);
                        SelectElem('cc', ID)
                        break;
                    } else if (effect == '1') {
                        ActiveID = ID;
                        ZEffect(ID);
                        SelectElem('hh', ID)
                        break;
                    } else if (effect == '2') {
                        ZEffect(ActiveID);
                        SelectElem('hh', ID);
                        break;
                    }
                }
            }
        }
    }
    function ZEffect(ID) {
        $('[class|="zz"]').each(function (i, elem) {
            if ($(this).hasClass('zz-' + ID)) {
                $(this).css('display', 'block');
                $(window).trigger('scroll');
                $(this).stop();
                $(this).animate({
                    opacity: 1,
                    queue: false
                }, 700);
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
        $('[class|="cc"],[class|="hh"]').each(function (i, elem) {
            if ($(this).hasClass(type + '-' + ID)) {
                $(this).removeClass('sn');
                $(this).addClass('sy');
            } else {
                $(this).removeClass('sy');
                $(this).addClass('sn');
            }
        });
    }
})();