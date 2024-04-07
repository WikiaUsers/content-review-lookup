/* "Did you know?" section of main page */

this.randomtip = function(){
	var length = $("#tips li").length;
	var ran = Math.floor(Math.random()*length) + 1;
	$("#tips li:nth-child(" + ran + ")").show();
};
 
$(document).ready(function(){	
	randomtip();
});