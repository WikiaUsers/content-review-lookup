function PopUpLinks(closebg,bodybg) {
  var wikiph = $('#WikiaPage').height(),
  wikipw = $('#WikiaPage').width(),
  closebutton = '<div id="closeit" style="display: none; position: fixed; top: 10px; border-radius: 5px 5px 0 0;  cursor: pointer; left: 11px; line-height: 45px; font-size: 20px; background: ' + closebg + '; box-sizing: border-box; width: ' + wikipw + 'px; z-index: 300000 !important; font-size: 12px; padding: 0 15px; border: solid 1px #d5d4d4;"></div>';
  $('body').append('<div style="overflow: hidden; overflow-y: scroll; background: ' + bodybg + '; box-sizing: border-box; position: fixed; top: 55px; left: 11px; width: ' + wikipw + 'px; display: none; line-height: 108%; border: solid 1px #d5d4d4; max-height:' + wikiph + 'px; padding: 10px; box-sizing: border-box;" id="popuptrigger"></div>');
  $('body').prepend(closebutton);
  $('.public.wordmark > div a#newpop').css('cursor', 'pointer');
  $('.public.wordmark > div a#newpop').click(function () {
    var linktoload = $(this).data('href'),
    linkname = $(this).html();
    linktoload = linktoload + '?action=render';
    $('#popuptrigger').html();
    $('#popuptrigger').load(linktoload).delay(400).slideDown(400);
    $('#closeit').slideDown(400);
    $('#popuptrigger a').attr('target','_blank');
    $('#closeit').html('<span id="linkname">' + linkname + '</span> <span id="closeitneow" style="float: right; font-weight: bolder; background: #880000; padding: 0 10px;" title="ЗАКРЫТЬ">X</span>')
  });
  $('#closeit').click(function () {
    $('#popuptrigger').slideUp(400).html('Loading...');
    $('#closeit').delay(400).slideUp(400);
    $('#closeit').html();
  });
}
PopUpLinks('#363636','#262626');