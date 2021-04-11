/*Сортировка*/
$('#cb_buttonmeat').click(function() {
  $(".cbmeat").removeClass("recipearrow");
  $(".cbveggie").addClass("recipearrow");
  $(".cbother").addClass("recipearrow");
  $("#cb_buttonmeat").removeClass("button");
  $("#cb_buttonmeat").addClass("buttoncb");
  $("#cb_buttonveggie, #cb_buttonall, #cb_buttonother").removeClass("buttoncb");
  $("#cb_buttonveggie, #cb_buttonall, #cb_buttonother").addClass("button");
});

$('#cb_buttonveggie').click(function() {
  $(".cbmeat").addClass("recipearrow");
  $(".cbother").addClass("recipearrow");
  $(".cbveggie").removeClass("recipearrow");
  $("#cb_buttonveggie").removeClass("button");
  $("#cb_buttonveggie").addClass("buttoncb");
  $("#cb_buttonmeat, #cb_buttonall, #cb_buttonother").removeClass("buttoncb");
  $("#cb_buttonmeat, #cb_buttonall, #cb_buttonother").addClass("button");
});

$('#cb_buttonall').click(function() {
  $(".cbmeat").removeClass("recipearrow");
  $(".cbveggie").removeClass("recipearrow");
  $(".cbother").removeClass("recipearrow");
  $("#cb_buttonall").removeClass("button");
  $("#cb_buttonall").addClass("buttoncb");
  $("#cb_buttonmeat, #cb_buttonveggie, #cb_buttonother").removeClass("buttoncb");
  $("#cb_buttonmeat, #cb_buttonveggie, #cb_buttonother").addClass("button");
});

$('#cb_buttonother').click(function() {
  $(".cbmeat").addClass("recipearrow");
  $(".cbveggie").addClass("recipearrow");
  $(".cbother").removeClass("recipearrow");
  $("#cb_buttonother").removeClass("button");
  $("#cb_buttonother").addClass("buttoncb");
  $("#cb_buttonmeat, #cb_buttonall, #cb_buttonveggie").removeClass("buttoncb");
  $("#cb_buttonmeat, #cb_buttonall, #cb_buttonveggie").addClass("button");
});

/*Сортировка Варли*/
$('#cbdefault').click(function(){
  $(".foodlist.cbdefault").css({"display": ""});
  $("#cbdefault").addClass('active');
  $(".foodlist.warly").css({"display": "none"});
  $("#shef").removeClass('active');
});

$('#shef').click(function(){
  $(".foodlist.cbdefault").css({"display": "none"});
  $("#cbdefault").removeClass('active');
  $(".foodlist.warly").css({"display": ""});
  $("#shef").addClass('active');
});