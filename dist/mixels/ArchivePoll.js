/**
 * @name            ArchivePoll
 * @description     Add "Archive Poll" button to a poll and allow archiving poll
 * @author          KhangND
 */
(function(ArchivePoll) {
    var $polls = $('.ajax-poll'),
        isAnon = mw.config.get('wgUserName') === null;
 
    if(window.ArchivePollLoaded || !$polls.length || isAnon) {
        return; // exit code
    } window.ArchivePollLoaded = true;
 
    var i18n = {},
        config = $.extend({
            archive: 'Project:Archived Polls',
            preformat: true
        }, ArchivePoll);
 
    const
        tFormat = /\d{2}:\d{2}/g, // time format (hh:ss)
        dFormat = /\w+\s\d+,\s\d{4}/g, // date format (M d, y)
        QUESTION = '.header',
        ANSWER = '.pollAnswerName',
        VOTE = '.pollAnswerVotes > span',
        TOTAL = '.total';
 
    function init(i18nLoaded) {
        i18n = i18nLoaded._messages.en;
        for(var i in i18n)
            i18n[i] = i18nLoaded.msg(i).escape();
 
        $polls.find('[type=submit]').after($('<input>', {
            id: 'ArchivePoll',
            type: 'submit',
            value: i18n.button,
            click: retrieve
        }));
    }
 
    /**
     * @method      retrieve
     * @description Retrieve poll details from AjaxPoll
     * @return      {void}
     */
    function retrieve(e) {
        e.preventDefault();
        var thisPoll = $(this).parents('.ajax-poll'),
            answers = thisPoll.find(ANSWER),
            votes = thisPoll.find(VOTE),
            poll = {
                question: thisPoll.find(QUESTION).text().trim(),
                date: thisPoll.find(TOTAL).parent().text().trim().match(dFormat),
                time: thisPoll.find(TOTAL).parent().text().trim().match(tFormat),
                total: thisPoll.find(TOTAL).text(),
                vote: {}
            };
        for (var i = 0; i < answers.length; i++) {
        	var answer = $(answers[i]).text().trim(),
        	    num = $(votes[i]).text();
        	poll.vote[answer] = num;
        }
        poll = processPoll(poll);
        config.preformat ? popup(poll) : archive(poll);
    }
 
    /**
     * @method      archive
     * @description Save poll to archive page with API post request
     * @param       {String} poll
     * @return      {void}
     */
    function archive(poll, archive) {
        var btn = $('#btn-archive');
        if(btn.length) btn.attr('disabled', true);
 
        new mw.Api().post({
        	action: 'edit',
        	title: archive || config.archive,
            token: mw.user.tokens.get('editToken'),
            summary: config.summary || i18n.summary,
            appendtext: '\n' + poll
        }).done(function(res){
            if(btn.length) {
                btn.attr('disabled', false);
                btn.before($('<span>', {
                    text: res.error ? i18n.error : i18n.success
                }));
                setTimeout(function() {
                    btn.prev('span').remove();
                }, 1000);
            }
            else {
                var noti = res.error
                    ? new BannerNotification(i18n.error, 'error')
                    : new BannerNotification(i18n.success, 'confirm');
                noti.show();
            }
        });
    }
 
    /**
     * @method      popup
     * @description Display popup modal to preformat poll results
     * @param       {String} poll
     * @return      {void}
     */
    function popup(poll) {
        var editor = $('<textarea>', {
            val: poll,
            css: {
                resize: 'none',
                width: '100%',
                height: '250px',
                'box-sizing': 'border-box'
            }
        });
        var archivePage = $('<input>', {
            type: 'text',
            value: config.archive
        });
        var content = $('<div>', {
            append: [editor, i18n.archive + ': ', archivePage]
        });
        $.showCustomModal(i18n.archive, content, {
            width: 500,
            buttons: [{
                id: 'btn-archive',
                message: i18n.button,
                defaultButton: true,
                handler: function() {
                    archive(editor.val(), archivePage.val());
                }
            }]
        });
    }
 
    /**
     * @method      processPoll
     * @description Process poll results and return as a string
     * @param       {Object} poll
     * @return      {String}
     */
    function processPoll(poll) {
        var pttn = /\n.*\$answer.*/gm,
            answer = '',
            res = config.format
                ? config.format
                : '== $question =='
                + '\n* $answer: $vote'
                + '\n: ' + i18n.total + ': $total'
                + '\n: ' + i18n.created + ': $date - $time';
 
        for (var a in poll.vote) {
            answer += res.match(pttn);
            answer = answer
                .replace('$answer', a)
                .replace('$vote', poll.vote[a]);
        }
        res = res.split(pttn)[0] + answer + res.split(pttn)[1];
 
        return res  .replace('$question', poll.question)
                    .replace(/\$total/g, poll.total)
                    .replace('$date', poll.date)
                    .replace('$time', poll.time);
    }
 
    importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
    mw.hook('dev.i18n').add(function(i18n) {
        $.when(
            i18n.loadMessages('ArchivePoll'),
            mw.loader.using('mediawiki.api')
        ).then(init);
    });
})(window.ArchivePoll);

window.ArchivePoll = {
   archive: 'Mixels Wiki:Archived Polls',
   preformat: true,
   format:
   '== $question ==\
   \n* $answer: $vote\
   \n: Total: $total\
   \n: Created: $date - $time'
};