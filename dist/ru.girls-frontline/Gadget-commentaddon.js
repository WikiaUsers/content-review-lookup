RLQ.push(['jquery', function () {
  $(document).ready(function() {
  	var faqAddon = $('<div></div>');
  	faqAddon.html('Before commenting:<ul><li>Read and abide by the <a href="'+document.location.origin+'/wiki/Guideline_Comments">Comments Guidelines</a> and <a href="'+document.location.origin+'/wiki/Frequently Asked Questions">FAQ</a>.</li><li>Questions already answered unambiguously in the article will be deleted.</li><li>Everyone can update articles, even without an account. Read the <a href="'+document.location.origin+'/wiki/IOP_Wiki:Guideline">quickstart guide</a> and be bold.</li></ul>For direct communication and assistance, please visit our <a href="https://discord.gg/GbyJQBp" class="external text" rel="nofollow">Discord Server</a>.');
  	faqAddon.addClass('comments-guideline');
  	$('#flowthread .comment-replybox').prepend(faqAddon);
  });
}]);