/* Any JavaScript here will be loaded for users using the Hydra Dark skin */
/* Spoilers - based on Tierrie's code */
$(document).ready(function(){
  var cookiepref = 'spoilerdisplay_';

  function setCookie(key, value) {
    if(value=="undefined" || value == "null") value = null;
    $.cookie(cookiepref + key, value, { expires:100,path:'/' });
  }
  
  function getCookie(key) {
    return $.cookie(cookiepref + key);
  }
  
  $('.spoiler').click( function() {
    var id = $(this).attr('class').match(/spid_[\d\w]+/)[0].split('spid_')[1];
    if( $('.spid_'+id+' .spwrn').css('display') == 'none') {
      $('.spid_'+id+' .spwrn').fadeIn(200, function() {
        $(this).show(200);
      });
      $('.spid_'+id+' .sptxt').hide(0);
      setCookie(id, 'hidden');
    } else {
      $('.spid_'+id+' .spwrn').fadeOut(200, function() {
        $(this).hide(200);
      });
      $('.spid_'+id+' .sptxt').delay(200).show(0);
      setCookie(id, 'shown');
    }
  });
  /* Set to default or stored state on load */
  var spoiled = {};
  $('.spoiler').each( function() {
    var id = $(this).attr('class').match(/spid_[\d\w]+/)[0].split('spid_')[1];
    spoiled[id] = undefined;
  });
  for (var id in spoiled) {
    if (getCookie(id) === 'shown') {
      $('.spid_'+id+' .spwrn').hide(0);
      $('.spid_'+id+' .sptxt').show(0);
    } else if (getCookie(id) === 'hidden') {
      $('.spid_'+id+' .spwrn').show(0);
      $('.spid_'+id+' .sptxt').hide(0);
    } else if ($('.spid_'+id+' .spwrn').attr('display') == 'none') {
      $('.spid_'+id+' .spwrn').hide(0);
      $('.spid_'+id+' .sptxt').show(0);
    } else {
      $('.spid_'+id+' .spwrn').show(0);
      $('.spid_'+id+' .sptxt').hide(0);
    }
  }
});

addOnloadHook(sortables_init);