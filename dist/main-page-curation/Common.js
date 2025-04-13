/* Copied from Mikevoir's simple pol; https://community.fandom.com/wiki/User:Mikevoir/sandbox.js?direction=next&oldid=3942309 */
$(()=>{
	if (!document.querySelector('.custom-poll')) {return;}
	if ($('.custom-poll').length>1) {$('.custom-poll').not($('.custom-poll').get(0)).replaceWith($('<span class="dupe-poll error">No more than 1 poll can exist per page</span>'))}
	let cfg = mw.config.values,
		votes = JSON.parse(
			cfg.wgUserName ? 
				mw.user.options.values['userjs-customPoll'] :
				localStorage.getItem('fandom-customPoll')
			|| JSON.stringify({
				[cfg.wgPageName]: {users: [], anons: 0}
			})
		);
		api = new mw.Api(),
		poll = $('.custom-poll'),
		form = $('<form>', {
		target: '_self',
		name: 'custom-poll',
		id: 'custom-poll',
		html: $('<fieldset>').append(
			$('<legend>', {text: 'Custom Poll'}),
			$('<label>', {html: poll.find('>dl >dt').html() || 'Choose an option to vote for!'})
		)
	});
	
	$('.custom-poll > ul > li').each((i, opt)=>{
		form.children('fieldset').append(
			$('<br>'),
			$('<input>', {
				id: 'custom-poll-'+i,
				type: 'radio',
				name: 'custom-poll-opt',
				required: '',
				value: opt.textContent
			}),
			$('<label>', {
				'for': 'custom-poll-'+i,
				value: opt.innerHTML,
				html: opt.innerHTML
			})
		);
	});
	
	form.children('fieldset').append(
		$('<br>'),
		$('<input>', {type:'submit', value:'Cast Vote!'}),
		$('<input>', {type:'reset', text:'Cancel'})
	);
	
	if (votes[cfg.wgPageName]
		&& votes[cfg.wgPageName].length>0
		&& form.find('#custom-poll-'+votes[cfg.wgPageName]).length>0
	) {
		form.find('#custom-poll-'+votes[cfg.wgPageName]).get(0).checked = true;
	}
	
	poll.replaceWith(form);
	api.create(cfg.wgPageName+'/poll.json', {recreate: true}, '{}'); // attempt creation since api.edit wont run on missing page
	let updateData = ()=>{
		// Update session(anon)/account(login) semi-permanent data for on the fly rendering
		if (cfg.wgUserName) {
			api.postWithToken('csrf', {
			    action: 'options',
			    optionname: 'userjs-customPoll',
			    optionvalue: JSON.stringify(votes)
			}).then(()=>{
				form.find('input[type="submit"]').removeAttr('disabled');
			});
		} else {
			localStorage.setItem('fandom-customPoll', JSON.stringify(votes));
			form.find('input[type="submit"]').removeAttr('disabled');
		}
		
		// Update json page with the new selection for data permanence and global usage
		api.edit(cfg.wgPageName+'/poll.json', (rev)=>{
			let data = JSON.parse(rev.content),
				total = 0;
			if (votes[cfg.wgPageName]) {
				data[votes[cfg.wgPageName]] = data[votes[cfg.wgPageName]] || {users: [], anons: 0};
			}
			Object.keys(data).forEach((i)=>{
				if (i===votes[cfg.wgPageName]) {
					if (cfg.wgUserName !== null && data[i].users.indexOf(cfg.wgUserName)===-1) {data[i].users.push(cfg.wgUserName);}
					else if (cfg.wgUserName === null) {data.anons++;}
				} else if (cfg.wgUserName !== null && data[i].users.indexOf(cfg.wgUserName)!== -1) {
					data[i].users.splice(data[i].users.indexOf(cfg.wgUserName), 1);
				}
				total+= data[i].anons + data[i].users.length;
			});
			mw.hook('userjs.customPoll').fire(data, total);
			return JSON.stringify(data);
		});
	};
	form.on('reset', (e)=>{
		delete votes[cfg.wgPageName];
		updateData();
		form.find('[for^="custom-poll-"]').each((_, label)=>{
			let txt = document.createElement("textarea");
			txt.innerHTML = label.getAttribute('value');
			label.innerHTML = txt.value;
		});
	});
	form.submit((e)=>{
		e.preventDefault();
		form.find('input[type="submit"]').attr('disabled', 'disabled');
		let vote = $('#custom-poll :checked');
		votes[cfg.wgPageName] = vote.attr('id').replace(/^custom-poll-/i, '');
		updateData();
		let countVotes = (data, total)=>{
		form.find('[for^="custom-poll-"]').each((_, label)=>{
		});
			
			form.find('[for^="custom-poll-"]').each((_, label)=>{
				let txt = document.createElement("textarea");
				txt.innerHTML = label.getAttribute('value');
				let id = label.getAttribute('for').replace(/^custom-poll-/i, '');
				label.innerHTML = 
					txt.value+' ['
					+(data[id] ? (data[id].anons+data[id].users.length) : 0)
					+'/'+total
					+' votes!]';
			});
			mw.hook('userjs.customPoll').remove(countVotes);
		};
		mw.hook('userjs.customPoll').add(countVotes);
	});
});