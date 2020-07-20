$('<div class="bigtext"><input type="image" src="https://vignette.wikia.nocookie.net/sonako/images/d/d4/BigText.png" value="increase" class="increaseFont" title="Tăng cỡ Chữ"></input></div><div class="smalltext"><input type="image" src="https://vignette.wikia.nocookie.net/sonako/images/8/83/SmallText.png" value="decrease" class="increaseFont" title="Giảm cỡ Chữ"></input></div>').insertBefore('body.ns-0.MiniEditor #WikiaArticle');

$(document).ready(function() {
    var curFontSize = localStorage["FontSize"];
    if (curFontSize) {
        //set to previously saved fontsize if available
        $('body.MiniEditor #WikiaArticle').css('font-size', curFontSize);
    }
    $(".increaseFont,.decreaseFont").click(function() {
        var type = $(this).val();
        curFontSize = $('body.MiniEditor #WikiaArticle').css('font-size');
        if (type == 'increase') {
            $('body.MiniEditor #WikiaArticle').css('font-size', parseInt(curFontSize) + 1 + "px");
        } else {
            $('body.MiniEditor #WikiaArticle').css('font-size', parseInt(curFontSize) - 1 + "px");
        }
        localStorage.setItem('FontSize', curFontSize);
    });
});