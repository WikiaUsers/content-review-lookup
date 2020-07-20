//<syntaxhighlight lang="jQuery">
$(function() {
    var RedirectsHidden = false
	$('div.namespaceoptions').append('<div style="text-align: right;"><a href="#">Hide redirects</a></div>');
	$("div.namespaceoptions div a").click(function() {
            if (RedirectsHidden === false) {
		$('.allpagesredirect').css('display', 'none');
                $(this).html("Show redirects");
                RedirectsHidden = true
            } else {
		$('.allpagesredirect').css('display', '');
                $(this).html("Hide redirects");
                RedirectsHidden = false
            }
	});
});
//</syntaxhighlight>