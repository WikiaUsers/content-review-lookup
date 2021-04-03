if(window.navigator.platform=="Nintendo 3DS" || window.navigator.platform=="Nintendo DSi"){
$("input[type=submit]").css("display","inline");
$("input[type=submit]").click(function(){
    e = jQuery.Event("keypress");
    e.which = 13; // enter key
    $('textarea[name=message]').change(function(){}).trigger(e);
});
}