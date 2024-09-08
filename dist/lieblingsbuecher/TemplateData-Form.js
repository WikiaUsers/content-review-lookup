$.showCustomModal('Buchporträt erstellen','<form class="bpform"></form>',{
    id: 'votes-upvoters-modal',
    callback: function() {
        $.getJSON('/api.php', {
            action: 'query',
            prop: 'revisions',
            titles: 'Template:BPcode/CodeEditor',
            rvprop: 'content',
            indexpageids: true,
            format: 'json'
        }, function(res) {
            template = res.query.pages[res.query.pageids[0]].revisions[0]['*'];
            re = /\|(.*?)=(?:(.*?)\|)?/gm;
            match = re.exec(template);
            params = {};
			lastKey = '';
            while ((result = re.exec(template)) !== null) {
                params[result[1].trim()] = {
					value: (result[2] || '').trim(),
					posFrom: result.index
                };
				if (lastKey.length) {
					console.log(lastKey, params[lastKey]);
					params[lastKey].posTo = result.index - 1;
					console.log('param result', template.substr(params[lastKey].posFrom, result.index - 1), result);
                }
				lastKey = (result[1] || '').trim();
            }
			console.log('params', params);
			headings = {};
			re2 = /\|(.*?)=(?:(.*?)\|)?\s\n\s?<!-+\s(.*?)\s-+>/gm;
			while ((result = re2.exec(template)) !== null) {
				headings[(result[1] || '').trim()] = (result[2] || '').trim();
            }
			console.log('headings', headings);
            Object.keys(params).forEach(function(param) {
				if(headings[param]) {
					console.log('next heading', param, headings[param]);
                }
				$('<div />').append(
					$('<label />').text(param),
					$('<input />', { value: params[param].value })
				).appendTo($('.bpform'))
            });
        });
    },
    buttons: [{
        message: 'OK',
        handler: function() { $('#votes-upvoters-modal').closeModal(); },
        defaultButton:  false,
        id: 'votes-upvoters-close'
    }]
});