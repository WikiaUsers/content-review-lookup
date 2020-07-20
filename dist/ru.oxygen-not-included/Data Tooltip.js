 $("[data-tooltip]").mousemove(function (eventObject) {
     $data_tooltip = $(this).attr("data-tooltip");
     $("#tooltip").text($data_tooltip).css(
         {
             "top" : eventObject.pageY + 5,
             "left" : eventObject.pageX + 5
         }).show();
 }).mouseout(function () {

$("#tooltip").hide().text("").css({"top" : 0,"left" : 0});});