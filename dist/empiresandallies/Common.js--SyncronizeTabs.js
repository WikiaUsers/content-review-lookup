/* Any JavaScript here will be loaded for all users on every page load. */
//Syncronize tabs by Jan1
function installSyncTab(tries) {
  var index, tabberInProgress, tabberlinks, i, tabberNoSync; 
  if (typeof tries== "undefined") {
    tries = 0;
  }
 tabberNoSync =  xpath("//span[@class='nosync']");
 if (tabberNoSync.snapshotLength > 0){
  console.log('tabber sync cancelled');

} else {
tabberSyncOre =  xpath("//span[@class='syncore']");
 tabberInProgress =  xpath("//div[@class='tabbertab']");
  console.log('tabberInProgress: ' +
  tabberInProgress.snapshotLength);


  if (tabberInProgress.snapshotLength > 0){
    if (tries < 10){
      setTimeout(function(){installSyncTab(tries + 1)},500);
    }
  } else {
    tabberlinks =  xpath("//ul[@class='tabbernav']/li//a");
    //getElementsByClassName(document, 'ul', 'tabbernav');  

    console.log('tabberlinks:' +
    tabberlinks.snapshotLength);
    for(i=0;i < tabberlinks.snapshotLength; i++) {
    index = tabberlinks.snapshotItem(i).tabberIndex;
 if (tabberSyncOre.snapshotLength > 0){
   tabberlinks.snapshotItem(i).tabber.onClick = function(args){
        //console.log('clicked foobar ' + args.index); 
        syncTab(args.index);
        syncOre(args.index);

    };
  } else {

    tabberlinks.snapshotItem(i).tabber.onClick = function(args){
        //console.log('clicked foobar ' + args.index); 
        syncTab(args.index);
    };
    }

    //console.log('test ' + tabberlinks.snapshotItem(i).tabber.onClick.toString());

    }
  }
 }
}
function xpath(query) {
    return document.evaluate(query, document, null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


function syncTab(tabberIndex) {
  console.log('clicked ' + tabberIndex); 
  var tabberlinks =  xpath("//ul[@class='tabbernav']/li//a");
  for(var i=0;i < tabberlinks.snapshotLength; i++) {
    //console.log('test ' + tabberlinks.snapshotItem(i).tabber.onClick);
    //console.log('tabsyncing');
    tabberlinks.snapshotItem(i).tabber.tabShow(tabberIndex);
  }


}


function syncOre(tabberIndex) {
  console.log('clicked2 ' + tabberIndex); 
  var orestrips =  xpath("//span[@class='orestrip']");
  for(var i=0;i < orestrips.snapshotLength; i++) {
    //console.log('test ' + tabberlinks.snapshotItem(i).tabber.onClick);
    //console.log('tabsyncing');
     var oreitems = orestrips.snapshotItem(i).childNodes;
    for (var j=0;j < oreitems.length; j++){

     if (oreitems[j].nodeType == 1){ //is an <element>
        if (oreitems[j].className == "oreX" + tabberIndex){
            oreitems[j].style.display = "inline";
        } else {
            oreitems[j].style.display = "none";
        }
     }

    }

  }


}

addOnloadHook(installSyncTab);
//End Syncronize tabs by Jan1