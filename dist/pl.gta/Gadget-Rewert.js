/*
 * Gadżet umożliwiający wycofanie kilku edycji bez opuszczania strony i z podaniem konkretnego powodu.
 * *****
 * Copyright (c) 2018 Piotr "PiotrekD" Doroszewski
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * (See https://en.wikipedia.org/wiki/MIT_License and https://opensource.org/licenses/MIT.)
*/
$(function() {
  $('#mw-diff-ntitle2').append('<span class="mw-revert-with-reason">[<a>cofnij z powodem</a>]</span>');
  $('.mw-revert-with-reason a').on('click', function() {
    var reason = prompt('Podaj powód rewertu:');
    var API = new mw.Api();
    var diff_text, diff_title;
    var diff_number = $('a[data-action="revision-link-before"]').attr('href').match(/\?oldid=(\d*)/)[1];
    API.get({
      action: 'query',
      prop:   'revisions',
      rvprop: 'content',
      revids: diff_number
    }).done(function(x) { 
      var x = x.query.pages;
      diff_text  = x[Object.keys(x)[0]].revisions[0]['*'];
      diff_title = x[Object.keys(x)[0]].title.replace(/ /g, '_');
      if (typeof diff_title === 'undefined' || typeof diff_text === 'undefined') {
        alert('Wystąpił błąd, nie załadowano odpowiednich danych!');
        return 0;
      }
      API.post({
        action: 'edit',
        title:   diff_title,
        text:    diff_text,
        summary: 'Przywrócono wersję nr ' + diff_number.toString() + ': ' + reason,
        token:   mw.user.tokens.values.editToken
      }).done(function() {
        alert('Przywrócono poprzednią wersję.');
        window.location.href = (wgArticlePath.replace('$1', wgPageName) + '?diff=cur');
      }).fail(function() {
        alert('Wystąpił błąd, nie można zapisać nowej wersji strony!');
      });
    }).fail(function() {
      alert('Wystąpił błąd, nie można załadować tekstu starszej wersji strony!');
    });
  });
});