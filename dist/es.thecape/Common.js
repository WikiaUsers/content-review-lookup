/* support for the TimeLeft template BY FRINGEPEDIA */
  var oldTime = new Date();
  var timerID = null;
  var entry = 0;
  var target; 
  var dst;      
  var jan = new Date(oldTime.getFullYear(), 0, 1);
  var jul = new Date(oldTime.getFullYear(), 6, 1);
  var stdOffset = Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
  if (oldTime.getTimezoneOffset() < stdOffset)
  {
     dst = 60;
  }
  else
  {
     dst = 0;
  }

        function Timecount() {
            entry++;
            var basedate = oldTime;
            if (entry == 1) {
                if (document.getElementById('TimeLeftCounter') != null) {
                    
                    target = new Date(document.getElementById('TimeLeftCounter').innerHTML);
                }
                else {
                   
                    return;
                }
            }
           var now = new Date();
           oldTime = now;
            var diff = new Date();
            var days = 0;
            var hours = 0;
            var minutes = 0;
           
            var seconds = 0;
            var daystring = "";
            var hourstring = "";
            var minutestring = "";
            var secondstring = "";
            diff.setTime(target.getTime() - basedate.getTime());
            
                if (diff.getTime() > new Date("January 1, 1970 00:00:00")) {
                    days = Math.floor((diff.getTime()-((now.getTimezoneOffset()+dst)*60000)) / 86400000);
                    hours = diff.getHours();
                    minutes = diff.getMinutes();
                    seconds = diff.getSeconds();

                    if (days != 0) {
                        daystring = days.toString() + "d ";
                    }

                    if (hours != 0) {
                        hourstring = hours.toString() + "h ";
                    }
                    else {
                        if (days != 0) hourstring = hours.toString() + "h ";
                    }

                    if (minutes != 0) {
                        minutestring = minutes.toString() + "m ";
                    }
                    else {
                        if ((hours != 0) || (days != 0)) minutestring = minutes.toString() + "m ";
                    }

                    secondstring = seconds.toString() + "s";

                    document.getElementById("TimeLeftCounter").innerHTML = daystring + hourstring + minutestring + secondstring;
                    timerID = self.setTimeout(Timecount, 1000);
                }
                else {
                    document.getElementById("TimeLeftCounter").innerHTML = "0s";
                    
                }
                
            }
addOnloadHook(Timecount);