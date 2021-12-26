/* <syntaxhighlight lang="javascript"> */

console.log("loading DiscoveryInfo script");

$tdcvery = $('.dcvery');
$tdcvery.on({ 'mouseover': showtip });
$('p.close').on({ 'click': hidetip });


function showtip() {
    $t = $(this);
    $itmlnk = $t.children('a').attr('href');
    $itemlink = $itmlnk.slice($itmlnk.lastIndexOf('/wiki/') + 6);
    $t.children('a').removeAttr('title');
    $dcverynfo = $t.children('.dcverynfo');
    $dchtml = $dcverynfo.html();
    $dcboxload = $dcverynfo.hasClass('AJAXload');
    if ($dcboxload == true) {
        $dcverynfo.load('/index.php?title=' + $itemlink + '&action=render #attribinfo', function () {
            if ($dcverynfo.html() == '') {
                $dcverynfo.removeClass('AJAXload');
                $dcverynfo.html($dchtml);
            }
        });
    }
    $dcverynfo.show();
}

function hidetip() {
    $('.dcverynfo').hide();
}


/*
</syntaxhighlight>
{{BioSign|13:26, July 27, 2012 (UTC)}}
[[Category:Templates/BioBrain|{{PAGENAME}}]]
[[Category:Scripts/Templates|{{PAGENAME}}]]
*/