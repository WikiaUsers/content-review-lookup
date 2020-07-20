//========================
//     Note dinamiche
//========================

// Occultamento lista note
$(function() {
   $('div#listanote').hide();
   $('div#listanote .editsection').hide();
});

// Funzioni
//// Mostra
function ShowNotes() {
   $('#show-listanote-button').hide();
   $('#hide-listanote-button').show();
   $('#listanote').show('slow');
};
//// Nascondi
function HideNotes() {
   $('#hide-listanote-button').hide();
   $('#show-listanote-button').show();
   $('#listanote').hide('slow');
};
// Eventi
//// Eventi pulsanti
$(function() {
   $('#show-listanote-button a').click(ShowNotes);
   $('#hide-listanote-button a').click(HideNotes);
});
//// Evento click sulla nota
$('sup.reference a').click(function() {
   ShowNotes();
   var jump = $(this).attr('href');
   var new_position = $('#' + jump).offset();
   window.scrollTo(new_position.left, new_position.top);
   return false;
});
//// Evento click nel TOC
$('#toc a[href="#Note"]').click(function() {
   ShowNotes();
   var jump = $(this).attr('href');
   var new_position = $('#' + jump).offset();
   window.scrollTo(new_position.left, new_position.top);
   return false;
});