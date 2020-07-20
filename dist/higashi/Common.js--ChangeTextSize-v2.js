$('#WikiHeader div.buttons').prepend('<div style="position: absolute; top: 30px; right: 40px;"><input type="image" src="https://vignette.wikia.nocookie.net/sonako/images/d/d4/BigText.png" value="increase" class="increaseFont" title="Tăng cỡ Chữ"></input></div><div style="position: absolute; top: 30px; right: 0px;"><input type="image" src="https://vignette.wikia.nocookie.net/sonako/images/8/83/SmallText.png" value="decrease" class="increaseFont" title="Giảm cỡ Chữ"></input></div>');

$(document).ready(function() {
    var curFontSize = localStorage["FontSize"];
    if (curFontSize) {
        //set to previously saved fontsize if available
        $('#WikiaArticle').css('font-size', curFontSize);
    }
    $(".increaseFont,.decreaseFont").click(function() {
        var type = $(this).val();
        curFontSize = $('#WikiaArticle').css('font-size');
        if (type == 'increase') {
            $('#WikiaArticle').css('font-size', parseInt(curFontSize) + 1 + "px");
        } else {
            $('#WikiaArticle').css('font-size', parseInt(curFontSize) - 1 + "px");
        }
        localStorage.setItem('FontSize', curFontSize);
    });
});