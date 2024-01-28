/* Any JavaScript here will be loaded for all users on every page load. */

function onloadhookcustom() {
  var replace = document.getElementById("OnlineChat");
if (null != replace) {
    var getvalue = replace.getAttribute("class");
    replace.innerHTML='<object width="350" height="450" id="obj_1304928377414"><param name="movie" value="http://althistory.chatango.com/group"/><param name="wmode" value="transparent"/><param name="AllowScriptAccess" VALUE="always"/><param name="AllowNetworking" VALUE="all"/><param name="AllowFullScreen" VALUE="true"/><param name="flashvars" value="cid=1304928377414&b=60&f=50&l=999999&q=999999&s=1&w=0"/><embed id="emb_1304928377414" src="http://althistory.chatango.com/group" width="600" height="450" wmode="transparent" allowScriptAccess="always" allowNetworking="all" type="application/x-shockwave-flash" allowFullScreen="true" flashvars="cid=1304928377414&b=60&f=50&l=999999&q=999999&s=1&w=0"></embed></object><br>[ <a href="http://althistory.chatango.com/clonegroup?ts=1304928377414">Copy this</a> | <a href="http://chatango.com/creategroup?ts=1304928377414">Start New</a> | <a href="http://althistory.chatango.com">Full Size</a> ]';
  }
}

if (window.addEventListener) {window.addEventListener("load",onloadhookcustom,false);}
else if (window.attachEvent) {window.attachEvent("onload",onloadhookcustom);}

/** Collapsible tables **/
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
function collapseTable( tableIndex )
{
    var Button = document.getElementById( "collapseButton" + tableIndex );
    var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if ( Button.firstChild.data == collapseCaption ) {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for ( var i = 1; i < Rows.length; i++ ) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

( function( $, mw ) {
$alert = '<div id="mw-echo-sliding-alert">';
$alert += '<div id="mw-echo-close-box"><img style="display: block;" src="//upload.wikimedia.org/wikipedia/commons/3/36/CloseWindow.svg"/></div>';
$alert += '<div id="mw-echo-alert-text">You have <a href="#" id="mw-echo-talk-link">new messages</a>. (<a href="#" id="mw-echo-talk-diff-link">view changes</a>)</div>';
$alert += '</div>';
$(document).ready(function() {
	var newMsgRevisionId = mw.config.get( 'wgUserNewMsgRevisionId' );
	if ( newMsgRevisionId ) {
		var userName = mw.config.get( 'wgUserName' );
		var talkLink = '/wiki/User_talk:' + userName + '?redirect=no';
		var diffLink = '/w/index.php?title=User_talk:' + userName + '&oldid=' + newMsgRevisionId + '&diff=cur';
		$( 'body' ).append( $alert );
		$( '#mw-echo-close-box' ).click( function( e ) {
			$( '#mw-echo-sliding-alert' ).hide();
			e.preventDefault();
		} );
		$( 'a#mw-echo-talk-link' ).attr( 'href', talkLink );
		$( 'a#mw-echo-talk-diff-link' ).attr( 'href', diffLink );
		mw.config.set( 'echoNewMsgAlertDisplayed', true );
	}
} );
} )( jQuery, mediaWiki );

window.MultiUploadoption = {
    max: 100
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultiUpload.js',
    ]
});

function addInput(name, values)
{
  var textParagraph = document.createElement("p");
  textParagraph.style.display = "inline-block";
  textParagraph.id = name+"_para";
  for (var val in values)
  {
  	var input = document.createElement("input");
  	input.id = values[val]; // set the id to the input element to "input"
    input.type = "radio";
    input.value = values[val];
    input.name = name;
    input.style.display = "inline-block";
    var label = document.createElement("label");
    label.for = values[val];
    label.innerHTML = values[val];
    label.style.display = "inline-block";
    textParagraph.appendChild(input);
    textParagraph.appendChild(label);
  }
  document.getElementById(name).appendChild(textParagraph);
}

function getOutput(values)
{
	var out_val = 0;
	for (var val in values)
	{
		if (document.getElementById(values[val]).checked)
		{
			out_val = document.getElementById(values[val]).value;
			break;
		}
	}
	return out_val;
}

//This code is being used for a temporary purpose and will be deleted at a future date
if (mw.config.get("wgPageName") === "User_blog:Nathan1123/The_Alexander_Parable") {
  document.getElementById("answer_accept").style.display = "none";

  var prefix = ["Spectacular","Crocodile","Dreams of","Story of","Infinite","Age of ","Deadly","Forgotten ","Atomic","Lavish","Hitler's Big","Outstretched","The Ghoulish","Hidden","Pocket full of","Fist full of","King of the","Divergent","Forbidden","Offline","Liquid","Race to the ","In Search of","Return to","Revenge of the","Attack on","Book of the","Roman","Temple of","Inspector","Doctor","Wacky","Unforgivable","Lord of the","Grilled","Shadows over","Danger of","No More","Legend of","Journey to","Skeleton","Expired","The Final","The Last Ever","A Game of","A Whisper of","More","Caesar's Tiny","A Door","It's Either Me or the","Destruction of ","Baby","Scary ","Avoid the","A New Kind of","The Original","Evil","Washington verses","Dealing with the","Curse of the","Beyond","The","Passion of the","One with the","Saturday Night","Centuries of","New"];
  var posfix = ["Octopus","Swimming Pool","Human Condition","Birthday Party","Thank You","Chemicals","Space","Electrode","Pantry","Poison","Didgeridoo","Runner","Zone","Butterfly","Dinosuars","Fire","Water","Ice","Ice Cream","Circles","Square","Cheese","Butterflies","Caliphate","Rome","Mongols","Fight","Day Out","Escape","Death","Monkeys","Sunshine","Computer Virus","Draka","Snake","Scorpion","Laser","Crown","Explosion","Arrival","Skeleton","Train Station","Darkness","Planet","Moon","Choice","Zeplin","Gun","Doom","Boyfriends","Baby","Spiders","Scream","Bomb","Tuesday","Sequel","Wiki","Dash","Challenge","Champion","Pirate","Cowboy","Treasure","Apple","Atlantis","Crusade","Chaos"];
	
  // if the page currently loaded on the wiki this code will be ran
  var dates = [];
  var pres = [];
  var post = [];
  for (var i = 0; i < 6; i++)
  {
  	var choice = Math.floor(Math.random() * 100);
  	var valAdd = 0;
  	// Weighted to make sure more interesting dates come up more often
  	if (choice < 17) { valAdd = Math.floor(Math.random() * 120)+1900; } //1900-Present
  	else if (choice < 34) { valAdd = Math.floor(Math.random() * 620)+1400; } //1400-Present
  	else if (choice < 51) { valAdd = (Math.floor(Math.random() * 40)+100)*10; }  //1000-1400
  	else if (choice < 75) { valAdd = Math.floor(Math.random() * 140)*10; } //1-1400
  	else if (choice < 81) { valAdd = Math.floor(Math.random() * 50)*-10; } //500-1 BC
  	else if (choice < 87) { valAdd = Math.floor(Math.random() * 25)*-100; } //2500-1 BC
  	else if (choice < 93) { valAdd = Math.floor(Math.random() * 12)*-1000; } //12,000-1 BC
  	else
  	{
      	var extreme_dates = ["10,000 BC","20,000 BC","40,000 BC","70,000 BC","100,000 BC","200,000 BC","1 million BC","2 million BC","3 million BC","5 million BC","10 million BC","65 million BC","80 million BC","100 million BC","200 million BC","500 million BC","4.5 billion BC","13.7 billion BC"];
      	var idx = Math.floor(Math.random() * extreme_dates.length);
      	valAdd = extreme_dates[idx];
  	}
  	if (valAdd == 0) { valAdd = 1; }
  	if (valAdd < -9000) { valAdd = (valAdd/-1000) + ",000 BC"; }
  	if (valAdd < 0) { valAdd = valAdd*-1 + " BC"; }
  	if (valAdd < 1000) { valAdd = valAdd + " AD"; }
  	if (dates.includes(valAdd)) { valAdd = 2021; } // Failsafe against duiplicate dates
  	dates.push(valAdd);
  	
  	choice = Math.floor(Math.random() * prefix.length);
  	while (pres.includes(prefix[choice])) { choice = Math.floor(Math.random() * prefix.length); }
  	pres.push(prefix[choice]);
  	choice = Math.floor(Math.random() * posfix.length);
  	while (post.includes(posfix[choice])) { choice = Math.floor(Math.random() * posfix.length); }
  	post.push(posfix[choice]);
  }
  
  document.getElementById("getAnswer").style.display = "inline-block";
  document.getElementById("getAnswer").addEventListener("click", function() {
  	var date = getOutput(dates);
  	if (date == 0) { return; }
  	var pre = getOutput(pres);
  	if (pre == 0) { return; }
  	var pos = getOutput(post);
  	if (pos == 0) { return; }
    document.getElementById("output_span").innerHTML= date + ": " + pre + " " + pos;
    document.getElementById("output_span1").innerHTML= pre + " " + pos;
    document.getElementById("output_span").style.display = "inline-block";
    document.getElementById("output_span1").style.display = "inline-block";
    document.getElementById("answer_accept").style.display = "inline-block";
  }); // add an event listener to the button 
  
  addInput("date_input",dates);
  addInput("prefix_input",pres);
  addInput("posfix_input",post);
  document.getElementById("mw-customcollapsible-scripts50").classList.remove("mw-collapsed");
}