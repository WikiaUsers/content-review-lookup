/* Any JavaScript here will be loaded for all users on every page load. */
//Onload functions
$(function(){
	showDaily();
});

function showDaily(){
	if ($("#daily")[0]){
		var d=new Date();
		var day=d.getUTCDay();
		var h=d.getUTCHours()+9;
		if (h>23){
			h-=24;
			day++;
			if (day==7) day=0;
		}
		if (day>=0 && day<=6){
			$("[id^='daily-']").hide();
			$("#daily-"+day).show();
		}else{
			$("#daily").hide().after("<div>周末沒有限定秘境。</div>");
		}
	}
}