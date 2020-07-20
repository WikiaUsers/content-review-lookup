if(mw.config.get("wgCanonicalNamespace") == "") {
    setInterval(function() {
        var commentDate, year, month, date, oldDate, currentDate, diffMilliseconds, comment;
	    for (var i = 0; i < $('#article-comments-ul li.SpeechBubble').length; i++) {
	        comment = $($('#article-comments-ul li.SpeechBubble')[i]);
	        if (comment.find('.permalink').attr('href')) {
	    	    if (comment.next().hasClass("sub-comments")) {
	    		    commentDate = comment.next().children().last().find('.permalink').attr('href').match    (/\d{8}(?=\d{6}\?)/)[0];
	    		    year = +commentDate.substring(0, 4);
	    		    month = +commentDate.substring(4, 6) - 1;
	    		    date = +commentDate.substring(6);
	    		    oldDate = new Date(year, month, date);
	    		    currentDate = new Date();
	    		    diffMilliseconds = currentDate.getTime() - oldDate.getTime();
	    		    if (diffMilliseconds > (6*30*24*60*60*1000)) {
	    		    	comment.find('.article-comm-reply').remove();
	    		    }
	    	    } else {
	    	    	commentDate = comment.find('.permalink').attr('href').match(/\d{8}(?=\d{6}\?)/)[0];
	    	    	year = +commentDate.substring(0, 4);
	    	    	month = +commentDate.substring(4, 6) - 1;
	    	    	date = +commentDate.substring(6);
	    	    	oldDate = new Date(year, month, date);
	    	    	currentDate = new Date();
	    	    	diffMilliseconds = currentDate.getTime() - oldDate.getTime();
	    	    	if (diffMilliseconds > (6*30*24*60*60*1000)) {
	    	    		comment.find('.article-comm-reply').remove();
	    	    	}
	        	}
	        } else {
	    	    continue;
	        }
        }
    }, 700);
}