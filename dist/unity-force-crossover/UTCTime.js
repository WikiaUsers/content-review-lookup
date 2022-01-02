//SAME IDEA AS LOCALTIME.JS, BUT USES THE UTC TIME IN A 24-HOUR FORMAT
function startTime() {
  offset = 0; //0 IS THE UTC OFFSET
  var today = new Date();
  var h = today.getUTCHours();
  var m = today.getUTCMinutes();
  var s = today.getUTCSeconds();
  var cur_month = today.getUTCMonth() + 1; //GET UTC MONTH
  var cur_date = today.getUTCDate(); //GET UTC DAY
  var cur_year = today.getUTCFullYear(); //GET UTC YEAR
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
  h += offset;
  if (h > 24) {
    h -= 24;
  }
  if (h < 0) {
    h += 24;
  }
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  var time = h + ":" + m + ":" + s + ", " + cur_date + " " + month_name + " " + cur_year;
    document.getElementById('utcclock').innerHTML = time;
    document.getElementById('utcclock').textContent = time;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  return (i < 10) ? "0" + i : i;
}

startTime();