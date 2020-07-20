$('<form><div style="text-align: center;"><b style="font-size: x-large;">現有體力：</b><input id="Stamina" name="h" style="font-size: x-large;" type="number" min="0" value=50><br><b style="font-size: x-large;">目標體力：</b><input id="fStamina" name="fh" style="font-size: x-large;" type="number" min="1" value=80><br><br><div id="time1"></div></div></form>').appendTo('#stamina');


$("form input[type='number']").on("init input click", function() {
  var mSt = 213,
    St = $("#Stamina").val(),
    fSt = $("#fStamina").val(),
    d = new Date(),
    h = d.getHours(),
    m = d.getMinutes(),
    th = (h >= 0 && h < 6) ? "凌晨" : (h > 5 && h < 12) ? "早上" : (h == 12) ? "中午" : (h > 12 && h < 17) ? "下午" : "晚上";

  if (St.length == 0) {
    St = 0;
    $("#Stamina").val(St);
  }
  if (fSt.length == 0) {
    fSt = 0;
    $("#fStamina").val(fSt);
  }

  if (St >= 0 && fSt > 0) {
    if (fSt > mSt || St > mSt) {
      $("#time1").text("體力值請勿大於" + mSt);
      if (St > mSt) $("#Stamina").val(mSt);
      else $("#fStamina").val(mSt);
    } else if ((fSt - St) < 0) $("#time1").text("目標體力請勿低於現有體力");
    else $("#time1").html("現有體力 " + St + "<br>現在時間 " + th + h + ":" + ((m < 10) ? "0" + m : m) + "<br><br>目標體力 " + fSt + "<br>大約於 " + computing(h, m, St, fSt));
  } else {
    $("#time1").text("目標體力不可為 0 ");
  }
}).trigger('init');

function computing(a, b, h, fh) {
  var chp = ((parseInt(fh) - parseInt(h)) * 8).toString(),
  min = ((parseInt(b) + parseInt(chp)) % 60).toString(),
  sTime = (parseInt((parseInt(b) + parseInt(chp)) / 60)).toString(),
  hr = ((parseInt(a) + parseInt(sTime)) % 24).toString(),
  thr = (hr >= 0 && hr < 6) ? "凌晨" : (hr > 5 && hr < 12) ? "早上" : (hr == 12) ? "中午" : (hr > 12 && hr < 17) ? "下午" : "晚上",
  minc = (min < 10) ? "0" + min : min,
  hrc = ((sTime) < 1 && chp < 60)?chp + "分鐘<br>":(sTime) + " 小時<br>";
  if (parseInt(chp) >= ((23 - parseInt(a)) * 60) + (60 - parseInt(b))) {
    if ((parseInt(chp) - ((23 - parseInt(a)) * 60) + (60 - parseInt(b))) > 1440) {
      return  hrc + "後天 " + thr + hr + ":" + minc;
    } else {
      return hrc + "明天 " + thr + hr + ":" + minc;
    }
  } else {
    return hrc + thr + hr + ":" + minc;
  }
}