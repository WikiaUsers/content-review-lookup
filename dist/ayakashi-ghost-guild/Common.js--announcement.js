/* Any JavaScript here will be loaded for all users on every page load. */

if ( wgPageName == '"Ayakashi_Anniversary_Tower"' ) {
	var commentChecker = setInterval(function(){checkIfComments()},2000);
        
	function checkIfComments() {
		if ( !($("#WikiaArticleComments").hasClass("loading")) ) {  
		       $('#article-comments-counter-header').text("Comments near the end of this event about the next event will be deleted and if they persist, the comment sections will be closed for an indefinite amount of time.");
		}
	}
}

if ( wgPageName == '"Shrine_of_Seven_Days"' ) {
	var commentChecker = setInterval(function(){checkIfComments()},2000);
         
	function checkIfComments() {
		if ( !($("#WikiaArticleComments").hasClass("loading")) ) {
		       $('#article-comments-counter-header').text("Announcement: Any Guild Recruitment, Leak rants or any unnecessary comments will be deleted.");
		}
	}
}