// By Equazcion: http://terraria.gamepedia.com/User:Equazcion

var wgPageName = mw.config.get( 'wgPageName' );

if (($('#ca-addsection').length > 0) && (($('.editButtons').length > 0)) 
    || (wgPageName == 'Terraria_Wiki:Admin_noticeboard') || (wgPageName == 'Terraria_Wiki:Community_noticeboard')){
$('.editCheckboxes').css('margin-bottom','5px');
var addSigTooltip = 
    'Click the end of your comment, then click this link to add your signature.';
var addSigText = '<div style="border:1px #ccc solid; width:95%; padding:10px;"> ' +
    'When have finished typing your comment, ' + 
    'please place the cursor at the end of your comment and then ' +
    '<a style="font-weight:bold;" href="#ggg" class="addSig" title="' + addSigTooltip + '">' +
    'click here to add your signature</a>. <br/>' + 
    '<span style="font-size:90%">Your signature will display as &quot;&#126;&#126;&#126;&#126;&quot;, ' +
    'which will automatically turn into your name and date when you click the &quot;save&quot; button.</span></div>';
$('#editpage-copywarn').before(addSigText);
$('.addSig').click(function(){
		    var caretPos = document.getElementById('wpTextbox1').selectionStart;
		    var textAreaTxt = $("#wpTextbox1").val();
		    var txtToAdd = ' ~' + '~' + '~' + '~';
		    $('#wpTextbox1').val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
});
}