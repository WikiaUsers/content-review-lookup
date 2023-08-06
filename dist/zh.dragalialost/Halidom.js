/* [[Halidom]] */
mw.hook('wikipage.content').add(function($content) {
	var container = $content.find('#halidom-grid-toggle-container:not(.loaded)')[0];
	if (!container) return;
	container.classList.add('loaded');
	var HalidomMapTable = $content.find('.HalidomMapTable')[0];
	container.innerHTML =
	'<input type="checkbox" id="halidom-grid-toggle" class="wds-toggle__input">' +
	'<label for="halidom-grid-toggle" class="wds-toggle__label">切换网格视图</label>';
	$content.find('#halidom-grid-toggle')[0].addEventListener('change', function() {
		HalidomMapTable.classList.toggle('HalidomMapLines');
	});
});