/* Based on https://dev.fandom.com/wiki/MediaWiki:AjaxPoll.js */
(function () {
// 	if (window.CustomAjaxPollLoaded) return; TEST
	window.CustomAjaxPollLoaded = true;

	function importScript(page) {
		return $.ajax({
			url: mw.util.wikiScript('load'),
			data: {
			  mode: 'articles',
			  only: 'scripts',
			  articles: 'u:dev:MediaWiki:' + page,
			},
		}).then(function (content) {
			$('head').append($('<script>').html(content));
		});
	}

	var isAnon = mw.config.get('wgUserId') === null;
// 	isAnon = true;
	var getMsg = null;

	var AjaxPoll = {
		init: function ($content) {
			importScript('I18n-js/code.js')
				.then(function() {
					return window.dev.i18n.loadMessages('AjaxPoll');
				})
				.then(function(i18n) {
					getMsg = i18n.msg;
					$content.find('.dc-poll').each(AjaxPoll.load);
				});
		},

		load: function () {
			var threadId = this.dataset.id;

			if (!threadId) return;

			$.getJSON(mw.util.wikiScript('wikia'), {
				controller: 'DiscussionThread',
				method: 'getThread',
				format: 'json',
				threadId: threadId
			})
				.then(function (data) {
					return data.funnel === 'POLL'
						? $.extend(data.poll, { created: data.creationDate.epochSecond * 1000 })
						: $.Deferred().reject(getMsg('error').plain());
				})
				.then($.proxy(AjaxPoll.create, this))
				.fail($.proxy(AjaxPoll.error, this));
		},

		create: function (poll) {
			$(this).empty();

			var $poll = $('<form>', {
				action: mw.util.wikiScript('wikia') + '?controller=DiscussionPoll&method=castVote',
				submit: $.proxy(AjaxPoll.submit, this),
				appendTo: this,
			});

			$('<input>', {
				type: 'hidden',
				name: 'pollId',
				value: poll.id,
				appendTo: $poll,
			});

			$('<div>', {
				class: 'dc-poll__question',
				text: poll.question,
				appendTo: $poll,
			});
			var $answersList = $('<ul>', {
				class: 'dc-poll__answersList',
				appendTo: $poll,
			});

			$(poll.answers).each(function () {
				var percent = this.votes / poll.totalVotes * 100;
				percent = isNaN(percent) ? '0%' : percent.toFixed(0) + '%';
                var votes = isNaN(this.votes) ? '–' : this.votes;

                var pollItemId = 'poll-item-' + this.id;

				var $radio = $('<input>', {
					type: 'radio',
					class: 'dc-poll__answerRadio',
					name: 'answerIds',
					id: pollItemId,
					value: this.id,
				});

				var $percentValue = $('<div>', {
					class: 'dc-poll__answerPercentValue',
					text: percent,
				});
				var $percent = $('<div>', {
					class: 'dc-poll__answerPercent',
					append: $percentValue,
				});
				var $name = $('<div>', {
					class: 'dc-poll__answerName',
					text: this.text,
				});
				var $votesValue = $('<div>', {
					class: 'dc-poll__answerVotesValue',
					text: votes,
				});
				var $votes = $('<div>', {
					class: 'dc-poll__answerVotes',
					append: $votesValue,
				});
				var $label = $('<label>', {
					class: 'dc-poll__answerLabel',
					css: {
						'background': 'linear-gradient(90deg, var(--local-bar-color) 0%, var(--local-bar-color) calc(' + percent + ' + 10%), transparent calc(' + percent + ' + 10%))'
					},
					for: pollItemId,
					append: [$name, $percent, $votes],
				});

				var $item = $('<li>', {
					class: 'dc-poll__answerItem',
					append: [(isAnon ? null : $radio), $label],
					appendTo: $answersList,
				});

			});

			$('<div>', {
				class: 'dc-poll__info',
				text: getMsg('info').plain()
					.replace('$1', new Date(poll.created).toLocaleTimeString())
					.replace('$2', new Date(poll.created).toLocaleDateString())
					.replace('$3', poll.totalVotes),
				appendTo: $poll,
			});

			var $submitBtn = $('<input>', {
				type: 'submit',
				name: 'submit',
				value: getMsg('vote').plain(),
			});

			$('<div>', {
				class: 'main-btn',
				append: $submitBtn,
				appendTo: isAnon ? null : $poll,
			});
		},

		error: function (message) {
			$(this).text(message).css('color', 'red');
		},

		submit: function (e) {
			e.preventDefault();

			var form = e.target;
			var elems = form.elements;

			if(!elems.answerIds.value) return;

			elems.submit.value = getMsg('submitting').plain();
			elems.submit.disabled = true;

			$.ajax({
				url: form.action,
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
			}).then($.proxy(AjaxPoll.load, this));
		},
	};

	mw.loader.using('mediawiki.util').then(function() {
		mw.hook('wikipage.content').add(AjaxPoll.init);
	});
})();