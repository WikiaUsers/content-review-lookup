function ContribToggle() {//Something happens when you click the stop button.
}

function ContribRC() {
    var $temp = $('<div>');
    var href = location.href.replace(/#[\S]*/, '');
    $temp.load(href + ' #mw-content-text', function() {
        var $newContent = $temp.children('#mw-content-text');
        if ($newContent.length) {
            $('#mw-content-text').replaceWith($newContent);
            mw.util.$content = $newContent;
        }
    });
    $temp.remove();
}
var wdscontrib = window.wdscontribs || false
  , contribRefresh = window.contribRefresh || 1000;
$(function() {
    if (wgCanonicalSpecialPageName === "Contributions") {
        if (wdscontrib === true) {
            
$(".UserProfileMasthead .masthead-avatar .avatar").click(function() {

$("#contentSub").append('\
<button style="color:red" \
onclick="RCsomething = setInterval(ContribRC,' + contribRefresh + ');\
setTimeout(ContribToggle,1000);">\
<span> Start RC </span>\
</button>');
                
$("#contentSub").append('<button class="ContribRCLink" \
style="color:red" onClick="clearTimeout(RCsomething);">\
<span> Stop RC </span>\
</button>');

            });
} else {

$('<div class="wds-global-navigation__user-menu wds-dropdown">\
<span onclick="RCsomething = setInterval(ContribRC, ' + contribRefresh + ');"\
class="wds-global-navigation__links-and-search">\
<span>Start RC</span>\
</span>\
</div>').insertAfter('.wds-global-navigation__search:first');
            
$('<div class="wds-global-navigation__user-menu wds-dropdown ContribRCLink">\
<span onClick="clearTimeout(RCsomething);setTimeout(ContribToggle,1000);"\
class="wds-global-navigation__links-and-search">\
<span>Stop RC</span>\
</span>\
</div>').insertAfter('.wds-global-navigation__search:first');
            
        }
    }
});