$(function () {
  if (mw.config.get('wgNamespaceNumber') === 0) { // 0 = espace principal (articles)
    var banner = $('<div>')
      .addClass('custom-global-banner')
      .html('📌 <b>Note :</b> Cet article concerne</b>.')
      .css({
        backgroundColor: '#ffffff',
        border: '2px solid #0000ff',
        padding: '8px',
        margin: '10px 0',
        textAlign: 'center',
        fontSize: '1em'
      });

    $('#mw-content-text').prepend(banner);
  }
});