function scrollAnchor(id) {
  var scrollTo = $('#' + id).offset().top - 15;
  window.scrollTo(0, scrollTo);
  console.log(scrollTo);
}

$(document).ready(function() {
  if ($('body').find('> .modal-table').length != 1) {
    $('table:not(.msgbox):not(.modal-table)').each(function(i, element) {
      var tableType;
      var buttonText = '';

      if ($(element).attr('class') == 'infobox-rows') {
        tableType = 'Info Box';
      } else {
        tableType = 'Table';
      }

      $(element).before('<button type="button" class="modal-button"><strong>View ' +
        tableType +
        '</strong></button>');
    });
  }

  $('button.modal-button').click(function() {
    var infoboxContainer = $('<div>').addClass('infobox-container');
    var table = this.nextSibling.cloneNode(true);

    $(table).appendTo(infoboxContainer);

    if (this.nextSibling.classList.contains('infobox-rows')) {
      var infoboxHeaderContainer = $('<div>').addClass('infobox-header-container');
      var infoboxTitle = $(this).parent().find('.infobox-title').clone().appendTo(infoboxHeaderContainer);
      var infoboxImage = $(this).parent().find('.infobox-imagearea').clone().appendTo(infoboxHeaderContainer);

      $(infoboxHeaderContainer).prependTo(infoboxContainer);
    }

    table.classList.add('modal-table');
    $(table).attr('style', '');
    console.log(infoboxContainer.html());
  });
});