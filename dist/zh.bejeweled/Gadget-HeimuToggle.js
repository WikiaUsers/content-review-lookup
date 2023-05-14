function i18n_callback(i18n) {
    var heimu_toggle_off = i18n.msg("heimu-toggle-off").plain();
    var heimu_toggle_on = i18n.msg("heimu-toggle-on").plain();
    var heimu_toggle_what = i18n.msg("heimu-toggle-what").plain();

    function heimu_toggle_text() {
        return window.localStorage.toggle_state == "1" ? heimu_toggle_off : heimu_toggle_on;
    }
    
    function heimu_set_state() {
        if (window.localStorage.toggle_state == "1") $("span.heimu").addClass("heimu-toggled");
        else $("span.heimu").removeClass("heimu-toggled");
    }
    
    function heimu_toggle() {
        window.localStorage.setItem("toggle_state", window.localStorage.toggle_state == "1" ? "0" : "1");
        $(".heimu-toggle").text(heimu_toggle_text());
        heimu_set_state();
    }
    
    if ($("span.heimu").toArray().length) {
    	heimu_set_state();
        $("ul.tools").prepend(
            '<li><a class="heimu-toggle">' + heimu_toggle_text() + "</a>&nbsp;" +
            '<a href="/zh/wiki/Template:黑幕" title="' + heimu_toggle_what + '">(?)</a></li>'
        );
        $(".heimu-toggle").click(heimu_toggle);
    }
}

(function(){
	if (window.gadget_HeimuToggle) return;
	window.gadget_HeimuToggle = true;
	mw.hook("dev.i18n").add(function(i18n) {
		i18n.loadMessages("u:zh.bejeweled:MediaWiki:Custom-HeimuToggle/i18n.json").done(i18n_callback);
	});
	importArticle({ type: "script", article: "u:dev:MediaWiki:I18n-js/code.js" });
})();