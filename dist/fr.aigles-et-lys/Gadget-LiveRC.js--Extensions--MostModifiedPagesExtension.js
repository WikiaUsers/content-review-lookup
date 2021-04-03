/* 
 --------------------------------------------------------------------------------------
 ---------LLLL---------III--------------------------RRRRRRRRRR--------CCCCC------------
 ---------LLLL---------III--------------------------RRRRRRRRRRRR----CCCCCCCCC----------
 ---------LLLL--------------------------------------RRR------RRR---CCC-----CCC---------
 ---------LLLL---------III--VV-----VV--EEEEEEEEE----RRR------RRR--CCC------------------
 ---------LLLL---------III---VV---VV---EEE----------RRRRRRRRRRR---CCC------------------
 ---------LLLL---------III---VV---VV---EEEEEE-------RRRRRRRRRR----CCC------------------
 ---------LLLL---------III----VV-VV----EEEEEE-------RRR-----RRR----CCC-----CCC---------
 ---------LLLLLLLLLLL--III----VVVVV----EEE----------RRR------RRR----CCCCCCCCC----------
 ---------LLLLLLLLLLL--III-----VVV-----EEEEEEEEE----RRR-------RRR-----CCCCC------------
 --------------------------------------------------------------------------------------
 
'''Extension de LiveRC'''
 
Ajoute une icône à côté des articles modifiés par plus de 5 personnes différentes durant la dernière heure
 
* Licence : ...?
* Documentation :
* Auteur : [[wikipedia:fr:User:Dr Brains]]
* Développement et maintenance :
 
 
{{Catégorisation JS|LiveRC}}
 
<source lang=javascript> */
if (typeof(lrcHooks)!="undefined") { // DÉBUT IF


lrcParams.MostModifiedPagesUserLimit = 5;
lrcManageParams_Desc["DescMostModifiedPagesUserLimit"] = new Array("Limite pour les pages très modifiées", "Pages très modifiées");

function MostModifiedPagesExtension_GetInfos(Args) {
  var tr1 = document.getElementById(Args.id);
  if (!tr1) return;
  var rc = Args.rc;
  var article = rc.title;
  var TS = rc.timestamp;
  var Year = parseInt(TS.substring(0, 4));
  var Month = parseInt(TS.substring(5, 7).replace(/^0/, ""));
  var Day = parseInt(TS.substring(8, 10).replace(/^0/, ""));
  var Hour = parseInt(TS.substring(11, 13).replace(/^0/, ""));
  var Minut = parseInt(TS.substring(14, 16).replace(/^0/, ""));
  var DaysinMonth = {"1" :31,
                     "2" :28,
                     "3" :31,
                     "4" :30,
                     "5" :31,
                     "6" :30,
                     "7" :31,
                     "8" :31,
                     "9" :30,
                     "10":31,
                     "11":30,
                     "12":31
                    }
  if(Year%4==0 && (Year%100!=0 || Year%400==0) ) DaysinMonth[2]=29;
  Hour = Hour-1;
  if(Hour==-1){
    Hour = 23;
    Day = Day-1;
    if(Day == 0){
        Month = Month-1;
        if(Month==0){
          Month = 12;
          Year = Year-1;
        }
        Day = DaysinMonth[Month];
    }
  }
  var ThisTimestamp = "" + Year 
                    + (Month<10 ? "0"+Month : Month)
                    + (Day  <10 ? "0"+Day   : Day  )
                    + (Hour <10 ? "0"+Hour  : Hour )
                    + (Minut<10 ? "0"+Minut : Minut)
                    + "00";  
  var URL = wgServer + wgScriptPath + '/api.php?format=xml&action=query&prop=revisions&titles='+encodeURIComponent(article)
          + '&rvlimit='+lrcAPIlimit
          + '&rvend='+ThisTimestamp
          + '&rvprop=ids|flags|timestamp|user|userid|size|comment|parsedcomment|tags';

  wpajax.http({ url: URL,
                onSuccess: MostModifiedPagesExtension_AddIcon, 
                page: article, 
                id: Args.id
  });

}

function MostModifiedPagesExtension_AddIcon(Req, data){
  var TR = document.getElementById(data.id);
  if (!TR) return;
  var ObjetXML = Req.responseXML;
  if(!ObjetXML) return;
  var Modifs = ObjetXML.getElementsByTagName('rev');
  if(Modifs.length<lrcParams.MostModifiedPagesUserLimit) return;
  var Users = new Array();
  for(var a=0,l=Modifs.length;a<l;a++){
    var User = Modifs[a].getAttribute('user');
    if(Users.indexOf(User)==-1) Users.push(User);
  }
  if(Users.length<lrcParams.MostModifiedPagesUserLimit) return;
  var ArticleLink = getElementsByClass("lrc_ArticleLink", TR, "a")[0];
  if(!ArticleLink) return;
  var Number = Users.length;
  var Title = Number+" éditeurs durant la dernière heure : " + Users.join(" - ");
  var Icon = document.createElement('img');
  Icon.src = "//upload.wikimedia.org/wikipedia/commons/thumb/1/16/Co-op_activism4.svg/12px-Co-op_activism4.svg.png";
  Icon.title = Title;
  Icon.width = 12;
  Icon.height = 12;
  ArticleLink.parentNode.appendChild(document.createTextNode(" "));
  ArticleLink.parentNode.appendChild(Icon);
}


LiveRC_AddHook("AfterRC", MostModifiedPagesExtension_GetInfos);

} // FIN IF

//</source>