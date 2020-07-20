var ocena=
{
przestrzenie:" Cytaty File NonNews Non\u017ar\u00f3d\u0142a Poradnik S\u0142ownik"
    .split(" "),
start:
    function()
    {
        przestrzenOK=!1;
        for(i in ocena.przestrzenie)przestrzenOK=przestrzenOK||wgCanonicalNamespace==ocena.przestrzenie[i];
        if(przestrzenOK&&!("Strona g\u0142\u00f3wna"==wgTitle||document.getElementById("bezgwiazdek"))||document.getElementById("ocena-szablon"))
        {
            switch(wgCanonicalNamespace)
            {
            case "":
                ocena.typStronyBiernik="artyku\u0142";
                break;
            case "NonNews":
                ocena.typStronyBiernik="wiadomo\u015b\u0107";
                break;
            case "Non\u017ar\u00f3d\u0142a":
                ocena.typStronyBiernik="\u017ar\u00f3d\u0142o";
                break;
            case "Poradnik":
                ocena.typStronyBiernik="poradnik";
                break;
            case "Plik":
                ocena.typStronyBiernik="bohomaz";
                break;
            default:
                ocena.typStronyBiernik="stron\u0119"
            }
            switch(wgCanonicalNamespace)
            {
            case "":
            case "Poradnik":
            case "Plik":
                ocena.koncowkaPrzymiotnika="y";
                break;
            case "Non\u017ar\u00f3d\u0142a":
                ocena.koncowkaPrzymiotnika="e";
                break;
            default:
                ocena.koncowkaPrzymiotnika="a"
            }
            switch(wgCanonicalNamespace)
            {
            case "Plik":
                ocena.czynnosc=
                "zerkn\u0105\u0107";
                break;
            default:
                ocena.czynnosc="przeczyta\u0107"
            }
ocena.oceny= {"0":"Oce\u0144 "
+ocena.typStronyBiernik,1:"Wyj\u0105tkowo s\u0142ab"
+ocena.koncowkaPrzymiotnika,2:"Marn"
+ocena.koncowkaPrzymiotnika,3:"Warto "
+ocena.czynnosc,4:"Dobr"
+ocena.koncowkaPrzymiotnika,5:"Rewelacyjn"
                +ocena.koncowkaPrzymiotnika};
            var a=document.getElementById("ocena-szablon"),b=document.getElementById("p-social"),c=document.getElementById("column-one");
            ocena.ramka=document.createElement("div");
            a?a.appendChild(ocena.ramka):
            c.insertBefore(ocena.ramka,b);
            ocena.ramka.id="p-ocena";
            ocena.ramka.className=a?"szablon ocena":"portlet ocena";
            b=""+(a?"":"<h5>Oce\u0144 "+ocena.typStronyBiernik+"</h5>\n");
            b=b+('<div class="'+(a?"ramka-ocen":"pBody")+'" style="text-align:center;">\n')+' <ul onmouseout="ocena.pokaz(0);" class="gwiazdki" style="width:95px;margin:auto;">\n';
            b+='  <li id="ocena-1" onmouseover="ocena.pokaz(1);" onclick="ocena.glosuj(1);" class="gwiazdka"></li>\n';
            b+='  <li id="ocena-2" onmouseover="ocena.pokaz(2);" onclick="ocena.glosuj(2);" class="gwiazdka"></li>\n';
            b+='  <li id="ocena-3" onmouseover="ocena.pokaz(3);" onclick="ocena.glosuj(3);" class="gwiazdka"></li>\n';
            b+='  <li id="ocena-4" onmouseover="ocena.pokaz(4);" onclick="ocena.glosuj(4);" class="gwiazdka"></li>\n';
            b+='  <li id="ocena-5" onmouseover="ocena.pokaz(5);" onclick="ocena.glosuj(5);" class="gwiazdka"></li>\n';
            b+=" </ul>\n";
            b+=' <span id="ocena-komunikat"></span>\n';
            b+=' <span id="ocena-statystyki"></span>\n';
            b+="</div>\n";
            ocena.ramka.innerHTML=b;
            ocena.pokaz(0);
            ocena.sprawdz();
            ocena.moja=0;
            ocena.srednia=0;
            ocena.ponowic=0;
            ocena.aktywnosc=0;
            ocena.pobranoDane=0;
            ocena.oddawanieGlosu=0;
            YAHOO.util.Connect.asyncRequest("GET","/api.php?format=json&action=query&prop=info&inprop=views|revcount&pageids="+wgArticleId,ocena.daneStrony,null);
            jQuery("#p-ocena").addClass("gen-closed");
jQuery("#p-ocena").hidingToolbox( {initClosed:!1})
        }
    },
sprawdz:
    function()
    {
        YAHOO.util.Connect.asyncRequest("GET","/api.php?format=json&action=query&list=wkvoteart&wkctime=5&wkuservote=1&wkpage="+wgArticleId,ocena.odpowiedz,
        null)
    },
glosuj:
    function(a)
    {
        var b=ocena.moja?"update":"insert";
        ocena.moja=a;
        ocena.oddawanieGlosu=!0;
        ocena.ponowic=!0;
        ocena.dzieki=!1;
        ocena.pokaz(a);
        YAHOO.util.Connect.asyncRequest("GET","/api.php?format=json&action="+b+"&list=wkvoteart&wkctime=5&wkuservote=1&wkvote="+a+"&wkpage="+wgArticleId,ocena.odpowiedz,null)
},odpowiedz:
    {
success:
        function(a)
        {
            a=YAHOO.tools.JSONParse(a.responseText); "undefined"
            !=typeof a.query&&a.query?(a=a.query.wkvoteart[wgArticleId],ocena.srednia=Math.round(100*a.votesavg)/100,
            ocena.liczbaGlosow=a.votescount,"undefined"!=typeof a.uservote&&a.uservote&&(ocena.moja=Math.round(a.uservote))):"undefined"!=typeof a.item&&a.item&&(a="undefined"!=typeof a.item.wkvoteart[0]&&a.item.wkvoteart[0]?a.item.wkvoteart[0]:a.item.wkvoteart,ocena.srednia=Math.round(100*a.avgvote)/100,"undefined"!=typeof a.vote&&a.vote&&(ocena.moja=Math.round(a.vote)),ocena.sprawdz());
            ocena.oddawanieGlosu&&(ocena.oddawanieGlosu=!1,ocena.dziekujemy());
            ocena.pokaz(0)
},failture:
        function(a)
        {
            ocena.ponowic?(YAHOO.util.Connect.asyncRequest("GET",
            "/api.php?format=json&action="+(ocena.moja?"update":"insert")+"&list=wkvoteart&wkctime=5&wkuservote=1&wkvote="+ocena.moja+"&wkpage="+wgArticleId,ocena.odpowiedz,null),ocena.oddawanieGlosu=!0,ocena.ponowic=!1):(ocena.pokazKomunikat("Nie uda\u0142o mi si\u0119 po\u0142\u0105czy\u0107 z serwerem. Widocznie admin potkn\u0105\u0142 si\u0119 o wtyczk\u0119. :("),ocena.oddawanieGlosu=!1)
            }
},daneStrony:
{
success:
        function(a)
        {
            a=YAHOO.tools.JSONParse(a.responseText); "undefined"
            !=typeof a.query&&a.query&&(ocena.pobranoDane=
            1,ocena.wyswietlen=a.query.pages[wgArticleId].views,100>=parseInt(ocena.wyswietlen)&&(ocena.wyswietlen=" ? 100"),ocena.edycji=a.query.pages[wgArticleId].revcount)
},failture:
        function(a)
        {
            ocena.wyswietlen="bd.";
            ocena.edycji="bd."
        }
    },
dziekujemy:
    function()
    {
        ocena.dzieki=!0;
        ocena.pokaz();
        setTimeout(function()
        {
            ocena.dzieki=!1;
            ocena.pokaz(0)
        },1500)
    },
pokazKomunikat:
    function(a)
    {
        document.getElementById("ocena-komunikat").innerHTML=a
},staty:
    function(a)
    {
        "undefined"==typeof a&&(a=document.getElementById("ocena-statystyki").innerHTML);
        a?document.getElementById("ocena-statystyki").innerHTML=ocena.wiecej+' <br /> (<a href="javascript:void 0;" title="ukryj" onclick="ocena.staty(0);">ukryj</a>)':document.getElementById("ocena-statystyki").innerHTML=""
},pokaz:
    function(a)
    {
        "undefined"!=typeof a?ocena.aktywnosc=a:a=ocena.aktywnosc;
        for(i=1; 5>=i; i++)document.getElementById("ocena-"+i).className="ocena-gwiazda-czysta";
        if(a)for(i=1; i<=a; i++)document.getElementById("ocena-"+i).className="ocena-gwiazda-uzytkownika";
        else if(ocena.srednia)
        {
            var b=
            ocena.srednia;
            for(i=1; i<=b; i++)document.getElementById("ocena-"+i).className="ocena-gwiazda-srednia";
            var c=Math.floor(b),b=b-c;
            5!=c&&(document.getElementById("ocena-"+(c+1)).className="ocena-gwiazda-srednia-"+parseInt(Math.round(6*b)))
        }
        ocena.dzieki?ocena.pokazKomunikat("Dzi\u0119kujemy za g\u0142os. :)"):ocena.oddawanieGlosu?ocena.pokazKomunikat("Zapisywanie g\u0142osu..."):a?ocena.pokazKomunikat(ocena.oceny[a]):ocena.srednia?ocena.pokazKomunikat('<span style="cursor:pointer;" onclick="ocena.pokaz(0);ocena.staty(true);" title="Kliknij, aby zobaczy\u0107 wi\u0119cej statystyk">\u015arednia ocena: <b>'+
        ocena.srednia+"</b></span>"):ocena.pokazKomunikat(ocena.oceny[0]);
        ocena.wiecej="<br /> Liczba ocen: <b>"+ocena.liczbaGlosow+"</b> <br /> Twoja ocena: <b>"+ocena.moja+"</b> <br /> Wy\u015bwietle\u0144: <b>"+ocena.wyswietlen+"</b><br /> Edycji: <b>"+ocena.edycji+"</b>";
        ocena.staty()
    }
};
YAHOO.util.Event.onContentReady("column-one",ocena.start);