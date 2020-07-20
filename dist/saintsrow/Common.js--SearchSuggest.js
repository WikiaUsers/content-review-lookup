//from https://dev.wikia.com/wiki/SearchSuggest

$(function () {
  var MAX_RESULTS = 10;

  if (!$('#suggestions').size() && window.wgTransactionContext.type == "special_page/Search") {
    $('.SearchInput').append('<p id="suggestions" style="font-size: 80%; font-weight: normal; margin: 10px 40px 0 160px;"></p>');

    $.getJSON('/api.php?action=opensearch&search=' + encodeURIComponent($('#search-v2-input').val()))
    .done(function (data) {
      if ($.isArray(data[1]) && data[1].length) {
        var terms = data[1].slice(0, MAX_RESULTS);
        for (var i = 0; i < terms.length; i++) {
          terms[i] = '<a href="/wiki/' +
            encodeURIComponent(terms[i]) + '">' +
            mw.html.escape( terms[i] ) +
            '</a>';
        }
        $("#suggestions").html('Not what you were looking for? Try: ' + terms.join(', '));
      }
    });
  }
});