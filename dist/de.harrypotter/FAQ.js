importArticles({
    type: "style",
    article: "MediaWiki:FAQ.css"
}, {
	type: "script",
	article: "MediaWiki:Tag-Select.js"
});
 
if(!window.hasOwnProperty('dev')) {
    window.dev = {};
}
if(!window.dev.hasOwnProperty('faq')) {
    window.dev.faq = {};
}
if(!window.dev.faq.hasOwnProperty('page')) {
    window.dev.faq.page = wgFormattedNamespaces[4] + ':FAQ';
}

var faqI18n;

if (wgPageName === window.dev.faq.page) {
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
            token: mw.user.tokens.get('editToken')
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
            btn.removeAttr('href')
            btn.click(editQuestion)
            btn.find('span').text(faqI18n.msg('add').plain());
            btn.find('svg').replaceWith('<svg id="wds-icons-add" class="wds-icon wds-icon-tiny" viewBox="0 0 24 24" width="12px" height="12px"><g fill-rule="evenodd"><path id="add-a" d="M22 11h-9V2a1 1 0 1 0-2 0v9H2a1 1 0 1 0 0 2h9v9a1 1 0 1 0 2 0v-9h9a1 1 0 1 0 0-2"></path></g></svg>')
            dropdown.find('.wds-list > li').filter(function(idx, li) {
                return ['ca-ve-edit', 'ca-history', 'ca-move', 'ca-delete'].includes($(li).find('a').attr('id'));
            }).remove();
     
        	displayFAQ(questions);
        });
    }
 
    function displayFAQ(faqs) {
        mw.util.$content.empty();
    	faqs.forEach(function(faq, idx) {
    		var el = $('<div />', { class: 'faq', id: idx }).append(
                $('<div />', { class: 'question' }).append(
                    $('<span />', { text: faq.question, class: 'question-text' }),
                    $('<span />', {
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
                    $('<span />', {
                        html: '<svg id="wds-icons-trash" viewBox="0 0 24 24" width="20px" height="20px"><g fill-rule="evenodd"><path id="trash-a" d="M16 19a1 1 0 0 0 1-1v-7a1 1 0 1 0-2 0v7a1 1 0 0 0 1 1m-4 0a1 1 0 0 0 1-1v-7a1 1 0 1 0-2 0v7a1 1 0 0 0 1 1m-4 0a1 1 0 0 0 1-1v-7a1 1 0 1 0-2 0v7a1 1 0 0 0 1 1M7 2h10a1 1 0 1 0 0-2H7a1 1 0 1 0 0 2M5 22h14V7H5v15zM22 5H2a1 1 0 1 0 0 2h1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7h1a1 1 0 1 0 0-2z"></path></g></svg>',
						class: 'js-delete-question',
                        on: {
							click: function(e) {
								e.preventDefault();
								e.stopPropagation();
        						var question = _.findWhere(faqs, { id: parseInt($(e.currentTarget).closest('.faq').attr('id')) });
								console.log(parseInt(faqs, $(e.currentTarget).closest('.faq').attr('id')), question);
								deleteQuestion(question);
                            }
                        }
                    }).css({ 'float': 'right', 'margin-right': '5px' })
                ),
                $('<div />', { class: 'answer' }).append($('<p />'))
            ).appendTo(mw.util.$content);
    		if(faq.hasOwnProperty('related')) {
    			var answer = el.find('.answer');
    			el.find('.answer').append(
    				$('<hr />'),
    				$('<ul />', { class: 'related' })
    			);
    			if(faq.related.hasOwnProperty('articles')) {
    				faq.related.articles.forEach(function(article) {
                        answer.find('.related').append(
    						$('<li />').append(
    							$('<a />', {href: mw.util.getUrl(article)}).text(article)
    						)
                        );
                    });
                }
    			if(faq.related.hasOwnProperty('discussions')) {
    				faq.related.discussions.forEach(function(discussion) {
                        answer.find('.related').append(
    						$('<li />').append(
    							$('<a />', {
    							    href: wgScriptPath + '/d/p/' + discussion.p
    							}).text(discussion.title)
    						)
                        );
                    });
                }
    			if(faq.related.hasOwnProperty('external')) {
    				faq.related.external.forEach(function(external) {
                        answer.find('.related').append(
    						$('<li />').append(
    							$('<a />', { href: external.url }).text(external.title)
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
        $('.faq .answer').hide();
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
        	var question = _.findWhere(questions, { id: id });
			var isNew = typeof question === 'undefined';
			console.log('isNew', isNew);
			require(['jquery', 'wikia.ui.factory'], function ($, uiFactory) {
				form = $('<form />').appendTo($('<div />')).append(
					$('<div />').append(
						$('<label />', {
						    for: 'question',
						    text: faqI18n.msg('question').plain()
						}),
						$('<label />', {
						    for: 'answer',
						    text: faqI18n.msg('answer').plain()
						}),
						$('<label />', {
						    for: 'related-articles',
						    text: faqI18n.msg('related-articles').plain()
						}),
						$('<label />', {
						    for: 'keywords',
						    text: faqI18n.msg('keywords').plain()
						}),
					),
					$('<div />') .append(
						$('<input />', { type: 'text', name: 'question', value: isNew ? '' : question.question }),
						$('<textarea />', { name: 'answer', value: isNew ? '' : question.answer }),
						$('<ul />', { class: 'tag-select', name: 'related-articles' }),
						$('<ul />', { class: 'tag-select', name: 'keywords' })
					)
				);
				uiFactory.init('modal').then(function (uiModal) {
					uiModal.createComponent({
						type: 'default',
						vars: {
							id: 'faqModal',
							size: 'medium',
							content: form.parent().html(),
							class: 'styleguide-example-content-size',
							title: isNew ? faqI18n.msg('add-new').plain() : faqI18n.msg('edit', question.question).plain(),
							buttons: [
								{
									vars: {
										value: faqI18n.msg('save').plain(),
										classes: ['normal', 'primary'],
										data: [
											{
												key: 'event',
												value: 'ok'
											}
										]
									}
								},
								{
									vars: {
										value: faqI18n.msg('cancel').plain(),
										data: [
											{
												key: 'event',
												value: 'close'
											}
										]
									}
 
								}
							]
						}
					}, function(modal) {
						var form = modal.$content.find('form');
						modal.show();
						var relatedArticles = $('[name="related-articles"]').tagSelect(isNew ? [] : question.related.articles, function(val, onResult) {
							$.get(wgScript, {
									action: 'ajax',
									rs: 'getLinkSuggest',
									query: val
								}, function(res) {
								onResult(res.split(/\n/));
							});
						});
						var keywords = $('[name="keywords"]').tagSelect(isNew ? [] : question.keywords, function(val, onResult) {
							onResult([]);
						});
						modal.bind('ok', function() {
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
						});
					});
				});
			});
        });
    }
    
    mw.hook('dev.i18n').add(function (i18n) {
        i18n.loadMessages('FAQ').then(function (i18n) {
            faqI18n = i18n;
    		init();
        });
    });
     
    importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
}