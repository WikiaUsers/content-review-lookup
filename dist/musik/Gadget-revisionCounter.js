//===========================================================================
// Fügt an den Reiter "Versionen/Autoren" die Anzahl Versionen an und die
// Anzahl vom Nutzer erstellter Versionen
//===========================================================================

var revisionCounter = 
{
  queryUrl           : wgScriptPath + '/api.php?action=query&prop=revisions&pageids=' + wgArticleId + '&rvprop=user&rvlimit=max&format=json&callback=revisionCounter.queryResult',
  revisionCount      : 0,
  revisionCountUser  : 0,
  checkOnlyOnHistory : true,

  execute : function() 
  {
    if ((revisionCounter.checkOnlyOnHistory) && (wgAction != "history")) return;
    importScriptURI(revisionCounter.queryUrl);
  },

  queryResult : function(res) 
  {
    if (!res['query'] || !res['query']['pages'] || 
        !res['query']['pages'][wgArticleId] || !res['query']['pages'][wgArticleId]['revisions']) return;
  
    var revs = res['query']['pages'][wgArticleId]['revisions'];
    revisionCounter.revisionCount += revs.length;
    for (var i = 0; i < revs.length; i++)
      if (revs[i]['user'] == wgUserName) revisionCounter.revisionCountUser++;
    
    if (res && res['query-continue']) 
    {
      importScriptURI(revisionCounter.queryUrl + '&rvstartid=' + encodeURIComponent(res['query-continue'].revisions.rvstartid));
    }
    else
    {
      if (skin == 'vector')
      {
        $("#ca-history a").text(function(index, curText) {
          return curText + " (" + revisionCounter.revisionCount + "/" + revisionCounter.revisionCountUser + ")";
        });
      }
      else
      {
        var info = document.createElement("span");
        info.appendChild(document.createTextNode(" (" + revisionCounter.revisionCount + "/" + revisionCounter.revisionCountUser + ")"));
        var infoTitle = document.createAttribute("title");
        infoTitle.nodeValue = "Insgesamt " + revisionCounter.revisionCount + " Versionen, davon " + revisionCounter.revisionCountUser + " von mir";
        info.setAttributeNode(infoTitle);      
        document.getElementById('ca-history').firstChild.appendChild(info);
      }
    }
  }
};

if (wgNamespaceNumber >= 0) addOnloadHook( revisionCounter.execute );