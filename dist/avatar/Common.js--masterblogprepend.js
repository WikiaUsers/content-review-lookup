/* Any JavaScript here will be loaded for all users on every page load. */
/* Sticky mechanism */
function appendedblogs () {
  if ( mw.config.get('wgPageName') == "Blog:Avatar_News" ) {
    /* Stickied blogs */
    /* End blogs */
  }
}
$(appendedblogs);

function masterblog () {
  if ( mw.config.get('wgPageName') == "Blog:Avatar_News"  && $.inArray("sysop", mw.config.get('wgUserGroups')) != -1 ) {
    $("#WikiaMainContentContainer .read-more").after('<a href="javascript:void(0)" style="float:right" class="wikia-button stickyBlog"><img height="16" src="https://images.wikia.nocookie.net/avatar/images/4/46/128px-Padlock-silver.svg.png" width="20" style="margin-left:-5px"> Sticky blog</a>');
    $(".paginator-page,.paginator-next").click(function() {
      setTimeout(masterblog,2000);
    });
    $(".stickyBlog").click(function() {
      var blog = $(this).parent().parent().html();
      blog = blog.replace(/'/g,"\'");
      blog = "$('#WikiaArticle').append('<ul style=\"padding:0 10px; list-style:none outside none !important;\"><li class=\"WikiaBlogListingPost stickiedBlog\">" + blog + "<li><ul>\');";
      var edittoken = mw.user.tokens.get( 'editToken' );
      $.ajax({ 
        type: "POST",
        url: mw.util.wikiScript('api'),
        data: { action:'query', prop:'revisions', titles:'MediaWiki:Common.js/masterblogprepend.js', rvprop:'content' },
        success: function (data) {
          var zero = "123* Stickied blogs *123";
          zero = zero.replace(/123/g,"/");
          var one = "end *123";
          one = one.replace(/123/g,"/");
          var split = data.split("/* Stickied blogs */");
          var halfone = split[0].split("/* Any");
          var halftwo = split[2].split("end */");
          var content = "/* Any" + halfone[1] + blog + "\n" + zero + split[1] + zero + halftwo[0] + one + halftwo[1] + one;
          content = content.replace(/&amp;lt;/g,"<").replace(/&amp;quot;/g,'"').replace(/&amp;gt;/g,">").replace(/&amp;amp;/g,"&").replace(/="<a href/,"").replace(/">http:\/\/images.wikia.com\/avatar\/images\/4\/46\/128px-Padlock-silver.svg.png"<\/a>/,"");
          $.ajax({
            type: "POST",
            url: mw.util.wikiScript('api'),
            data: { action:'edit', title:'MediaWiki:Common.js/masterblogprepend.js', text: content, summary:'Adding stickied blog', token: edittoken },
          });
        }
      });
    });
  }
}
$(masterblog);
/* Script end */