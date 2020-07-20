$(document).ready(function(){ 
  $( "h2" ).each(function( index ) 
                 { if($( this ).text()=="Stragegy"){
                   $(".categories").append('<li class="category normal" data-name="Maps with strategy" data-namespace data-outertag data-sortkey data-type="normal"><span class="name"><a href="/wiki/Category:Maps with strategy</a></span></li>');
                 } 
         }); 
});