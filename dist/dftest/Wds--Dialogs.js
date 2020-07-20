function WdsDialogs(content,title,button) {
  if (title !== null && title !== undefined) {
    title = '<div class="wds-dialog__title">'+title+'</div>';
  } else {
    title = '';
  }
  var buttonText = button.text,
      buttonAction = button.action;
      //buttonId = button.id;

  $('body').prepend(
    '<div class="wds-dialog__curtain">'+
    '<div class="wds-dialog__wrapper">'+
    title +
    '<div class="wds-dialog__content">'+content+'</div>'+
    '<div class="wds-dialog__actions">'+
    '<span class="wds-button wds-is-text wds-dialog__actions-button" id="wds-dialog-button">'+buttonText+'</span>'+
    '</div>'+
    '</div>'+
    '</div>'
  );

  $('#wds-dialog-button').click(buttonAction);
}