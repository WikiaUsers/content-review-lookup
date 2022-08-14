;(function(window, $, mw) {
	'use strict';
	var config = mw.config.get([
		'wgFormattedNamespaces',
		'wgScriptPath',
		'wgPageName'
	]);
	importArticles({
	    type: "style",
	    article: "u:dev:MediaWiki:FAQ/style.css"
	}, {
		type: "script",
		article: "u:dev:MediaWiki:Tag-Select/code.js"
	});
	 
	if(!window.hasOwnProperty('dev')) {
	    window.dev = {};
	}
	if(!window.dev.hasOwnProperty('faq')) {
	    window.dev.faq = {};
	}
	if(!window.dev.faq.hasOwnProperty('page')) {
	    window.dev.faq.page = config.wgFormattedNamespaces[4] + ':FAQ';
	}
	
	function getQuestions() {
	    return $.getJSON(mw.util.wikiScript('api'), {
	        action: 'query',
	        prop: 'revisions',
	        rvprop: 'content',
	        titles: 'MediaWiki:Custom-FAQ.json',
	        format: 'json',
	        indexpageids: true,
	        q: Math.random()
	    }).then(function(res) {
			return JSON.parse(res.query.pages[res.query.pageids[0]].revisions[0]['*']);
	    });
	}
	
	function postQuestions(questions, summary) {		
	    return $.post(mw.util.wikiScript('api'), {
	        action: 'edit',
	        prop: 'revisions',
	        rvprop: 'content',
	        title: 'MediaWiki:Custom-FAQ.json',
	        text: JSON.stringify(questions, null, '\t'),
			summary: '[FAQ API] ' + (summary || 'edit json'),
	        format: 'json',
	        indexpageids: true,
	        q: Math.random(),
	        token: mw.user.tokens.get('csrfToken')
	    }, 'json').then(function(res) {
	        if (res.edit.hasOwnProperty('result') && res.edit.result.toLowerCase() === 'success') {
	            window.location.reload();
	        }
	    });
	}
	
	function init() {
	    getQuestions().then(function(questions) {
			var dropdown = $('.page-header .page-header__contribution-buttons');
	        var btn = dropdown.find('.wds-button-group > #ca-edit');
	        btn.off();
	        btn.removeAttr('href');
	        btn.click(editQuestion);
	        btn.find('span').text(faqI18n.msg('add').plain());
	        btn.find('svg').replaceWith('<svg id="wds-icons-add" class="wds-icon wds-icon-tiny" viewBox="0 0 24 24" width="12px" height="12px"><g fill-rule="evenodd"><path id="add-a" d="M22 11h-9V2a1 1 0 1 0-2 0v9H2a1 1 0 1 0 0 2h9v9a1 1 0 1 0 2 0v-9h9a1 1 0 1 0 0-2"></path></g></svg>');
	        dropdown.find('.wds-list > li').filter(function(idx, li) {
	            return ['ca-ve-edit', 'ca-history', 'ca-move', 'ca-delete'].includes($(li).find('a').attr('id'));
	        }).remove();
	
	    	displayFAQ(questions);
	    });
	}
	
	function displayFAQ(faqs) {
	    mw.util.$content.empty();
		faqs.forEach(function(faq, idx) {
			var el = $('<div>', { class: 'faq', id: idx }).append(
	            $('<div>', { class: 'question' }).append(
	                $('<span>', { text: faq.question, class: 'question-text' }),
	                $('<span>', {
	                    html: '<svg id="wds-icons-pencil" viewBox="0 0 24 24" width="20px" height="20px"><g fill-rule="evenodd"><path id="pencil-a" d="M2 15.164l8.625-8.625 6.836 6.836L8.836 22H2v-6.836zm16.875-3.203l-6.836-6.836 2.711-2.71 6.836 6.835-2.711 2.711zm4.832-3.418l-8.25-8.25a.999.999 0 0 0-1.414 0L.294 14.043A1 1 0 0 0 0 14.75V23a1 1 0 0 0 1 1h8.25a1 1 0 0 0 .708-.294L23.707 9.957a.999.999 0 0 0 0-1.414z"></path></g></svg>',
						class: 'js-edit-question',
	                    on: {
							click: function(e) {
								e.preventDefault();
								e.stopPropagation();
								editQuestion(parseInt($(e.currentTarget).closest('.faq').attr('id')));
	                        }
	                    }
	                }).css('float', 'right'),
	                $('<span>', {
	                    html: '<svg id="wds-icon-link" viewBox="0 0 24 24" width="20px" height="20px"><g fill-rule="evenodd"><path id="link-a" d="M13.109 9.47a.999.999 0 0 0 0 1.414 5.28 5.28 0 0 1 0 7.458L12 19.45a5.28 5.28 0 0 1-7.459 0 5.28 5.28 0 0 1 0-7.458.999.999 0 1 0-1.414-1.414c-2.836 2.836-2.836 7.45 0 10.287a7.255 7.255 0 0 0 5.144 2.126 7.255 7.255 0 0 0 5.143-2.126l1.109-1.11a7.222 7.222 0 0 0 2.13-5.142c0-1.944-.756-3.77-2.13-5.144a.999.999 0 0 0-1.414 0m7.757-6.343C18.03.29 13.416.29 10.579 3.126L9.47 4.236a7.224 7.224 0 0 0-2.13 5.143c0 1.943.756 3.769 2.13 5.144a.996.996 0 0 0 .707.292 1 1 0 0 0 .707-1.707 5.28 5.28 0 0 1 0-7.458l1.11-1.109a5.28 5.28 0 0 1 7.458 0 5.28 5.28 0 0 1 0 7.458.999.999 0 1 0 1.414 1.414c2.836-2.836 2.836-7.45 0-10.286"></path></g></svg>',
						class: 'js-link-question',
	                    on: {
							click: function(e) {
								e.preventDefault();
								e.stopPropagation();
								var id = parseInt($(e.currentTarget).closest('.faq').attr('id'));
								importArticle({
								    type: 'script',
								    article: 'u:dev:MediaWiki:BannerNotification.js'
								});
								mw.hook('dev.banners').add(function(BannerNotification) {
									console.log('copy link');
									var banner;
									copyTextToClipboard(location.origin + mw.util.getUrl(window.dev.faq.page) + '#' + id).then(function() {
										banner = new BannerNotification('Link successfully copied to clipboard!', 'confirm', null, 5000).show();
									}).catch(function() {
										banner = new BannerNotification('Copying link to clipboard failed!', 'error', null, 5000).show();
									});
								});
	                        }
	                    }
	                }).css({
	                	'float': 'right',
	                	'margin-top': '5px',
	                	'margin-right': '5px'
	            	}),
	                $('<span>', {
	                    html: '<svg id="wds-icons-trash" viewBox="0 0 24 24" width="20px" height="20px"><g fill-rule="evenodd"><path id="trash-a" d="M16 19a1 1 0 0 0 1-1v-7a1 1 0 1 0-2 0v7a1 1 0 0 0 1 1m-4 0a1 1 0 0 0 1-1v-7a1 1 0 1 0-2 0v7a1 1 0 0 0 1 1m-4 0a1 1 0 0 0 1-1v-7a1 1 0 1 0-2 0v7a1 1 0 0 0 1 1M7 2h10a1 1 0 1 0 0-2H7a1 1 0 1 0 0 2M5 22h14V7H5v15zM22 5H2a1 1 0 1 0 0 2h1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7h1a1 1 0 1 0 0-2z"></path></g></svg>',
						class: 'js-delete-question',
	                    on: {
							click: function(e) {
								e.preventDefault();
								e.stopPropagation();
	    						var question = _.find(faqs, { id: parseInt($(e.currentTarget).closest('.faq').attr('id')) });
								console.log(parseInt(faqs, $(e.currentTarget).closest('.faq').attr('id')), question);
								deleteQuestion(question);
	                        }
	                    }
	                }).css({ 'float': 'right', 'margin-right': '5px' })
	            ),
	            $('<div>', { class: 'answer' }).append($('<p>'))
	        ).appendTo(mw.util.$content);
			if(faq.hasOwnProperty('related')) {
				var answer = el.find('.answer');
				el.find('.answer').append(
					$('<hr>'),
					$('<ul>', { class: 'related' })
				);
				if(faq.related.hasOwnProperty('articles')) {
					faq.related.articles.forEach(function(article) {
	                    answer.find('.related').append(
							$('<li>').append(
								$('<a>', {href: mw.util.getUrl(article)}).text(article)
							)
	                    );
	                });
	            }
				if(faq.related.hasOwnProperty('discussions')) {
					faq.related.discussions.forEach(function(discussion) {
	                    answer.find('.related').append(
							$('<li>').append(
								$('<a>', {
								    href: config.wgScriptPath + '/d/p/' + discussion.p
								}).text(discussion.title)
							)
	                    );
	                });
	            }
				if(faq.related.hasOwnProperty('external')) {
					faq.related.external.forEach(function(external) {
	                    answer.find('.related').append(
							$('<li>').append(
								$('<a>', { href: external.url }).text(external.title)
							)
	                    );
	                });
	            }
	        }
	        $.getJSON(mw.util.wikiScript('api'), {
	            action: 'parse',
	            text: faq.answer,
	            format: 'json',
	            disablepp: 1
	        }, function(res) {
	            el.find('.answer > p').html(res.parse.text['*']);
	        });
	    });
	    $('.faq .question').click(function() {
	        $(this).next().toggle();
	    });
	}
	
	function deleteQuestion(question) {
		console.log(question);
		var really = confirm(faqI18n.msg('delete-confirm', question.question).plain());
		if (really) {
	        getQuestions().then(function(questions) {
	            postQuestions(_.reject(questions, { id: question.id }), 'Delete question with id ' + question.id);
	        });
	    }
	}
	
	function editQuestion(id) {
	    getQuestions().then(function(questions) {
	    	var question = _.find(questions, { id: id });
			var isNew = typeof question === 'undefined';
			var form = $('<form>').appendTo($('<div>')).append(
				$('<div>').append(
					$('<label>', {
					    for: 'question',
					    text: faqI18n.msg('question').plain()
					}),
					$('<label>', {
					    for: 'answer',
					    text: faqI18n.msg('answer').plain()
					}),
					$('<label>', {
					    for: 'related-articles',
					    text: faqI18n.msg('related-articles').plain()
					}),
					$('<label>', {
					    for: 'keywords',
					    text: faqI18n.msg('keywords').plain()
					})
				),
				$('<div>') .append(
					$('<input>', { type: 'text', name: 'question', value: isNew ? '' : question.question }),
					$('<textarea>', { name: 'answer', text: isNew ? '' : question.answer }),
					$('<ul>', { class: 'tag-select', name: 'related-articles' }),
					$('<ul>', { class: 'tag-select', name: 'keywords' })
				)
			);
			
			importArticle({
			    type: 'script',
			    article: 'u:dev:MediaWiki:ShowCustomModal.js'
			});
			
			mw.hook('dev.showCustomModal').add(function(showCustomModal) {
				var title = isNew ? faqI18n.msg('add-new').plain() : faqI18n.msg('edit', question.question).plain();
			    var $modal = showCustomModal(title, {
			    	id: 'faqModal',
			    	content: form,
			    	buttons: [
						{
							message: faqI18n.msg('save').plain(),
							classes: ['normal', 'primary'],
	    					defaultButton: true,
							handler: function() {
								var values = form.serializeArray().reduce(function(obj, item) {
									obj[item.name] = item.value;
									return obj;
								}, {});
								values.related = {
									articles: relatedArticles.getTags()
								};
								values.keywords = keywords.getTags();
								if (isNew) {
									values.id = questions.length;
									questions.push(values);
		                        }
								else {
									var idx = _.findIndex(questions, { id: id });
									values.id = question.id;
									questions[idx] = values;
									console.log(idx, JSON.stringify(questions, null, '\t'), JSON.stringify(values, null, '\t'));
		                        }
								postQuestions(questions, isNew ? 'Add new question' : 'Edit question with id ' + id);
							}
						},
						{
							message: faqI18n.msg('cancel').plain(),
							handler: dev.showCustomModal.closeModal.bind(window, $modal)
						}
					]
			    });
			});
	    });
	}
	
	function fallbackCopyTextToClipboard(text) {
	  var textArea = document.createElement("textarea");
	  textArea.value = text;
	  
	  // Avoid scrolling to bottom
	  textArea.style.top = "0";
	  textArea.style.left = "0";
	  textArea.style.position = "fixed";
	
	  document.body.appendChild(textArea);
	  textArea.focus();
	  textArea.select();
	
		var prom = new Promise(function(resolve, reject) {
			try {
				var successful = document.execCommand('copy');
				var msg = successful ? resolve() : reject();
			} catch (err) {
				reject();
			}
		});
	
		document.body.removeChild(textArea);
		return prom;
	}
	function copyTextToClipboard(text) {
	  if (!navigator.clipboard) {
	    return fallbackCopyTextToClipboard(text);
	  }
	  return navigator.clipboard.writeText(text);
	}
	 
	var faqI18n;
	var _;
	 
	if (config.wgPageName === window.dev.faq.page.replace(/ /g, '_')) {
		var lodash = mw.loader.getModuleNames().filter(function(m) {
			return m.startsWith('lodash');
		})[0];
		mw.loader.using(lodash).done(function(require) {
		    _ = require(lodash).lodash;
		    
		    mw.hook('dev.i18n').add(function (i18n) {
		        i18n.loadMessages('FAQ').then(function (i18n) {
		            faqI18n = i18n;
		    		init();
		        });
		    });
		});
	 
	    importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
	}
})(window, window.jQuery, window.mediaWiki);