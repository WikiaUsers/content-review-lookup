function time(){
         var date = new Date();
         var hour = date.getHours();
         var minute = date.getMinutes();
         var second = date.getSeconds();
         var end = "PM"
         if(hour<12){
             end = "AM"
         }
         else if(hour>12){
              hour=hour-12
         }
         if(minute<=9){
              minute="0"+minute;
         }
         if(second<=9){
              second="0"+second;
         }
         document.getElementById("ad-skin").innerHTML=hour+":"+minute+":"+second+" "+end;
         setTimeout("time()",1000);
}
time();
/* Note: At the URL, add "?uselang=qqx" or "&uselang=qqx" without quotes. Then this script will work, updating itself every minute. I will update this so it will work in normal versions. */