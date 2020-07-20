function showTime() {
    var now = new Date(),
        h = now.getUTCHours() + 9,
        h2 = h >= 24 ? h - 24 : h,
        hh = h2 < 10 ? '0' + h2 : h2,
        m = now.getUTCMinutes(),
        mm = m < 10 ? '0' + m : m,
        s = now.getUTCSeconds(),
        ss = s < 10 ? '0' + s : s,
        om = s == 0 ? 60 - m  : 59 - m,
        os = s == 0 ? 0 : 60 - s,
        omm = om < 10 ? '0' + om : om,
        oss = os < 10 ? '0' + os : os,
        r = '<span style="color:red"><span style="letter-spacing:0">Raid - Ends in </span>' + omm + ':' + oss + '</span> | ',
        rw = '<span style="color:orange"><span style="letter-spacing:0">Raid - Starts in </span>' + omm + ':' + oss + '</span> | ',
        raid = (hh == 0 ? r : hh == 4 ? r : hh == 11 ? r : hh == 16 ? r : ''),
        warning = (hh == 3 ? rw : hh == 10 ? rw : hh == 15 ? rw : hh == 23 ? rw : ''),
        time = hh + ':' + mm + ':' + ss + ' <span style="letter-spacing:0">DMT</span>';
 
    $('#showDate')
        .empty()
        .append('<a class="nointeract" style="color:#fff">' + warning + raid + time + '</a>');
    window.clearTimeout(refreshDate);
    var refreshDate = window.setTimeout(showTime, 1000);
}
 
$(document)
    .ready(function() {
        if (skin == 'oasis')
            $('<span style="color:transparent"><li id="displayTimer"></span><span id="showDate"/></li>')
            .appendTo('#WikiHeader div.buttons');
        else
            $('#p-personal ul')
            .prepend('<li><span id="showDate"/></li>');
        showTime();
        $('#displayTimer')
            .css({
                fontWeight: 'normal',
                fontSize: '12px',
                letterSpacing: '1px',
                marginLeft: '0px',
                marginTop: '17px',
                marginRight: '0px'
            })
    })