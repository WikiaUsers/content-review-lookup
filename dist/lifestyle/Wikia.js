$(function() {
	if (wgCanonicalNamespace == 'Top_10_list') {   
		var replaceParagraph = $('#WikiaArticle #mw-content-text > p');
		var replaceParagraphContent = $('#WikiaArticle #mw-content-text > p').html();
		if(replaceParagraphContent == "Vote on more Community Choice Awards here!") {
			var replaceText = '<a href="http://www.wikia.com/Lifestyle"; title="Vote on more Community Choice Awards here!"><img src="https://images.wikia.nocookie.net/wikiaglobal/images/7/78/Wikia_Community_Choice_awards.jpeg" alt="Vote on more Community Choice Awards here!" /></a>';
			replaceParagraph.html(replaceText);
		}
	}
});