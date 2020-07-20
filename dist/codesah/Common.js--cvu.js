$(function() {

	function showSuccess() {
		alert('Thank you for your submission!  The page will now be reloaded.');
		document.location.replace(wgArticlePath.replace('$1', wgPageName));
	}

	function showError(msg) {
		alert(msg);
		$('#cvuSubmit').removeAttr('disabled').val('Submit');
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

	function cvuSubmit() {
		var editor = $.trim($('#cvuEditor').val());
 
		$('#cvuSubmit').attr('disabled', 'disabled').val('Loading...');
 
		if(editor == '')
                {
		        showError('Please enter a user name.');
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
                        var template = '\{\{cvuid\|insert vandal\}\}';

			if (content.match(template) == null) 
				showError('An error occurred.');
                        content = content.replace(template, '{' + '{cvuid|' + editor + '}' + '}');

			callAPI({
				'minor': 'yes',
				'summary': 'Reported new user: [' + '[Special:Contributions/' + editor + '|' + editor + ']' + ']',
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
					showError('An error occurred while submitting the edit.');
			});
		});
		return false;
	}

	if(wgPageName=='RuneScape:Counter-Vandalism_Unit') {
		var $div = $('#cvu_guide');
		var $form = $('<form />');

		var ppLink = 'Due to vandalism, this page has been <a href="' + wgArticlePath.replace('$1', 'RS:PP') + '">protected</a> from editing.';

		if ($.inArray('sysop', wgRestrictionEdit) > -1 && $.inArray('sysop', wgUserGroups) == -1)
			$form.append(ppLink + ' Please <a href="' + wgArticlePath.replace('$1', 'RS:AR') + '">contact an administrator</a> to update the price.');
		else if ($.inArray('autoconfirmed', wgRestrictionEdit) > -1 && $.inArray('autoconfirmed', wgUserGroups) == -1)
			$form.append(ppLink + ' Please <a href="' + wgScript + '?title=Special:UserLogin&returnto=' + wgPageName + '">log in</a> to edit the page.');
		else {
			$form.submit(cvuSubmit);
			$form.append($('<h4 />').text('Report a vandal:'));
 
			var $p1 = $('<p />').append('You may report a user by inserting his or her username or IP address in the form below.');
			$form.append($p1);
 
			var $p2 = $('<p />');
			$p2.append($('<label />').attr({'for': 'cvuEditor'}).text('Username:'));
			$p2.append($('<input />').attr({'id': 'cvuEditor', 'type': 'text', 'size': 9}));
			$p2.append($('<input />').css({'margin': '0 1em 0 1em'}).attr({'id': 'cvuSubmit', 'type': 'submit'}).val('Submit'));
			$form.append($p2);
		}

		if ($div != null)
			$div.empty().append($form);

                $("span").each(function() {
                    var name = this.className;
                    if(this.id == 'cvu_remove' && this.className != 'insert vandal') {
                        var $img1 = $("<img>").attr('src', 'https://images.wikia.nocookie.net/__cb20100503233735/runescape/images/f/fb/Yes_check.svg');
                        $img1.attr('width', '15').attr('height', '16').attr('title', 'Remove this user as blocked').css('cursor', 'pointer');
                        $img1.click(function() {
                            removeUser(name.replace(/ /g,"_").replace(/-/g,"."), "blocked");
                        });

                        var $img2 = $("<img>").attr('src', 'https://images.wikia.nocookie.net/__cb20100514174733/runescape/images/a/a2/X_mark.svg')
                        $img2.attr('width', '15').attr('height', '16').attr('title', 'Disregard this report').css('cursor', 'pointer');
                        $img2.click(function() {
                            removeUser(name.replace(/ /g,"_").replace(/-/g,"."), "");
                        });

                        $(this).append("&nbsp;").append($img1).append($img2);
                    }
                });
        }

        function removeUser(user, state) {
                var template = '\{\{cvuid\|' + user.split("_").join(" ") + '(\|.*?)?\}\}';

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
				showError('An error occurred.');
                                return;
			}

                        content = content.replace('{' + '{cvuid|' + user.split("_").join(" "), '{' + '{cvuid|insert vandal}' + '}');
                        content = content.replace(/\}\}(\|.*?)?\}\}/, '}' + '}');

                        var summary = '[' + '[Special:Contributions/' + user + '|' + user.split("_").join(" ") + ']' + ']';
                        if(state == "blocked")
                                summary += ' has been blocked.';
                        else
                                summary += ' has not been blocked.';

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
					showError('An error occurred while submitting the edit.');
                                else 
                                        document.location.replace(wgArticlePath.replace('$1', wgPageName));
			});
		});
        }
});