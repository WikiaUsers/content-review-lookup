//Спойлер (переключатель)
$(function () {
  $(".text").hide();
  $("div.title").click(function () {
    $(this).siblings(".text").toggle();
  });
});
//Слайдер заглавной
$(function() {
  $(".PoEList").hide();
  $(".PoEIIList").hide();
  $(".panel").hide();
  $("#PoE").click(
    function() {
      $(".images").hide();
      $(".PoEList").show();
      $(".panel").show();
  });
  $("#PoEII").click(
    function() {
      $(".images").hide();
      $(".PoEIIList").show();
      $(".panel").show();
  });
  $("#right").click(	
    function() {
      $(".PoEList").toggle();
      $(".PoEIIList").toggle();
    });
  $("#left").click(	
    function() {
      $(".PoEList").toggle();
      $(".PoEIIList").toggle();
    });
});