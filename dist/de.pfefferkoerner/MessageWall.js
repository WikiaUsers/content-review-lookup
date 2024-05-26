var config = mw.config.get([
  'wgNamespaceNumber',
  'wgContentLanguage',
  'wgTitle',
]);

function editMessage(evt) {
  evt.preventDefault();
  var messageEl = evt.target.closest('.message');
  messageEl.querySelector('.message-heading > a').remove();

  var contentEl = messageEl.querySelector('h3 + p');
  contentEl.replaceWith(Object.assign(document.createElement('textarea'), {
    value: contentEl.textContent
  }));

  var messageFooter = messageEl.querySelector('.message-footer');
  var saveLink = Object.assign(document.createElement('a'), {
    href: '#',
    textContent: 'save'
  });
  saveLink.addEventListener('click', saveMessage);
  messageFooter.append(saveLink);
}

function replyToMessage(evt) {
	evt.preventDefault();
	var messageEl = evt.target.closest('.message');
	messageEl.querySelector('.message-footer > a:first-child').remove();
	
	var newMessageEl = Object.assign(document.createElement('div'), {
		className: 'message'
	});
	var textareaEl = document.createElement('textarea');
	var newMessageFooter = Object.assign(document.createElement('div'), {
		className: 'message-footer'
	});
	var saveLink = Object.assign(document.createElement('a'), {
		href: '#',
		textContent: 'save'
	});
	saveLink.addEventListener('click', createReply.bind(window, +messageEl.dataset.messageId));
	newMessageFooter.append(saveLink);
	newMessageEl.append(textareaEl, newMessageFooter);
	messageEl.after(newMessageEl);
}

function notificationEdit(username, summary) {
	return apiCall({
		action: 'edit',
		appendtext: '<!--' + summary + '-->',
		title: 'User talk:' + username,
		token: mw.user.tokens.get('csrfToken'),
		summary: typeof summary === 'undefined' ? 'Edited page via MediaWiki API' : summary,
		//tags: 'apiedit',
		watchlist: 'watch',
		nocreate: 1,
	}, function(res) {
		return res.edit.result === 'Success';
	}, 'post');
}

function createReply(parentMessageId, evt) {
  evt.preventDefault();
  var messageEl = evt.target.closest('.message');
	parsePage('MediaWiki:Custom-MessageWall.json', 'wikitext', 'json')
    .then(function(json) { return JSON.parse(json); })
  	.then(function(messages) {
    	var parentIdx = messages.messages.findIndex(function(message) { return message.creation_ts === parentMessageId; });
		var parentMsg = messages.messages[parentIdx];
		var newMsg = messageEl.querySelector('textarea').value;
		var creationDate = new Date();
		parentMsg.replies.push({
			to: parentMsg.from,
			from: mw.user.getName(),
			contentmodel: "wikitext",
			subject: null,
			message: newMsg,
			created_at: creationDate.toISOString(),
			creation_ts: +creationDate,
			replies: []
		});
		postPage('MediaWiki:Custom-MessageWall.json', JSON.stringify(messages, null, '\t'), '/* Reply to ' + messageEl.dataset.messageId + ' */').then(function(isSuccessful) {
			if (isSuccessful) {
				notificationEdit(config.wgTitle, 'Reply to /* ' + parentMsg.subject + '*/').then(function(isSuccessful) {
					if (isSuccessful) {
					  window.location.reload();
					} else {
					  console.log('isSuccessful', isSuccessful);
					}
				});
			} else {
			  console.log('isSuccessful', isSuccessful);
			}
		});
  	});
}

function createMessage() {
	var newMessageEl = Object.assign(document.createElement('div'), {
		className: 'message'
	});
	var textareaEl = document.createElement('textarea');
	var subjectEl = Object.assign(document.createElement('input'), {
		type: 'text'
	});
	var newMessageFooter = Object.assign(document.createElement('div'), {
		className: 'message-footer'
	});
	var saveLink = Object.assign(document.createElement('a'), {
		href: '#',
		textContent: 'save'
	});
	saveLink.addEventListener('click', saveNewMessage);
	newMessageFooter.append(saveLink);
	newMessageEl.append(subjectEl, textareaEl, newMessageFooter);
	document.querySelector('.message-wall > h2:not(#mw-toc-heading)').after(newMessageEl);
}

function saveNewMessage(evt) {
  evt.preventDefault();
  var messageEl = evt.target.closest('.message');
	parsePage('MediaWiki:Custom-MessageWall.json', 'wikitext', 'json')
    .then(function(json) { return JSON.parse(json); })
  	.then(function(messages) {
		var newMsg = messageEl.querySelector('textarea').value;
		var subject = messageEl.querySelector('input[type="text"]').value;
		var creationDate = new Date();
		messages.messages.push({
			to: config.wgTitle,
			from: mw.user.getName(),
			contentmodel: "wikitext",
			subject: subject,
			message: newMsg,
			created_at: creationDate.toISOString(),
			creation_ts: +creationDate,
			replies: []
		});
		postPage('MediaWiki:Custom-MessageWall.json', JSON.stringify(messages, null, '\t'), '/* New message ' + +creationDate + ' */').then(function(isSuccessful) {
			if (isSuccessful) {
				notificationEdit(config.wgTitle, 'New message /* ' + subject + '*/').then(function(isSuccessful) {
					if (isSuccessful) {
					  window.location.reload();
					} else {
					  console.log('isSuccessful', isSuccessful);
					}
				});
			} else {
	  			console.log('isSuccessful', isSuccessful);
			}
		});
  	});
}

function deleteMessage(evt) {
  evt.preventDefault();
  var messageEl = evt.target.closest('.message');
  if (confirm('Do you really want to delete this message')) {
	parsePage('MediaWiki:Custom-MessageWall.json', 'wikitext', 'json')
    .then(function(json) { return JSON.parse(json); })
  	.then(function(messages) {
		var idx = messages.messages.findIndex(function(message) { return message.creation_ts === +messageEl.dataset.messageId; });
		var subject = messages.messages[idx].subject;
		delete messages.messages[idx];
		messages.messages = messages.messages.filter(function(message){ return message; });
		postPage('MediaWiki:Custom-MessageWall.json', JSON.stringify(messages, null, '\t'), '/* Delete ' + messageEl.dataset.messageId + ' */').then(function(isSuccessful) {
			if (isSuccessful) {
				notificationEdit(config.wgTitle, 'Delete /* ' + subject + '*/').then(function(isSuccessful) {
					if (isSuccessful) {
					  window.location.reload();
					} else {
					  console.log('isSuccessful', isSuccessful);
					}
				});
			} else {
				console.log('isSuccessful', isSuccessful);
			}
		});
  	});
  }
}

function apiCall(options, callback, method) {
	return new Promise(function(resolve, reject) {
		return (new mw.Api())
			[typeof method === 'undefined' ? 'get' : method.toLowerCase()](options)
			.then(callback)
			.then(resolve)
			.catch(reject);
	});
}

function parsePage(page, prop, contentmodel) {
	return apiCall({
		action: 'parse',
		prop: typeof prop === 'undefined' ? 'text' : prop,
		page: page,
		formatversion: 2,
		contentmodel: typeof contentmodel === 'undefined' ? 'wikitext' : contentmodel,
		disablelimitreport: 1
	}, function(res) {
		return res.parse[prop];
	});
}

function postPage(page, text, summary) {
	return apiCall({
		action: 'edit',
		text: text,
		title: page,
		token: mw.user.tokens.get('csrfToken'),
		summary: typeof summary === 'undefined' ? 'Edited page via MediaWiki API' : summary,
		//tags: 'apiedit',
		nocreate: 1,
	}, function(res) {
		return res.edit.result === 'Success';
	}, 'post');
}

if (config.wgNamespaceNumber === 3 && (container = document.querySelector('.message-wall'))) {
	var messageEls = container.getElementsByClassName('message');
  var createLink = Object.assign(document.createElement('a'), {
    href: '#',
    textContent: 'create'
  });
  createLink.addEventListener('click', createMessage);
  container.querySelector('h2:not(#mw-toc-heading)').append(createLink);
	/*var dateFormatter = new Intl.DateTimeFormat(config.wgContentLanguage, {
    dateStyle: 'short',
    timeStyle: 'short',
  })*/
	for (var idx in messageEls) {
		var messageEl = messageEls[idx];
		var messageHeadingEl = messageEl.querySelector('.message-heading');

    	//var timeEl = messageHeadingEl.querySelector('time')
		//timeEl.textContent = dateFormatter.format(new Date(timeEl.dateTime))
    
	    var editLink = Object.assign(document.createElement('a'), {
	      href: '#',
	      textContent: 'edit'
	    });
	    editLink.addEventListener('click', editMessage);
	    messageHeadingEl.append(editLink);
	    
	    var messageFooter = messageEl.querySelector('.message-footer');
	    var replyLink = Object.assign(document.createElement('a'), {
	      href: '#',
	      textContent: 'reply'
	    });
	    replyLink.addEventListener('click', replyToMessage);
	    var deleteLink = Object.assign(document.createElement('a'), {
	      href: '#',
	      textContent: 'delete'
	    });
	    deleteLink.addEventListener('click', deleteMessage);
	    messageFooter.append(replyLink, deleteLink);
	}
}