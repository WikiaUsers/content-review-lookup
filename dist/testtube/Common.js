if ($('#scroll')) {
    var scrollRight = function() {
        var subs = $('#scroll').children().children();
        var n = 0;
        var firstdisplayed = -1;
        for (var i = 0; i < subs.length; i++) {
            if (subs[i].style.display === 'inline-block') {
                if (firstdisplayed === -1) {
                    firstdisplayed = i;
                }
            n++;
            }
        }
        if (n > 3) {
            subs[firstdisplayed].style.display = 'none';
        }
    };

    var scrollLeft = function() {
        var subs = $('#scroll').children().children();
        var lastHidden = -1;
        for (var i = 0; i < subs.length; i++) {
            if (subs[i].style.display === 'none') {
                lastHidden = i;
            }
            else if (subs[i].style.display === 'inline-block') {
                break;
            }
        }
        if (lastHidden !== -1) {
            subs[lastHidden].style.display = 'inline-block';
        }
    };
    $('#leftScroll').click(scrollLeft);
    $('#rightScroll').click(scrollRight);
}