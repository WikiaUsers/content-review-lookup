// Başlığı ad alanı olan/olmayan kopyalamak için başlığa 2 düğme ekler
// olmadan üstte
// yazar: RheingoldRiver
// Vikinizde #firstHeading'e de bağlantılar ekleyen başka küçü araçları varsa dikkatli olun, bir yarış durumuna girecek ve sinir bozucu olacaklar

$(function() {
	var el = document.createElement('div')
	$(el).attr('id', 'title-copy-outer').html('<div id="title-copy-content" title="Yalnızca Başlığı Kopyala (Ad Alanı Yok)"></div><div id="title-copy-all" title="Tam Başlığı Kopyala (Ad Alanı Dahil)"></div>');
	$('#firstHeading').wrapInner('<div id="first-heading-text"></div>');
	$(el).insertAfter(document.getElementById('first-heading-text'));
	$('#title-copy-content').click(function() {
		var text = mw.config.get('wgTitle');
		var copyEl = document.createElement('textarea');
		copyEl.value = text;
		document.body.appendChild(copyEl);
		copyEl.select();
		document.execCommand('copy');
		document.body.removeChild(copyEl);
		$('#title-copy-content').css('color','green');
		setTimeout(function() {
			$('#title-copy-content').css('color','');
		}, 2000);
	});
	$('#title-copy-all').click(function() {
		var text = mw.config.get('wgPageName');
		var copyEl = document.createElement('textarea');
		copyEl.value = text;
		document.body.appendChild(copyEl);
		copyEl.select();
		document.execCommand('copy');
		document.body.removeChild(copyEl);
		document.execCommand('copy');
		$('#title-copy-all').css('color','green');
		setTimeout(function() {
			$('#title-copy-all').css('color','');
		}, 2000);
	});
});