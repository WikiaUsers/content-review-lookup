if($('#mover').length) {
   $('<span class="upon-moving wds-button wds-is-text page-header__action-button">'+$('#mover').html()+'</span>').appendTo('.page-header__actions');
   $('#mover').remove();
}