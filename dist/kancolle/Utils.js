(function($){
    "use strict";
    console.log("KanColle Wiki JS Utils 001");
    
    window.pullCommentUpwards = function(comm_id){
    	$("#comm-"+comm_id).next().prependTo("#article-comments-ul");
    	$("#comm-"+comm_id).prependTo("#article-comments-ul");
    }
    
}(jQuery));