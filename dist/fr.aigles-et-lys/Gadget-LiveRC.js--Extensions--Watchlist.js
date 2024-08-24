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
 
Permet de n'afficher que les modifications faites dans la liste de suivi
 
* Licence : ...?
* Documentation :
* Auteur : [[wikipedia:fr:User:Dr Brains]]
* Développement et maintenance :
 
 
{{Catégorisation JS|LiveRC}}
 
<source lang=javascript> */
if (typeof(lrcHooks)!="undefined") { // DÉBUT IF
 
 
lrcOptionMenuValues.showWL = true;
lang_menu.showWLText = "LdS";

function LiveRC_Watchlist_AddButton(){
    var showRC = document.getElementById( 'showRC' );
    if(!showRC) return;
    var NewInput = document.createElement('input');
    NewInput.id = "showWL";
    NewInput.type = "checkbox";
    NewInput.onclick = function(){ LiveRC_Watchlist_ToggleShowWL(); };
    showRC.parentNode.insertBefore(NewInput, showRC);
    var NewLabel = document.createElement('label');
    NewLabel.setAttribute('for', "showWL");
    NewLabel.innerHTML = lang_menu.showWLText;
    showRC.parentNode.insertBefore(NewLabel, showRC);
    if(lrcOptionMenuValues.showWL){ 
        NewInput.checked = "checked";
        LiveRC_Watchlist_ToggleShowWL();
    }
}
LiveRC_AddHook("AfterOptions", LiveRC_Watchlist_AddButton);

function LiveRC_Watchlist_ToggleShowWL(){
    var showWL = document.getElementById("showWL");
    var OtherInputs = new Array("showRC","showLog","showFilter");
    if(!showWL) return;
    for(var a=0,l=OtherInputs.length;a<l;a++){
        var Input = document.getElementById(OtherInputs[a]);
        if(!Input) continue;
        Input.disabled = (showWL.checked ? "disabled" : false);
        var Label = Input.nextSibling;
        if(Label) Label.style.color = (showWL.checked ? "silver" : "black" );
    }
}

function LiveRC_Watchlist_makeRequest(){
    var showWL = document.getElementById("showWL");
    if(!showWL) return true;
    if(!showWL.checked) return true;

    var rcns = document.getElementById('showNS0').value;
    if (rcns == null) return;
    var wlshow = new Array();
    if(document.getElementById("showUsers").value != "ALLNBOTS") wlshow.push("!bot");
    if(document.getElementById("showUsers").value == "IPNEW") wlshow.push("!patrolled");
    if(document.getElementById("showUsers").value == "IPONLY") wlshow.push("anon");
    wlshow = (wlshow.length==0 ? "" : '&wlshow='+ wlshow.join("|") );

    var URL = wgServer + wgScriptPath
            + '/api.php?action=query&list=watchlist&wlnamespace='+rcns
            + '&wlprop=ids|title|flags|user|comment|parsedcomment|timestamp|sizes'+(lrcUserHasRight("autopatrol")?'|patrol':'')
            + wlshow
            + '&wlend=' + lastrctimestamp + '&wllimit=' + lrcParams["RCLimit"]
            + '&format=xml';
 
    wpajax.http({ url:URL, 
                  onSuccess:LiveRC_Watchlist_getRequest, 
                  message:lang_tooltips.WORKING, 
                  nsfilter:rcns
    });
    return false;
}
LiveRC_AddHook("BeforeRC", LiveRC_Watchlist_makeRequest);

function LiveRC_Watchlist_getRequest(Req, data){
    if (document.getElementById('stopLive').checked){
        lrcDisplayDebug("");
        clearTimeout(lrcTimeout["RCRequest"]);
        lrcTimeout["RCRequest"] = setTimeout("liveRC()",1000);
        return;
    }
    var NSFilter = data.nsfilter; 
    var api = Req.responseXML.getElementsByTagName('api')[0]; 
    if (api.firstChild.nodeName == "error") return; 
    var query = api.getElementsByTagName('query')[0];
    var wls = query.getElementsByTagName('watchlist')[0].getElementsByTagName('item');
    var j,lenj,wl, rc;
 
    goNext(2); // Set lrcAllLinesSeen if we need to preload a line after the function completes.
    leni=wls.length;
    for (i=leni-1; i>=0; i--) { 
        if (wls[i].getAttribute('revid') <= lastrcid) continue;
        rc = new Object();
        rc.state = 0;
 
        lenj = wls[i].attributes.length;
        for (j=0; j<lenj; j++) {
            switch(wls[i].attributes[j].name) {
                case 'anon':
                    rc.state += IP;
                    break;
                case 'bot':
                    rc.state += BOT;
                    break;
                case 'new':
                    rc.state += NEW;
                    break;
                case 'minor':
                    rc.state += MINOR;
                    break;
                case 'patrolled':
                    rc.state += PATROLLED;
                    break;
                case 'type':
                    break;
                default:
                    rc[wls[i].attributes[j].name] = wls[i].attributes[j].value;
                    break;
            }
        }  
        if (lstHidden[rc.user]) continue;
        if (typeof(rc.comment) != "undefined") {
            lenj = commenttests.length;
            for (j=0; j<lenj; j++)
                if (new RegExp(commenttests[j].regex).test(rc.comment)) rc.state += commenttests[j].state;
        } 
        if (rc.newlen == 0) rc.state += BLANKING; 
        if (lstSysop.indexOf(rc.user) != -1)  rc.state += SYSOP; 
        if (lrcParams["LoadCatAndTemplates"]) {
            wpajax.http({url: wgServer + wgScriptPath + '/api.php?titles=' + encodeURIComponent(rc.title) + '&action=query&prop=categories|templates&cllimit='+lrcAPIlimit+'&clprop=hidden&tllimit='+lrcAPIlimit+'&redirects&format=xml',
                   onSuccess: getRedirCat, rc: rc });
        } else {
            getRevision(rc);
        }
    }
    if(wls[0]){
        lastrcid = wls[0].getAttribute('revid');
        lastrctimestamp = wls[0].getAttribute('timestamp').replace(new RegExp(/\D/g), "");
    }
    lrcDisplayDebug("");
    LiveRC_RequestError = 0;
    clearTimeout(lrcTimeout["RCRequest"]);
    lrcTimeout["RCRequest"] = setTimeout("liveRC()",lrcParams["Refresh"]*1000);
}

/* ************************************************************************************************************************************************ */
} // FIN IF

//</source>