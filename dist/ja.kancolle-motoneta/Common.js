/* ここにあるすべてのJavaScriptは、すべてのページ読み込みですべての利用者に対して読み込まれます */

// AddRailModule configuration
window.AddRailModule = [{maxAge: 0}];

// BackToTopButton configuration
window.BackToTopModern = true;

// Disable Image Lightbox
window.wgEnableLightboxExt = false;

// tooltips configuration
var tooltips_config = {
    waitForImages: true,
};

// WDSIcons
mw.hook('dev.wds').add(function(wds) {
    wds.render('.WDSIcons');
});


// make image link="empty" unnecessary
$('a[href*="vignette"].image').not('.gallery a[href*="vignette"].image, #WikiaArticleComments a[href*="vignette"].image, #Wall a[href*="vignette"].image').removeAttr('href');


// 1文字ずつ<span></span>で囲む
$(".spanner").children().addBack().contents().each(function(){
    if (this.nodeType == 3) {
        var $this = $(this);
        $this.replaceWith($this.text().replace(/(\S)/g, "<span>$&</span>"));
    }
});


// 要素をランダムに表示
$(function(){
    var $p = $("#randomizer-1").children(),
    c = $p.length,
    r = Math.floor(Math.random()*(c));
    $p.eq(r).css("display","block");
});

$(function(){
    var $p = $("#randomizer-2").children(),
    c = $p.length,
    r = Math.floor(Math.random()*(c));
    $p.eq(r).css("display","block");
});

$(function(){
    var $p = $("#randomizer-3").children(),
    c = $p.length,
    r = Math.floor(Math.random()*(c));
    $p.eq(r).css("display","block");
});