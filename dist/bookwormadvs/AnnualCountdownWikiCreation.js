var today=new Date()

var theoccasion=new Date(today.getFullYear(), 05, 27)

var beforeOccasionText="days left before the next Bookworm Adventures Wiki birthday"
var onOccasiontext="Happy birthday Bookworm Adventures Wiki!"

var monthtext=new Array("Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec")
theoccasion.setMonth(theoccasion.getMonth()-1)
var showdate="("+monthtext[theoccasion.getMonth()]+" "+theoccasion.getDate()+")"

var one_day=1000*60*60*24
var calculatediff=""

calculatediff=Math.ceil((theoccasion.getTime()-today.getTime())/(one_day))
if (calculatediff<0){
var nextyeartoday=new Date()
nextyeartoday.setFullYear(today.getFullYear()+1)
calculatediff=Math.ceil((nextyeartoday.getTime()-today.getTime())/(one_day)+calculatediff)
}

var pluraldayornot=(calculatediff==1)? "day" : "days"
if (calculatediff>0)
	document.write("<B>"+calculatediff+" "+pluraldayornot+" "+beforeOccasionText+" "+showdate+"</B>")
else if (calculatediff==0)
	document.write("<B>"+onOccasiontext+" "+showdate+"</B>")