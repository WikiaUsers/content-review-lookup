function scrollAnchor(id) {
  var scrollTo = $('#' + id).offset().top - 15;
  window.scrollTo(0, scrollTo);
  console.log(scrollTo);
}

$(document).ready(function() {
  if ($('body').find('> .modal-table').length !== 1) {
    $('table').each(function() {
      if (!$(this).hasClass('msgbox') && !$(this).hasClass('modal-table') && $(this).outerWidth() > window.innerWidth - 32) {
        var descText = '';

        $(this).hide();
        $(this).parent().attr('style', '');

        if ($(this).data('description')) {
          descText = $(this).data('description');
        }

        $(this).before('<button type="button" class="modal-button"><strong>View Table' + ($(this).data('description') ? ": " : "") + descText + '</strong></button>');
      }
    });
  }

  $('button.modal-button').click(function() {
    var tableContainer = $('<div>');
    var table = this.nextSibling.cloneNode(true);

    $(table).appendTo(tableContainer);

    table.classList.add('modal-table');
    $(table).attr('style', '');
    console.log(tableContainer.html());
  });
});