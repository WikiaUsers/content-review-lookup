/* Tout JavaScript présent ici sera exécuté par tous les utilisateurs à chaque chargement de page. */
// copy to clipboard
$(function() { // wait for content load (DOMContentLoaded)
  $('.copy-clipboard').each(function () {
   var $this = $(this);
   var $button = $('<button title="Copy to Clipboard">&#xf0ea;</button>');
   $this.append($button);
   $button.click(function () {
    var $content = $this.find('.copy-content');
    $content.children().remove();
    selectElementText($content[0]);
  
    try {
      if (!document.execCommand('copy'))
       throw 42;
      mw.notify('Copie réussie dans le presse-papiers.');
    } catch (err) {
      mw.notify('Copie dans le presse-papiers a échoué. Veuillez le faire vous-même.', {type:'error'});
    }
   });
  });

  $('.copy-wrapper img').click(function (e) {
    e.preventDefault();
    var text = $(this).closest('.copy-wrapper').find('.copy-content').html();
    var copyEl = document.createElement('textarea');
    copyEl.value = text;
    document.body.appendChild(copyEl);
    copyEl.select();
    try {
      if (!document.execCommand('copy'))
       throw 42;
      mw.notify('Copie réussie dans le presse-papiers.');
    } catch (err) {
      mw.notify('Copie dans le presse-papiers a échoué. Veuillez le faire vous-même.', {type:'error'});
    }
    document.body.removeChild(copyEl);
   });

});



function selectElementText(element) {
  var range, selection;  
  if (document.body.createTextRange) {
   range = document.body.createTextRange();
   range.moveToElementText(element);
   range.select();
  } else if (window.getSelection) {
   selection = window.getSelection();     
   range = document.createRange();
   range.selectNodeContents(element);
   selection.removeAllRanges();
   selection.addRange(range);
  }
}