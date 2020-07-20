function timeStamp_ModeToggle_js() {
  return "2015.01.28 12:31 (UTC-8)";
}

function createModeToggle() {
   var button = $('.mode-toggle-button');

   if (button.length < 1)
      return;

   button.attr('data-mode', '1');
   button.attr('data-mode-text', button.attr('data-mode-' + button.attr('data-mode')));

   button.click(function() {
      var oldmode = (button.attr('data-mode') === '2' ? '2' : '1');
      var newmode = (oldmode === '2' ? '1' : '2');

      button.attr('data-mode', newmode);
      button.attr('data-mode-text', button.attr('data-mode-' + newmode));
      $('.mode-toggle-mode-' + newmode).toggleClass('mode-toggle-hidden');
      $('.mode-toggle-mode-' + oldmode).toggleClass('mode-toggle-hidden');
   });
}

addOnloadHook(createModeToggle);