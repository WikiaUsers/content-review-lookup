// 投票偏移量
(function () {
    if (typeof jQuery === 'undefined') return;
    var $ = jQuery;
    var _getJSON = $.getJSON;
    function num(x) {
        if (x === null || x === undefined) return 0;
        var s = String(x).replace(/,/g, '').trim();
        if (s === '') return 0;
        var n = parseFloat(s);
        return isNaN(n) ? 0 : n;
    }
    function collectOffsetsForThread(threadId) {
        var offsets = [];
        var totalOffset = 0;
        $('tr[data-vote-id="' + threadId + '"]').each(function () {
            var $tr = $(this);
            var $table = $tr.closest('table');
            if ($table.hasClass('talescon-table')) {
                var ch = this.children;
                var o0 = num(ch[2] && ch[2].textContent);
                var o1 = num(ch[3] && ch[3].textContent);
                var o2 = num(ch[4] && ch[4].textContent);
                offsets[0] = (offsets[0] || 0) + o0;
                offsets[1] = (offsets[1] || 0) + o1;
                offsets[2] = (offsets[2] || 0) + o2;
                totalOffset += (o0 + o1 + o2);
            } else if ($table.hasClass('themedcon4-table')) {
                var cells = this.children;
                for (var i = 0; i <= 4; i++) {
                    var idx = 3 + i;
                    var o = num(cells[idx] && cells[idx].textContent);
                    offsets[i] = (offsets[i] || 0) + o;
                    totalOffset += o;
                }
            } else {
                var i = 0;
                while ($tr.attr('data-offset-' + i) !== undefined) {
                    var o = num($tr.attr('data-offset-' + i));
                    offsets[i] = (offsets[i] || 0) + o;
                    totalOffset += o;
                    i++;
                }
            }
        });
        return { offsets: offsets, totalOffset: totalOffset };
    }
    $.getJSON = function () {
        var args = Array.prototype.slice.call(arguments);
        var dataArg = null;
        if (args.length >= 2 && typeof args[1] === 'object') {
            dataArg = args[1];
        } else if (args.length === 1 && typeof args[0] === 'object') {
            dataArg = args[0];
        }
        var jq = _getJSON.apply($, args);
        try {
            if (dataArg && dataArg.controller === 'DiscussionThread' && dataArg.method === 'getThread' && dataArg.threadId) {
                jq.done(function (result) {
                    try {
                        if (!result || !result.poll || !Array.isArray(result.poll.answers)) return;
                        var threadId = String(dataArg.threadId);
                        var collected = collectOffsetsForThread(threadId);
                        var offsets = collected.offsets || [];
                        var totalOffset = collected.totalOffset || 0;
                        var sumAdded = 0;
                        for (var i = 0; i < result.poll.answers.length; i++) {
                            var add = num(offsets[i]);
                            if (add) {
                                result.poll.answers[i].votes = (num(result.poll.answers[i].votes) + add);
                                sumAdded += add;
                            }
                        }
                        if (sumAdded) {
                            result.poll.totalVotes = num(result.poll.totalVotes) + sumAdded;
                        }
                    } catch (e) {
                        console.error('vote-offset-interceptor inner error', e);
                    }
                });
            }
        } catch (e) {
            console.error('vote-offset-interceptor attach error', e);
        }
        return jq;
    };
})();

//竞赛投票相关
var config = config || mw.config.get();

mw.hook("wikipage.content").add(function () {
	if (!["view", "edit", "submit"].includes(config.wgAction)) return;
	if (window.NervieJS) return;
	window.NervieJS = true;
	mw.loader.load("mediawiki.util");
	
	$(".talescon-table tbody tr").each(function() {
		var thisElement = this;
		$.getJSON(mw.util.wikiScript("wikia"), {
            controller: "DiscussionThread",
            method: "getThread",
            format: "json",
            threadId: this.getAttribute("data-vote-id")
        }).done(function(result) {
        	thisElement.children[2].textContent = result.poll.answers[0].votes;
        	thisElement.children[3].textContent = result.poll.answers[1].votes;
        	thisElement.children[4].textContent = result.poll.answers[2].votes;
        	thisElement.children[5].textContent = ((result.poll.answers[0].votes - result.poll.answers[2].votes) / result.poll.totalVotes).toFixed(4);
        });
	});
	
	$(".themedcon4-table tbody tr").each(function() {
		var cells = this.children;
		$.getJSON(mw.util.wikiScript("wikia"), {
            controller: "DiscussionThread",
            method: "getThread",
            format: "json",
            threadId: this.getAttribute("data-vote-id")
        }).done(function(result) {
        	cells[3].textContent = result.poll.answers[0].votes;
        	cells[4].textContent = result.poll.answers[1].votes;
        	cells[5].textContent = result.poll.answers[2].votes;
        	cells[6].textContent = result.poll.answers[3].votes;
        	cells[7].textContent = result.poll.answers[4].votes;
        	cells[8].textContent = (
        		(result.poll.answers[0].votes
        		+ result.poll.answers[1].votes / 2
        		- result.poll.answers[3].votes / 2
        		- result.poll.answers[4].votes) / result.poll.totalVotes
        	).toFixed(4);
        });
	});
	
    $.getJSON(mw.util.wikiScript("index"), {
        title: "User:HyperNervie/竞赛2.json",
        action: "raw",
        ctype: "application/json"
    }).done(function (result, status) {
        if (status != "success" || typeof (result) != "object") return;
        var entries_loaded = 0;
        mw.hook("pollLoader.loaded").add(function() {
            if (++entries_loaded < result.length) return;
            result.sort(function (a, b) { return b.rating - a.rating; });
            $("table.contest-results tbody").empty();
            result.forEach(function (entry, place) {
                $("table.contest-results tbody").append(
                    "<tr>" +
                        "<td>" + (place + 1) + "</td>" +
                        "<td>" +
                            '<a href="' + mw.util.getUrl(entry.name) + '" ' +
                                'title="' + entry.name + '">' +
                                (entry.title || entry.name) +
                            "</a>" +
                        "</td>" +
                        "<td>" +
                            '<a href="' + mw.util.getUrl("User:" + entry.author) + '" ' +
                                'title="User:' + entry.author + '">' +
                                entry.author +
                            "</a>" +
                        "</td>" +
                        "<td>" + entry.upvote + "</td>" +
                        "<td>" + entry.novote + "</td>" +
                        "<td>" + entry.downvote + "</td>" +
                        "<td>" + entry.rating.toFixed(4) + "</td>" +
                    "</tr>"
                );
            });
            $("table.contest-results").makeCollapsible();
        });
        result.forEach(function (entry) {
            $.getJSON(mw.util.wikiScript("wikia"), {
                controller: "DiscussionThread",
                method: "getThread",
                format: "json",
                threadId: entry.poll_id
            }).done(function (result, status) {
                if (status != "success" || typeof (result) != "object") return;
                entry.upvote = result.poll.answers[0].votes;
                entry.novote = result.poll.answers[1].votes;
                entry.downvote = result.poll.answers[2].votes;
                entry.rating = (entry.upvote - entry.downvote) / result.poll.totalVotes;
                mw.hook("pollLoader.loaded").fire();
            });
        });
	});
	
	$.getJSON(mw.util.wikiScript("api"), {
		action: "query",
		formatversion: 2,
		format: "json",
		meta: "siteinfo",
		siprop: "interwikimap",
		siinlanguagecode: config.wgUserVariant
	}, function (result, status) {
		if (status != "success" || typeof (result) != "object" || !result.batchcomplete) return;
		$("table.global-interwiki tbody").empty();
		$("table.local-interwiki tbody").empty();
		$("table.interlang tbody").empty();
		result.query.interwikimap.forEach(function (obj) {
			if (!obj.local)
				$("table.global-interwiki tbody").append(
					"<tr>" +
						"<td>" + obj.prefix.toLowerCase() + "</td>" +
						"<td>" + obj.url + "</td>" +
					"</tr>"
				);
			else if (obj.language)
				$("table.interlang tbody").append(
					"<tr>" +
						"<td>" + obj.prefix + "</td>" +
						"<td>" + obj.language + "</td>" +
						"<td>" + obj.url + "</td>" +
					"</tr>"
				);
			else
				$("table.local-interwiki tbody").append(
					"<tr>" +
						"<td>" + obj.prefix.toLowerCase() + "</td>" +
						"<td>" + obj.url + "</td>" +
					"</tr>"
				);
		});
		$("table.global-interwiki").makeCollapsible();
		$("table.local-interwiki").makeCollapsible();
		$("table.interlang").makeCollapsible();
	});
})();