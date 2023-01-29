/*
   This script automatically changes links from http:// links to wikilinks. Examples:

	[http://runescape.wikia.com/wiki/Cake cake] -> [[cake]]
	[http://runescape.wikia.com/wiki/Cake Click here] -> [[Cake|Click here]]
	[http://runescape.wikia.com/wiki/File:Cake.png Image] -> [[:File:Cake.png|Image]]
*/

// http://blog.vishalon.net/index.php/javascript-getting-and-setting-caret-position-in-textarea/
function getCaretPos(ctrl) {
    var CaretPos = 0;    // IE Support
    if (document.selection) {
    ctrl.focus ();
        var Sel = document.selection.createRange ();
        Sel.moveStart ('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}
function setCaretPos(ctrl, pos){
    if(ctrl.setSelectionRange)
    {
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

var textbox = $('#RTEtextarea').length ? $('#RTEtextarea')[0] : $('#wpTextbox1')[0];
$(textbox).keyup(function() {
	var text = $(this).val();
	var regex = new RegExp('\\['+wgServer+'/wiki/([^ ]*) ([^\\]]*)\\]','g');
	if (text.match(regex)) {
		var fixed = text;
		var curCaretPos = getCaretPos(textbox);
		var caretPos = curCaretPos;
		fixed = fixed.replace(regex, function(match, one, two, offset) {
			var linkpage = one.replace(/_/g,' ').replace(/./,function(a) {return a.toLowerCase()});
			if (linkpage.indexOf('?') != -1) { return match; }
			if (linkpage.indexOf('file:')==0) { one = ':'+one; }
			var linktext = two.replace(/./,function(a) {return a.toLowerCase()});
			if (linkpage == linktext) {
				if (offset <= curCaretPos) {
					caretPos -= Math.abs((two.length + 4) - match.length);
				}
				return '[['+two+']]';
			} else {
				if (offset <= curCaretPos) {
					caretPos -= Math.abs((one.length + two.length + 5) - match.length);
				}
				return '[['+one.replace(/_/g, ' ')+'|'+two+']]';
			}
		});
		$('#wpTextbox1, #RTEtextarea').val(fixed);
		setCaretPos(textbox, caretPos);
	}
});