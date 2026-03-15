mw.loader.using('mediawiki.util').then(function() {

    function zselector($content) {
        var ActiveID = '';

        $(function() {
            // ---- Первая группа (cc, hh, zz) ----
            $('[class|="cc"]').click(function() {
                var cn = $(this).attr('class');
                if (typeof cn !== 'undefined') ZContent(cn, '0');
            });
            $('[class|="hh"]').mouseenter(function() {
                var cn = $(this).attr('class');
                if (typeof cn !== 'undefined') ZContent(cn, '1');
            });
            $('[class|="hh"]').mouseleave(function() {
                var cn = $(this).attr('class');
                if (typeof cn !== 'undefined') ZContent(cn, '2');
            });
            $('[class|="zz"]').each(function() {
                if ($(this).css('display') == 'none') $(this).css('opacity', 0);
            });

            // ---- Вторая группа (aa, gg, vv) ----
            var ActiveID2 = '';
            $('[class|="aa"]').click(function() {
                var cn = $(this).attr('class');
                if (typeof cn !== 'undefined') ZContent2(cn, '0');
            });
            $('[class|="gg]').mouseenter(function() {
                var cn = $(this).attr('class');
                if (typeof cn !== 'undefined') ZContent2(cn, '1');
            });
            $('[class|="gg"]').mouseleave(function() {
                var cn = $(this).attr('class');
                if (typeof cn !== 'undefined') ZContent2(cn, '2');
            });
            $('[class|="vv"]').each(function() {
                if ($(this).css('display') == 'none') $(this).css('opacity', 0);
            });

            // ---- Функции первой группы ----
            function ZContent(classValue, effect) {
                if (classValue.split) {
                    var ID = '';
                    var elemClasses = classValue.split(' ');
                    for (var i = 0; i < elemClasses.length; i++) {
                        var elemClass = elemClasses[i];
                        if (elemClass.substring(0, 3) == 'hh-' || elemClass.substring(0, 3) == 'cc-') {
                            ID = elemClass.substring(3);
                            if (effect == '0') { ActiveID = ID; ZEffect(ID); SelectElem('cc', ID); break; }
                            else if (effect == '1') { ActiveID = ID; ZEffect(ID); SelectElem('hh', ID); break; }
                            else if (effect == '2') { ZEffect(ActiveID); SelectElem('hh', ID); break; }
                        }
                    }
                }
            }

            function ZEffect(ID) {
                $('[class|="zz"]').each(function() {
                    if ($(this).hasClass('zz-' + ID)) { $(this).css('display','block'); $(this).stop().animate({opacity:1,queue:false},700); }
                    else { $(this).css('display','none'); $(this).stop().animate({opacity:0,queue:false},0); }
                });
            }

            function SelectElem(type, ID) {
                $('[class|="cc"],[class|="hh"]').each(function() {
                    if ($(this).hasClass(type+'-'+ID)) { $(this).removeClass('sn').addClass('sy'); }
                    else { $(this).removeClass('sy').addClass('sn'); }
                });
            }

            // ---- Функции второй группы ----
            function ZContent2(classValue, effect) {
                if (classValue.split) {
                    var ID = '';
                    var elemClasses = classValue.split(' ');
                    for (var i = 0; i < elemClasses.length; i++) {
                        var elemClass = elemClasses[i];
                        if (elemClass.substring(0, 3) == 'gg' || elemClass.substring(0, 2) == 'aa') {
                            if (elemClass.substring(0,2) == 'aa') ID = elemClass.substring(3);
                            else ID = elemClass.substring(4);
                            if (effect == '0') { ActiveID2 = ID; ZEffect2(ID); SelectElem2('aa', ID); break; }
                            else if (effect == '1') { ActiveID2 = ID; ZEffect2(ID); SelectElem2('gg', ID); break; }
                            else if (effect == '2') { ZEffect2(ActiveID2); SelectElem2('gg', ID); break; }
                        }
                    }
                }
            }

            function ZEffect2(ID) {
                $('[class|="vv"]').each(function() {
                    if ($(this).hasClass('vv-' + ID)) { $(this).css('display','block'); $(this).stop().animate({opacity:1,queue:false},700); }
                    else { $(this).css('display','none'); $(this).stop().animate({opacity:0,queue:false},0); }
                });
            }

            function SelectElem2(type, ID) {
                $('[class|="aa"],[class|="gg"]').each(function() {
                    if ($(this).hasClass(type+'-'+ID)) { $(this).removeClass('sn').addClass('sy'); }
                    else { $(this).removeClass('sy').addClass('sn'); }
                });
            }

        });
    }

    mw.hook('wikipage.content').add(zselector);
    zselector(mw.util.$content);

});