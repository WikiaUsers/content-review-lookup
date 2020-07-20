/* WHOIS */
var WHS={
 adres:"http://kto.wą.tk/",
 strony:["Contributions","Block"],
 text:"<div class='who-ip'><div class='center'><a href='#'>Zobacz informacje o adresie IP</a><div class='loadsq' style='display: none;'></div></div><pre></pre></div>",
 start:function(){$(WHS.text).appendTo("#bodyContent");$(".who-ip div a").click(function(){WHS.get(WHS.w[0]); return false;});},
 get:function(s){$(".who-ip pre, .who-ip div a").hide();$(".who-ip .loadsq").show();$.get(WHS.adres+s+"/json").done(function(W){$(".who-ip pre").html(W.response.whois.record).show();$(".who-ip div a").show();$(".who-ip .loadsq").hide();});},
 w:(wgTitle.split("/").length>1?wgTitle.split("/")[1].match(/^(\d{1,3}\.){3}\d{1,3}$/):null)
};
(WHS.w!=null&&WHS.strony.indexOf(wgCanonicalSpecialPageName)!=-1)&&$(WHS.start);