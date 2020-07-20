/* Any JavaScript here will be loaded for all users on every page load. */

switch (mw.config.get('wgPageName'))
{
    case 'Game_Hosts':
        // Time
	    var tmonth=["January","February","March","April","May","June","July","August","September","October","November","December"];
	    var clock = document.getElementsByClassName("time");
		
		function GetClock(){
			for (var i = 0; i < clock.length; i++) {
			    if(clock[i].offset === undefined)
				    clock[i].offset = parseInt(clock[i].innerHTML,10);

				var d=new Date();
				var dx=d.toGMTString();
				dx=dx.substr(0,dx.length -3);
				d.setTime(Date.parse(dx));
				d.setHours(d.getHours()+clock[i].offset);
				var nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getFullYear();

				var nhour=d.getHours(),nmin=d.getMinutes();
				if(nmin<=9) nmin="0"+nmin;

				var clocktext=""+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+"";
				clock[i].innerHTML=clocktext;
			}
		}

		GetClock();
		setInterval(GetClock,1000);
    	break;
	
	case 'some other page':
        // JS here will be applied to "some other page"
        break;
}