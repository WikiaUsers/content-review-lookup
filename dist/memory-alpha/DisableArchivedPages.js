$(function(){
  if ($(':is(.ns-talk, .ns-4, .ns-110) #archivedPage').length !== 1){
    return;
  }

  $('#ca-edit').html('Archived').removeAttr('href');
  $('#ca-addsection').html('Archived').removeAttr('href');
  $('#log-in-edit').html('Archived').removeAttr('href');

  $('#ca-edit-side-tool').remove();
  $('#ca-addsection-side-tool').remove();
  $('#log-in-edit-side-tool').remove();

  $('.mw-editsection').remove();
  $('#ca-move').parent().remove();
  $('#ca-edit[data-tracking-label="ca-edit-dropdown"]').parent().remove();

  if ($('.page-header__page-subtitle .new').length === 1){
    $('.page-header__page-subtitle').html($('.subpages'));
  }
});