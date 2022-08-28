/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
$(function(){
$('.recipetoggler').click(function() {
    if ($(this).hasClass('changed')) {
    $(this).closest('.recipe').removeClass('recipecircle')
    $(this).closest('.recipe').addClass('recipesq')
    $(this).removeClass('changed')
    } else {
    $(this).addClass('changed')
    $(this).closest('.recipe').removeClass('recipesq')
    $(this).closest('.recipe').addClass('recipecircle')
    }
});
});

/*Для карт*/
$(function() {
	var intervalAddOpacity = setInterval(addopacity, 500)

	function addopacity() {
		if ($(".leaflet-marker-icon").length) {
				clearInterval(intervalAddOpacity)
				var cat = mw.config.get('wgCategories')
				if (cat.indexOf('Эффекты') !== -1) {
					$('img.leaflet-marker-icon').css({
						"opacity": "0.5"
					})
				}

				var classes = $('body').attr("class").split(' ');

				function isPageName(i) {
					return i.includes('page');
				}

				var effect = classes.find(isPageName);

				effect = effect.replaceAll('_', ' ').replace('page-', '');

				$('img').filter('[alt="' + effect + '"]').css({
					"opacity": "1"
				});
			}
		}
});