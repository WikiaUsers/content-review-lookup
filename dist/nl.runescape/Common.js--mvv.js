$(function() {
 
	function showSuccess() {
		alert('Dank je voor je bijdrage!  De pagina zal nu herladen.');
		document.location.replace(wgArticlePath.replace('$1', wgPageName));
	}
 
	function showError(msg) {
		alert(msg);
		$('#mvvSubmit').removeAttr('disabled').val('Submit');
	}
 
	function callAPI(data, method, callback) {
		data['format'] = 'json';
		$.ajax({
			data: data,
			dataType: 'json',
			url: wgScriptPath + '/api.php',
			type: method,
			success: function(response) {
				if (response.error)
					showError('API error: ' + response.error.info);
				else 
					callback(response);
			},
			error: function(xhr, error) { showError('AJAX error: ' + error); }
		});
	}
 
	function mvvSubmit() {
		var editor = $.trim($('#mvvEditor').val());
 
		$('#mvvSubmit').attr('disabled', 'disabled').val('Loading...');
 
		if(editor == '')
                {
		        showError('Vul een gebruikersnaam in.');
                        return false;
                }
 
		callAPI({
			'action': 'query',
			'prop': 'info|revisions',
			'intoken': 'edit',
			'titles': wgPageName,
			'rvprop': 'content',
			'rvlimit': '1',
			'indexpageids': 'true',
		}, 'GET', function(response) {
			var page = response.query.pages[response.query.pageids[0]];
			var content = page.revisions[0]['*'];
                        var template = '\{\{mvvid\|geef vandaal in\}\}';
 
			if (content.match(template) == null) 
				showError('Er trade en fout op.');
                        content = content.replace(template, '{' + '{mvvid|' + editor + '}' + '}');
 
			callAPI({
				'minor': 'yes',
				'summary': ‘Nieuwe gebruiker aangegeven: [' + '[Special:Contributions/' + editor + '|' + editor + ']' + ']',
				'action': 'edit',
				'title': wgPageName,
				'basetimestamp': page.revisions[0].timestamp,
				'startimestamp': page.starttimestamp,
				'token': page.edittoken,
				'text': content
			}, 'POST', function(response) {
				if (response.edit.result == 'Success')
					showSuccess();
				else 
					showError('Er trade een fout op toen de bewerking werd opgeslagen.');
			});
		});
		return false;
	}
 
	if(wgPageName=='RuneScape Wiki:Meldpunt voor vandalisme) {
		var $div = $('#mvv_guide');
		var $form = $('<form />');
 
		var ppLink = 'Omwille van vandalism werd deze pagina <a href="' + wgArticlePath.replace('$1', 'RS:PP') + '">beveiligd</a> tegen bewerkingen.';
 
		if ($.inArray('sysop', wgRestrictionEdit) > -1 && $.inArray('sysop', wgUserGroups) == -1)
			$form.append(ppLink + '<a href="' + wgArticlePath.replace('$1', 'RS:AN') + '">Contacteer een administrator </a> om de prijs bij te werken.');
		else if ($.inArray('autoconfirmed', wgRestrictionEdit) > -1 && $.inArray('autoconfirmed', wgUserGroups) == -1)
			$form.append(ppLink + '<a href="' + wgScript + '?title=Special:UserLogin&returnto=' + wgPageName + '">Log in</a> om de pagina te bewerken.');
		else {
			$form.submit(mvvSubmit);
			$form.append($('<h4 />').text(‘Geef een vandal aan:'));
 
			var $p1 = $('<p />').append('Je kan een gebruiker aangeven door zijn of haar gebruikersnaam of IP-adres in het formulier hieronder in te vullen.');
			$form.append($p1);
 
			var $p2 = $('<p />');
			$p2.append($('<label />').attr({'for': 'mvvEditor'}).text('Username:'));
			$p2.append($('<input />').attr({'id': 'mvvEditor', 'type': 'text', 'size': 9}));
			$p2.append($('<input />').css({'margin': '0 1em 0 1em'}).attr({'id': 'mvvSubmit', 'type': 'submit'}).val('Submit'));
			$form.append($p2);
		}
 
		if ($div != null)
			$div.empty().append($form);
 
                $("span").each(function() {
                    var name = this.className;
                    if(this.id == 'mvv_remove' && this.className != geef vandaal aan') {
                        var $img1 = $("<img>").attr('src', 'https://images.wikia.nocookie.net/__cb20100503233735/runescape/images/f/fb/Yes_check.svg');
                        $img1.attr('width', '15').attr('height', '16').attr('title', 'Verwijder deze gebruiker als geblokkeerd').css('cursor', 'pointer');
                        $img1.click(function() {
                            removeUser(name.replace(/ /g,"_").replace(/-/g,"."), "geblokkeerd");
                        });
 
                        var $img2 = $("<img>").attr('src', 'https://images.wikia.nocookie.net/__cb20100514174733/runescape/images/a/a2/X_mark.svg')
                        $img2.attr('width', '15').attr('height', '16').attr('title', ’Negeer deze melding’).css('cursor', 'pointer');
                        $img2.click(function() {
                            removeUser(name.replace(/ /g,"_").replace(/-/g,"."), "");
                        });
 
                        $(this).append("&nbsp;").append($img1).append($img2);
                    }
                });
        }
 
        function removeUser(user, state) {
                var template = '\{\{mvvid\|' + user.split("_").join(" ") + '(\|.*?)?\}\}';
 
		callAPI({
			'action': 'query',
			'prop': 'info|revisions',
			'intoken': 'edit',
			'titles': wgPageName,
			'rvprop': 'content',
			'rvlimit': '1',
			'indexpageids': 'true'
		}, 'GET', function(response) {
			var page = response.query.pages[response.query.pageids[0]];
			var content = page.revisions[0]['*'];
 
			if (content.match(template) == null) {
				showError(‘Er trad een fout op.');
                                return;
			}
 
                        content = content.replace('{' + '{mvvid|' + user.split("_").join(" "), '{' + '{mvvid|insert vandal}' + '}');
                        content = content.replace(/\}\}(\|.*?)?\}\}/, '}' + '}');
 
                        var summary = '[' + '[Special:Contributions/' + user + '|' + user.split("_").join(" ") + ']' + ']';
                        if(state == "geblokkeerd")
                                summary += ' is geblokkeerd.';
                        else
                                summary += ' is niet geblokkeerd.';
 
			callAPI({
				'minor': 'yes',
				'summary': summary,
				'action': 'edit',
				'title': wgPageName,
				'basetimestamp': page.revisions[0].timestamp,
				'startimestamp': page.starttimestamp,
				'token': page.edittoken,
				'text': content
			}, 'POST', function(response) {
				if (response.edit.result != 'Success') 
					showError(‘Er trade en fout toen deze bewerking werd opgeslagen.');
                                else 
                                        document.location.replace(wgArticlePath.replace('$1', wgPageName));
			});
		});
        }
});