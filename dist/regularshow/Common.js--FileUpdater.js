/* Any JavaScript here will be loaded for all users on every page load. */
if(typeof LIRoptions!=="undefined"){if(typeof LIRoptions.bottomMessage==="undefined"){LIRoptions.bottomMessage=""}if(typeof LIRoptions.editSummary==="undefined"){LIRoptions.editSummary="Updating file links (automatic)"}if(typeof LIRoptions.singleButtonText!=="undefined"){if(LIRoptions.singleButtonText==""){LIRoptions.singleButtonText="Rename and replace"}}else{LIRoptions.singleButtonText="Rename and replace"}if(typeof LIRoptions.queueButtonText!=="undefined"){if(LIRoptions.queueButtonText==""){LIRoptions.queueButtonText="Rename and add to queue"}}else{LIRoptions.queueButtonText="Rename and add to queue"}}else{LIRoptions={bottomMessage:"",editSummary:"Updating file links (automatic)",singleButtonText:"Rename and replace",queueButtonText:"Rename and add to queue"}}if(typeof localStorage.LIRQueuedUpdates==="undefined"){localStorage.LIRQueuedUpdates=0;localStorage.LIRQueuedUpdatesPos=1}LIR={started:false,start:function(e){if(!Storage){return false}if(LIR.started==true&&typeof LIR.queuePosition==="undefined"){return false}if(typeof e!=="undefined"){if(e=="single"){LIR.started=true;document.getElementById("liveLoader").style.display="inline-block";$("#queueStatus").html(" Processing");LIR.type="single"}else if(e=="multi"){LIR.started=true;if(typeof LIR.queuePosition==="undefined"){LIR.queuePosition=++localStorage.LIRQueuedUpdates;document.getElementById("liveLoader").style.display="inline-block"}if(LIR.queuePosition!=localStorage.LIRQueuedUpdatesPos){$("#queueStatus").html(" Number "+(LIR.queuePosition-localStorage.LIRQueuedUpdatesPos)+" in line to add to queue");setTimeout(function(){LIR.start(e)},500);return false}$("#queueStatus").html(" Processing");LIR.type="multi"}else{alert("Incorrect type specified");return false}}else{LIR.started=true;document.getElementById("liveLoader").style.display="inline-block";$("#queueStatus").html(" Processing");LIR.type="single"}if(typeof localStorage[wgUserName+"_LIRQueueData"]!=="undefined"&&typeof localStorage[wgUserName+"_LIRPageKey"]!=="undefined"){LIR.queueData=JSON.parse(localStorage[wgUserName+"_LIRQueueData"]);LIR.pageKey=JSON.parse(localStorage[wgUserName+"_LIRPageKey"])}else{LIR.queueData=[];LIR.pageKey=[]}var t=$('input[name="wpOldTitle"]').val().slice(5);var n=document.getElementById("wpNewTitleMain").value;var r={page:0,content:""};for(i=0;i<LIR.queueData.length;i++){if(LIR.queueData[i].newImage==t||LIR.queueData[i].newImage==n){alert("Image is already added to the queue, or the destination image name is already queued to be used by another file.");LIR.started=false;$("#queueStatus").html("");if(typeof LIR.queuePosition!=="undefined"){localStorage.LIRQueuedUpdatesPos++;delete LIR.queuePosition}document.getElementById("liveLoader").style.display="none";return false}}if(n.slice(-4).search(/\.png/i)==-1&&n.slice(-4).search(/\.jpg/i)==-1&&n.slice(-5).search(/\.jpeg/i)==-1&&n.slice(-4).search(/\.gif/i)==-1&&n.slice(-4).search(/\.svg/i)==-1){alert("File name does not contain a valid file extension.  Please add a valid file extension.");LIR.started=false;$("#queueStatus").html("");if(typeof LIR.queuePosition!=="undefined"){localStorage.LIRQueuedUpdatesPos++;delete LIR.queuePosition}document.getElementById("liveLoader").style.display="none";return false}$.getJSON("/api.php?action=query&list=imageusage&iutitle=File:"+encodeURIComponent(n)+"&format=json",function(e){if(e.query.imageusage.length==0){$.getJSON("/api.php?action=query&list=imageusage&iutitle=File:"+encodeURIComponent(t)+"&iulimit=500&format=json",function(e){imageUsage=e.query.imageusage;if(console)console.log("Image usage successfully retrieved");if(imageUsage.length>0){if(LIR.type=="single"){LIR.queueData=[];LIR.pageKey=[]}for(r.page=0;r.page<imageUsage.length;r.page++){if(console)console.log("Beginning page "+r.page);var i=imageUsage[r.page].title;if(LIR.pageKey.indexOf(i)==-1){LIR.pageKey[LIR.pageKey.length]=i}if(i.search(/User blog comment/i)==-1){LIR.queueData[LIR.queueData.length]={oldImage:t,newImage:n,title:i}}else{LIRBlogComment=true}}if(typeof LIRBlogComment==="undefined"){if(LIR.type=="multi"){LIR.storeQueue(function(){LIR.started=false;localStorage.LIRQueuedUpdatesPos++;$("#wpReason").val($("#wpReason").val()+" (pages added to update queue)");$("#movepage").submit()})}else{LIR.started=false;LIR.processQueue(function(){$("#movepage").submit()})}}else{$("#queueStatus").html("");if(typeof LIR.queuePosition!=="undefined"){localStorage.LIRQueuedUpdatesPos++;delete LIR.queuePosition}document.getElementById("liveLoader").style.display="none";alert("One of pages this image is used on is a blog comment. There is currently a bug with Wikia's API concerning editing blog comments.  Please update the file links manually.")}}else{alert("Image is not being used on any pages.  Please use the regular rename button.");LIR.started=false;$("#queueStatus").html("");if(typeof LIR.queuePosition!=="undefined"){localStorage.LIRQueuedUpdatesPos++;delete LIR.queuePosition}document.getElementById("liveLoader").style.display="none"}})}else{alert("This desired file name already exists. If you wish to use that file name, please either delete or rename the existing image.");LIR.started=false;$("#queueStatus").html("");if(typeof LIR.queuePosition!=="undefined"){localStorage.LIRQueuedUpdatesPos++;delete LIR.queuePosition}document.getElementById("liveLoader").style.display="none"}})},storeQueue:function(e){localStorage[wgUserName+"_LIRPageKey"]=JSON.stringify(LIR.pageKey);localStorage[wgUserName+"_LIRQueueData"]=JSON.stringify(LIR.queueData);if(typeof e==="function"){e()}},processQueue:function(e){if(localStorage.LIRQueuedUpdates<localStorage.LIRQueuedUpdatesPos&&localStorage.LIRQueuedUpdates!=0){localStorage.LIRQueuedUpdates=0;localStorage.LIRQueuedUpdatesPos=1}if(LIR.started==true){return false}if(typeof LIR.type==="undefined"){LIR.type="multi"}LIR.started=true;LIR.requestCompleted=[];LIR.pageData=[];if(LIR.type=="multi"&&localStorage.LIRQueuedUpdates==0){if(typeof localStorage[wgUserName+"_LIRQueueData"]!=="undefined"&&typeof localStorage[wgUserName+"_LIRPageKey"]!=="undefined"){LIR.queueData=JSON.parse(localStorage[wgUserName+"_LIRQueueData"]);LIR.pageKey=JSON.parse(localStorage[wgUserName+"_LIRPageKey"]);if(console)console.log("Queue retrieved sucessfully.")}else{if(console)console.log("Queue does not exist or was unable to be retrieved.");alert("Queue does not exist or was unable to be retrieved.");LIR.started=false;return false}}else if(LIR.type=="multi"&&localStorage.LIRQueuedUpdates!=0){if(console)console.log("Pages still being added to the queue.");alert('Pages are still waiting to be added to the queue.  If this is not the case, please use the "Reset waiting pages" button to be able to process the queue.');LIR.started=false;return false}if(console)console.log("Begin queue execution");for(i=0;i<LIR.pageKey.length;i++){LIR.requestCompleted[i]=false}if(console)console.log("Getting page contents");titlesString="";for(i in LIR.pageKey){if(i==0){titlesString+=LIR.pageKey[i]}else{titlesString+="|"+LIR.pageKey[i]}}$.post("/api.php",{action:"query",prop:"revisions",rvprop:"content",titles:titlesString,format:"json"},function(t){for(i in t.query.pages){keyNum=LIR.pageKey.indexOf(t.query.pages[i].title);LIR.pageData[keyNum]={title:LIR.pageKey[keyNum],content:t.query.pages[i].revisions[0]["*"],changed:false}}if(console)console.log("Page contents retrieved and saved");LIR.log("Page contents retrieved and saved");if(console)console.log("Begin processing page content.");for(i=0;i<LIR.queueData.length;i++){pageKey=LIR.pageKey.indexOf(LIR.queueData[i].title);escapedName=window.LIR.queueData[i].oldImage.replace(/\*/gi,"\\*").replace(/\?/gi,"\\?").replace(/\./gi,"\\.").replace(/ /gi,"[ _]*?").replace(/\(/gi,"\\(").replace(/\)/gi,"\\)");pageReplacement=new RegExp("(\\n[ ]*?|:?File:[ ]*?|=[ ]*?|\\|)"+escapedName+"([ ]*?\\n|[ ]*?\\||\\]|\\})","gi");replacementReg=new RegExp(escapedName,"gi");if(LIR.pageData[pageKey].content.search(pageReplacement)!=-1){LIR.pageData[pageKey].changed=true;if(console)console.log('"'+LIR.queueData[i].oldImage+'" replaced on page "'+LIR.queueData[i].title+'"');while((regExec=pageReplacement.exec(LIR.pageData[pageKey].content))!=null){LIR.pageData[pageKey].content=LIR.pageData[pageKey].content.replace(regExec[0],regExec[0].replace(replacementReg,LIR.queueData[i].newImage));pageReplacement.lastIndex+=regExec[0].replace(replacementReg,LIR.queueData[i].newImage).length-regExec[0].length-regExec[2].length}}else{if(LIR.type=="multi"){LIR.failedLog(LIR.queueData[i].oldImage,LIR.queueData[i].newImage,LIR.queueData[i].title)}else{alert('Unable to find "'+LIR.queueData[i].oldImage+'" on page "'+LIR.queueData[i].title+'". Please rename manually.')}}}LIR.log("Page content processed, saving");if(console)console.log("Begin submitting processed page content.");if(LIR.type=="multi"){$(".modalToolbar").prepend("<div id='LIRQueueProgress' style='float: left; width: 200px; border: 2px solid black; height: 17px;'><div id='LIRProgressInd' style='width: 0%; height: 100%; float: left; background-color: green;'></div></div>");LIR.queueProgress=0}for(i=0;i<LIR.pageData.length;i++){if(LIR.pageData[i].changed==true){LIR.submitChangedPages(i,e)}else{LIR.requestCompleted[i]=true}}},"json")},submitChangedPages:function(e,t){$.ajax({url:"/api.php",type:"POST",async:true,data:{action:"edit",title:LIR.pageData[e].title,summary:LIRoptions.editSummary,text:LIR.pageData[e].content,minor:true,nocreate:true,redirect:false,bot:true,token:mediaWiki.user.tokens.get("editToken")},contentType:"application/x-www-form-urlencoded",error:function(){LIR.requestCompleted[e]=true;alert('Unable to publish page "'+LIR.pageKey[e]+'".  Please rename images on that page manually.');if(LIR.requestCompleted.indexOf(false)==-1){delete localStorage[wgUserName+"_LIRPageKey"];delete localStorage[wgUserName+"_LIRQueueData"];LIR.started=false;if(typeof t==="function"){t()}}},success:function(){LIR.requestCompleted[e]=true;if(console)console.log('Posted page "'+LIR.pageKey[e]+'"');if(LIR.type=="multi"){$("#LIRProgressInd").css("width",++LIR.queueProgress/LIR.pageKey.length*100+"%")}if(LIR.requestCompleted.indexOf(false)==-1){if(LIR.type=="multi"){delete localStorage[wgUserName+"_LIRPageKey"];delete localStorage[wgUserName+"_LIRQueueData"];LIR.started=false;$("#LIRQueueProgress").remove()}if(typeof t==="function"){t()}}}})},log:function(e){if(typeof LIR.logMessages==="undefined"){LIR.logMessages="<div style='font-weight: bold'>Queue system started.</div>"}LIR.logMessages=LIR.logMessages+"<div style='font-weight: bold'>"+e+"</div>";if($("#LIRLog").length>0){document.getElementById("LIRLog").innerHTML=LIR.logMessages;$("#LIRLog").scrollTop(1e8);$("#LIRLog div:odd").css("background-color","grey")}},failedLog:function(e,t,n){if(typeof LIR.logFailed==="undefined"){LIR.logFailed=""}LIR.logFailed+="<div><a target='_blank' href='/wiki/File:"+encodeURIComponent(e.replace(/ /g,"_")).replace(/"/g,"%22").replace(/'/g,"%27")+"'>"+e+"</a> --> <a target='_blank' href='/wiki/File:"+encodeURIComponent(t.replace(/ /g,"_")).replace(/"/g,"%22").replace(/'/g,"%27")+"'>"+t+"</a> on <a target='_blank' href='/wiki/"+encodeURIComponent(n.replace(/ /g,"_")).replace(/"/g,"%22").replace(/'/g,"%27")+"'>"+n+"</a></div>";if($("#LIRFailedLog").length>0){document.getElementById("LIRFailedLog").innerHTML=LIR.logFailed;$("#LIRFailedLog div:odd").css("background-color","darkred")}},updateQueueListing:function(){if(typeof localStorage[wgUserName+"_LIRQueueData"]!=="undefined"){LIR.queueData=JSON.parse(localStorage[wgUserName+"_LIRQueueData"])}else{document.getElementById("LIRQueue").innerHTML="<div>There is currently nothing in the queue.</div>";LIR.log("Queue updated.");return false}LIRCurrentQueueData=LIR.queueData;queueToAdd="";for(i=0;i<LIRCurrentQueueData.length;i++){queueToAdd+="<div><a target='_blank' href='/wiki/File:"+encodeURIComponent(LIRCurrentQueueData[i].oldImage.replace(/ /g,"_")).replace(/"/g,"%22").replace(/'/g,"%27")+"'>"+LIRCurrentQueueData[i].oldImage+"</a> --> <a target='_blank' href='/wiki/File:"+encodeURIComponent(LIRCurrentQueueData[i].newImage.replace(/ /g,"_")).replace(/"/g,"%22").replace(/'/g,"%27")+"'>"+LIRCurrentQueueData[i].newImage+"</a> on <a target='_blank' href='/wiki/"+encodeURIComponent(LIRCurrentQueueData[i].title.replace(/ /g,"_")).replace(/"/g,"%22").replace(/'/g,"%27")+"'>"+LIRCurrentQueueData[i].title+"</a></div>"}document.getElementById("LIRQueue").innerHTML=queueToAdd;$("#LIRQueue div:odd").css("background-color","lightgrey");LIR.log("Queue updated.")},showQueueModal:function(){$.showCustomModal("Image link updating queue",'<div id="LIRContainer" style="width: 100%;"> <div id="LIRQueue" style="overflow: scroll; width: 580px; height: 300px; float: left; border: 1px solid black; font-weight: bold; background-color: #FFFFFF;"></div> <div id="LIRLog" style="overflow-x: scroll; height: 300px; width: 200px; float: right; background-color: lightgrey; border: 1px solid black;"></div> <div style="clear: both"></div> <div id="LIRFailedLog" style="width: 790px; margin: 5px auto 0px auto; background-color: red; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll;">Failed items appear here after execution.</div> </div>',{id:"optionsWindow",width:800,buttons:[{id:"close",message:"Close",handler:function(){$(".close").click()}},{id:"resetCounter",message:"Reset waiting pages",handler:function(){if(confirm("This will reset the list of pages waiting to be added to the queue in-case there was a problem processing a page that's preventing you from executing the queue.  \n\nNote that there are still "+(localStorage.LIRQueuedUpdates-localStorage.LIRQueuedUpdatesPos-1)+" page(s) waiting to be added to the queue.  If you are absolutely positive that you currently have no pages open that are waiting in line to be processed or a problem has occured that has halted page processing, then press OK to clear the list of waiting pages. \n\nIf you do have any pages waiting to be processed, you will have to reload and resubmit those pages to the queue to add them.")){localStorage.LIRQueuedUpdates=0;localStorage.LIRQueuedUpdatesPos=1;alert("List of waiting pages cleared")}}},{id:"updateButton",message:"Refresh",handler:function(){LIR.updateQueueListing()}},{id:"executeButton",message:"Execute",defaultButton:true,handler:function(){if(typeof localStorage[wgUserName+"_LIRQueueData"]!=="undefined"&&typeof localStorage[wgUserName+"_LIRPageKey"]!=="undefined"){LIR.log("Queue execution started.");LIR.processQueue(function(){LIR.log("Queue executed.");LIR.updateQueueListing()})}else{LIR.log("No queue exists to be executed")}}}],callback:function(){$(".blackout, .close").off("click").click(function(){if(LIR.started==false||typeof LIR.started==="undefined"){delete LIRCurrentQueueData;delete LIRCurrentPageKey;$("#optionsWindow").remove();$(".blackout").fadeOut(function(){$(this).remove()})}});LIR.log("Queue system opened.");LIR.updateQueueListing()}})}};if(wgPageName.indexOf("Special:MovePage/File:")!=-1){LIR.appendButtonText="<a style='margin-left: 20px;' class='wikia-button' onclick='LIR.start(\"single\")'>"+LIRoptions.singleButtonText+"</a>";if(Storage){LIR.appendButtonText+="<a style='margin-left: 20px;' class='wikia-button' onclick='alert(\"This button has been disabled before a major update is pushed that will render anything currently in the queue incompatible with the newest update.  Please execute anything that you have left in the queue before 7/9/2013 (July 9th) to prevent it from being lost and having to revert any pages that were changed.  Sorry for the inconvenience. Thanks!\");'>"+LIRoptions.queueButtonText+"</a>"}LIR.appendButtonText+="<span id='liveLoader' style='display:none'><img src='https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif' /></span><span id='queueStatus' style='font-weight: bold'></span></span><br /><br /><div style='width: 850px; white-space: normal;'>The <b>\""+LIRoptions.singleButtonText+'"</b> button updates file usages across pages for a single image, while the <b>"'+LIRoptions.queueButtonText+'"</b> button adds the file usages of the image to a queue to be updated at one time as a group. When updating file usages using the queue, usages located on like pages are grouped together into one edit, rather than one edit per usage. The queue can be accessed and executed through any file page inside the "Edit" drop-down. Please note that a saved queue is local to the computer being used, and does not carry over to other computers.</div>';if(LIRoptions.bottomMessage!=""){LIR.appendButtonText+='<br /><div style="font-weight: bold; width: 850px; white-space: normal;">'+LIRoptions.bottomMessage+"</div>"}$("td.mw-submit").append(LIR.appendButtonText)}if(wgCanonicalNamespace=="File"&&Storage){$("#WikiaPageHeader nav ul").append("<li><a onclick='LIR.showQueueModal()'>Queue</a></li>")}