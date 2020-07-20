/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready(function(){
	if($(".sc_vote").length>0){
		var sc_total = $(".sc_vote").length;
		var sc_votes = {};
		$(".sc_vote").each(function(){
			if(typeof sc_votes[$(this).attr("data-value")] == "undefined"){
				sc_votes[$(this).attr("data-value")] = 0;
			}
			sc_votes[$(this).attr("data-value")]+=1;
		});
		$(".sc_tally").each(function(){
			var sc_tally_percent;
			if(typeof sc_votes[$(this).attr("data-value")] == "undefined"){
				sc_tally_percent = 0;
			}else{
				sc_tally_percent = (sc_votes[$(this).attr("data-value")] / sc_total)*100;
			}
			$(".sc_tally_bar", this).css("width", sc_tally_percent+"%");
			$(".sc_tally_val", this).text(Math.round(sc_tally_percent)+"%");
		});
	}
});