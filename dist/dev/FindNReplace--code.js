// created by Curiouscrab
if(wgAction == 'edit') {
	if(skin == 'monobook') {
		$('#toolbar').append('<div id="fnr">FNR</div>');
	} else if(skin == 'oasis') {
		$('#cke_toolbar_source_1').append('<div id="fnr">FNR</div>');
	}
	$('#fnr').css({'cursor':'pointer'}).click(function(){
		$('#fnr').remove();
		$('body').append('<div id="fnr"><textarea id="fnrsearch" placeholder="search term(s)" rows="1" style="resize:none;"></textarea><br><textarea id="fnrreplace" placeholder="replace with" rows="1" style="resize:none;"></textarea><br><button id="goreplace">Go!</button></div>');
		$('#fnr').css({'position':'fixed','top':'40%','left':'45%','background':'#cccccc','padding':'10px','z-index':'999'});
		$('#goreplace').click(function(){
			document.getElementById('wpTextbox1').value=document.getElementById('wpTextbox1').value.split(document.getElementById('fnrsearch').value).join(document.getElementById('fnrreplace').value);
		});
	});
}