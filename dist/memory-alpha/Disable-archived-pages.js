$(function(){
  if ($('#ma-page-archived').length === 0){
    return;
  }

  $('#ca-edit').html('Archived').removeAttr('href');
  $('#ca-addsection').html('Archived').removeAttr('href');

  $('#ca-edit-side-tool').remove();
  $('#ca-addsection-side-tool').remove();

  $('.mw-editsection').remove();
  $('#ca-move').parent().remove();
  $('#ca-edit[data-tracking-label="ca-edit-dropdown"]').parent().remove();
});