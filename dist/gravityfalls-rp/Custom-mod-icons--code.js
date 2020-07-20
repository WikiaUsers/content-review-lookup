
$(function()
{
    var conf = window.CustomModIcons || {};
    $.get(wgServer + "/" + (conf.page || "MediaWiki:Custom-mod-icons") + "?action=raw", function(data)
    {
        var parsed = {};
        data.split("\n").forEach(function(el, index, arr) { if(el[0] === "*" && el[1] !== "*") parsed[el.substring(1).trim()] = arr[index + 1].substring(2).trim(); }, this);
        for(var mod in parsed) if(parsed.hasOwnProperty(mod))
        {
            var underscoreMod = mod.replace(new RegExp(" ", "g"), "_");
            mw.util.addCSS(".Rail #user-" + underscoreMod + " .username:after,.Rail #priv-user-" + underscoreMod + " .username:after{content: url('" + parsed[mod] + "');}");
        }
        if(parsed[wgUserName])
        {
            mw.util.addCSS(".User.chat-mod .username:after,.User.staff .username:after{background-image:none!important;}");
            mw.util.addCSS(".User.chat-mod .username:after{content: url('" + parsed[wgUserName] + "')}");
        }
        window.modIcons = parsed;
    });
});