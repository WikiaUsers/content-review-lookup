// By Equazcion: https://terraria.gamepedia.com/User:Equazcion

var wgNamespaceNumber = mw.config.get( 'wgNamespaceNumber' ),
    wgPageName = mw.config.get( 'wgPageName' ),
    wgTitle = mw.config.get( 'wgTitle' );

if (wgNamespaceNumber == 6) {

    var URLprefix = 'https://',
        URLsuffix = '.gamepedia.com/api.php?format=json&callback=?',
        msgForeignUses = 'File usage (foreign)',
        msgImageLink = 'file page',
        msgNoUses = 'No foreign uses of this file were detected.',
        msgListLink = 'List foreign uses',
        msgLocalFileListHeader = 'File usage (local)';

	$('#mw-imagepage-reupload-link').append(
		$('<li></li>').append(
			$('<a></a>', {'class':'foreignLink', 'href':'#ddd', 'text':msgListLink})
		)
	);

	$('.foreignLink').click(function(){
        // Clear any existing list
        $('ul.interUses').remove();
        $('h2#foreignUsesHeader').remove();
        $('li#foreignTOClink').remove();
        
        // Create header and list elements
		$('h2#filelinks')
            .text(msgLocalFileListHeader)
            .before('<h2 id="foreignUsesHeader">' + msgForeignUses + '</h2><ul class="interUses"></ul>');
        
        // Add TOC link
        $('ul#filetoc li a[href="#filelinks"]')
        	.text(msgLocalFileListHeader)
        	.parent('li').after('<li id="foreignTOClink"><a href="#foreignUsesHeader">' + msgForeignUses + '</a></li>');
        
        var $interUses = $('.interUses');
		var langs = {
			"Russian":"terraria-ru",
			"French":"terraria-fr",
			"Polish":"terraria-pl",
			"Portuguese":"terraria-pt",
			"Korean":"terraria-ko",
			"Chinese":"terraria-zh",
			"Ukrainian":"terraria-uk",
			"German":"terraria-de",
			"Hungarian":"terraria-hu",
			"Terraria Mods":"terrariamods",
			"Antiaris Mod":"antiaris",
			"Calamity Mod":"calamitymod",
			"Decimation Mod":"decimationmod",
			"Dragon Ball Terraria Mod":"dbtmod",
			"Elements Awoken Mod":"elementsawoken",
			"Enigma Mod":"enigmamod",
			"Exodus Mod":"exodusmod",
			"GRealm Mod":"grealm",
			"Germanium Mod":"germaniummod",
			"Shadows of Abaddon Mod":"shadowsofabaddon",
			"Spirit Mod":"spiritmod",
			"Split Mod":"splitmod",
			"Thorium Mod":"thoriummod",
			"Tremor Mod":"tremormod",
			"Super Terraria World":"superterrariaworld"
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
											' (', $('<a></a>', {'href':urlImage, 'text':msgImageLink}), ')'
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
	});
}