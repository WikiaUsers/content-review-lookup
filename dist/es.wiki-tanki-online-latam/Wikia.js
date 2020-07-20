/*============================================================================================*/
//PrettySpoiler

if($(".pretty-spoiler").length) {

  var texts = { OPEN: "Reveal hidden contents", CLOSE: "Hide contents" };
  
  $('.pretty-spoiler > .title').click(function() {
    var content = $(this).next('div');
    changeTitleState($(this), content.is(":visible"));
    content.slideToggle(300);
  });

  function changeTitleState(elem, state) {
    if(state){
      elem.css("background-color", "rgba(255,255,255,0.1)");
      elem.prop('title', texts.OPEN);
    } else {
      elem.css("background-color", "rgba(255,255,255,0.3)");
      elem.prop('title', texts.CLOSE);
    }
    elem.children('.title-arrow').toggleClass('rotate180');
  }
}