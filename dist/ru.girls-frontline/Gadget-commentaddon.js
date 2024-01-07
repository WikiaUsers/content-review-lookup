RLQ.push(['jquery', function () {
  $(document).ready(function() {
  	var faqAddon = $('<div></div>');
  	faqAddon.html('<ul><li>Comments that do not abide by our new <a href="'+document.location.origin+'/wiki/Guideline_Comments">Comments Guidelines</a> will be deleted. Also consult our <a href="'+document.location.origin+'/wiki/Frequently Asked Questions">FAQ</a>.</li><li>For direct communication and assistance, please visit our <a href="https://discord.gg/GbyJQBp" class="external text" rel="nofollow">Discord Server</a>.</li></ul>');
  	faqAddon.addClass('comments-guideline');
  	$('#flowthread .comment-replybox').prepend(faqAddon);
  });
}]);