function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    
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
    
    var time = h + ":" + m + ":" + s;
    document.getElementById("LocalTime").innerText = time;
    document.getElementById("LocalTime").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

function isGreaterThan10(i)
{
	return (i < 10) ? "0" + i : i;
}
showTime()