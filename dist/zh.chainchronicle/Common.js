/* 此处的JavaScript将加载于所有用户每一个页面。 */
//Onload functions
$(function showDaily(){
	if ($("#daily")[0]){
		var d=new Date();
		var day=d.getUTCDay();
		var h=d.getUTCHours()+9;
		if (h>23){
			h-=24;
			day++;
			if (day==7) day=0;
		}
		if (day>=1 && day<=5){
			$("[id^='daily-']").hide();
			$("#daily-"+day).show();
		}else{
			$("[id^='daily-']").hide();
			$("#daily-0").show();
		}
	}
});