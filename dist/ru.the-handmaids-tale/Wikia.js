$(function () {
    $(".tcaption,#text").click(function(){
            $("#collaps").slideToggle(2000);
            $("#text > img:first-child").rotate({
                animateTo:180,
                duration: 1000
            });
            $("#text > img:last-child").rotate({
                animateTo:-180,
                duration: 1000
            });
    });
});