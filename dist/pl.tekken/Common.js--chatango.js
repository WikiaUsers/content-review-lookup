/* Any JavaScript here will be loaded for all users on every page load. */

function addChatango () {
var ChatangoPrefix = '<section class="Chatango module"><h1 style="margin-top:0px; margin-bottom:7px;">Chat TekkenPolska<span style="float:right;color:white !important;font-family:Verdana !important;" title="Jeśli chcesz, by ta sekcja przestała być dla Ciebie widoczna, dodaj do /wiki/Użytkownik:Twój_nick/wikia.css następującą linijkę: .Chatango { display: none !important; } - nie zobaczysz już tego okienka, dopóki nie skasujesz tego tekstu "><sup><small>?</small></sup></span></h1>'; 
http://tekkenpolskawikia.chatango.com/ = '<a href="http://pl.tekkenpolska.wikia.com/wiki/Pomoc:Chatango" style="margin-left:5px; color:red;">Pomoc: Jak założyć konto?</a><object width="282" height="360" id="obj_1334059042500"><param name="movie" value="http://tekkenpolskawikia.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1320038262203&c=FFFFFF&d=E1E1E1&f=0&g=E1E1E1&i=0&j=E1E1E1&l=2B2B2B&m=525418&n=FFFFFF&o=99&p=12&q=999999&t=0&v=0&aa=1"/><embed id="emb_1320038262203" src="http://tekkenpolskawikia.chatango.com/group" width="305" height="360" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=0010000006224043410&c=FF6600&d=000000&f=0&g=000000&i=0&j=000000&l=333333&m=CCCCCC&n=333333&o=99&p=12&q=686768&t=0&v=0&aa=1"></embed></object>';
var RadioSection = '<section class="Radio module"><h1 style="margin-top:0px; margin-bottom:7px;">Radio iOtaku<span style="float:right;color:red !important;font-family:Verdana !important;" title="Jeśli chcesz, by ta sekcja przestała być dla Ciebie widoczna, dodaj do /wiki/Użytkownik:Twój_nick/wikia.css następującą linijkę: .Radio { display: none !important; } - nie zobaczysz już tego okienka, dopóki nie skasujesz tego tekstu "><sup><small>?</small></sup></span></h1><center><iframe src="http://portalradiowy.pl/includes/generatory/wstats/wstats2.php?var1=1&var2=14&var3=7&var4=77&var5=62&var6=ffffff&var7=1&var8=1&var9=14&var10=5&var11=122&var12=60&var13=ffffff&var14=1&var15=1&var16=14&var17=8&var18=167&var19=ffffff&var20=1&var21=0&var22=14&var23=105&var24=24&var25=000000&var26=1&var27=0&var28=14&var29=1&var30=48&var31=100&var32=000000&var33=1&var34=1&var35=81&var36=159&var37=50&var38=36&var39=132&var40=199&var41=imageshack.us/a/img547/1373/aragostatystyki.png&var42=199.21.149.185&var43=9674" frameborder="no" marginwidth="0" marginheight="0" scrolling="no" width="152" height="227"></iframe>' ;
 
    //Artykuły
$(ChatangoPrefix+ChatangoSection+"</section>").insertAfter('#LatestPhotosModule');
 
   //Aktywność
$(ChatangoPrefix+ChatangoSection+"</section>").insertBefore('.HotSpotsModule');
 
 //Radio	
$(RadioSection).insertAfter('.Chatango');
 
   //Strona Główna
$(ChatangoSection).appendTo("#MainSiteChat");
}

    //Artykuły
$(ChatangoPrefix+ChatangoSection+"</section>").insertAfter('#LatestPhotosModule');

   //Aktywność
$(ChatangoPrefix+ChatangoSection+"</section>").insertBefore('.HotSpotsModule');

 //Radio	
$(RadioSection).insertAfter('.Chatango');

   //Strona Główna
$(ChatangoSection).appendTo("#MainSiteChat");
}