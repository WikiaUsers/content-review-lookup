function replaceText(selector, text, newText, flags) {
  var matcher = new RegExp(text, flags);
  $(selector).each(function () {
    var $this = $(this);
    if (!$this.children().length)
       $this.text($this.text().replace(matcher, newText));
  });
}

function replaceAllTextv2() {
  replaceText('*', 'hello', 'hi', 'gi');
  replaceText('*', 'Hako', 'Sonako', 'gi');
}


$(document).ready(replaceAllTextv2);
$('html').ajaxStop(replaceAllTextv2);