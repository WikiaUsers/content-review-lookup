/*
Extended Images Preview v1.0
Code: KHSW // Idea: *i can't remember actually*
*/
if ($('#ExtImg').size() > 0) {
$('body').prepend('<div id="ExtImgBubble"></div>');
$('#ExtImgBubble').css({
  position: 'absolute',
  display: 'none',
  boxShadow: '0 0 5px rgba(0,0,0,0.4)',
  borderRadius: '5px',
  maxHeight: '480px',
  padding: '5px',
  background: '#3c3c3c',
  zIndex: '3000'
});
$('body #ExtImg').hover(function() {
  var ExtImg = $(this).parent('a.external').attr('href'),
      LinkPlace = $(this).offset();
  $('#ExtImgBubble').html('<img src="' + ExtImg + '" width="240px" />');
  $('#ExtImgBubble').css({
    top: LinkPlace.top - $('#ExtImgBubble').height() - 15,
    left: LinkPlace.left
  });
  $('#ExtImgBubble').show();
},function() {
  $('#ExtImgBubble').hide();
});
}