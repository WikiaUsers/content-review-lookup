/*
if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
    importStylesheetPage('User:Kopcap94/cthemes.css', 'ru.siegenax');
    mw.loader.using( ['jquery.ui.dialog'],  function() {
        $(document).ready(function() {
            var before = "http://"
            var middle = ".wikia.com/index.php?title="
            var after = "&action=raw&ctype=text/css"
            $('body').append('<link type="text/css" rel="stylesheet" id="Linktochange">');
            if (window.themesite !== undefined && window.themelink !== undefined) {
                document.getElementById("Linktochange").href = before + themesite + middle + themelink + after;
            }
            $(".ChatHeader > .wordmark").append('<div id="StartTheme" class="Button" style="right:155px; margin:7px 0; padding:5px; width:60px;">Themes</div>');
            $(".ChatHeader > .wordmark").append('<div id="ThemesSelest" title="Choose theme"><div id="Theme1" class="Button left1">Basic</div><div id="Theme2" class="Button right1">Chocolate</div><div id="Theme3" class="Button left2">Xmas</div><div id="Theme4" class="Button right2">Xmas2</div><div id="Theme5" class="Button center6">Default</div></div>');
            $('#StartTheme').click(function() {
                $("#ThemesSelest").dialog("open");
            });
            $("#ThemesSelest").dialog({
                modal:false, width:300, height:200, autoOpen:false, resizable:false
            });
            $("#Theme1").click(function() {
                $("#ThemesSelest").dialog("close");
                document.getElementById("Linktochange").removeAttribute("href");
            });
            $("#Theme2").click(function() {
                $("#ThemesSelest").dialog("close");
                document.getElementById("Linktochange").removeAttribute("href");
                document.getElementById("Linktochange").href = before + "community" + middle + "User:2Actimv/ChocolateChatSkin.css" + after;
            });
            $("#Theme3").click(function() {
                $("#ThemesSelest").dialog("close");
                document.getElementById("Linktochange").removeAttribute("href");
                document.getElementById("Linktochange").href = before + "community" + middle + "User:2Actimv/ChristmasChatSkin.css" + after;
            });
            $("#Theme4").click(function() {
                $("#ThemesSelest").dialog("close");
                document.getElementById("Linktochange").removeAttribute("href");
                document.getElementById("Linktochange").href = before + "community" + middle + "User:2Actimv/ChristmasChatSkin2.css" + after;
            });
            $("#Theme5").click(function() {
                $("#ThemesSelest").dialog("close");
                document.getElementById("Linktochange").removeAttribute("href");
                document.getElementById("Linktochange").href = before + "community" + middle + "User:2Actimv/BasicChatSkin.css" + after;
            });
        });
    });
}
*/