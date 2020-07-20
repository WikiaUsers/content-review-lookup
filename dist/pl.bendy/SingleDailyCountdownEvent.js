// by Q43492449 //
const sDCP = document.getElementById('singleDailyCountdownPlace');
if (sDCP != null) {
	(function singleDailyCountdown() {
		this.SDCE_EventUTCHour = (typeof SDCE_EventUTCHour === 'number') ? SDCE_EventUTCHour : 12;
		this.SDCE_prePostMessages = (typeof SDCE_prePostMessages === 'object') ? SDCE_prePostMessages : [['', ''], ['', '']];
		var SDCE_d = new Date();
		var SDCE_Day = SDCE_d.getDate();
		var SDCE_M = SDCE_d.getMonth();
		var SDCE_Month = SDCE_month(SDCE_M);
		var SDCE_Year = SDCE_d.getFullYear();
		var SDCE_HourLocal = SDCE_d.getHours();
		var SDCE_HourUTC = SDCE_d.getUTCHours();
		var SDCE_Minute = SDCE_d.getMinutes();
		var SDCE_Second = SDCE_d.getSeconds();
		var SDCE_Diff = SDCE_d.getTimezoneOffset() * 60000;
		var SDCE_date = SDCE_join(SDCE_Day, SDCE_Month, SDCE_Year, SDCE_HourLocal, SDCE_Minute, SDCE_Second);
		var SDCE_now = new Date(SDCE_date).getTime() + SDCE_Diff;
		var SDCE_cdd, SDCE_CDD, SDCE_fullTimeLeft, SDCE_dLeft, SDCE_hLeft, SDCE_mLeft, SDCE_sLeft;
	 
		if (SDCE_HourUTC<SDCE_EventUTCHour) {
			SDCE_cdd = SDCE_join(SDCE_Day, SDCE_Month, SDCE_Year, SDCE_EventUTCHour, 0, 0);
			SDCE_CDD = new Date(SDCE_cdd).getTime();
			SDCE_fullTimeLeft = SDCE_CDD-SDCE_now;
			SDCE_dLeft = Math.floor(SDCE_fullTimeLeft / 86400000);if (SDCE_dLeft==0) {SDCE_dLeft=''} else {SDCE_dLeft+='d '}
			SDCE_hLeft = Math.floor((SDCE_fullTimeLeft % 86400000) / 3600000);if (SDCE_hLeft==0) {SDCE_hLeft=' '} else {SDCE_hLeft+='h '}
			SDCE_mLeft = Math.floor((SDCE_fullTimeLeft % 3600000) / 60000);if (SDCE_mLeft==0) {SDCE_mLeft=' '} else {SDCE_mLeft+='m '}
			SDCE_sLeft = Math.floor((SDCE_fullTimeLeft % 60000) / 1000);if (SDCE_sLeft==0) {SDCE_sLeft=''} else {SDCE_sLeft+='s '}
			sDCP.innerHTML=SDCE_prePostMessages[0][0]+SDCE_dLeft+SDCE_hLeft+SDCE_mLeft+SDCE_sLeft+SDCE_prePostMessages[0][1];
		}
		else {
			SDCE_tomorrow();SDCE_Month=SDCE_month(SDCE_M);
			SDCE_cdd = SDCE_join(SDCE_Day, SDCE_Month, SDCE_Year, SDCE_EventUTCHour, 0, 0);
			SDCE_CDD = new Date(SDCE_cdd).getTime();
			SDCE_fullTimeLeft = SDCE_CDD-SDCE_now;
			SDCE_dLeft = Math.floor(SDCE_fullTimeLeft / 86400000);if (SDCE_dLeft==0) {SDCE_dLeft=''} else {SDCE_dLeft+='d '}
			SDCE_hLeft = Math.floor((SDCE_fullTimeLeft % 86400000) / 3600000);if (SDCE_hLeft==0) {SDCE_hLeft=' '} else {SDCE_hLeft+='h '}
			SDCE_mLeft = Math.floor((SDCE_fullTimeLeft % 3600000) / 60000);if (SDCE_mLeft==0) {SDCE_mLeft=' '} else {SDCE_mLeft+='m '}
			SDCE_sLeft = Math.floor((SDCE_fullTimeLeft % 60000) / 1000);if (SDCE_sLeft==0) {SDCE_sLeft=''} else {SDCE_sLeft+='s '}
			if (SDCE_HourUTC==SDCE_EventUTCHour) {sDCP.innerHTML=SDCE_prePostMessages[1][0]+SDCE_dLeft+SDCE_hLeft+SDCE_mLeft+SDCE_sLeft+SDCE_prePostMessages[1][1];}
			else {sDCP.innerHTML=SDCE_prePostMessages[0][0]+SDCE_dLeft+SDCE_hLeft+SDCE_mLeft+SDCE_sLeft+SDCE_prePostMessages[0][1];}
		}
	 
		function SDCE_join(SDCE_D, SDCE_M, SDCE_Y, SDCE_H, SDCE_MI, SDCE_S) {return SDCE_M+' '+SDCE_D+', '+SDCE_Y+' '+SDCE_H+':'+SDCE_MI+':'+SDCE_S;}
	 
		function SDCE_month() {
			switch (SDCE_M) {
				case 0:return 'January';break;
				case 1:return 'February';break;
				case 2:return 'March';break;
				case 3:return 'April';break;
				case 4:return 'May';break;
				case 5:return 'June';break;
				case 6:return 'July';break;
				case 7:return 'August';break;
				case 8:return 'September';break;
				case 9:return 'October';break;
				case 10:return 'November';break;
				case 11:return 'December';
			}
		}
	 
		function SDCE_tomorrow() {
			if (SDCE_M==0&&SDCE_Day==31) {SDCE_M++;SDCE_Day=1;}
			else if ((SDCE_Year%4)==0&&SDCE_M==1&&SDCE_Day==29) {SDCE_M++;SDCE_Day=1;}
			else if ((SDCE_Year%4)!==0&&SDCE_M==1&&SDCE_Day==28) {SDCE_M++;SDCE_Day=1;}
			else if (SDCE_M==2&&SDCE_Day==31) {SDCE_M++;SDCE_Day=1;}
			else if (SDCE_M==3&&SDCE_Day==30) {SDCE_M++;SDCE_Day=1;}
			else if (SDCE_M==4&&SDCE_Day==31) {SDCE_M++;SDCE_Day=1;}
			else if (SDCE_M==5&&SDCE_Day==30) {SDCE_M++;SDCE_Day=1;}
			else if (SDCE_M==6&&SDCE_Day==31) {SDCE_M++;SDCE_Day=1;}
			else if (SDCE_M==7&&SDCE_Day==31) {SDCE_M++;SDCE_Day=1;}
			else if (SDCE_M==8&&SDCE_Day==30) {SDCE_M++;SDCE_Day=1;}
			else if (SDCE_M==9&&SDCE_Day==31) {SDCE_M++;SDCE_Day=1;}
			else if (SDCE_M==10&&SDCE_Day==30) {SDCE_M++;SDCE_Day=1;}
			else if (SDCE_M==11&&SDCE_Day==31) {SDCE_M=0;SDCE_Day=1;SDCE_Year++;}
			else {SDCE_Day++;}
		}
		setInterval(singleDailyCountdown, 1000);
	}())
}
//* *//