if($('#szautor-up').length) {
   $('<div class="szautor-upped">'+$('#szautor-up').html()+'</div>').appendTo('.page-header__categories-bar');
   $('#szautor-up').remove();
}