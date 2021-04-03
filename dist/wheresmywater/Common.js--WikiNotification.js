var interval = setInterval(function () {
$(".wiki-notification-sprite-close:not(:contains(×))").text("×");
$(".wiki-notification-sprite-close").click(function(){
    $(this).parents(".wiki-notification").remove();
});
}, 100 );