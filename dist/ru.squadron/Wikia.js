// Для AddRailModule
void(function(window) {
    var document = window.document;
    var i = 0;
    var loadAvatar = setInterval(function() {
        var avatars = document.querySelectorAll('.avatar-block');
        if (++i == 20) {
            return clearInterval(loadAvatar);
        } else if (!avatars.length) {
            return;
        }

        avatars.forEach(function(avatar) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/v1/User/Details?ids=' + avatar.getAttribute('data-username') + '&size=150', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var data = JSON.parse(xhr.responseText);
                    avatar.innerHTML = '<img src="' + data.items[0].avatar + '">';
                }
            };
            xhr.send();
        });
    }, 250);
})(this || window);

// Кнопка для юзербоксов
void(function(window, $) {
	var t = $('.b-slider-button');
	t.click(function() {
		var i = $(this).next('.b-slider-content');
		if (i.hasClass('collapsed')) {
			i.slideDown();
			i.removeClass('collapsed');
		} else {
			i.slideUp();
			i.addClass('collapsed');
		}
	});
})(this || window, this && this.jQuery || window.jQuery);

// Аватары юзербокса
void(function(window) {
	var document = window.document;
	Array.prototype.slice.call(document.querySelectorAll('#mw-content-text div.userbox[data-username]')).forEach(function(e) {
		var xhr = new window.XMLHttpRequest();
		xhr.open('GET', '/api/v1/User/Details?ids=' + e.getAttribute('data-username') + '&size=150', true);
		xhr.onload = function() {
			var d = this.response;
			if (this.status === 200 || this.status === 0) {
				try {
					d = window.JSON.parse(d);
					e.querySelector('.b-useravatar').insertAdjacentHTML('beforeend', '<img src="' + d.items[0].avatar + '"/>');
				} catch (err) {
					e.querySelector('.b-useravatar').insertAdjacentHTML('beforeend', '<div style="text-align: center;color: red;font-weight: 700;">Не удалось загрузить аватар!</div>');
				}
			}
		};
		xhr.send();
	});
})(this || window);