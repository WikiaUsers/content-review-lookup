var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' );
var wgPageName = mw.config.get( 'wgPageName' );
var wgTitle = mw.config.get( 'wgTitle' );

if (wgNamespaceNumber == 6) {
	$('<ul></ul>').append(
		$('<li></li>').append(
			$('<a></a>', {'class':'foreignLink', 'href':'#ddd', 'text':'Elenca utilizzi esterni'})
		)
	).insertAfter('#filelinks');
	$('.foreignLink').click(function(){
		$('.interUses').remove();
		$('div[id$="linkstoimage"]').append($('<ul></ul>', {'class':'interUses'}));
		var $interUses = $('.interUses');
		var URLprefix = 'https://', 
			URLsuffix = '/api.php?format=json&callback=?';
		var msgForeignUses = 'Utilizzi esterni',
			msgFileLink = 'pagina del file',
			msgNoUses = 'Nessun utilizzo esterno rilevato per questo file.';
		$interUses.append( $('<h2></h2>', {'text':msgForeignUses, 'style':'margin-left:-22px;'}) );
		var langs = {
			"Ceco":"minecraft.fandom.com/cs",
			"Francese":"minecraft.fandom.com/fr",
			"Greco":"minecraft.fandom.com/el",
			"Inglese":"minecraft.fandom.com",
			"Portoghese":"minecraft.fandom.com/pt",
			"Thai":"minecraft.fandom.com/th",
			"Turco":"minecraft.fandom.com/tr",
			"Ucraino":"minecraft.fandom.com/uk",
			"Aether Mod":"aether.fandom.com",
			"Mo' Creatures Mod": "mocreatures.fandom.com"
		};
		$interUses.append( $('<h3></h3>', {'text': msgNoUses, 'class':'no_foreign_uses'}) );
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
								var urlImage = URLprefix + currentLangCode + '/wiki/' + wgPageName;
								$('.no_foreign_uses').remove();
								$interUses.append(
									$('<h3></h3>', {'style':'margin-left:-20px;', 'text':currentLangName}).append(
										$('<span></span>', {'style':'font-size:85%;'}).append(
											' (', $('<a></a>', {'href':urlImage, 'text':msgFileLink}), ')'
										)
									)
								);
								$.each(response1.query.imageusage, function(index, value) {
									var urlUse = URLprefix + currentLangCode + '/wiki/' + value.title;
									$interUses.append(
										$('<li></li>').append(
											$('<a></a>', {'href': urlUse, 'text':value.title})
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
	});
}