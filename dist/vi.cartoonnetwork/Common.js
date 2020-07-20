$(function(){
    if ($("#imap-main").length) {
      $.getJSON("/api.php?action=parse&text={{Mapa/Kod|" + $("#imap-main").data("map") + "}}&format=json", function(data) {
        var code = data.parse.text['*']; 
        var reg = new RegExp("&lt;", "g"); 
        code = code.replace(reg, "<"); 
        reg = new RegExp("&gt;", "g"); 
        code = code.replace(reg, ">");
        $("div#imap-main").html(code);
      });
    }
});
 
/*</pre>*/

window.ajaxPages = ["Một số trang được cập nhật thường xuyên"];
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Tự động làm mới';
window.AjaxRCRefreshHoverText = 'Tự động làm mới trang';

window.massEditConfig = {
    editInterval: 1500
};

if (wgCanonicalSpecialPageName === "Upload") {
    addOnloadHook(function() {
        var editbox = document.getElementById('wpUploadDescription');
        if (!editbox)
            return;
        if (editbox.value !== '')
            return;
        editbox.value = "{" + "{FileInfo\n"
            + "|Description=\n"
            + "|Author=\n"
            + "|Season=\n"
            + "|Source=\n"
            + "}" + "}";
    });
}
 
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'Quynhngaglx': 'Công chúa Ori',
        'Song_V%C4%A9': 'ADMIN',
    }
};
 
importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/forumnote.js",
        'w:c:dev:SignatureCheck/code.js',
        'w:c:dev:CategoryRenameAuto-update/code.js',
        'w:c:dev:MessageWallUserTags/code.js'
    ]
});