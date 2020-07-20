$(document).ready(function() {

/* Eggs page- 1# Nesting Tabs */
   var breed = "unbreedable";
   var name = "exclusive_hybrid";
   var elem = [ "terra", "flame", "sea", "nature", "electric", "ice", "metal", "dark", "light", "war" ];

   $.each(elem, function( i, val ) {

      $("td#h-" + name + "-" + val).each(function(index) {
        $(this).parent().addClass( "ttab-header ttab-content " + name + "-" + val + " content-" + index )
        $(this).parent().next().addClass( "ttab-content " + name + "-" + val + " content-" + index )
        $(this).parent().next().next().addClass( "ttab-content " + name + "-" + val + " content-" + index )
        $(this).parent().next().next().next().addClass( "ttab-content " + name + "-" + val + " content-" + index )
        $(this).css( "padding", "0px" )
      }); 

      $("table#" + breed + "-" + name + " td#h-" + name + "-" + val).append("<table width='100%' height='10' cellspacing='0' cellpadding='0' id='" + breed + "-" + name + "-" + val + "' class='ttab-nav'><tr><td class='tab-" + name + "-" + val + " tab-0 active'></td></tr></table>")

      var countEggs = $('table#' + breed + '-' + name + ' tr.' + name + "-" + val).length;
   for ( var i = 1; i < countEggs / 4; i++ ) {
         $("table#" + breed + "-" + name + "-" + val + " tr").append("<td class='tab-" + name + "-" + val + " tab-" + i + "'></td>")
      }

      $(".tab-" + name + "-" + val + ".tab-0").click(function(){
         $("table#" + breed + "-" + name + "-" + val + " td").removeClass("active");
         $(".tab-" + name + "-" + val + ".tab-0").addClass("active");
         $("tr." + name + "-" + val).removeClass("active");
         $("tr." + name + "-" + val + ".content-0").addClass("active");
      });

      $(".tab-" + name + "-" + val + ".tab-1").click(function(){
         $("table#" + breed + "-" + name + "-" + val + " td").removeClass("active");
         $(".tab-" + name + "-" + val + ".tab-1").addClass("active");
         $("tr." + name + "-" + val).removeClass("active");
         $("tr." + name + "-" + val + ".content-1").addClass("active");
      });

      $(".tab-" + name + "-" + val + ".tab-2").click(function(){
         $("table#" + breed + "-" + name + "-" + val + " td").removeClass("active");
         $(".tab-" + name + "-" + val + ".tab-2").addClass("active");
         $("tr." + name + "-" + val).removeClass("active");
         $("tr." + name + "-" + val + ".content-2").addClass("active");
      });

      $(".tab-" + name + "-" + val + ".tab-3").click(function(){
         $("table#" + breed + "-" + name + "-" + val + " td").removeClass("active");
         $(".tab-" + name + "-" + val + ".tab-3").addClass("active");
         $("tr." + name + "-" + val).removeClass("active");
         $("tr." + name + "-" + val + ".content-3").addClass("active");
      });

      $(".tab-" + name + "-" + val + ".tab-4").click(function(){
         $("table#" + breed + "-" + name + "-" + val + " td").removeClass("active");
         $(".tab-" + name + "-" + val + ".tab-4").addClass("active");
         $("tr." + name + "-" + val).removeClass("active");
         $("tr." + name + "-" + val + ".content-4").addClass("active");
      });

      $(".tab-" + name + "-" + val + ".tab-5").click(function(){
         $("table#" + breed + "-" + name + "-" + val + " td").removeClass("active");
         $(".tab-" + name + "-" + val + ".tab-5").addClass("active");
         $("tr." + name + "-" + val).removeClass("active");
         $("tr." + name + "-" + val + ".content-5").addClass("active");
      });

      $(".tab-" + name + "-" + val + ".tab-6").click(function(){
         $("table#" + breed + "-" + name + "-" + val + " td").removeClass("active");
         $(".tab-" + name + "-" + val + ".tab-6").addClass("active");
         $("tr." + name + "-" + val).removeClass("active");
         $("tr." + name + "-" + val + ".content-6").addClass("active");
      });

      $(".tab-" + name + "-" + val + ".tab-7").click(function(){
         $("table#" + breed + "-" + name + "-" + val + " td").removeClass("active");
         $(".tab-" + name + "-" + val + ".tab-7").addClass("active");
         $("tr." + name + "-" + val).removeClass("active");
         $("tr." + name + "-" + val + ".content-7").addClass("active");
      });

      $(".tab-" + name + "-" + val + ".tab-8").click(function(){
         $("table#" + breed + "-" + name + "-" + val + " td").removeClass("active");
         $(".tab-" + name + "-" + val + ".tab-8").addClass("active");
         $("tr." + name + "-" + val).removeClass("active");
         $("tr." + name + "-" + val + ".content-8").addClass("active");
      });

      $(".tab-" + name + "-" + val + ".tab-9").click(function(){
         $("table#" + breed + "-" + name + "-" + val + " td").removeClass("active");
         $(".tab-" + name + "-" + val + ".tab-9").addClass("active");
         $("tr." + name + "-" + val).removeClass("active");
         $("tr." + name + "-" + val + ".content-9").addClass("active");
      });

   });

});