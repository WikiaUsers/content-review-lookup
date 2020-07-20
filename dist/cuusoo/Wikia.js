/*Credit to ShermanTheMythran, modified by Codyn329 - Moves infobox to the Wikia Rail*/
$(document).ready(function(){
$('table#infobox').wrap('<section class="module" style = "border:none; padding:0 15px 0;"/>').parent().insertBefore( $('section.WikiaActivityModule.module') );
});

/*Credit to Codyn329 - Gadget that adds a shortcut for adding blogs under the Contribute menu*/
$(document).ready(function() { 
  $('.WikiHeader .buttons .contribute ul li').first().after('<li><a href = "/wiki/Special:CreateBlogPage">Add a Blog</a></li>'); 
});