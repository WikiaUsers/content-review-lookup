//Script for merging page histories. Making it easier than deleting, moving then undeleting.

function callAPI(data, method, callback) {
	data['format'] = 'json';
	$.ajax({
		data: data,
		dataType: 'json',
		url: wgScriptPath + '/api.php',
		type: method,
		cache: false,
		success: function(response) {
			if (response.error)
				alert('API error: ' + response.error.info);
			else 
				callback(response);
		},
		error: function(xhr, error) { alert('AJAX error: ' + error) }
	});
}
 
$(function() {
$('#easyPageMerge').html('<div style="background-color:#c3ebc4;padding:4px;margin-top:3px;">Merge page <input id="mergepage1"/> into <input id="mergepage2"> <button id="submitMerge">Submit</button>(Note: The pagename entered in the 2nd input is used as final pagename)<span id="success" style="color:green;"></span><br/><label title="Make the result page have the contents of the 2nd page entered instead of the 1st page\'s."><input type="checkbox" id="preserveSecond">Preserve contents of 2nd page entered</label></div>')
 
$('button#submitMerge').click(function() {
	if ($('#mergepage1').val().length>0&&$('#mergepage2').val().length>0) {
		var frompage = $('#mergepage1').val()
		var topage = $('#mergepage2').val()
		$('button#submitMerge').attr('disabled','disabled').html('Loading page info...')
		callAPI({
			'action': 'query',
			'prop': 'info|revisions',
			'intoken': 'delete|move',
			'titles': frompage+'|'+topage,
			'rvprop': 'timestamp|ids',
			'indexpageids': 'true',
			'list': 'deletedrevs',
			'drprop': 'token'
		}, 'GET', function(response) {
			var page1 = response.query.pages[response.query.pageids[0]];
			var page2 = response.query.pages[response.query.pageids[1]];
			$('button#submitMerge').html('Deleting '+topage+'...')
			callAPI({
				'action':'delete',
				'title':topage,
				'token':page2.deletetoken,
				'reason':'Merging page histories'
			}, 'POST', function(response) {
			$('button#submitMerge').html('5 seconds pause to let servers process requests...')
			setTimeout(function() {
			$('button#submitMerge').html('Moving '+frompage+'...')
			callAPI({
				'action':'move',
				'from':frompage,
				'to':topage,
				'token':page1.movetoken,
				'reason':'Merging page histories',
				'ignorewarnings':'yes',
				'noredirect': 'yes'
			}, 'POST', function(response) {
			$('button#submitMerge').html('Undeleting '+topage+'...')
			callAPI({
				'action': 'query',
				'titles': topage,
				'prop': 'info|revisions',
				'intoken': 'edit',
				'rvprop': 'content',
				'indexpageids': 'true',
				'list': 'deletedrevs',
				'drprop': 'token'
			}, 'GET', function(response) {
				if ($('#preserveSecond').is(':checked')) {
					var endPageContent = response.query.pages[response.query.pageids[0]].revisions[0]["*"];
				} else {
					var endPageContent = false;
				}
				callAPI({
					'action':'undelete',
					'title':topage,
					'token':response.query.deletedrevs[0].token,
					'reason':'Finishing merge'
				}, 'POST', function(response) {
					if (endPageContents) {
						$('button#submitMerge').html('Restoring page contents...')
						callAPI({
							'action': 'edit',
							'title': topage,
							'summary': 'Restoring page contents to those of before the merge.',
							'token': response.query.pages[response.query.pageids[0]].edittoken,
							'text': endPageContents
						}, 'POST', function(response) {
							$('button#submitMerge').removeAttr('disabled').html('Submit')
							$('#mergepage1, #mergepage2').val('')
						})
					} else {
						$('button#submitMerge').removeAttr('disabled').html('Submit')
						$('#mergepage1, #mergepage2').val('')
					}
				})
			})
			})
			}, 5000)
			})
		});
		$('#success').html(frompage+' has been merged into <a href="/wiki/'+topage+'" title="'+topage+'">'+topage+'</a>')
	}
})
});
}