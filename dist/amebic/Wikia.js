if(false){ // Holiday is over ... QQ
    var head= document.getElementsByTagName('head')[0];
    var script=document.createElement('script');
    script.type='text/javascript';
    script.src=
    'http://homepage.ntu.edu.tw/~b00201054/snowstormv144_20131208/snowstorm.js';
    head.appendChild(script);
}
if(document.getElementById('MathJax')!=null){
    var head= document.getElementsByTagName('head')[0];
    var script=document.createElement('script');
    script.type='text/javascript';
    script.src='http://homepage.ntu.edu.tw/~b00201054/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML';
    head.appendChild(script);
    var config1=document.createElement('script');
    config1.type='text/x-mathjax-config';
    config1.innerHTML='MathJax.Hub.Config({tex2jax:{inlineMath:[["$","$"],["\\\\(","\\\\)"]]}});';
    head.appendChild(config1);
    var config2=document.createElement('script');
    config2.type='text/x-mathjax-config';
    config2.innerHTML='MathJax.Hub.Config({TeX:{equationNumbers:{autoNumber:"AMS"}}});';
    head.appendChild(config2);
}
if(document.getElementById('cancel')!=null){
    var config3=document.createElement('script');
    config3.type='text/x-mathjax-config';
    config3.innerHTML='MathJax.Hub.Config({TeX:{extensions:["cancel.js"]}});';
    head.appendChild(config3);
}
if(document.getElementById('xypic')!=null){
    var config4=document.createElement('script');
    config4.type='text/x-mathjax-config';
    config4.innerHTML='MathJax.Hub.Config({extensions:["fp.js"],TeX:{extensions:["xypic.js"]}});';
    head.appendChild(config4);
}
 
function Check_Digit(i){
    if(i<10) return"0"+i;
    else return ""+i;
}
 
function Check_Day(i){
    switch(i){
        case 0:return"日";
        case 1:return"一";
        case 2:return"二";
        case 3:return"三";
        case 4:return"四";
        case 5:return"五";
        case 6:return"六";
        default:return"Ｘ";
    }
}
 
function Special_Date(M,D){
    switch(M){
        case 2:switch(D){
            case  1:return"大年初二";
            case  2:return"大年初三";
            case  3:return"大年初四";
            case  4:return"大年初五 也是 立春";
            case  5:return"大年初六";
            case 14:return"元宵節 也是 情人節";
            case 16:return"寒假結束";
            case 17:return"開學";
            case 19:return"雨水";
            case 28:return"和平紀念日";
        }break;
        case 3:switch(D){
            case  6:return"驚蟄";
            case 14:return"白色情人節";
            case 17:return"期中教學意見調查開始";
            case 21:return"春分";
        }break;
        case 4:switch(D){
            case  2:return"溫書假";
            case  3:return"溫書假";
            case  4:return"兒童節";
            case  5:return"清明 也是 民族掃墓節";
            case 14:return"期中考週 第一天";
            case 15:return"期中考週 第二天";
            case 16:return"期中考週 第三天";
            case 17:return"期中考週 第四天";
            case 18:return"期中考週 第五天";
            case 20:return"穀雨";
            case 24:return"期中教學意見調查倒數兩天";
            case 25:return"期中教學意見調查最後一天";
        }break;
        case 5:switch(D){
            case  5:return"立夏";
            case 15:return"申請停休倒數兩天";
            case 16:return"申請停休最後一天";
            case 21:return"小滿";
            case 30:return"期末教學意見調查開始";
        }break;
        case 6:switch(D){
            case  6:return"芒種";
            case 11:return"期末教學意見調查倒數兩天";
            case 12:return"期末意見調查最後一天";
            case 16:return"期末考週 第一天";
            case 17:return"期末考週 第二天";
            case 18:return"期末考週 第三天";
            case 19:return"期末考週 第四天";
            case 20:return"期末考週 第五天";
            case 21:return"夏至 也是 暑假開始";
        }break;
        case 7:switch(D){
            case  7:return"小暑";
            case 23:return"大暑";
        }break;
        case 8:switch(D){
            case  7:return"立秋";
            case 23:return"處暑";
        }break;
        case 9:switch(D){
            case  8:return"「阿米巴的維基」一歲生日 也是 白露";
            case 23:return"秋分";
        }break;
        case 10:switch(D){
            case  1:return"十一國慶（大誤）";
            case  8:return"寒露";
            case 10:return"國慶紀念日";
            case 20:return"廚師節";
            case 21:return"華僑節";
            case 23:return"霜降";
            case 25:return"臺灣光復節";
            case 31:return"萬聖夜 也是 蔣公誕辰紀念日";
        }break;
        case 11:switch(D){
            case  1:return"諸聖節";
            case  7:return"立冬";
            case 11:return"光棍節";
            case 12:return"國父誕辰紀念日";
            case 15:return"校慶（？）";
            case 16:return"校慶園遊會";
            case 21:return"防空節";
            case 22:return"小雪";
            case 27:return"感恩節 感謝阿米巴大神的賜予！！";
        }break;
        case 12:switch(D){
            case  7:return"大雪";
            case 18:return"移民節";
            case 22:return"冬至";
            case 24:return"聖誕夜";
            case 25:return"聖誕節 也是 行憲紀念日";
            case 27:return"建築師節";
            case 28:return"電信節";
        }break;
        case 1:switch(D){
            case  1:return"元旦 也是 開國紀念日";
            case  5:return"小寒";
            case 20:return"大寒";
        }break;
    }
    switch(Math.floor(Math.random()*16)){
        case  0:return"和平的一天 感謝阿米巴的努力";
        case  1:return"新生的一天 燃燒吧火鳥";
        case  2:return"普通的一天 心理學好煩不簡單噢";
        case  3:return"共同的一天 鬆餅好吃不油膩噢";
        case  4:return"血袋搗憂的一天 阿米巴仍需努力";
        case  5:return"血糕危幽的一天 阿米巴仍需努力";
        case  6:return"血霹滴醫的一天 阿米巴仍需努力";
        case  7:return"血塗論醫的一天 阿米巴仍需努力";
        case  8:return"血腹便餓的一天 阿米巴仍需努力";
        case  9:return"血流刑蹈的一天 阿米巴仍需努力";
        case 10:return"血窠忌倒的一天 阿米巴仍需努力";
        case 11:return"農曆幾月幾號阿？";
        default:return"Undefined 的一天 阿米巴 GG";
    }
}
 
function Show_Now(){
    var today=new Date();
    var Y=today.getFullYear();Y=""+Y;
    var M=today.getMonth()+1;M=Check_Digit(M);
    var D=today.getDate();D=Check_Digit(D);
    var d=today.getDay();d=Check_Day(d);
    var h=today.getHours();h=Check_Digit(h);
    var m=today.getMinutes();m=Check_Digit(m);
    var s=today.getSeconds();s=Check_Digit(s);
    var Tally=document.getElementsByClassName("tally")[0];
    if(Tally.title==""){
        S=Special_Date(today.getMonth()+1,today.getDate());
        Tally.title=S;
    }else{
        S=Tally.title;
    }
    Tally.innerHTML="今天是 "+S+"<br />"+Y+"."+M+"."+D+" 星期"+d+" "+h+":"+m+":"+s+" ";
}
 
function Show_Plans(){
    Plans=document.getElementsByClassName("Plan");
    for (var i=0;i<Plans.length;i++){
    var Plan=Plans[i];
    var today=new Date();
    var D_day=new Date(Plan.id);
    var Y=D_day.getFullYear();Y=""+Y;
    var M=D_day.getMonth()+1;M=Check_Digit(M);
    var D=D_day.getDate();D=Check_Digit(D);
    var d=D_day.getDay();d=Check_Day(d);
    var h=D_day.getHours();h=Check_Digit(h);
    var m=D_day.getMinutes();m=Check_Digit(m);
    var s=D_day.getSeconds();s=Check_Digit(s);
    //var Time_Text=" "+Y+"."+M+"."+D+" 星期"+d;
    var Time_Text=" "+M+"/"+D+" 週"+d;
    if(s!='00')      Time_Text=Time_Text+" "+h+":"+m+":"+s+" ";
    else if(m!='00') Time_Text=Time_Text+" "+h+":"+m+" ";
    else if(h!='00') Time_Text=Time_Text+" "+h+":"+m+" ";
    else             Time_Text=Time_Text;
    if(Plan.className=="Plan noText") Plan_Text="";
    else Plan_Text=Time_Text+Plan.title;
    var Count=(D_day-today)/1000;
    if(Plan.className=="Plan +1D")Count+=86400;
    Count_Text=Count>0?"（倒數 ":"（過了 ";
    Count=Math.ceil(Math.abs(Count));
    var s=Count%60;Count=(Count-s)/60
    var m=Count%60;Count=(Count-m)/60;
    var h=Count%24;Count=(Count-h)/24;
    var D=Count%7;Count=(Count-D)/7;D=Math.abs(D);
    var W=Count;W=Math.abs(W);
    if(W){     Count_Text+=W+" 週 "; if(D||true) Count_Text+=D+" 日";}
    else if(D){Count_Text+=D+" 日 "; if(h||true) Count_Text+=h+" 時";}
    else if(h) Count_Text+=h+" 時 "+m+" 分";
    else if(m) Count_Text+=m+" 分 "+s+" 秒";
    else       Count_Text+=s+" 秒";
    if(Plan.className!="Plan noCount") Plan_Text+=Count_Text+"）";
    Plan.innerHTML=Plan_Text;
    }
}

setInterval(function(){Show_Now()},1000);
setInterval(function(){Show_Plans()},1000);