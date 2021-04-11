(function () {
    if (window.AjaxPollLoaded) return;
    window.AjaxPollLoaded = true;

    function importScript(page) {
        return $.ajax({
            url: mw.config.get("wgLoadScript"),
            data: {
              mode: "articles",
              only: "scripts",
              articles: "u:dev:MediaWiki:" + page,
            },
        }).then(function (content) {
            $("head").append($("<script>").html(content));
        });
    }

    var isAnon = mw.config.get("wgUserId") === null;
    var getMsg = null;

    var AjaxPoll = {
        init: function ($content) {
            importScript("I18n-js/code.js")
                .then(function() {
                    return window.dev.i18n.loadMessages("AjaxPoll");
                })
                .then(function(i18n) {
                    getMsg = i18n.msg;
                    $content.find(".d-poll").each(AjaxPoll.load);
                });
        },

        load: function () {
            var threadId = this.dataset.id;

            if (!threadId) return;

            $.getJSON(mw.util.wikiScript("wikia"), {
                controller: "DiscussionThread",
                method: "getThread",
                format: "json",
                threadId: threadId
            })
                .then(function (data) {
                    return data.funnel === "POLL"
                        ? $.extend(data.poll, { created: data.creationDate.epochSecond * 1000 })
                        : $.Deferred().reject(getMsg("error").plain());
                })
                .then($.proxy(AjaxPoll.create, this))
                .fail($.proxy(AjaxPoll.error, this));
        },

        create: function (poll) {
            $(this).empty();

            var $poll = $("<form>", {
                action: mw.util.wikiScript("wikia") + "?controller=DiscussionPoll&method=castVote",
                submit: $.proxy(AjaxPoll.submit, this),
                appendTo: this,
            });

            $("<input>", {
                type: "hidden",
                name: "pollId",
                value: poll.id,
                appendTo: $poll,
            });

            $("<div>", {
                class: "d-poll__question",
                text: poll.question,
                appendTo: $poll,
            });

            $(poll.answers).each(function () {
                var percent = this.votes / poll.totalVotes * 100;
                percent = isNaN(percent) ? "0%" : percent.toFixed(2) + "%";
                var $radio = $("<input>", {
                    type: "radio",
                    name: "answerIds",
                    value: this.id,
                });
                var $label = $("<label>", {
                    class: "d-poll__answerName",
                    text: this.text,
                    prepend: isAnon ? null : $radio,
                });
                var $vote = $("<div>", {
                    class: "d-poll__answerVotes",
                    text: this.votes,
                    title: percent,
                    hover: function () {
                        var text = this.textContent;
                        this.textContent = this.title;
                        this.title = text;
                    }
                });
                var $bar = $("<div>", {
                    class: "d-poll__answerBar",
                    append: $("<div>").width(percent),
                });
                $("<div>", {
                    class: "d-poll__answer",
                    append: [$label, $vote, $bar],
                    appendTo: $poll,
                });
            });

            $("<div>", {
                class: "d-poll__info",
                text: getMsg("info").plain()
                    .replace("$1", new Date(poll.created).toLocaleTimeString())
                    .replace("$2", new Date(poll.created).toLocaleDateString())
                    .replace("$3", poll.totalVotes),
                appendTo: $poll,
            });

            $("<input>", {
                type: "submit",
                name: "submit",
                value: getMsg("vote").plain(),
                appendTo: isAnon ? null : $poll,
            });
        },

        error: function (message) {
            $(this).text(message).css("color", "red");
        },

        submit: function (e) {
            e.preventDefault();

            var form = e.target;
            var elems = form.elements;

            if(!elems.answerIds.value) return;

            elems.submit.value = getMsg("submitting").plain();
            elems.submit.disabled = true;

            $.ajax({
                url: form.action,
                type: "POST",
                data: new FormData(form),
                processData: false,
                contentType: false,
            }).then($.proxy(AjaxPoll.load, this));
        },
    };

    mw.loader.using("mediawiki.util").then(function() {
        mw.hook("wikipage.content").add(AjaxPoll.init);
    });
})();