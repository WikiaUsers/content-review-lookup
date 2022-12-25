var _minPerSta=3;
var staNeed=50, _staPerHour=60/_minPerSta;

setInterval(function(){
    var d=new Date();
    $("#timeNow").text(padZero(d.getHours())+((d.getSeconds()%2===0)?":":" ")+padZero(d.getMinutes()));
    $("#staNeedTime").text(((staNeed>=_staPerHour)?(Math.floor(staNeed/_staPerHour)+"小時"):"")+(staNeed%_staPerHour*_minPerSta)+"分鐘");
    var a=new Date(d.getTime()+staNeed*_minPerSta*60*1000);
    var x="";
    if (a.getDay()!=d.getDay()){
        var b=a.getDay()-d.getDay();
        if(b<0)b+=7;
        switch(b){
            case 1:x="明天";break;
            case 2:x="後天";break;
            default:x=b+"天後";
        }
    }
    $("#staNeedAt").text(x+(padZero(a.getHours())+":"+padZero(a.getMinutes())));
}, 1000);

function padZero(n){
    if (n<10) return "0"+n;
    else return n;
}

function staNeedCheck(){
    var v=parseInt($("#staNeed").val(),10);
    if (isNaN(v)||v<=0||v>800){$("#staNeed").val(staNeed)}else{staNeed=v}
    }
//
setInterval(function(){
    var d=new Date(), hourDiff;
    if(reverseStaNeedDate==2)hourDiff=reverseStaNeedTime+48-d.getHours();
    else if(reverseStaNeedDate==1)hourDiff=reverseStaNeedTime+24-d.getHours();
    else hourDiff=reverseStaNeedTime-d.getHours();
    
    if(hourDiff>0){
        var sta=hourDiff*_staPerHour+Math.floor((60-d.getMinutes())/_minPerSta)-_staPerHour;
        var staKeep=reverseStaNeed-sta;
        if(staKeep<0)staKeep=0;$("#reverseStaNeedResult").text(staKeep);
    } else if(reverseStaNeedTimeM-d.getMinutes()>0) {
        sta=sta-Math.floor(reverseStaNeedTimeM-d.getMinutes()/_minPerSta);
    }
    else $("#reverseStaNeedResult").text("-");
},1E3);

var reverseStaNeedDate=0, reverseStaNeedTime=12, reverseStaNeedTimeM=0, reverseStaNeed=50;
function reverseStaNeedCheck(){
    var d=$("#reverseStaNeedDate").val();
    reverseStaNeedDate=d;
    var h=parseInt($("#reverseStaNeedTime").val(),10);
    if(isNaN(h)||h<0||h>23)$("#staNeed").val(reverseStaNeedTime);
    else reverseStaNeedTime=h;
    var m=parseInt($("#reverseStaNeedTimeM").val(),10);
    if(isNaN(m)||m<0||m>60)$("#staNeed").val(reverseStaNeedTime);
    else reverseStaNeedTimeM=m;
    var v=parseInt($("#reverseStaNeed").val(),10);
    if(isNaN(v)||v<=0||v>800)$("#staNeed").val(reverseStaNeed);
    else reverseStaNeed=v;
}

$("div.calculator").append('現在是 <span id="timeNow"></span>，<br>如果需要回復<input type="number" id="staNeed" min="1" max="800" value="50" onchange="staNeedCheck()" style="width:50px">耐力，<br>則需要等待 <span id="staNeedTime"></span>，<br>約於 <span id="staNeedAt"></span>。<hr><div>想要在<select id="reverseStaNeedDate" onchange="reverseStaNeedCheck()"><option value="0">今日</option><option value="1">明日</option><option value="2">後日</option></select><input type="number" id="reverseStaNeedTime" min="0" max="23" maxlength="2" value="12" onchange="reverseStaNeedCheck()" style="width:50px">時<input type="number" id="reverseStaNeedTimeM" min="0" max="59" maxlength="2" value="0" onchange="reverseStaNeedCheck()" style="width:50px">分，<br>剛好有<input type="number" id="reverseStaNeed" min="1" max="800" value="50" maxlength="3" onchange="reverseStaNeedCheck()" style="width:50px">耐力，</div><div>那麼現在必要保留 <span id="reverseStaNeedResult"></span> 點耐力。</div>');