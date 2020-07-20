$.ajax({
	url: '/wiki/Spezial:Exportieren',
	data: {
        catname: '',
        pages: 'Kategorien Dallas englisch',
        templates:1,
        wpDownload:0
    },
	type: 'POST',
	responseType: 'blob',
	success: function(res) {
        console.log(res);
        item = {
            action: 'submit',
            source: 'upload',
            'log-comment': '',
            editToken: mw.user.tokens.get('editToken')
        }
 
        var form_data = new FormData();

        for ( var key in item ) {
            form_data.append(key, item[key]);
        }
		var oSerializer = new XMLSerializer();
		var sXML = oSerializer.serializeToString(res);
        form_data.append('xmlimport',new File([sXML],'xmlexport',{type: 'application/xml'}), 'Kategorien_Dallas_englisch.xml');
        $.ajax({
            url: '/wiki/Spezial:Importieren?action=submit',
            data: form_data,
            processData: false,
            contentType : false,
            type: 'POST',
            success: function(res,status,xhr) {
				page = $('<div />').html($.parseHTML(res));
                if(page.find('.error').length) {
					console.error('error',page.find('.error').html());
                }
				else if(page.find('#mw-content-text').length) {
					console.log('success',page.find('#mw-content-text').children().nextUntil('hr').html());
                }
            }
        });/*
		$.ajax({
			url: "https://query.yahooapis.com/v1/public/yql?q=select * from json where url='" + encodeURI('http://de.harrypotter.wikia.com/wiki/Spezial:Importieren?action=submit') + "'&format=json",
            data: form_data,
            processData: false,
            contentType : false,
            type: 'POST',
            success  : function(data) {
                console.log('cross wiki',data);
            }
        });*/
    }
});