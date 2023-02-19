$(function() {
    if (window.UseTranslator === false || mw.config.get('wgAction') === 'edit')
        return;
    window.UseTranslator = false;
 
    var translateButton = '<button id="TranslateButton" class="wikia-button" style="font-weight:800;width:6em; margin:-11px 0 11px;"> A / 穴 </button>';
 
    if (mw.config.get('skin') === 'oasis') {
        $(".WikiaMainContent").prepend(translateButton);
    } else {
        $("#searchBody").after(translateButton);
    }
 
    $("#TranslateButton").click(function() {
        var url = "http://translate.google.com/translate?hl=" + mw.config.get("wgUserLanguage") + "&sl=" + mw.config.get("wgPageContentLanguage") + "&u=" + location.href;
        window.open(url);
    });
});