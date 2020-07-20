// <source lang="javascript">
/* created by Curiouscrab */
(function() {
	var isHexCode = function(h) {
		var a = parseInt(h, 16);
		return (a.toString(16) === h);
	};
	var tags = document.getElementsByClassName('re0');
	if (wgAction == 'view' && wgPageName.split('.')[wgPageName.split('.').length - 1] == 'css') {
		for (i = 0; i < tags.length; i++) {
			var html = tags[i].innerHTML;
			if (html.charAt(0) == '#' && html.length == 7 && isHexCode(html.slice(1).toLowerCase())) {
				var brokened = html.split(';');
				for (j = 0; j < html.split('#').length - 1; j++) {
					if (brokened[j][0] == '#') {
						brokened[j] = '<span style="color:' + brokened[j].substring(0, 7) + '">' + brokened[j].substring(0, 7) + '</span>';
					}
				}
				tags[i].innerHTML = brokened.join(';');
			}
		}
	}
})();
// </source>