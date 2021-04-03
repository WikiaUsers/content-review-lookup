if (wgNamespaceNumber == 6) {
	$('#filetoc').append(
		$('<li/>').append(
			$('<a/>', {'class':'foreignLink', 'href':'#ddd', 'text':'List Foreign Uses'})
		)
	);
	$('.foreignLink').click(function(){
		$('.interUses').remove();
		$('div[id$="linkstoimage"]').append($('<ul/>', {'class':'interUses'}));
		var $interUses = $('.interUses');
		var URLprefix = 'https://terraria', 
			URLsuffix = '.gamepedia.com/api.php?format=json&callback=?';
		var msgForeignUses = 'Foreign uses',
			msgImageLink = 'image page',
			msgNoUses = 'No foreign uses of this image were detected.';
		$interUses.append( $('<h2/>', {'text':msgForeignUses, 'style':'margin-left:-22px;'}) );
		var langs = {
			'Russian':'-ru',
			'French':'-fr',
			'Polish':'-pl',
			'Portuguese':'-pt',
			'Korean':'-ko',
			'Chinese':'-zhtw'
		};
		$.each(langs, function(key, value) {
			var currentLangCode = value;
			var request2 = { action:'query', list:'allimages', ailimit:'1',	aifrom:wgTitle }
			$.getJSON(URLprefix + currentLangCode + URLsuffix, request2, function(response2) {
				$.each(response2.query.allimages, function(index, value){
					if (value.name != wgTitle.replace(/ /g,'_')){
						var request1 = { action:'query', list:'imageusage', iutitle:wgPageName };
						$.getJSON(URLprefix + currentLangCode + URLsuffix, request1, function(response1) {
							var currentLangName = key;
							if (response1.query.imageusage.length > 0) {
								var urlImage = URLprefix + currentLangCode + '.gamepedia.com/' + wgPageName;
								$interUses.append(
									$('<h3/>', {'style':'margin-left:-20px;', 'text':currentLangName}).append(
										$('<span/>', {'style':'font-size:85%;'}).append(
											' (', $('<a/>', {'href':urlImage, 'text':msgImageLink}), ')'
										)
									)
								);
								$.each(response1.query.imageusage, function(index, value) {
									var urlUse = URLprefix + currentLangCode + '.gamepedia.com/' + value.title;
									$interUses.append(
										$('<li/>').append(
											$('<a/>', {'href': urlUse, 'text':value.title})
										)
									);
								});
							}
						});
					}
				});
			});
		});
		setTimeout(function(){$interUses[0].scrollIntoView(true)}, 1000);
		setTimeout(function(){
			if ($interUses.find('li').length < 1){
				$interUses.append( $('<h3/>', {'text': msgNoUses}) );
			}
		}, 1000);
	});
}