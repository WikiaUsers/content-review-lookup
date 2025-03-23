// <pre>

mw.loader.using(['mediawiki.api'], () => {
	const api = new mw.Api();
	const removeLinksButton = $('<li><a href="#">Link cleanup</a></li>');
	$('#my-tools-menu').prepend(removeLinksButton);
	
	removeLinksButton.on('click', () => {
		var linkCleanup = {
			pages: [],
			content: [],
		};
		var lag = '5';
		var iValue = 0;
		var myModal = $('<div id="myModal">')
			.append($('<label for="myModalResults">').text('Edit log:'))
			.append($('<textarea id="myModalResults" rows="4" disabled>'))
			.append($('<div class="wds-button wds-is-secondary" id="myModalClose">').text('Close'));
		
		$('body').append(myModal);
		$('#myModalClose').on('click', () => myModal.remove());
		
		function log(value, type){
			$('#myModalResults').prepend(value + '\n');
			console[type](value);
		}
		
		api.get({
			generator: 'allpages',
			gapnamespace: '4',
			gapprefix: 'List of unwritten',
			gaplimit: '500',
			prop: 'revisions',
			rvprop: 'content',
			rvslots: 'main',
			formatversion: '2',
		}).done((result) => {
			if (result.warnings){
				log('Warning: ' + result.warnings.main['*'], 'warn');
			}
			
			result.query.pages.forEach((entry) => {
				linkCleanup.pages.push(entry.title);
				linkCleanup.content.push(entry.revisions[0].slots.main.content);
			});
			
			removeLinks(iValue++);
		}).fail((code, data) => {
			if (code === 'http'){
				log('Error: ' + code + ': ' + JSON.stringify(data), 'error');
			} else {
				log('Error: ' + code + ': ' + typeof data, 'error');
			}
		});
		
		function removeLinks(i){
			var newText = linkCleanup.content[i]
				.replace(/\{\{(?:\n*|[ _]*)[Rr](?:equestedLinks|l)(?:\n*|[ _]*)\| *([^\n}]+?) *\}\}(?= *[/;])/g, '{{subst:#ifexist:$1||{{rl|$1}}}}')
				.replace(/(?<=[/;] *)\{\{(?:\n*|[ _]*)[Rr](?:equestedLinks|l)(?:\n*|[ _]*)\| *([^\n}]+?) *\}\}/g, '{{subst:#ifexist:$1||{{rl|$1}}}}')
				.replace(/\n\* *\{\{(?:\n*|[ _]*)[Rr](?:equestedLinks|l)(?:\n*|[ _]*)\| *([^\n}]+?) *\}\}$/gm, '{{subst:#ifexist:$1||\n* {{rl|$1}}}}');
			
			var params = {
				action:'edit',
				title:linkCleanup.pages[i],
				text:newText,
				summary:'-links to existing articles',
				minor:'1',
				maxlag:lag,
				format:'json',
			};
			
			api.postWithToken('csrf', params).done((data) => {
				if (data.edit.newtimestamp){
					logEdit(data);
					setTimeout(() => formatFix(i), 150);
				} else {
					if (iValue < linkCleanup.pages.length){
						setTimeout(() => removeLinks(iValue++), 150);
					} else {
						log('Done.', 'log');
					}
				}
			}).fail(logFail);
		}
		
		function formatFix(i){
			$.get(mw.util.getUrl(linkCleanup.pages[i], {action: 'raw'}), (data) => {
				var newText = data
					.replace(/[/; ]+\n/g, '\n')
					.replace(/\n\*[/; ]+/g, '\n* ')
					.replace(/\s+^==[^\n=]+==$\s+^==([^\n=])/gm, '\n\n==$1');
				
				var params = {
					action:'edit',
					title:linkCleanup.pages[i],
					text:newText,
					summary:'format',
					minor:'1',
					maxlag:lag,
					format:'json',
				};
				
				api.postWithToken('csrf', params).done((data) => {
					if (data.edit.newtimestamp){
						logEdit(data);
					}
					
					if (iValue < linkCleanup.pages.length){
						setTimeout(() => removeLinks(iValue++), 150);
					} else {
						log('Done.', 'log');
					}
				}).fail(logFail);
			});
		}
		
		function logEdit(data){
			if (data.warnings){
				log('Warning: '+data.warnings.main['*'], 'warn');
			}
			
			log(data.edit.result+': [['+data.edit.title+']], '+data.edit.newtimestamp, 'log');
		}
		
		function logFail(code, data){
			if (code === 'maxlag'){
				log('Error: '+code+': '+data.error.info, 'error');
			} else if (code === 'protectedpage'){
				log('Error: '+code+': '+data.error.info, 'error');
			} else if (code === 'ratelimited'){
				log('Error: '+code+': '+data.error.info, 'error');
			} else if (code === 'http'){
				log('Error: '+code+': '+JSON.stringify(data), 'error');
			} else if (code === 'readonly'){
				log('Error: '+code+': '+JSON.stringify(data), 'error');
			} else {
				log('Error: '+code+': '+typeof data, 'error');
			}
		}
	});
});

// </pre>