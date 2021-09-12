!(function( $, mw ) {
	"use strict";
	
	var i18n = {
		'listForeignUses': 'List foreign uses',
		'msgForeignUses': 'Foreign uses',
		'msgFileLink': 'file page',
		'msgNoUses': 'No foreign uses of this file were detected.',
		'URLprefix': 'https://undermine.fandom.com/', 
		'URLsuffix': '/api.php?format=json&callback=?'
	};
	
	var langs = {
		"Deutsch":"de",
		"Русский":"ru",
	};

	var wgPageName = mw.config.get( 'wgPageName' );
	var wgTitle = mw.config.get( 'wgTitle' );

	if (mw.config.get( 'wgNamespaceNumber' ) == 6) {
		var filelinks = document.querySelector("#filelinks");
		var element = document.createElement("ul");
		var element2 = element.appendChild(document.createElement("li"));
		var element3 = element2.appendChild(document.createElement("a"));
			element3.classList.add('foreignLink');
			element3.setAttribute('href', '#ddd');
			element3.textContent = i18n.listForeignUses;
		
		filelinks.parentNode.insertBefore(element, filelinks.nextSibling);
		
		$('.foreignLink').click(function(){
			$('.interUses').remove();
			$('div[id$="linkstoimage"]').append($('<ul></ul>', {'class':'interUses'}));
			var $interUses = $('.interUses');

			$interUses.append( $('<h2></h2>', {'text':i18n.msgForeignUses, 'style':'margin-left:-22px;'}) );
			$interUses.append( $('<h3></h3>', {'text': i18n.msgNoUses, 'class':'no_foreign_uses'}) );
			$.each(langs, function(key, value) {
				var currentLangCode = value;
				var request2 = { action:'query', list:'allimages', ailimit:'1',	aifrom:wgTitle };
				$.getJSON(i18n.URLprefix + currentLangCode + i18n.URLsuffix, request2, function(response2) {
					$.each(response2.query.allimages, function(index, value){
						if (value.name != wgTitle.replace(/ /g,'_')){
							var request1 = { action:'query', list:'imageusage', iutitle:wgPageName };
							$.getJSON(i18n.URLprefix + currentLangCode + i18n.URLsuffix, request1, function(response1) {
								var currentLangName = key;
								if (response1.query.imageusage.length > 0) {
									var urlImage = i18n.URLprefix + currentLangCode + '/wiki/' + wgPageName;
									$('.no_foreign_uses').remove();
									$interUses.append(
										$('<h3></h3>', {'style':'margin-left:-20px;', 'text':currentLangName}).append(
											$('<span></span>', {'style':'font-size:85%;'}).append(
												' (', $('<a></a>', {'href':urlImage, 'text':i18n.msgFileLink}), ')'
											)
										)
									);
									$.each(response1.query.imageusage, function(index, value) {
										var urlUse = i18n.URLprefix + currentLangCode + '/wiki/' + value.title;
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
})( this.jQuery, this.mediaWiki );