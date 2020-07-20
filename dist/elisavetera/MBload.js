// Skin Switch Button (changing "Start a wikia" in Oasis to it) 
if (mw.config.get('skin') == 'oasis') {
  $('.start-wikia').attr('href','/index.php?title='+encodeURIComponent(mw.config.get('wgPageName'))+'&useskin=monobook').text('Monobook');
}
else {
  $('#p-cactions > .pBody > ul > li:last-child').after(
    $('<li/>').append('<a href="/index.php?title='+encodeURIComponent(mw.config.get('wgPageName'))+'&useskin=oasis">Oasis</a>')
  );
}