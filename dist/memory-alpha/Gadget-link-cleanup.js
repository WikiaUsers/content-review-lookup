// <pre>
'use strict';
mw.loader.using(['mediawiki.api', 'mediawiki.util'], () => {
	const version = '2.1.1';
	const config = mw.config.values;
	const api = new mw.Api({'parameters': {
		'action': 'query',
		'format': 'json',
		'formatversion': 2,
		'errorformat': 'plaintext',
		'uselang': config.wgUserLanguage,
	}});
	const removeLinksButton = $('<li><a href="#">Link cleanup</a></li>');
	const editLag = 2500;
	const linkCleanup = {
		'pages': [],
		'content': [],
		'canceled': false,
	};
	const myModal = $('<form id="myModal">')
		.append($('<h4>').text(`Link cleanup tool, version ${version}`))
		.append($('<label for="myModalResults">').text('Edit log:'))
		.append($('<textarea id="myModalResults" rows="4" disabled>'))
		.append(button('myModalClose', 'Close', true));
	let iValue = 0;
	
	$('#my-tools-menu').prepend(removeLinksButton);
	removeLinksButton.on('click', createModal);
	
	function createModal(){
		$('body').append(myModal);
		$('#myModal').on('submit', submitForm);
		$('#myModalClose').on('click', close);
		fetchPages();
	}
	
	function close(){
		linkCleanup.canceled = true;
		myModal.remove();
	}
	
	function fetchPages(){
		linkCleanup.canceled = false;
		api.post({
			'generator': 'allpages',
			'gapnamespace': 4,
			'gapprefix': 'List of unwritten',
			'gapfilterredir': 'nonredirects',
			'gaplimit': 500,
			'prop': 'revisions',
			'rvprop': 'content',
			'rvslots': 'main',
		}).then(result => {
			warn(result);
			
			if (linkCleanup.canceled){
				return;
			}
			
			result.query.pages.forEach(entry => {
				linkCleanup.pages.push(entry.title);
				linkCleanup.content.push(entry.revisions[0].slots.main.content);
			});
			
			removeLinks(iValue++);
		}, logFail);
	}
	
	function removeLinks(i){
		const newText = linkCleanup.content[i]
			.replace(/\{\{(?:\n*|[ _]*)[Rr](?:equestedLinks|l)(?:\n*|[ _]*)\| *([^\n}]+?) *\}\}(?= *[/;])/g, '{{subst:#ifexist:$1||{{rl|$1}}}}')
			.replace(/(?<=[/;] *)\{\{(?:\n*|[ _]*)[Rr](?:equestedLinks|l)(?:\n*|[ _]*)\| *([^\n}]+?) *\}\}/g, '{{subst:#ifexist:$1||{{rl|$1}}}}')
			.replace(/\n(\*+) *\{\{(?:\n*|[ _]*)[Rr](?:equestedLinks|l)(?:\n*|[ _]*)\| *([^\n}]+?) *\}\}$/gm, '{{subst:#ifexist:$2||\n$1 {{rl|$2}}}}');
		const params = paramsMaker(
			linkCleanup.pages[i],
			newText,
			'-links to existing articles'
		);
		
		if (linkCleanup.canceled){
			return;
		}
		
		api.postWithEditToken(params).then(data => {
			if (data.edit.newtimestamp){
				logEdit(data);
				setTimeout(() => formatFix(i), editLag);
			} else {
				log(`${iValue}/${linkCleanup.pages.length}: No bluelinks on "${linkCleanup.pages[i]}", skipping...`);
				if (iValue < linkCleanup.pages.length){
					setTimeout(() => removeLinks(iValue++), editLag);
				} else {
					log('Done.');
				}
			}
		}, logFail);
	}
	
	function formatFix(i){
		if (linkCleanup.canceled){
			return;
		}
		
		$.get(mw.util.getUrl(linkCleanup.pages[i], {action: 'raw'}), data => {
			const newText = data
				.replace(/[/; ]+\n/g, '\n')
				.replace(/\n\*[/; ]+/g, '\n* ')
				.replace(/\s+^==[^\n=]+==$\s+^==([^\n=])/gm, '\n\n==$1');
			const params = paramsMaker(
				linkCleanup.pages[i],
				newText,
				'format'
			);
			
			if (linkCleanup.canceled){
				return;
			}
			
			api.postWithEditToken(params).then(data => {
				if (data.edit.newtimestamp){
					logEdit(data);
				}
				
				if (iValue < linkCleanup.pages.length){
					setTimeout(() => removeLinks(iValue++), editLag);
				} else {
					log('Done.');
				}
			}, logFail);
		});
	}
	
	function logEdit(data){
		warn(data);
		log(`${iValue}/${linkCleanup.pages.length}: ${data.edit.result}: [[${data.edit.title}]], ${data.edit.newtimestamp}`);
	}
});

function log(value, type = 'log'){
	$('#myModalResults').prepend(value + '\n');
	console[type](value);
}

function button(id, txt, secondary = false){
	const classes = ['wds-button'];
	if (secondary){
		classes.push('wds-is-secondary');
	}
	const classString = classes.join(' ');
	return $(`<button class="${classString}" id="${id}">`).text(txt);
}

function submitForm(e){
	e.preventDefault();
}

function logFail(code, data){
	console.error(data.errors);
	for (const error of data.errors){
		log(`Error: ${error.code}: ${error.text}`, 'error');
	}
}

function warn(apiOutput){
	if (apiOutput.warnings){
		console.warn(apiOutput.warnings);
		for (const warning of apiOutput.warnings){
			log(`Warning: ${warning.code}: ${warning.text}`, 'warn');
		}
	}
}

function paramsMaker(ttl, txt, cmt){
	return {
		'action': 'edit',
		'title': ttl,
		'text': txt,
		'summary': cmt,
		'minor': 1,
		'bot': 1,
		'watchlist': 'nochange',
		'maxlag': 5,
	};
}
// </pre>