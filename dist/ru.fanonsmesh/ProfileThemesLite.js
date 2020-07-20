/* ******* Profile Themes ******* */
$(document).ready(function() {
    $(".ClickTheme2, .ClickButton2").hide();
    $(".ClickButton1").click(function() {
        $(".ClickTheme1, .ClickButton1").hide();
        $(".ClickTheme2, .ClickButton2").show();
    });
    $(".ClickButton2").click(function() {
        $(".ClickTheme2, .ClickButton2").hide();
        $(".ClickTheme1, .ClickButton1").show();
    });
});