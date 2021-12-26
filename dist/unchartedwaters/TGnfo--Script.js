/* <syntaxhighlight lang="javascript"> */

console.log("loading TGnfo script");

$n = $('div.TGnfoinv').length;
if ($n) {
    for (i = 0; i <= $n; i++) {
        $t = $('div.TGnfoinv:eq(' + i + ')');
        $itmlnk = $t.parent('span.addnfo').parent('.imgnfo').children('a').attr('href');
        //alert($itmlnk);
        $itemlink = $itmlnk.slice($itmlnk.lastIndexOf('/wiki/') + 6);
        //alert($itemlink);
        $city = $t.attr('title');
        //alert($city);
        $t.removeAttr('title');
        $t.load('/index.php?title=' + $itemlink + '&action=render div#' + $city + '.TGinvnfo');
    /*
        $t = $('div.TGnfoprice:eq(' + i + ')');
        $t1 = $('span.TGnfoprice', $t);
        $t2 = $('div.TGnfoinv:eq(' + i + ')');
        $item = $t1.attr('id');
        $itemlink = mkLink($item);
        $t1.removeAttr('title');
        $t1.load('/index.php?title=' + $itemlink + '&action=render div#' + $city + '.TGpricenfo', function () {
            if ($t1.html() != '') {
                //TGdebug();
                $t.css('display', 'inline');
            }
        });
        TGdebug('div.TGnfoprice & div.TGnfoinv');
    */
    }
}

/*
function TGdebug(a) {
    msg = (a) ? a : 'TGdebug';
    alert(msg + ':eq ' + i
          + '\nItem: ' + $itemlink + ' (' + $city + ')'
          + '\nresult: ' + $t1.html());
}
*/

/*
</syntaxhighlight>
{{BioSign|05:39, March 5, 2013 (UTC)}}
[[Category:Templates/BioBrain|{{PAGENAME}}]]
*/