/**
 * DiscussionsPollEmbed
 *
 * Allows embedding polls from Fandom Discussions on wiki pages
 *
 * @version 0.1
 * @author TheNozomi
 *
 * @usage <div class="discussions-poll" data-thread-id="thread id"></div>
 *
*/
;(function() {
  if (window.discussionsPollEmbedLoaded) return;

  var wgConf = mw.config.get([
    'wgContentLanguage',
    'wgScriptPath',
    'wgServer',
    'wgUserName',
    'wgVersion'
  ]);
  var isUCP = wgConf.wgVersion !== '1.19.24';
  var i18n = null;

  function DiscussionsPollEmbed($container, data, checkedAnswer) {
    this.$container = $container;
    this.data = data;
    this.checkedAnswer = checkedAnswer;
    this.thread = null;

    $container.html($('<div>', {
      class: 'loading-spinner',
      html: '<svg class="wds-spinner wds-spinner__block" width="66" height="66" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' + 
        '<g transform="translate(33, 33)">' +
          '<circle class="wds-spinner__stroke" fill="none" stroke-width="2" stroke-dasharray="188.49555921538757" stroke-dashoffset="188.49555921538757" stroke-linecap="round" r="30"></circle>' +
        '</g>' +
      '</svg>'
    }));

    this.fetchThread = function(threadId) {
      return $.ajax({
        type: 'GET',
        url: wgConf.wgServer + wgConf.wgScriptPath + '/wikia.php?controller=DiscussionThread&method=getThread&threadId='+ threadId,
        dataType: 'json',
      });
    };

    this.onVoteButtonClick = function(event) {
      var button = event.target,
        $checkedOption = $container.find('input:radio[name=poll_'+ this.thread.poll.id +']:checked');

      if (wgConf.wgUserName) {
        button.disabled = true;
        $.ajax({
          type: 'POST',
          url: wgConf.wgServer + wgConf.wgScriptPath + '/wikia.php?controller=DiscussionPoll&method=castVote',
          data: {
            pollId: this.thread.poll.id,
            answerIds: $checkedOption.val()
          }
        }).done(function() {
          if (isUCP) {
            mw.notify(i18n.msg('voting-success').plain());
          } else {
            new BannerNotification(i18n.msg('voting-success').plain(), 'confirm').show();
          }
          $container.addClass('voted');
          new DiscussionsPollEmbed(this.$container, this.data, parseInt($checkedOption.val())); // this is ugly
        }.bind(this)).fail(function(err) {
          console.error(err);
          if (isUCP) {
            mw.notify(i18n.msg('voting-error', err.message).plain());
          } else {
            new BannerNotification(i18n.msg('voting-error', err.message).plain(), 'error').show();
          }
          button.disabled = false;
        });
      } else {
        window.location = 'https://www.fandom.com/signin?redirect='+ encodeURIComponent(window.location) +'&uselang='+ wgConf.wgContentLanguage +'&headerText=auth:signin.login-modal-prompt-vote';
      }
    };

    this.fetchThread(mw.html.escape(data.threadId)).done(function(thread) {
      this.thread = thread;
      $container.addClass('loaded');
      $container.addClass(isUCP ? 'mw_ucp': 'mw_legacy');
      if (thread.funnel !== 'POLL' || !thread.poll) {
        $container.text('[DiscussionsPollEmbed] ' + i18n.msg('error-not-poll').plain());
        return;
      }

      var pollHtml = dev.ui({
        type: 'div',
        classes: ['discussions-poll__poll', 'poll_' + thread.poll.id],
        children: [
          {
            type: 'header',
            classes: ['discussions-poll__title'],
            text: thread.poll.question
          },
          {
            type: 'div',
            classes: ['discussions-poll__answers'],
            children: thread.poll.answers.map(function(answer) {
              var answerEl = {
                type: 'div',
                classes: ['discussions-poll__answer', 'answer_' + answer.id],
                attr: {
                  style: '--percentage:'+ (+((answer.votes * 100) / thread.poll.totalVotes || 0).toFixed(2)) + '%'
                },
                children: [
                  {
                    type: 'input',
                    attr: {
                      type: 'radio',
                      name: 'poll_' + thread.poll.id,
                      id: answer.id,
                      value: answer.id   
                    },
                    events: {
                      input: function() {
                        document.querySelector('.poll_' + thread.poll.id).querySelector('.discussions-poll__vote').disabled = false;
                      }
                    },
                  },
                  {
                    type: 'label',
                    attr: {
                      for: answer.id
                    },
                    data: {
                      votes: answer.votes,
                      percentage: (+((answer.votes * 100) / thread.poll.totalVotes || 0).toFixed(2))
                    },
                    text: answer.text
                  }
                ]
              };

              if (this.checkedAnswer) {
                var checkedAnswer = this.checkedAnswer;
                answerEl.children.forEach(function(childEl) {
                  if (childEl.type === 'input') {
                    childEl.attr.disabled = true;
                    if (childEl.attr.value === checkedAnswer) {
                      childEl.attr.checked = true;
                    }
                  }
                });
              }
 
              return answerEl;
            }.bind(this))
          },
          {
            type: 'div',
            classes: ['discussions-poll__total-votes'],
            text: i18n.msg('poll-details', thread.poll.totalVotes, new Date(thread.creationDate.epochSecond * 1000).toLocaleString()).plain()
          },
          {
            type: 'button',
            classes: ['wds-button', 'discussions-poll__vote'],
            attr: {
              disabled: true
            },
            condition: !($container.hasClass('voted')),
            text: i18n.msg('vote-button-label').plain(),
            events: {
              click: this.onVoteButtonClick.bind(this)
            }
          }
        ]
      });

      $container.html(pollHtml);
    }.bind(this)).fail(function(err) {
      console.error(err);
      $container.text('[DiscussionsPollEmbed] '+ i18n.msg('load-error', err.status).plain());
    });
  }

  this.onContent = function($content) {
    $content.find('.discussions-poll:not(.loaded)').each(function() {
      var $container = $(this),
        data = $container.data();
      if (!data.threadId) return;
      new DiscussionsPollEmbed($container, data);
    });
  };

  this.init = function() {
    window.dev.i18n.loadMessages('DiscussionsPollEmbed').done(function(msg) {
      i18n = msg;
      mw.hook('wikipage.content').add(this.onContent);
    });
  };

  // Not using importArticles here since its behavior is different between legacy/UCP and not being very reliable on UCP
  $.ajax({
    cache: true,
    dataType: 'script',
    url: wgConf.wgServer + wgConf.wgScriptPath + '/load.php?mode=articles&only=scripts&articles=u:dev:MediaWiki:UI-js/code.js|u:dev:MediaWiki:I18n-js/code.js'
  }).done(this.init);

  var styles = document.createElement('link');
  styles.setAttribute('rel', 'stylesheet');
  styles.setAttribute('type', 'text/css');
  styles.setAttribute('href', wgConf.wgServer + wgConf.wgScriptPath + '/load.php?mode=articles&only=styles&articles=u:dev:MediaWiki:DiscussionsPollEmbed.css');
  document.getElementsByTagName('head')[0].appendChild(styles);

  window.discussionsPollEmbedLoaded = true;
})();