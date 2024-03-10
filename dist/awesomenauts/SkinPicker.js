$(document).ready(function() {

    $(".skin-holder").children("img").width('256px');
    $(".skin-holder").children("img").height('256px');

    $(".skin-image").children(".image").children("img").width('32px');
    $(".skin-image").children(".image").children("img").height('32px');

    $(".skin-picker").children(".skin-image").click(function() {
       $(this).parent(".skin-picker").children(".skin-holder").attr("src"
    });
 
 });