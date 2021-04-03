/* This page is loaded in [[Template:BioScript.js]]
<source lang=javascript> 
// ShowInfo-Tooltip Script v1.2.2
*/

$('.nfo').live({
    'mouseover': showtip,
    'mouseout': hidetip,
    'mousemove': movetip
});


function showtip() {
    $t = $(this);
    $t.children('a').removeAttr('title');
    $ttbox = $t.children('.ttbox');

    if ($ttbox.hasClass('AJAXload')) {
        $itmlnk = $t.children('a').attr('href');
        $itemlink = $itmlnk.slice($itmlnk.lastIndexOf('/wiki/') + 6);

        $tthtml = $ttbox.html();
        $ttbox.load('/index.php?title=' + $itemlink + '&action=render #attribinfo', function () {
            if ($ttbox.html() == '') {
                $ttbox.removeClass('AJAXload');
                $ttbox.html($tthtml);
            }
        });
    }

    $ttbox.show('fast');
}

function hidetip() {
    $ttbox.hide('slow');
}

function movetip(e) {
    var newTop = e.clientY + 20;
    var newLeft = e.clientX + 20;
    $ttbox.css({
        'top': newTop + 'px',
        'left': newLeft + 'px'
    });
}


/*
</source>
{{BioSign|11:48, September 1, 2012 (UTC)}}
[[Category:Templates/BioBrain|{{PAGENAME}}]]
*/