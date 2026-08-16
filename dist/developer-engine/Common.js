/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook('wikipage.content').add(function ($content) {
  var $el = $content.find('#local-time');
  if (!$el.length) return;

  function update() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    $el.text(h + ':' + m + ':' + s);
  }

  update();
  setInterval(update, 1000);
});