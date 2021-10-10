/* Any JavaScript here will be loaded for all users on every page load. */

// Home Navigation Animation
$(".HomeNav-Button").hover(function(){
		var id=this.id;
		$("#"+id+"> .HomeNav-Button-Image img").css({"transform":"scale(1.2)","opacity":"1"});
	},function(){
		var id=this.id;
		$("#"+id+"> .HomeNav-Button-Image img").css({"transform":"scale(1)","opacity":"0.8"});
	});