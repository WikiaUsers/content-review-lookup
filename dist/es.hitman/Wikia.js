$(function () {
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

$(function () {
    $('<div style="infominiboxtogglediv"><a class="infominiboxtoggle" href="#"><span style="display:block";>V</span><span style="display:block";>e</span><span style="display:block";>r</span><span style="height:10px;display:block";> </span><span style="display:block";>F</span><span style="display:block";>i</span><span style="display:block";>c</span><span style="display:block";>h</span><span style="display:block";>a</span><span style="height:10px;display:block";> </span><span class="flecha" style="display:block";>»</span></div>').appendTo(
      $('.infominibox tr.encabezado').filter(function(){ return $(this).attr('class').split(" ").length > 1 }).find("th.here")
    );
 
    $(".infominibox tr.encabezado").each(function(){
      var $this = $(this);
 
      if( $this.hasClass("oculto") ){
        var firstclass = $this.attr("class").split(" ")[0];
        $this.siblings("." + firstclass).addClass("oculto");
      }
   });
 
    $('a.infominiboxtoggle').click (
      function (infominiboxtoggle)
      {
        var parent  = $(this).parent ();
        var grandparent  = parent.parent ();
        var firstclass  = grandparent.attr ('class').split(" ")[0];
 
        infominiboxtoggle.preventDefault();
        grandparent.siblings ('.' + firstclass).has ('td').toggleClass ('oculto');
      }
    );
  }
);

$('.thumb').append('<div class="plantilla-cinta-cinta" id="plantilla-cinta-cinta"></div>');

$(function () {$('.wikia-gallery span:first-child').before('<div class="wikia-gallery-white" id="wikia-gallery-white"></div>'); } );