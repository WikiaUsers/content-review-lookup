/* !!!CURRENTLY INCOMPATIBLE ON MOBILE!!!! — Modifier Searcher */

/*
$(document).ready(function() {
  if ($('#modifier-search-container').length === 0) return;
  $('#modifier-search-container').css({'width': '100%'});
  var modifiers = ['Tax Income', 'Manpower Increase', 'City Resistance'];
  $('#modifier-search-container').html(
    '<div style="position:relative;width:100%;box-sizing:border-box;">' +
      '<input id="modifier-search" type="text" placeholder="Search modifier..." style="width:100%;padding:8px 12px;font-size:14px;box-sizing:border-box;display:block;" />' +
      '<div id="modifier-suggestions" style="position:absolute;top:100%;left:0;right:0;background:#1a1a1b;border:1px solid #3a3a3b;z-index:9999;display:none;box-sizing:border-box;"></div>' +
    '</div>' +
    '<div id="modifier-results"></div>'
  );
  $('#modifier-search').on('input', function() {
    var query = $(this).val().toLowerCase();
    $('#modifier-suggestions').hide().empty();
    $('#modifier-results').empty();
    if (query.length < 1) return;
    var hits = modifiers.filter(function(m) {
      return m.toLowerCase().includes(query);
    });
    if (hits.length === 0) return;
    hits.forEach(function(hit) {
      $('<div>')
        .text(hit)
        .css({padding:'9px 12px', cursor:'pointer', color:'#ccc', fontSize:'13px', borderBottom:'1px solid #2a2a2b'})
        .hover(function(){ $(this).css('background','#2a2a2b'); },
               function(){ $(this).css('background','none'); })
        .on('click', function() {
          $('#modifier-search').val(hit);
          $('#modifier-suggestions').hide().empty();
          $.get(mw.util.wikiScript('api'), {
            action: 'parse',
            page: 'Template:Modifier/' + hit,
            prop: 'text',
            format: 'json'
          }, function(data) {
            $('#modifier-results').html(data.parse.text['*']);
            mw.loader.using('jquery.makeCollapsible').done(function() {
              $('#modifier-results .mw-collapsible').makeCollapsible();
            });
          });
        })
        .appendTo('#modifier-suggestions');
    });
    $('#modifier-suggestions').show();
  });
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#modifier-search-container').length) {
      $('#modifier-suggestions').hide();
    }
  });
});
*/