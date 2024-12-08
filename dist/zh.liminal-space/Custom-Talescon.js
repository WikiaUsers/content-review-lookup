mw.hook("wikipage.content").add(function () {
	if (!["view", "edit", "submit"].includes(config.wgAction)) return;
	if (window.TalesconJS) return;
	window.TalesconJS = true;
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
});