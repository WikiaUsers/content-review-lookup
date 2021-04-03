/* изменение аватарки локально, случайная аватарка при каждой загрузке странице
 * данные берутся с подстраницы участника
 * см. https://goodgamegirls.fandom.com/ru/wiki/Good_Game_Girls_Wiki:Локальные_аватары
 */
setInterval(function() {
	if (document.getElementsByClassName('user-identity-avatar__image')[0] !== undefined) {
		if (!(document.getElementsByClassName('user-identity-avatar__image')[0].parentElement.classList.contains('localavatar'))) {
			document.getElementsByClassName('user-identity-avatar__image')[0].parentElement.className = document.getElementsByClassName('user-identity-avatar__image')[0].parentElement.className + ' localavatar';
			var xhr = new XMLHttpRequest();
			xhr.open('GET', '/ru/wiki/User:' + encodeURIComponent(document.getElementsByClassName('user-identity-avatar__image')[0].alt) + '/localavatar?action=raw', false);
			xhr.send();
			if (xhr.status == 200) {
			    var filename0 = xhr.responseText.trim().split('\n')[Math.floor(Math.random() * xhr.responseText.trim().split('\n').length)];
				var filename = filename0.split('#')[0].trim();
				if (filename != '') {
					document.getElementsByClassName('user-identity-avatar__image')[0].src = '/ru/wiki/Special:FilePath/' + encodeURIComponent(filename) + '?width=400&height=400';
					document.getElementsByClassName('user-identity-avatar__image')[0].className = document.getElementsByClassName('user-identity-avatar__image')[0].className + ' seted'; 
					document.getElementsByClassName('user-identity-avatar__image')[0].title = document.getElementsByClassName('user-identity-avatar__image')[0].title + ' (это локальный аватар и используется только на Good Game Girls Wiki, а не на всём пространстве FANDOM\'а, подробнее об установке локальных аватаров см. Good Game Girls Wiki:Локальные аватары)';
				} else {
					document.getElementsByClassName('user-identity-avatar__image')[0].className = document.getElementsByClassName('user-identity-avatar__image')[0].className + ' seted'; 
				}
			} else {
				document.getElementsByClassName('user-identity-avatar__image')[0].className = document.getElementsByClassName('user-identity-avatar__image')[0].className + ' seted'; 
			}
		}
	}
}, 10);