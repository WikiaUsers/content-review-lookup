/* Any JavaScript here will be loaded for all users on every page load. */
if (mwCustomEditButtons) {

/*** wrappers *****/

   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images1.wikia.nocookie.net/central/images/c/c8/Button_redirect.png?1",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": ""};
 
   mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "http://images1.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
     "speedTip": "request delete",
     "tagOpen": "\{\{delete|",
     "tagClose": "\}\}",
     "sampleText": "your reason here"};
}



/* Following JavaScript will control the image slider on the homepage */

<script type="text/javascript" src="js/jquery-1.2.6.min.js"></script>
<script type="text/javascript" src="js/jquery-easing-1.3.pack.js"></script>
<script type="text/javascript" src="js/jquery-easing-compatibility.1.2.pack.js"></script>
<script type="text/javascript" src="js/coda-slider.1.1.1.pack.js"></script>
	
<script type="text/javascript">
	$(function(){
			
		$("#main-photo-slider").codaSlider();

	});
</script>


var theInt = null;
var $crosslink, $navthumb;
var curclicked = 0;

theInterval = function(cur){
	clearInterval(theInt);
	
	if( typeof cur != 'undefined' )
		curclicked = cur;
	
	$crosslink.removeClass("active-thumb");
	$navthumb.eq(curclicked).parent().addClass("active-thumb");
		$(".stripNav ul li a").eq(curclicked).trigger('click');
	
	theInt = setInterval(function(){
		$crosslink.removeClass("active-thumb");
		$navthumb.eq(curclicked).parent().addClass("active-thumb");
		$(".stripNav ul li a").eq(curclicked).trigger('click');
		curclicked++;
		if( 6 == curclicked )
			curclicked = 0;
		
	}, 3000);
};


$(function(){
	
	$("#main-photo-slider").codaSlider();
	
	$navthumb = $(".nav-thumb");
	$crosslink = $(".cross-link");
	
	$navthumb
	.click(function() {
		var $this = $(this);
		theInterval($this.parent().attr('href').slice(1) - 1);
		return false;
	});
	
	theInterval();
});



var $j = jQuery.noConflict();

var theInt = null;
var curclicked = 0;
var stop = 0;

theInterval = function(cur){
       clearInterval(theInt);

       theInt = setInterval(function(){
               $j(".coda-nav-right a").eq(curclicked).trigger('click');
               curclicked++;
               if( 10 == curclicked )
                       curclicked = 0;
               $j("#stop").click(
                       function(){
                               if (stop==0){
                               clearInterval(theInt);
                               stop=1;}
                       });
       }, 750);
       $j("#stop").click(
               function(){
                       stop=0;
                       theInterval();
               }
       );
};
$j(function(){
       $j("#main-photo-slider").prepend('<div id="stop">Start/Stop</div>');
       $j("#main-photo-slider").codaSlider();
       theInterval();
});