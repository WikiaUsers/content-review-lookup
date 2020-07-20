/*
 $.fn.extend({
 insertAtCaret: function (myValue) {
    var $input;
    if (typeof this[0].name != 'undefined')
        $input = this[0];
    else
        $input = this;

    if ($.browser.msie) {
        $input.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        $input.focus();
    }
    else if ($.browser.mozilla || $.browser.webkit) {
        var startPos = $input.selectionStart;
        var endPos = $input.selectionEnd;
        var scrollTop = $input.scrollTop;
        $input.value = $input.value.substring(0, startPos) + myValue + $input.value.substring(endPos, $input.value.length);
        $input.focus();
        $input.selectionStart = startPos + myValue.length;
        $input.selectionEnd = startPos + myValue.length;
        $input.scrollTop = scrollTop;
    } else {
        $input.value += myValue;
        $input.focus();
    }
}
});
*/

jQuery.fn.extend({
insertAtCaret: function(myValue, myValueE){
  return this.each(function(i) {
    if (document.selection) {
      this.focus();
      sel = document.selection.createRange();
      sel.text = myValue + myValueE;
      this.focus();
    }
    else if (this.selectionStart || this.selectionStart == '0') {
      var startPos = this.selectionStart;
      var endPos = this.selectionEnd;
      var scrollTop = this.scrollTop;
      this.value = this.value.substring(0,     startPos)+myValue+this.value.substring(startPos,endPos)+myValueE+this.value.substring(endPos,this.value.length);
      this.focus();
      this.selectionStart = startPos + myValue.length;
      this.selectionEnd = ((startPos + myValue.length) + this.value.substring(startPos,endPos).length);
      this.scrollTop = scrollTop;
    } else {
      this.value += myValue;
      this.focus();
    }
  })
    }
});