var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' );
var wgPageName = mw.config.get( 'wgPageName' );
var wgTitle = mw.config.get( 'wgTitle' );

if (wgNamespaceNumber == 6) {
	$('<ul></ul>').append(
		$('<li></li>').append(
			$('<a></a>', {'class':'foreignLink', 'href':'#ddd', 'text':'外部用途列表'})
		)
	).insertAfter('#filelinks');
	$('.foreignLink').click(function(){
		$('.interUses').remove();
		$('div[id$="linkstoimage"]').append($('<ul></ul>', {'class':'interUses'}));
		var $interUses = $('.interUses');
		var URLprefix = 'https://', 
			URLsuffix = '.gamepedia.com/api.php?format=json&callback=?';
		var msgForeignUses = '外部用途',
			msgFileLink = '文件页面',
			msgNoUses = '未检测到此文件的外部用途。';
		$interUses.append( $('<h2></h2>', {'text':msgForeignUses, 'style':'margin-left:-22px;'}) );
		var langs = {
			"英语":"adventofascension",
			"法语":"adventofascension-fr",
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
								var urlImage = URLprefix + currentLangCode + '.gamepedia.com/' + wgPageName;
								$('.no_foreign_uses').remove();
								$interUses.append(
									$('<h3></h3>', {'style':'margin-left:-20px;', 'text':currentLangName}).append(
										$('<span></span>', {'style':'font-size:85%;'}).append(
											' (', $('<a></a>', {'href':urlImage, 'text':msgFileLink}), ')'
										)
									)
								);
								$.each(response1.query.imageusage, function(index, value) {
									var urlUse = URLprefix + currentLangCode + '.gamepedia.com/' + value.title;
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