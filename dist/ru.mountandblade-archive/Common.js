/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

/* VK Community widget */
jQuery.getScript('//vk.com/js/api/openapi.js?76', function () {
    VK.init({apiId: 14422438, onlyWidgets: true});
	$(function() {
		if ($('#vk_groups').length) {
			VK.Widgets.Group("vk_groups", {mode: 1, width: "300", height: "220", color1: 'FFFFFF', color2: '5B4C37', color3: '5B4C37'}, 14422438);
		}
	});
});