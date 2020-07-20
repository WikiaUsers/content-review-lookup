function enModule(){
	if($(".page-Wiki_Harry_Potter").length==0){
		$("#WikiaRail").append($(".en-module"));
		$(".en-module").show();
		$(".en-module:hidden").remove();
	}else{
		$(".en-module").show();
	}
}