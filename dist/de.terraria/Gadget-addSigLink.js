// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var wgPageName = mw.config.get( 'wgPageName' );

if (($('#ca-addsection').length > 0) && (($('.editButtons').length > 0)) 
    || (wgPageName == 'Terraria_Wiki:Adminpinnwand') || (wgPageName == 'Terraria_Wiki:Gemeinschaftsportal')){
$('.editCheckboxes').css('margin-bottom','5px');
var addSigTooltip = 
    'Setze den Mauszeiger an das Ende deines Kommentars und klicke auf diesen Link, um deine Signatur hinzuzufügen.';
var addSigText = '<div style="border:1px #ccc solid; width:95%; padding:10px;"> ' +
    'Wenn du fertig mit deinem Kommentar bist, ' + 
    'setze bitte den Mauszeiger ans Ende deines Kommentars und ' +
    '<a style="font-weight:bold;" href="#ggg" class="addSig" title="' + addSigTooltip + '">' +
    'klicke hier, um deine Signatur anzufügen</a>. <br/>' + 
    '<span style="font-size:90%">Deine Signatur wird als &quot;&#126;&#126;&#126;&#126;&quot; angezeigt, ' +
    'was sich automatisch in deinen Namen und das Datum verwandelt, sobald du auf „Änderungen speichern“ klickst.</span></div>';
$('#editpage-copywarn').before(addSigText);
$('.addSig').click(function(){
		    var caretPos = document.getElementById('wpTextbox1').selectionStart;
		    var textAreaTxt = $("#wpTextbox1").val();
		    var txtToAdd = ' ~' + '~' + '~' + '~';
		    $('#wpTextbox1').val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
});
}