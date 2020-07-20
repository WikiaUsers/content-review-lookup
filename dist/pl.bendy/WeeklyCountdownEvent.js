// by Q43492449 //
const wCP = document.getElementById('weeklyCountdownPlace');
if (wCP != null) {
	(function weeklyCountdown() {
		this.WCE_EventUTCHour = (typeof WCE_EventUTCHour === 'number') ? WCE_EventUTCHour : 12;
		this.WCE_prePostMessages = (typeof WCE_prePostMessages === 'object') ? WCE_prePostMessages : [['', ''], ['', '']];
		this.WCE_WeekDay = (typeof WCE_WeekDay === 'number') ? WCE_WeekDay : 1;
		var WCE_d = new Date();
		var WCE_Day = WCE_d.getDate();
		var WCE_DT = WCE_d.getDay(); if (WCE_DT==0) {WCE_DT=7;}
		var WCE_M = WCE_d.getMonth();
		var WCE_Month = WCE_month(WCE_M);
		var WCE_Year = WCE_d.getFullYear();
		var WCE_HourLocal = WCE_d.getHours();
		var WCE_HourUTC = WCE_d.getUTCHours();
		var WCE_Minute = WCE_d.getMinutes();
		var WCE_Second = WCE_d.getSeconds();
		var WCE_Diff = WCE_d.getTimezoneOffset() * 60000;
		var WCE_date = WCE_join(WCE_Day, WCE_Month, WCE_Year, WCE_HourLocal, WCE_Minute, WCE_Second);
		var WCE_now = new Date(WCE_date).getTime() + WCE_Diff;
		var WCE_cdd, WCE_CDD, WCE_fullTimeLeft, WCE_dLeft, WCE_hLeft, WCE_mLeft, WCE_sLeft;
	 
		if (WCE_DT==WCE_WeekDay&&WCE_HourUTC<WCE_EventUTCHour) {
			WCE_cdd = WCE_join(WCE_Day, WCE_Month, WCE_Year, WCE_EventUTCHour, 0, 0);
			WCE_CDD = new Date(WCE_cdd).getTime();
			WCE_fullTimeLeft = WCE_CDD-WCE_now;
			WCE_dLeft = Math.floor(WCE_fullTimeLeft / 86400000);if (WCE_dLeft==0) {WCE_dLeft=""} else {WCE_dLeft+="d "}
			WCE_hLeft = Math.floor((WCE_fullTimeLeft % 86400000) / 3600000);if (WCE_hLeft==0) {WCE_hLeft=" "} else {WCE_hLeft+="h "}
			WCE_mLeft = Math.floor((WCE_fullTimeLeft % 3600000) / 60000);if (WCE_mLeft==0) {WCE_mLeft=" "} else {WCE_mLeft+="m "}
			WCE_sLeft = Math.floor((WCE_fullTimeLeft % 60000) / 1000);if (WCE_sLeft==0) {WCE_sLeft=""} else {WCE_sLeft+="s "}
			wCP.innerHTML=WCE_prePostMessages[0][0]+WCE_dLeft+WCE_hLeft+WCE_mLeft+WCE_sLeft+WCE_prePostMessages[0][1];
		} else {
			WCE_nextWeek();WCE_Month=WCE_month(WCE_M);
			WCE_cdd = WCE_join(WCE_Day, WCE_Month, WCE_Year, WCE_EventUTCHour, 0, 0);
			WCE_CDD = new Date(WCE_cdd).getTime();
			WCE_fullTimeLeft = WCE_CDD-WCE_now;
			WCE_dLeft = Math.floor(WCE_fullTimeLeft / 86400000);if (WCE_dLeft==0) {WCE_dLeft=""} else {WCE_dLeft+="d "}
			WCE_hLeft = Math.floor((WCE_fullTimeLeft % 86400000) / 3600000);if (WCE_hLeft==0) {WCE_hLeft=" "} else {WCE_hLeft+="h "}
			WCE_mLeft = Math.floor((WCE_fullTimeLeft % 3600000) / 60000);if (WCE_mLeft==0) {WCE_mLeft=" "} else {WCE_mLeft+="m "}
			WCE_sLeft = Math.floor((WCE_fullTimeLeft % 60000) / 1000);if (WCE_sLeft==0) {WCE_sLeft=""} else {WCE_sLeft+="s "}
			if (WCE_HourUTC==WCE_EventUTCHour) {wCP.innerHTML=WCE_prePostMessages[1][0]+WCE_dLeft+WCE_hLeft+WCE_mLeft+WCE_sLeft+WCE_prePostMessages[1][1];} else {wCP.innerHTML=WCE_prePostMessages[0][0]+WCE_dLeft+WCE_hLeft+WCE_mLeft+WCE_sLeft+WCE_prePostMessages[0][1];}
		}
	 
		function WCE_join(WCE_D, WCE_M, WCE_Y, WCE_H, WCE_MI, WCE_S) {return WCE_M+' '+WCE_D+', '+WCE_Y+' '+WCE_H+':'+WCE_MI+':'+WCE_S;}
	 
		function WCE_month() {
			switch (WCE_M) {
				case 0:return "January";break;
				case 1:return "February";break;
				case 2:return "March";break;
				case 3:return "April";break;
				case 4:return "May";break;
				case 5:return "June";break;
				case 6:return "July";break;
				case 7:return "August";break;
				case 8:return "September";break;
				case 9:return "October";break;
				case 10:return "November";break;
				case 11:return "December";
			}
		}
	 
		function WCE_nextWeek() {
			var DaysDiff = 7+WCE_WeekDay;
			if (WCE_M==0&&WCE_Day>=25) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(31-WCE_Day);}
			else if ((WCE_Year%4)==0&&WCE_M==1&&WCE_Day>=23) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(29-WCE_Day);}
			else if ((WCE_Year%4)!==0&&WCE_M==1&&WCE_Day>=22) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(28-WCE_Day);}
			else if (WCE_M==2&&WCE_Day>=25) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(31-WCE_Day);}
			else if (WCE_M==3&&WCE_Day>=24) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(30-WCE_Day);}
			else if (WCE_M==4&&WCE_Day>=25) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(31-WCE_Day);}
			else if (WCE_M==5&&WCE_Day>=24) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(30-WCE_Day);}
			else if (WCE_M==6&&WCE_Day>=25) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(31-WCE_Day);}
			else if (WCE_M==7&&WCE_Day>=25) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(31-WCE_Day);}
			else if (WCE_M==8&&WCE_Day>=24) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(30-WCE_Day);}
			else if (WCE_M==9&&WCE_Day>=25) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(31-WCE_Day);}
			else if (WCE_M==10&&WCE_Day>=24) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(30-WCE_Day);}
			else if (WCE_M==11&&WCE_Day>=25) {WCE_M++;WCE_Day=DaysDiff-WCE_DT-(31-WCE_Day);WCE_Year++;}
			else {WCE_Day=WCE_Day+(DaysDiff-WCE_DT);}
		}
		setInterval(weeklyCountdown, 1000);
	}())
}
//* *//