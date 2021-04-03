$(function(){
	if(mw.config.get("wgArticleId")==61264){
		var tmpPoll;
		var elePoll;
		$(".poll-table .pollAnswerVotes").hover(function(){
			elePoll = $(this).find(".poll-page-percent");
			tmpPoll = elePoll.text();
			elePoll.text(elePoll.attr("title"));
			elePoll.attr("title","").attr("poll-votes",tmpPoll);
		}, function(){
			tmpPoll = elePoll.text();
			elePoll.text(elePoll.attr("poll-votes"));
			elePoll.attr("title",tmpPoll).attr("poll-votes","");
		});
	}
});