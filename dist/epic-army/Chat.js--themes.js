
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = mm+'/'+dd+'/'+yyyy;
document.write(today);
console.log('Current Date: ' + today);

console.log('themes.js has been loaded');
mw.loader.using( ['jquery.ui.button','jquery.ui.dialog'],  function() {
    $(document).ready(function() {
        $("#Rail").append('<div id="themes">Темы оформления</div>');
        $(".ChatHeader > .wordmark").append('<div id="ThemesSelest" title="Select a theme"><div id="StandartTheme" style="display:inline-block">dark</div><div id="Theme1" style="display:inline-block">Тема 1</div></div>');
        $("#StandartTheme").button();
        $("#Theme1").button();
        $("#themes").css({"background-color":"#d7d7d7","background-image":"-webkit-gradient(linear,0% 0%,0% 100%,color-stop(0,whitesmoke),color-stop(100%,#d7d7d7))"});
        $('#themes').click(function() {
            $("#ThemesSelest").dialog("open");
        });
        $("#ThemesSelest").dialog({
            modal:true, width:400, height:210, autoOpen:false
        });
        $("#StandartTheme").click(function() {
            $("#ThemesSelest").dialog("close");
            $(".ChatWindow").css("background-image","none");
            $(".ChatHeader").css({"background":"white","color":"#3a3a3a"});
            $("#WikiaPage").css({"background":"white","color":"#3a3a3a"});
            $(".Write .message").css("background","white");
            $(".Write [name='message']").css("color","#3a3a3a");
            $(".ChatHeader > .wordmark > div").css("color","#3a3a3a");
            $(".ChatHeader > .wordmark > div a").css("color","#006cb0");
            $("#Rail > .private,#themes").css({"background-color":"#d7d7d7","background-image":"-webkit-gradient(linear,0% 0%,0% 100%,color-stop(0,whitesmoke),color-stop(100%,#d7d7d7))"});
        });
        $("#Theme1").click(function() {
            $("#ThemesSelest").dialog("close");
            $(".ChatWindow").css("background","url(http://fc08.deviantart.net/fs70/f/2014/034/e/1/serenity_by_rain_gear-d74xb6i.jpg) 70% 20%");
            $(".ChatHeader").css({"background":"rgba( 0, 0, 0, 0.2)","color":"white"});
            $("#WikiaPage").css({"background":"rgba( 0, 0, 0, 0.1)","color":"white"});
            $(".Write .message").css("background","rgba( 0, 0, 0, 0.5)");
            $(".Write [name='message']").css("color","#FFF");
            $(".ChatHeader > .wordmark > div").css("color","#FFF");
            $(".ChatHeader > .wordmark > div a").css("color","whitesmoke");
            $("#Rail > .private,#themes").css({"background-color":"inherit","background-image":"none"});
        });
//        $(".Rail .public").click(function() {
//            $(this).addClass("selected2");
//        });
    });
});