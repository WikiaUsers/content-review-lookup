/* http://kongregate.wikia.com/wiki/MediaWiki:Common.js */
/* http://kongregate.wikia.com/wiki/Category:Featured_article_templates
Use: 
<div id="FeaturedArticle">
Loading article...
</div>
*/

$(document).ready(function() {
  if($("div#FeaturedArticle").size()) { //Only run if there is a div with id="FeaturedArticle"
    //the first ajax calls gets the list of pages in Category:Featured_article_templates
    $.ajax({"dataType": "text","data": {"action": "query","format":"xml","disablepp":"1", "cmprop":"title", "list":"categorymembers", "cmtitle":"Category:Featured_article_templates"},"url": "/api.php", 
      "success": function(data) { 
        //a random page in this category is chosen
        var RandomFeaturedArticle = $("cm", $(data)[1])[Math.floor((Math.random()*$("cm", $(data)[1]).length))].title
        //the parsed template is retrieved through a second ajax request
        $.ajax({"dataType": "text","data": {"action": "parse","format":"xml","disablepp":"1", "prop":"text","text": "{{"+RandomFeaturedArticle+"}}"},"url": "/api.php",
          "success": function(data) {     
            //add the contents of the template to the div#FeaturedArticle
            $("div#FeaturedArticle").html($("text", $(data)[1]).text() ); 
          } 
        });
      }
    });
  }
});