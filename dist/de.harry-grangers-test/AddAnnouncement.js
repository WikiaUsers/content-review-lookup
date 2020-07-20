if(wgNamespaceNumber === 500) {
	var div = $('<div />').appendTo(mw.util.$content);
	$('<input />', { type: 'checkbox', id: 'addAnnouncement' }).click(addAnnouncement).appendTo(div);
	$('<label />', { for: 'addAnnouncement' }).text('Add announcement').appendTo(div);

	function addAnnouncement() {
		var ajaxProps = {
            action: 'parse',
            page: wgPageName,
            format: 'json',
            section: 0,
            disablepp: 1
        };
		$.get('http://de.harry-grangers-test.wikia.com/api.php', ajaxProps, function(res) {
            var text = $(res.parse.text['*']).text().trim();
            if(!text.length) {
				ajaxProps.section = 1;
				$.get('http://de.harry-grangers-test.wikia.com/api.php', ajaxProps, function(res) {
            		var text = $(res.parse.text['*']).text().trim();
					if(text.length > 100) {
                        text = text.slice(0, 99) + '\u2026';
                    }
            		saveAnnouncement(text);			
                });
				return;
            }
            else if(text.length > 100) {
				text = text.slice(0, 99) + '\u2026';
            }
            saveAnnouncement(text);
        });
    }

	function saveAnnouncement(text) {
        $.ajax({
            url: 'https://services.wikia.com/announcements/851777/announcements',
            type: 'POST',
            contentType: 'application/json',
            processData: false,
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify({
                text: text,
                url: window.location.href
            }),
            success: function(res) {
                console.log(res);
            },
			error: function(e) {
				console.error(JSON.parse(e.responseText).title);
            },
            dataType: 'json'	
        });
    }
}