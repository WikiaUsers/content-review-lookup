function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var cur_month = date.getMonth() + 1; //GET LOCAL MONTH
    var cur_date = date.getDate(); //GET LOCAL DAY
    var cur_year = date.getFullYear(); //GET LOCAL YEAR
    var month_name = "";
    
    switch(cur_month)
    {
    	case 1:
    		month_name = "January";
    		break;
    	case 2:
    		month_name = "February";
    		break;
    	case 3:
    		month_name = "March";
    		break;
    	case 4:
    		month_name = "April";
    		break;
    	case 5:
    		month_name = "May";
    		break;
    	case 6:
    		month_name = "June";
    		break;
    	case 7:
    		month_name = "July";
    		break;
    	case 8:
    		month_name = "August";
    		break;
    	case 9:
    		month_name = "September";
    		break;
    	case 10:
    		month_name = "October";
    		break;
    	case 11:
    		month_name = "November";
    		break;
    	case 12:
    		month_name = "December";
    		break;
    }
    
    if(h > 24)
	{
		h -= 24;
	}
	if(h < 0)
	{
		h += 24;
	}
    
    h = isGreaterThan10(h);
    m = isGreaterThan10(m);
    s = isGreaterThan10(s);
    
    var time = h + ":" + m + ":" + s + ", " + cur_date + " " + month_name + " " + cur_year;
    document.getElementById("LocalTime").innerText = time;
    document.getElementById("LocalTime").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

function isGreaterThan10(i)
{
	return (i < 10) ? "0" + i : i;
}
showTime();