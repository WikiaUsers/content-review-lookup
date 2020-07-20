/**
*Author:铁桶
**/
$(function() {
    var config = mw.config.get([
        'wgAction',
    ]);
    if (window.UseYoudaoTranslate === false || config.wgAction !== 'view') {
        return;
    }
    window.UseYoudaoTranslate = false;
 
    $('.WikiaMainContent').prepend(
        $('<button>', {
            id: 'YoudaoTranslateButton',
            'class': 'wikia-button',
            click: click,
            text: 'Translate'
        })
    );
});

function click() {
  var jump;
  if (confirm("Are you sure you want to jump to YoudaoTranslate?\n(The website you are visiting may be risky, Please visit with caution!)")) {
    window.location.href='http://webtrans.yodao.com/webTransPc/index.html' + '?from=auto'  + '&to=auto' + '&type=1' + '&url=' + location.href;
  } else {
    alert("You have canceled the jump to Youdao Translation.");
  }
}