    var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            var d = today.getDate();
            var mo = today.getMonth()+1;
            var y = today.getFullYear();
             if(s<10){
                 s = "0"+s;
             } if(m<10){
                 m = "0"+m;
             } if(d<10){
                 d = "0"+d;
             } if(mo<10){
                 mo = "0"+mo;
             }
             if(h<10){
                 h = "0"+h;
             }
             posttime = y.toString() + mo.toString() +d.toString() +h.toString() +m.toString() +s.toString();