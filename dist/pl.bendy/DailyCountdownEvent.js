// by Q43492449 //
const dCP = document.getElementById('dailyCountdownPlace');
if (dCP != null) {
	(function dailyCountdown() {
		this.DCE_EventUTCHour = (typeof DCE_EventUTCHour === 'object') ? DCE_EventUTCHour : [12, 14, 18];
		this.DCE_prePostMessages = (typeof DCE_prePostMessages === 'object') ? DCE_prePostMessages : [['', ''], ['', ''], ['', ''], ['', ''], ['', '']];
		var DCE_d = new Date();
		var DCE_Day = DCE_d.getDate();
		var DCE_M = DCE_d.getMonth();
		var DCE_Month = DCE_month(DCE_M);
		var DCE_Year = DCE_d.getFullYear();
		var DCE_HourLocal = DCE_d.getHours();
		var DCE_HourUTC = DCE_d.getUTCHours();
		var DCE_Minute = DCE_d.getMinutes();
		var DCE_Second = DCE_d.getSeconds();
		var DCE_Diff = DCE_d.getTimezoneOffset() * 60000;
		var DCE_date = DCE_join(DCE_Day, DCE_Month, DCE_Year, DCE_HourLocal, DCE_Minute, DCE_Second);
		var DCE_now = new Date(DCE_date).getTime() + DCE_Diff;
		var DCE_cdd, DCE_CDD, DCE_fullTimeLeft, DCE_dLeft, DCE_hLeft, DCE_mLeft, DCE_sLeft;
	 
		if (DCE_HourUTC<DCE_EventUTCHour[0]) {
			DCE_cdd = DCE_join(DCE_Day, DCE_Month, DCE_Year, DCE_EventUTCHour[0], 0, 0);
			DCE_CDD = new Date(DCE_cdd).getTime();
			DCE_fullTimeLeft = DCE_CDD-DCE_now;
			DCE_dLeft = Math.floor(DCE_fullTimeLeft / 86400000);if (DCE_dLeft==0) {DCE_dLeft=''} else {DCE_dLeft+='d '}
			DCE_hLeft = Math.floor((DCE_fullTimeLeft % 86400000) / 3600000);if (DCE_hLeft==0) {DCE_hLeft=' '} else {DCE_hLeft+='h '}
			DCE_mLeft = Math.floor((DCE_fullTimeLeft % 3600000) / 60000);if (DCE_mLeft==0) {DCE_mLeft=' '} else {DCE_mLeft+='m '}
			DCE_sLeft = Math.floor((DCE_fullTimeLeft % 60000) / 1000);if (DCE_sLeft==0) {DCE_sLeft=''} else {DCE_sLeft+='s '}
			dCP.innerHTML=DCE_prePostMessages[0][0]+DCE_dLeft+DCE_hLeft+DCE_mLeft+DCE_sLeft+DCE_prePostMessages[0][1];
		}
		else if (DCE_HourUTC>=DCE_EventUTCHour[0]&&DCE_HourUTC<DCE_EventUTCHour[1]) {
			DCE_cdd = DCE_join(DCE_Day, DCE_Month, DCE_Year, DCE_EventUTCHour[1], 0, 0);
			DCE_CDD = new Date(DCE_cdd).getTime();
			DCE_fullTimeLeft = DCE_CDD-DCE_now;
			DCE_dLeft = Math.floor(DCE_fullTimeLeft / 86400000);if (DCE_dLeft==0) {DCE_dLeft=''} else {DCE_dLeft+='d '}
			DCE_hLeft = Math.floor((DCE_fullTimeLeft % 86400000) / 3600000);if (DCE_hLeft==0) {DCE_hLeft=' '} else {DCE_hLeft+='h '}
			DCE_mLeft = Math.floor((DCE_fullTimeLeft % 3600000) / 60000);if (DCE_mLeft==0) {DCE_mLeft=' '} else {DCE_mLeft+='m '}
			DCE_sLeft = Math.floor((DCE_fullTimeLeft % 60000) / 1000);if (DCE_sLeft==0) {DCE_sLeft=''} else {DCE_sLeft+='s '}
			dCP.innerHTML=DCE_prePostMessages[1][0]+DCE_dLeft+DCE_hLeft+DCE_mLeft+DCE_sLeft+DCE_prePostMessages[1][1];
		}
		else if (DCE_HourUTC>=DCE_EventUTCHour[1]&&DCE_HourUTC<DCE_EventUTCHour[2]) {
			DCE_cdd = DCE_join(DCE_Day, DCE_Month, DCE_Year, DCE_EventUTCHour[2], 0, 0);
			DCE_CDD = new Date(DCE_cdd).getTime();
			DCE_fullTimeLeft = DCE_CDD-DCE_now;
			DCE_dLeft = Math.floor(DCE_fullTimeLeft / 86400000);if (DCE_dLeft==0) {DCE_dLeft=''} else {DCE_dLeft+='d '}
			DCE_hLeft = Math.floor((DCE_fullTimeLeft % 86400000) / 3600000);if (DCE_hLeft==0) {DCE_hLeft=' '} else {DCE_hLeft+='h '}
			DCE_mLeft = Math.floor((DCE_fullTimeLeft % 3600000) / 60000);if (DCE_mLeft==0) {DCE_mLeft=' '} else {DCE_mLeft+='m '}
			DCE_sLeft = Math.floor((DCE_fullTimeLeft % 60000) / 1000);if (DCE_sLeft==0) {DCE_sLeft=''} else {DCE_sLeft+='s '}
			dCP.innerHTML=DCE_prePostMessages[2][0]+DCE_dLeft+DCE_hLeft+DCE_mLeft+DCE_sLeft+DCE_prePostMessages[2][1];
		}
		else {
			DCE_tomorrow();DCE_Month=DCE_month(DCE_M);
			DCE_cdd = DCE_join(DCE_Day, DCE_Month, DCE_Year, DCE_EventUTCHour[0], 0, 0);
			DCE_CDD = new Date(DCE_cdd).getTime();
			DCE_fullTimeLeft = DCE_CDD-DCE_now;
			DCE_dLeft = Math.floor(DCE_fullTimeLeft / 86400000);if (DCE_dLeft==0) {DCE_dLeft=''} else {DCE_dLeft+='d '}
			DCE_hLeft = Math.floor((DCE_fullTimeLeft % 86400000) / 3600000);if (DCE_hLeft==0) {DCE_hLeft=' '} else {DCE_hLeft+='h '}
			DCE_mLeft = Math.floor((DCE_fullTimeLeft % 3600000) / 60000);if (DCE_mLeft==0) {DCE_mLeft=' '} else {DCE_mLeft+='m '}
			DCE_sLeft = Math.floor((DCE_fullTimeLeft % 60000) / 1000);if (DCE_sLeft==0) {DCE_sLeft=''} else {DCE_sLeft+='s '}
			if (DCE_HourUTC==DCE_EventUTCHour[2]) {dCP.innerHTML=DCE_prePostMessages[3][0]+DCE_dLeft+DCE_hLeft+DCE_mLeft+DCE_sLeft+DCE_prePostMessages[3][1];}
			else {dCP.innerHTML=DCE_prePostMessages[4][0]+DCE_dLeft+DCE_hLeft+DCE_mLeft+DCE_sLeft+DCE_prePostMessages[4][1];}
		}
		 
		function DCE_join(DCE_D, DCE_M, DCE_Y, DCE_H, DCE_MI, DCE_S) {return DCE_M+' '+DCE_D+', '+DCE_Y+' '+DCE_H+':'+DCE_MI+':'+DCE_S;}
	
		function DCE_month() {
			switch (DCE_M) {
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
		 
		function DCE_tomorrow() {
			if (DCE_M==0&&DCE_Day==31) {DCE_M++;DCE_Day=1;}
			else if ((DCE_Year%4)==0&&DCE_M==1&&DCE_Day==29) {DCE_M++;DCE_Day=1;}
			else if ((DCE_Year%4)!==0&&DCE_M==1&&DCE_Day==28) {DCE_M++;DCE_Day=1;}
			else if (DCE_M==2&&DCE_Day==31) {DCE_M++;DCE_Day=1;}
			else if (DCE_M==3&&DCE_Day==30) {DCE_M++;DCE_Day=1;}
			else if (DCE_M==4&&DCE_Day==31) {DCE_M++;DCE_Day=1;}
			else if (DCE_M==5&&DCE_Day==30) {DCE_M++;DCE_Day=1;}
			else if (DCE_M==6&&DCE_Day==31) {DCE_M++;DCE_Day=1;}
			else if (DCE_M==7&&DCE_Day==31) {DCE_M++;DCE_Day=1;}
			else if (DCE_M==8&&DCE_Day==30) {DCE_M++;DCE_Day=1;}
			else if (DCE_M==9&&DCE_Day==31) {DCE_M++;DCE_Day=1;}
			else if (DCE_M==10&&DCE_Day==30) {DCE_M++;DCE_Day=1;}
			else if (DCE_M==11&&DCE_Day==31) {DCE_M=0;DCE_Day=1;DCE_Year++;}
			else {DCE_Day++;}
		}
		setInterval(dailyCountdown, 1000);
	}())
}
//* *//