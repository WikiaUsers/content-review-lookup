/*Gadget that adds a shortcut for adding blogs under the Contribute menu*/
$(document).ready(function() { 
  $('.WikiHeader .buttons .contribute ul li').first().after('<li><a href = "/wiki/Special:CreateBlogPage">Add a Blog</a></li>'); 
});

/*Makes drop down menus slide down on click*/
$(document).ready(function() {
  $('.wikia-menu-button.drop').click(function() {
    $(this).toggle('.wikia-menu-button > ul.WikiaMenuElement').slideToggle();
  });
});