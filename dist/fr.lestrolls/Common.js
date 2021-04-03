// Tabber
$(function() {
  $(".selectors .tab").first().addClass("active");
  $(".contents .content").first().addClass("active");
 
  $(".selectors .tab").click(function() {
    var i = $(this).index() + 1;
    var ep_tabs = $(this).parents('.ep-tabs').length;
    var tab_color = $(this).css("background-color");
 
    $(".selectors .tab").removeClass("active");
    $(".contents .content").removeClass("active");
 
    $(this).addClass("active");
    $(".contents .content:nth-child(" + i + ")").addClass("active");
 
    if (ep_tabs) {
      $(".ep-tabs .contents").css("border-color", tab_color);
    }
  });
});