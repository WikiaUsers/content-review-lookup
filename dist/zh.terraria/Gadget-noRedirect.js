$(function() {
	$("a").click(function(event) { 
		h = $(event.target).attr("href");
		if (h.indexOf("#") != -1){
			return;
		}  
		if($(event.target).hasClass("external")){
			return;
		}
		if (h.indexOf("?")==-1){
			h+="?redirect=no";
		}  
		else{
			h+= "&redirect=no";
		}
		$(event.target).attr("href", h);
		location.href = h;
	});
});