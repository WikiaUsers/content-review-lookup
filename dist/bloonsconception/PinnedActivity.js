/* Simple Pinned Activity Module                     */
// -> Adds an extra column on the top for highlights //

// I can't read this anymore ohmahgerd
// Ikr, why was i so smart

var pins = window.pins || {} ;

// Insert pageName here                              // 
pins.pages = window.pins.pages || "Project:Pins";
pins.url = "/wiki/" + pins.pages;
// Print: Turning specific page into pins            //
function XPprint(){
    var printRaw = pins.printIns.toArray();
    var printPage = [];
    for (var ii in printRaw) {
        var ni=printRaw[ii];
        var printRow = {};
        var nj=ni.childNodes[0].data;
        if(!XPverify(nj,ii))continue;
        printRow.link = nj.substring(0,nj.indexOf("|"));
        printRow.title = nj.substring(nj.indexOf("|")+1,nj.length-1);
        if(ni.childNodes.length>1)
            printRow.description = ni.childNodes[1].innerHTML.replace(/<\/?li>/g,"").slice(0,-1).replace(/\n/g,"<br/>");
        printPage.push(printRow);
    }
    return printPage;
}

// Plug: Actual pinning activity                     //
function XPplug(){
    $(".activityfeed .pinned").remove();
    pins.printOuts.reverse(); //Forced hack
    for (var ii in pins.printOuts) {
        var pin = pins.printOuts[ii];
        var pinNail = $('<img class="message sprite" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" height="16" width="16">')[0];
        var pinHead = $('<a class="title" style="font-weight:bold" href="http://bloonsconception.wikia.com/wiki/'+pin.link+'">'+pin.title+'</a>')[0];
        var pinPaper = document.createElement("li");
        pinPaper.className = "pinned";
        pinPaper.appendChild(pinNail);
        pinPaper.appendChild(pinHead);
        if(pin.description){
            pinPaper.appendChild($("<br/>")[0]);
            pinPaper.appendChild($("<div>"+pin.description+"</div>")[0]);
        }
        var pinFeed = document.getElementsByClassName("activityfeed")[0];
        pinFeed.insertBefore(pinPaper,pinFeed.firstChild);
    }
}

function XPverify(ni,nn){
    var ers=0;
    if (ni.search(/.+\|.+/)==-1)console.log("Error #"+ers+++" in pin #"+nn+": Missing Title/Link");
    if (ni.split("|").length>2)console.log("Error #"+ers+++" in pin #"+nn+": Bad Format");
    return ers===0;
}

//Load: Load the whole script + pins                 //
function XPload(){ //Not explode
    console.log("It's loading right");
    $("<div>").load(pins.url + " #mw-content-text", function(){
        pins.printIns=$(this).find("ul:not(li>ul)>li");
        pins.printOuts=XPprint();
        XPplug();
    });
}

//$(func): Page check                                //
$(function(){
    if(wgPageName == "Special:WikiActivity") XPload();
});

//AjaxRC Compatibility                               //
window.ajaxCallAgain = window.ajaxCallAgain || [];
window.ajaxCallAgain.push(XPload);