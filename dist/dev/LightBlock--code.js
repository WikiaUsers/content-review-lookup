// Copyright Lil' Miss Rarity (ARR)

(function() {
    if (
        mw.config.get('wgCanonicalSpecialPageName') !== 'Chat' ||
        window.LightBlockLoaded
    ) {
        return;
	}
	window.LightBlockLoaded = true;
 
	function z(a, b) {
		var d = x()
		if (b === 1) {
			if (d.indexOf(a) === -1) {
				d.push(a)
				$('li[data-user="' + a + '"]').hide()
				y(d)
			}
		} else if (b === 2) {
			if (d.indexOf(a) > -1) {
				d.pop(d.indexOf(a))
				$('li[data-user="' + a + '"]').show()
				y(d)
			}
		} else if (b === 3) {
            $('.Chat ul').append(
                $('<li>', {
                    'class': 'inline-alert',
                    text: d.join(', ')
                })
            );
		}
	}
 
	function y(a) {
		localStorage.setItem('mute', JSON.stringify(a))
	}
 
	function x() {
		return JSON.parse(localStorage.getItem('mute') || '[]')
	}
 
	$('textarea[name=message]').keypress(function(e) {
		if (e.which == 13) {
			var a = $(this).val(),
				b = a.substr(1, a.length),
				c = b.split(' '),
				d = b.split(' ');
				d.shift()
				d = d.join(' ')
			if (a[0] === '/' && ['mute', 'unmute', 'list'].indexOf(a.substr(1, a.length)) > -1) {
				e.preventDefault()
				$(this).val('')
				if (c[0] === 'mute') {
					z(d, 1)
				} else if (c[0] === 'unmute') {
					z(d, 2)
				} else if (c[0] === 'list') {
					z('', 3)
				}
			}
		}
	})
 
	window.mainRoom.model.chats.bind('afteradd', function() {
		var a = x(),
			i = 0;
		for (i; i < a.length; i++) {
			$('li[data-user="' + a[i] + '"]').hide()
		}
	})
})();