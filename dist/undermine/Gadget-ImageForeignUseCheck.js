!(function( $, mw ) {
	'use strict';
	
	var i18n = {
		'listForeignUses': 'List foreign uses',
		'msgForeignUses': 'Foreign uses',
		'msgFileLink': 'file page',
		'msgNoUses': 'No foreign uses of this file were detected.',
		'URLprefix': 'https://undermine.fandom.com/', 
		'URLsuffix': '/api.php?format=json&callback=?'
	};
	
	var langs = {
		'Deutsch': 'de',
		'Русский': 'ru'
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
			var $interUses = document.createElement("ul");
				$interUses.classList.add('interUses');
			
			var header1 = $interUses.appendChild(document.createElement("h2"));
				header1.cssText = "margin-left:-22px";
				header1.textContent = i18n.msgForeignUses;
			
			var header2 = $interUses.appendChild(document.createElement("h3"));
				header2.classList.add('no_foreign_uses');
				header2.textContent = i18n.msgNoUses;
			
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
									
									var urlImage2 = $interUses.appendChild(document.createElement("h3"));
										urlImage2.cssText = "margin-left:-20px";
										urlImage2.textContent = currentLangName;

									var urlImage3 = urlImage2.appendChild(document.createElement("span"));
										urlImage3.cssText = "font-size:85%";

									var urlImage4 = urlImage3.appendChild(document.createElement("a"));
										urlImage4.cssText = "font-size:85%";
										urlImage4.setAttribute('href', urlImage);
										urlImage4.textContent = '(' + i18n.msgFileLink + ')';
									
									$.each(response1.query.imageusage, function(index, value) {
										var urlUse = i18n.URLprefix + currentLangCode + '/wiki/' + value.title;
										var urlUse1 = $interUses.appendChild(document.createElement("li"));
										var urlUse2 = urlUse1.appendChild(document.createElement("a"));
											urlUse2.setAttribute('href', urlUse);
											urlUse2.textContent = value.title;
									});
								}
							});
						}
					});
				});
			});
		setTimeout(function(){$interUses.children[0].scrollIntoView(true)}, 1000);
		});
	}
})( this.jQuery, this.mediaWiki );