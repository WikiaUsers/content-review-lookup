window.AddRailModule = [{prepend: true}];

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/madisonbeer/images/8/84/Unreleased.jpeg/revision/latest?cb=20250926125239';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/madisonbeer/images/8/84/Unreleased.jpeg/revision/latest?cb=20250926125239';