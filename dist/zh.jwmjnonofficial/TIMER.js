<title>根据鼠标判断时间：Js倒计时</title>
<input type="button" id="downloadbtn" class="meng1an" onclick='if(timeout>0) {alert("停止计时");return false;}document.location="#"; this.disabled=true;'>
<script type="text/javascript">
<!--
var timeCount
var timeout='10';
function countdown()
{
    if (timeout <= 0)
    {
      document.getElementById("downloadbtn").value = '时间到';
      if(document.getElementById("downloadfile"))document.getElementById("downloadfile").style.display = '';
    }
    if (timeout > 0)
    {
      document.getElementById("downloadbtn").value = '还有 '+timeout+' 秒';
      timeCount = setTimeout('countdown()',1000);
    }
    timeout--;
}
countdown();
document.onmouseover= function(){clearTimeout(timeCount);countdown();}
document.onmouseout= function(){clearTimeout(timeCount);}
-->
</script>