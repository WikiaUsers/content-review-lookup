if( $('.WikiaArticleInterlang').length > 0 ) {
	var languageDropdown = '<nav class="wikia-menu-button-language secondary language-dropdown"><img src="http://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg" class="portuguese" width="22" height="16" alt="Portuguese"/><span class="drop"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron"></span><ul style="min-width: 47px;" class="WikiaMenuElement language-dropdown-list"></ul></nav>';
	$('.WikiaPageHeader .comments').after(languageDropdown);
	$('.WikiaArticleInterlang ul li a').each(function() {
		if( $(this).parent().hasClass('more-link') === false ) {
			var language = $(this).parent().text();
			var oldText = $(this).text();
			$(this).text('');
			if( language === "Português" ) {
				var languageItem = '<img src="http://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg" class="portuguese" width="22" height="16" alt="' + language + '" />';   
			}
			else if( language === "English" ) {
				var languageItem = '<img src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/a/a4/Flag_of_the_United_States.svg" class="english" width="22" height="16" alt="' + language + '" />';   
			}
			else if( language === "Español" ) {
				var languageItem = '<img src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9a/Flag_of_Spain.svg" class="spanish" width="22" height="16" alt="' + language + '" />'; 			
			}
			else if( language === "Català" ) {
				var languageItem = '<img src="http://upload.wikimedia.org/wikipedia/commons/c/ce/Flag_of_Catalonia.svg" class="catalan" width="22" height="16" alt="' + language + '" />'; 			
			}
			else if( language === "Русский" ) {
				var languageItem = '<img src="http://upload.wikimedia.org/wikipedia/en/f/f3/Flag_of_Russia.svg" class="russian" width="22" height="16" alt="' + language + '" />'; 			
			}
			else {
				var languageItem = language;
			}
			$('<li><a title="' + language + '" href="' + this + '">' + languageItem + '</a></li>').prependTo('.language-dropdown ul');
			$(this).text(oldText);
		}
	});
}
 
$('.language-dropdown').on('click',function() {
	if ( $(this).hasClass("language-dropdown-active") === false ) {
		$(this).addClass('language-dropdown-active');
		$('.language-dropdown-list').css('display','block');
	}
	else if( $(this).hasClass("language-dropdown-active") === true ) {
		$(this).attr('class','wikia-menu-button-language secondary language-dropdown');
		$('.language-dropdown-list').css('display','none');				
	}
});
 
$('.language-dropdown').on('hover',function() {
	$(this).addClass('.language-dropdown-hover');
}, function() {
	$(this).attr('class','wikia-menu-button-language secondary language-dropdown');
	$('.language-dropdown-list').css('display','none');
});