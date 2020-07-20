/*<source lang="javascript">*/
$(
  function ()
  {
    $('<a class="infoboxtoggle" href="#">+/-</a>').appendTo(
      $('.infobox tr.header').filter(function(){ return $(this).attr('class').split(" ").length > 1 }).find("th")
    );
    
    $(".infobox tr.header").each(function(){
      var $this = $(this);
      
      if( $this.hasClass("hidden") ){
        var firstclass = $this.attr("class").split(" ")[0];
        $this.siblings("." + firstclass).addClass("hidden");
      }
   });
    
    $('a.infoboxtoggle').click (
      function (infoboxtoggle)
      {
        var parent  = $(this).parent ();
        var grandparent  = parent.parent ();
        var firstclass  = grandparent.attr ('class').split(" ")[0];

        infoboxtoggle.preventDefault();
        grandparent.siblings ('.' + firstclass).has ('td').toggleClass ('hidden');
      }
    );
  }
);
/*</source>*/