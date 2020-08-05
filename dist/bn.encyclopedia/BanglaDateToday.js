var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
var hh = today.getHours();
var min = today.getMinutes();
var eDate = mm + "/" + dd + "/" + yyyy + " " + hh + ":" + min;
document.write('<script language="javascript" src="http://www.pallab.com/services/getbangladate.aspx?EDate=' + eDate + '"><\/script>');