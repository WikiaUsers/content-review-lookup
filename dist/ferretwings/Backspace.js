$(function() {
	/* Sometimes, for readablily while editing, a space is placed before a template call.
	  compare: phrase{{template returning "; next phrase"}} and phrase {{template returning "; next phrase"}}
	  This can cause unwanted spacing when the page is displayed.
	  If that template call is placed within a span with class "bksp", the previous space will be removed.

	  An example of usage: phrase <span class="bksp">{{template returning "; next phrase"}}</span>
	  A template could be used to handle the backspacing, e.g. phrase {{\b| {{template returning "; next phrase"}} }}
	  
	  Of course it would be much simpler to simply not use a space before the template call... */
	  
	$(".bksp").each(function(){
		$(this).before("₪");
		$(this).parent().html($(this).parent().html().replace(/.₪/,"") );
	});
});