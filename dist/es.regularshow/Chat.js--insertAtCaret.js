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
 
$(function() {
    $("#ColorRojo").click(function() {
        $("textarea[name='message']").insertAtCaret(" [[*rojo|TEXTO]] ");
    });
 
    $("#ColorAmarillo").click(function() {
        $("textarea[name='message']").insertAtCaret(" [[*amarillo|TEXTO]] ");
    });
 
    $("#ColorVerde").click(function() {
        $("textarea[name='message']").insertAtCaret(" [[*verde|TEXTO]] ");
    });
 
    $("#ColorAzul").click(function() {
        $("textarea[name='message']").insertAtCaret(" [[*azul|TEXTO]] ");
    });
 
    $("#ColorVioleta").click(function() {
        $("textarea[name='message']").insertAtCaret(" [[*violeta|TEXTO]] ");
    });
 
    $("#ColorNaranja").click(function() {
        $("textarea[name='message']").insertAtCaret(" [[*naranja|TEXTO]] ");
    });
 
    $("#ColorRosado").click(function() {
        $("textarea[name='message']").insertAtCaret(" [[*rosa|TEXTO]] ");
    });
 
	$("#ColorMarron").click(function() {
        $("textarea[name='message']").insertAtCaret(" [[*marron|TEXTO]] ");
    });
 
    $("#ColorCeleste").click(function() {
        $("textarea[name='message']").insertAtCaret(" [[*celeste|TEXTO]] ");
    });
});