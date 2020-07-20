/* Any JavaScript here will be loaded for all users on every page load. */

function searchForvo(){
	var language = $(this).parent().attr('id');
	var word = $('[id='+language+'-word]').text();
	var key = 'bcc79302027eb7fd29e69af27a6f708e';
	var callback = 'loadPlayer';
	var url = 'http://apifree.forvo.com/key/'+key+'/format/json/callback/'+callback+'/action/standard-pronunciation/word/'+word+'/language/'+language;
	url += '?callback=?';
	var msg = $('<span>searching...</span>');
	$(this).after(msg.clone().attr('id',function(){return language+'-msg';}));
	$(this).remove();
	$("[id="+language+"-msg]").empty().text('not found');
	$.getJSON(url);

}

function loadPlayer(results){
	if(results['items'].length != 0){
		var langcode = results['items'][0]['code'];
		var lang = results['items'][0]['langname'];
		var oggpath = results['items'][0]['pathogg'];
		var mp3path = results['items'][0]['pathmp3'];
		var container = langcode;
		$("[id="+container+"]").empty();
		$("[id="+container+"]")
			.append($("<audio />")
				.attr({
					controls: 'controls',
					autoplay: 'autoplay'
				})
				.append($("<source />")
					.attr({
						src: oggpath,
						type: 'audio/ogg'
					})
				)
				.append($("<source />")
					.attr({
						src: mp3path,
						type: 'audio/mp3'
					})
				)
			)
			.append(' ( <a href="http://www.forvo.com/">Pronunciations by Forvo</a> )')
		;
	}
	else {
	}
}

$('#en').find('span').click(searchForvo).css('cursor','pointer');
$('#ig').find('span').click(searchForvo).css('cursor','pointer');
$('#mfo').find('span').click(searchForvo).css('cursor','pointer');