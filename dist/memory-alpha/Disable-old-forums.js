function disableOldForums(){
  if ($('#archived-forum-notice').length === 0){
    return;
  }

  $('#ca-edit').html('Archived').removeAttr('href');
  $('#ca-move').parent().remove();
  $('#ca-edit-side-tool').remove();
  $('.mw-editsection').remove();
}

disableOldForums();