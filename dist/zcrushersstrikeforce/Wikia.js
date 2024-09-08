// <source lang="JavaScript">
 
// WRITTEN BY USER:RAPPY_4187
 
$(function() {
    var rights = {};
 
    /**********************************************************************/
    /******** BEGIN LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS ********/
    /**********************************************************************/
 
    // ADMINISTRATORS
 
    rights["Dark Seeker Kotsu"]    = ["General"],
    rights["Lil' Trunks"]          = ["General"],
    rights["Mr. Steal-Yo-Gurl"]    = ["Colonel"],
    rights["Miricle1778"]          = ["Colonel"],
 
    // CUSTODIANS
 
    rights["Goku777"]              = ["Major"],
    rights["XGlass Reflection"]    = ["Major"],
 
    // CHAT MODERATORS
 
    rights["BullaBrief101"]        = ["Captain"],
  /*rights["Goku777"]              = ["Captain"],*/
  /*rights["Miricle1778"]          = ["Captain"],*/
    rights["Monét"]                = ["Captain"],
    rights["Tjakari"]              = ["Captain"],
 
    // ROLLBACK
 
  /*rights["Goku777"]              = ["Lieutenant"],*/
    rights["JanembaFreak97"]       = ["Lieutenant"],
  /*rights["Tjakari"]              = ["Lieutenant"],*/
 
    // BOTS
 
    rights["WikiaBot"]             = ["Wikia Bot"],
    rights["Wikia"]                = ["Wikia Bot"],
    rights["LTBot"]                = ["Bot"];
 
    /**********************************************************************/
    /********* END LIST OF ACCOUNTS GIVEN EXTRA USER RIGHTS ICONS *********/
    /**********************************************************************/
 
    if (typeof rights[wgTitle] != "undefined") {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {
            // add new rights
            $('<span class="tag" style="margin-left:10px;">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
        }
    }
});
 
// </source>
 
 
 
/* <source lang=javascipt"> */
function asyncRequest(b,c,e,a){var d=sajax_init_object();if(d==null){return}d.open(b,c,true);d.onreadystatechange=function(){if(d.readyState!=4){return}if(d.status==200){e.success(d)}else{e.failure(d)}};d.setRequestHeader("Pragma","cache=yes");d.setRequestHeader("Cache-Control","no-transform");d.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");d.send(a)}var ratings=new Object();ratings.getCallback={success:function(o){var j=jQuery.parseJSON(o.responseText);try{with(j.query.wkvoteart[wgArticleId]){if(typeof votesavg!=undefined&&votesavg){ratings.avgVote=(5>=votesavg>=1?Math.round(votesavg*10)/10:5);ratings.text[0]=("Average rating: "+ratings.avgVote)}if(typeof(uservote)!="undefined"&&uservote){ratings.myVote=uservote;ratings.hasVoted=true}else{ratings.hasVoted=false}ratings.paint(0)}}catch(e){}},failure:function(a){ratings.out("Connection failure :(")}};ratings.vote=function(c){if(wgUserName==null){window.location="/wiki/Special:Userlogin?returnto="+wgPageName;return}var d=(ratings.hasVoted==true?"update":"insert");ratings.get=asyncRequest("GET","/api.php?format=json&action="+d+"&list=wkvoteart&wkuservote=1&wkctime=5&wkpage="+wgArticleId+"&wkvote="+c,ratings.voteCallback,null);ratings.myVote=c;ratings.paint(c,"Sending the rating...");ratings.votingInProgress=true};ratings.voteCallback={success:function(o){var j=jQuery.parseJSON(o.responseText);if(j.item.wkvoteart[3]!=undefined&&ratings.retried!=true){ratings.retried=true;ratings.out("failed, retrying...");ratings.get=asyncRequest("GET","/api.php?format=json&action=delete&list=wkvoteart&wkpage="+wgArticleId,ratings.retry,null);return}try{with(j.item.wkvoteart[0]==undefined?j.item.wkvoteart:j.item.wkvoteart[0]){ratings.hasVoted=true;ratings.myVote=vote;ratings.avgVote=Math.round(avgvote*10)/10;if(ratings.avgVote>5){ratings.avgVote=5}}}catch(e){ratings.out("Error: "+e);ratings.votingInProgress=false;return}ratings.votingInProgress=false;ratings.out("Thank you for rating!");ratings.text[0]=("Average rating: "+ratings.avgVote);ratings.timeout=setTimeout("ratings.paint(0)",1000)},failure:function(a){ratings.votingInProgress=false;ratings.out("Connection failure :(")}};ratings.retry={success:function(a){ratings.get=asyncRequest("GET","/api.php?format=json&action=insert&list=wkvoteart&wkuservote=1&wkctime=5&wkpage="+wgArticleId+"&wkvote="+ratings.myVote,ratings.voteCallback,null)},failure:function(a){ratings.out("error")}};ratings.out=function(a){document.getElementById("ratingMsg").innerHTML=a};ratings.paint=function(d,c){if(ratings.votingInProgress==true){return}document.getElementById("vote-1").style.backgroundPosition="0 0";document.getElementById("vote-2").style.backgroundPosition="0 0";document.getElementById("vote-3").style.backgroundPosition="0 0";document.getElementById("vote-4").style.backgroundPosition="0 0";document.getElementById("vote-5").style.backgroundPosition="0 0";for(var i=1;i<=d;i++){document.getElementById("vote-"+i).style.backgroundPosition="0 -34px"}if(d===0&&(ratings.myVote!=false||ratings.avgVote!=undefined)){var e=ratings.hasVoted==true?"0 -34px":"0 -17px";var f=ratings.hasVoted!=false?ratings.myVote:ratings.avgVote;for(var i=1;i<=f;i++){document.getElementById("vote-"+i).style.backgroundPosition=e}if(i-ratings.avgVote<1&&i<=5&&ratings.hasVoted!=true){var h=ratings.avgVote-(i-1);var g=0;switch(true){case 0<h&&h<=0.2:g="-51px";break;case 0.2<h&&h<=0.4:g="-68px";break;case 0.4<h&&h<=0.6:g="-85px";break;case 0.6<h&&h<=0.8:g="-102px";break;case 0.8<h&&h<1:g="-119px";break;default:}document.getElementById("vote-"+i).style.backgroundPosition="0px "+g}}if(wgUserName==null&&d!=0){ratings.out("Log in to rate")}else{if(c==undefined){ratings.out(ratings.text[d])}else{ratings.out(c)}}};ratings.setup=function(){if(wgIsArticle==false||ratings.disabled==true){return}if((wgNamespaceNumber!=0&&wgNamespaceNumber!=2)||(wgAction!="view"&&wgAction!="purge")){return}if(skin=="oasis"){var c=document.getElementsByClassName("container")[0];if(!c){return false}var b=c.parentNode}else{var c=document.getElementById("catlinks");if(!c){return false}var b=c}ratings.p=document.createElement("div");ratings.p.innerHTML='<h2>What do you think about this page?</h2><div id="ratingBody"><div><ul id="ratingStars" onmouseout="ratings.paint(0);"><li id="vote-1" class="voteStar" onmouseover="ratings.paint(1)" onclick="ratings.vote(1);">&nbsp;1</li><li id="vote-2" class="voteStar" onmouseover="ratings.paint(2)" onclick="ratings.vote(2);"> 2</li><li id="vote-3" class="voteStar" onmouseover="ratings.paint(3)" onclick="ratings.vote(3);"> 3</li><li id="vote-4" class="voteStar" onmouseover="ratings.paint(4)" onclick="ratings.vote(4);"> 4</li><li id="vote-5" class="voteStar" onmouseover="ratings.paint(5)" onclick="ratings.vote(5);"> 5&nbsp;</li></ul></div><span id="ratingMsg">Rate this page!</span></div>';ratings.p.id="p-rating";b.parentNode.insertBefore(ratings.p,b);ratings.text=new Array("Rate this page!","A crap","Boring","Funny","Excellent","Perfect!");ratings.get=asyncRequest("GET","/api.php?format=json&action=query&list=wkvoteart&wkuservote=1&wkctime=5&wkpage="+wgArticleId,ratings.getCallback,null)};ratings.setup();

importScriptPage('RelatedDiscussionsModule/code.js', 'dev');
/* </source> */
 
if (wgCanonicalNamespace == "User" || wgCanonicalNamespace == "User talk") {
$(function () {
    var newTitle = $("#title-meta").html();
    if (!newTitle) return;
    var edits = $("#user_masthead_since").text();
    $(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
    //$(".user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});
}

/* <source lang=javascipt"> */
importScriptPage('QuickTools/code.js', 'dev');
/* </source> */