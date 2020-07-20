/* Any JavaScript here will be loaded for all users on every page load. */

//2kki map frame
mw.hook('wikipage.content').add(function($content) {
    $content.find('.kkiDiv:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                scrolling: 'no',
                class: 'kkiFrame',
                src: 'https://yume-2kki-explorer.herokuapp.com/',
            })
        ).addClass('loaded');
    });
});

(function () {
    $(".spoiler").click(changeClass);
    
    function changeClass(){
        if ($(this).hasClass("spoiler")) {
            $(this).removeClass("spoiler");
            $(this).addClass("spoilerClicked");
        }
        else {
            $(this).removeClass("spoilerClicked");
            $(this).addClass("spoiler");
        }
    }    
}());


(function () {
    $(".spoilerWarning").click(addClass);
    function addClass(){
        var parent = $(this).parent();
        var content = $(parent).find("div.spoilerContent");
        if ($(content).hasClass("hide")) {
            $(content).removeClass("hide");
            if ($(this).hasClass("hideable")) $(this).addClass("hide");
        }
        else{
            $(content).addClass("hide");
        }
    }    
}());