function replaceTextv2(selector, text, newText, flags) {
  var matcher = new RegExp(text, flags);
  $(selector).each(function () {
    var $this = $(this);
    if (!$this.children().length)
       $this.text($this.text().replace(matcher, newText));
  });
}
 
function replaceAllTextv2() {
  replaceTextv2('*', 'Hako', 'Sonako', 'igm');
}
 
 
$(document).ready(replaceAllTextv2);
$('html').ajaxStop(replaceAllTextv2);