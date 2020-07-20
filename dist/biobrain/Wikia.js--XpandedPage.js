// Resize Wikia page if desktop screen wider than 1279 pixels.
// Resize to 77% if aspect-ratio 16:9 or 85% if aspect-ratio 4:3

screen_ratio = screen.width / screen.height;
width_scale = (screen_ratio.toFixed(2) == 1.78) ? 0.77 : 0.85;

desktop = 1279;
$wkia_main = $('section#WikiaPage');
$wkia_main.css('box-shadow', '0px 0px 50px 0px rgba(0,0,0,1)');
wdth_main = (screen.width > desktop)
                ? Math.round(screen.width * width_scale)
                : $wkia_main.width();

$wkia_rail = $('div#WikiaRail.WikiaRail');

wk_url = document.URL.split('?')[0];
id_selct = (wk_url.lastIndexOf('/wiki/') == -1) ? 'a.com/' : '/wiki/';
wk_id = wk_url.slice(wk_url.lastIndexOf(id_selct) + 6);
wk_ttl = document.title.replace(/ /g, '_');
switch (wk_id) {
    case wk_ttl:
    case 'Wikia':
    case 'About':
    case 'Terms_of_Use':
        wdth_rail = 0;
        break;
    default:
        if ($wkia_rail.length) wdth_rail = $wkia_rail.width() + 20;
            else wdth_rail = 0;
}
/*
alert('ulr: ' + wk_url + '\n' +
'id: ' + wk_id + '\n' +
'title: ' + wk_ttl + '\n' +
'result: ' + wdth_rail);
*/

$wkia_head = $('header#wikiheader');
wdth_head = wdth_main - 20;

$wkia_navi = $('div.navbackground');
wdth_navi = wdth_head - 250;

$wkia_content = $('article#WikiaMainContent.WikiaMainContent');
wdth_content = (screen.width > desktop) ? wdth_main - wdth_rail : $wkia_content.width();

$AdmnArticle = $('div#WikiaArticle.WikiaArticle.AdminDashboardChromedArticle');

$wkia_editpg = $('div#EditPageMain');
//if ($wkia_editpg.length) $wkia_editpg.css('display', 'inline-block');

$wkia_editpgrail = $('div#EditPageRail');
$wkia_editpgtrigg = $('div.editpage-widemode-trigger');

xpandbutt = '<a class="wikia-button" ' +
               'id="XpandButton" ' +
               'title="Expands the content area & hide the side rail" ' +
               'style="padding: 1px 7px 0px; font-weight: bold; font-size: 11px;"' +
            '>Xpand>></a>';
xpanded = false;

function resizepage(content, rail, opacity, display, speed1, speed2, xpanstat, txt, title) {
    xpanded = xpanstat;
    $wkia_content.stop();
    $wkia_rail.stop();
    $wkia_content.animate({ 'width': content }, speed1, function () {
        $xpandbutt.text(txt).attr('title', title);
    });
    $wkia_rail.animate({ 'width': rail, 'opacity': opacity }, speed2, function () {
        $wkia_rail.css({ 'display': display });
    });
}

function rzedtpg($wkia_edtpg, $wkia_edttrigg, $wkia_editpgrail, wdth_content) {
    wdth_editpg = (Number($wkia_editpgtrigg.css('top').replace('px', '')) > 50)
                      ? wdth_content
                      : wdth_content - $wkia_editpgrail.width() - 1;
    $wkia_editpg.width(wdth_editpg);
}

if (wdth_rail != 0) {
    if ($('div.buttons', 'header#WikiHeader').length > 0) {
        $placXbutt = $('div.buttons', 'header#WikiHeader');
        $placXbutt.prepend(xpandbutt);
        $xpandbutt = $('a#XpandButton');
    } else {
        $placXbutt = $('ul.AccountNavigation', 'header#WikiaHeader');
        $placXbutt.before(xpandbutt);
        $xpandbutt = $('a#XpandButton');
        $xpandbutt.css({ 'float': 'right', 'margin': '5px 15px' })
    }

    $xpandbutt.click(function () {
        //alert('$xpanbutt.click()');
        if (xpanded == false) {
            resizepage(wdth_main, 0, 0, 'none', 'slow', 'normal', true,
                       'Restor<<', 'Compress the content area & restore the side rail');
        } else {
            $wkia_rail.css({ 'display': 'block' });
            resizepage(wdth_content, wdth_rail - 20, 1, 'block', 'normal', 'slow', false,
                       'Xpand>>', 'Expands the content area & hide the side rail');
        }
    });
}

if (screen.width > desktop) {
    $('header#WikiaHeader').width(wdth_main + 14);
    $wkia_main.width(wdth_main);
    $wkia_head.width(wdth_head);
    $wkia_navi.width(wdth_navi);
    if ($wkia_editpg.length)
        rzedtpg($wkia_editpg, $wkia_editpgtrigg, $wkia_editpgrail, wdth_content);
    $wkia_content.width(wdth_content);
    $('div.toolbar').width(wdth_main + 10);
    if ($AdmnArticle.length)
        $AdmnArticle.width(wdth_content - 17);
    if ($('section#EditPageDialog').length)
        $('section#EditPageDialog').width(wdth_content);
    if ($('div#SharingToolbar').length)
        $('div#SharingToolbar').css({ 'left': wdth_main, 'z-index': '5' });

    $wkia_editpgtrigg.click(function () {
        rzedtpg($wkia_editpg, $wkia_editpgtrigg, $wkia_editpgrail, wdth_content);
    });
}