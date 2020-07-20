// "Move to Workshop" link/button by Bobogoobo
$(document).ready(function() {
    if (
      mw.config.get('wgCanonicalSpecialPageName') === 'Movepage' && 
      $('#wpNewTitleNs :selected').html() === '(Main)'
    ) {
        $('#mw-movepage-table .mw-input:first').append(
          '<a id="moveWorkshop" style="float:right; cursor:pointer;">' + 
          'Move to Workshop</a>'
        );

        $('#moveWorkshop').click(function() {
            $('#wpNewTitleNs option[value="4"]').attr('selected', 'selected');
            $('#wpNewTitleNs option[value="0"]').removeAttr('selected');
            $('#wpNewTitleMain').val('Workshop/' + $('#wpNewTitleMain').val());
        });
    }
});