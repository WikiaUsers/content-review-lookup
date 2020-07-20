(function($, ArticleComments){
	"use strict";
	console.log("Comment Warning v010");
	if(ArticleComments){
		var realFunc = ArticleComments.init;
		ArticleComments.init= function () {
			var result = realFunc.apply(this, arguments);
			$(".kcCommentWarning").prependTo("#article-comments");
			$(".kcCommentWarning").show();
			return result;
		};
	}
}(jQuery, window.ArticleComments));