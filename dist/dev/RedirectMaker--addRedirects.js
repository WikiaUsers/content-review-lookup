const installRedirect = function(targetPage, redirectData, logEntry){
    console.log("installing redirect: " + targetPage);
    $.post(((mw.config.get('wgServer') + mw.config.get("wgScriptPath") + ('/api.php?action=edit&title=' + encodeURIComponent(targetPage)))
        + ('&notminor=true&summary=' + encodeURIComponent(logEntry)))
        + (('&text=' + encodeURIComponent(redirectData))
        + ('&createonly=true&token=' + encodeURIComponent(mw.user.tokens.values.editToken))), function(data){});
};