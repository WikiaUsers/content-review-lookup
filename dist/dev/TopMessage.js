// Re-show message later (console):
// mw.loader.using('mediawiki.storage').then(() => mw.storage.remove('DevMessageDismissed'));

mw.loader.using(['mediawiki.storage', 'mediawiki.util']).then(function () {
  var dismissed = mw.storage.get('DevMessageDismissed');
  if (dismissed && mw.config.get('wgPageName') !== 'Template:Top') return;

  $.getJSON(mw.util.wikiScript('api'), {
    action: 'parse',
    page: 'Template:Top',
    format: 'json',
    disablepp: true
  }).done(function (data) {
    var html = data && data.parse && data.parse.text && data.parse.text['*'];
    if (!html) return;

    var box = $('<div>').html(html).css({
      color: 'var(--theme-text-color--secondary)',
      'background-color': 'var(--theme-page-background-color--secondary)',
      padding: '10px',
      border: '2px solid var(--theme-link-color--secondary)',
      'border-radius': '8px',
      'text-align': 'center',
      position: 'relative'
    });

    var close = $('<span>')
      .text('x')
      .attr('title', 'Click to close this message permanently.')
      .css({
        position: 'absolute',
        top: '5px',
        right: '10px',
        cursor: 'pointer',
        color: 'var(--theme-link-color--secondary)',
        'font-weight': 'bold',
        'font-size': '16px'
      })
      .on('click', function () {
        box.remove();
        mw.storage.set('DevMessageDismissed', 'true');
      });

    box.append(close);
    $('#mw-content-text').prepend(box);
  });
});