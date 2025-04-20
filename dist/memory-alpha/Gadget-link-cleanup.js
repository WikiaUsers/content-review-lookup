// <pre>

'use strict';
mw.loader.using(['mediawiki.api'], () => {
	const version = '2.0.0';
	const api = new mw.Api();
	const removeLinksButton = $('<li><a href="#">Link cleanup</a></li>');
	const editLag = 2500;
	const linkCleanup = {
		pages: [],
		content: [],
		canceled: false,
	};
	const myModal = $('<form id="myModal">')
		.append($('<h4>').text(`Link cleanup tool, version ${version}`))
		.append($('<label for="myModalResults">').text('Edit log:'))
		.append($('<textarea id="myModalResults" rows="4" disabled>'))
		.append(button('myModalClose', 'Close', true));
	let iValue = 0;
	
	$('#my-tools-menu').prepend(removeLinksButton);
	removeLinksButton.on('click', createModal);
	
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
	
	function createModal(){
		$('body').append(myModal);
		$('#myModal').on('submit', submitForm);
		$('#myModalClose').on('click', close);
		
		fetchPages();
	}
	
	function submitForm(e){
		e.preventDefault();
	}
	
	function close(){
		linkCleanup.canceled = true;
		myModal.remove();
	}
	
	function fetchPages(){
		linkCleanup.canceled = false;
		api.get({
			generator: 'allpages',
			gapnamespace: 4,
			gapprefix: 'List of unwritten',
			gapfilterredir: 'nonredirects',
			gaplimit: 500,
			prop: 'revisions',
			rvprop: 'content',
			rvslots: 'main',
			formatversion: 2,
		}).done((result) => {
			if (result.warnings){
				log(`Warning: ${result.warnings.main['*']}`, 'warn');
			}
			
			if (linkCleanup.canceled){
				return;
			}
			
			result.query.pages.forEach((entry) => {
				linkCleanup.pages.push(entry.title);
				linkCleanup.content.push(entry.revisions[0].slots.main.content);
			});
			
			removeLinks(iValue++);
		}).fail((code, data) => {
			if (code === 'http'){
				log(`Error: ${code}: ${JSON.stringify(data)}`, 'error');
			} else {
				log(`Error: ${code}: ${typeof data}`, 'error');
			}
		});
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
		
		api.postWithToken('csrf', params).done((data) => {
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
		}).fail(logFail);
	}
	
	function formatFix(i){
		if (linkCleanup.canceled){
			return;
		}
		
		$.get(mw.util.getUrl(linkCleanup.pages[i], {action: 'raw'}), (data) => {
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
			
			api.postWithToken('csrf', params).done((data) => {
				if (data.edit.newtimestamp){
					logEdit(data);
				}
				
				if (iValue < linkCleanup.pages.length){
					setTimeout(() => removeLinks(iValue++), editLag);
				} else {
					log('Done.');
				}
			}).fail(logFail);
		});
	}
	
	function logEdit(data){
		if (data.warnings){
			log(`Warning: ${data.warnings.main['*']}`, 'warn');
		}
		
		log(`${iValue}/${linkCleanup.pages.length}: ${data.edit.result}: [[${data.edit.title}]], ${data.edit.newtimestamp}`);
	}
	
	function logFail(code, data){
		if (code === 'maxlag'){
			log(`Error: ${code}: ${data.error.info}`, 'error');
		} else if (code === 'protectedpage'){
			log(`Error: ${code}: ${data.error.info}`, 'error');
		} else if (code === 'ratelimited'){
			log(`Error: ${code}: ${data.error.info}`, 'error');
		} else if (code === 'http'){
			log(`Error: ${code}: ${JSON.stringify(data)}`, 'error');
		} else if (code === 'readonly'){
			log(`Error: ${code}: ${JSON.stringify(data)}`, 'error');
		} else {
			log(`Error: ${code}: ${typeof data}`, 'error');
		}
	}
	
	function paramsMaker(ttl, txt, cmt){
		return {
			action: 'edit',
			title: ttl,
			text: txt,
			summary: cmt,
			minor: 1,
			bot: 1,
			watchlist: 'nochange',
			maxlag: 5,
		};
	}
});

// </pre>