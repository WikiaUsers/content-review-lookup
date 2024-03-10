if (location.hostname.match(/\b(wikia.com)\b/g)=="wikia.com"){
var images = [], 
index = 0;
images[0] = "<img src='https://images.wikia.nocookie.net/pbskids/images/2/2a/Dot.png' alt='Dot.png'/>";
images[1] = "<img src='https://images.wikia.nocookie.net/pbskids/images/5/55/Dash.png' alt='Dash.png'/>";
index = Math.floor(Math.random() * images.length);

if (location.hostname=="pbskids.wikia.com"){var key = "You are now in headquarters!"}else{if (location.hostname=="arthur.wikia.com"){var key = "You are now in Arthur Wiki!"}else{if (location.hostname=="barney.wikia.com"){var key = "You are now in Barney Wiki!"}else{if (location.hostname=="berenstainbears.wikia.com"){var key = "You are now in Berenstain Bears Wiki!"}else{if (location.hostname=="caillou.wikia.com"){var key = "You are now in Caillou Wiki!"}else{if (location.hostname=="clifford.wikia.com"){var key = "You are now in Clifford Wiki!"}else{if (location.hostname=="cyberchase.wikia.com"){var key = "You are now in Cyberchase Wiki!"}else{if (location.hostname=="danieltigerneighborhood.wikia.com"){var key = "You are now in Daniel Tiger's Neighborhood Wiki!"}else{if (location.hostname=="dtrain.wikia.com"){var key = "You are now in Dinosaur Train Wiki!"}else{if (location.hostname=="fetch.wikia.com"){var key = "You are now in Fetch with!"}else{if (location.hostname=="martha-speaks.wikia.com"){var key = "You are now in Martha Speaks Wiki!"}else{if (location.hostname=="magicschoolbus.wikia.com"){var key = "You are now in The Magic Schoolbus Wiki!"}else{if (location.hostname=="sagwa.wikia.com"){var key = "You are now in Sagwa Wiki!"}else{if (location.hostname=="ttte.wikia.com"){var key = "You are now in Thomas & Friends Wiki!"}else{if (location.hostname=="wildkratts.wikia.com"){var key = "You are now in Wild Kratts Wiki!"}else{if (location.hostname=="wordgirl.wikia.com"){var key = "You are now in Word Girl Wiki!"}else{var key = "<span class='explain' title='This wiki is NOT listed officially in the system and or this page is invaild' style='color: Red;'>This wiki is Unauthorized to use this template!</span>"}}}}}}}}}}}}}}}}

if (location.hostname=="arthur.wikia.com"){var cl0 ="<b>Arthur</b>"}else{cl0 ="<a href='http://arthur.wikia.com/' class='a' title='Arthur Wiki'>Arthur</a>"}

if (location.hostname=="barney.wikia.com"){var cl1 ="<b>Barney</b>"}else{var cl1 ="<a href='http://barney.wikia.com/' class='extiw' title='Barney Wiki'>Barney</a>"}

if (location.hostname=="berenstainbears.wikia.com"){var cl2 ="<b>Berenstain Bears</b>"}else{var cl2 ="<a href='http://berenstainbears.wikia.com/' class='extiw' title='Berenstain Bears Wiki'>Berenstain Bears</a>"}

if (location.hostname=="caillou.wikia.com"){var cl3 ="<b>Caillou</b>"}else{var cl3 ="<a href='http://caillou.wikia.com/' class='extiw' title='Caillou Wiki'>Caillou</a>"}

if (location.hostname=="clifford.wikia.com"){var cl4 ="<b>Clifford</b>"}else{var cl4 ="<a href='http://clifford.wikia.com/' class='extiw' title='Clifford Wiki'>Clifford</a>"}

if (location.hostname=="cyberchase.wikia.com"){var cl5 ="<b>Cyberchase</b>"}else{var cl5 ="<a href='http://cyberchase.wikia.com/' class='extiw' title='Cyberchase Wiki'>Cyberchase</a>"}

if (location.hostname=="danieltigerneighborhood.wikia.com"){var cl6="<b>Daniel Tiger's Neighborhood</b>"}else{var cl6="<a href='http://danieltigerneighborhood.wikia.com/' class='extiw' title='Daniel Wiki'>Daniel Tiger's Neighborhood</a>"}

if (location.hostname=="dtrain.wikia.com"){var cl7 ="<b>Dinosaur Train</b>"}else{var cl7 ="<a href='http://dtrain.wikia.com/' class='extiw' title='Dinosaur Train Wiki'>Dinosaur Train</a>"}

if (location.hostname=="fetch.wikia.com"){var cl8 ="<b>Go Fetch!</b>"}else{var cl8 ="<a href='http://fetch.wikia.com/' class='extiw' title='Fetch Wiki'>Go Fetch!</a>"}

if (location.hostname=="martha-speaks.wikia.com"){var cl9 ="<b>Martha Speaks</b>"}else{var cl9 ="<a href='http://martha-speaks.wikia.com/' class='extiw' title='Martha Speaks Wiki'>Martha Speaks</a>"}

if (location.hostname=="magicschoolbus.wikia.com"){var cl10 ="<b>The Magic School Bus</b>"}else{var cl10 ="<a href='http://magicschoolbus.wikia.com/' class='extiw' title='The Magic School Bus Wiki'>The Magic School Bus</a>"}

if (location.hostname=="sagwa.wikia.com"){var cl11 ="<b>Sagwa, the Chinese Siamese Cat</b>"}else{var cl11 ="<a href='http://sagwa.wikia.com/' class='extiw' title='Sagwa Wiki'>Sagwa, the Chinese Siamese Cat</a>"}

if (location.hostname=="ttte.wikia.com"){var cl12 ="<b>Thomas & Friends</b>"}else{var cl12 ="<a href='http://ttte.wikia.com/' class='extiw' title='Thomas & Friends Wiki'>Thomas & Friends</a>"}

if (location.hostname=="wildkratts.wikia.com"){var cl13 ="<b>Wild Kratts</b>"}else{var cl13 ="<a href='http://wildkratts.wikia.com/' class='extiw' title='Wild Kratts Wiki'>Wild Kratts</a>"}

if (location.hostname=="wordgirl.wikia.com"){var cl14 ="<b>WordGirl</b>"}else{var cl14 ="<a href='http://wordgirl.wikia.com/' class='extiw' title='WordGirl Wiki'>WordGirl</a>"}

function randomlinks(){
var myrandom=Math.round(Math.random()*14);
var links=new Array();
links[0]="http://arthur.wikia.com/";
links[1]="http://barney.wikia.com/";
links[2]="http://berenstainbears.wikia.com/";
links[3]="http://caillou.wikia.com/";
links[4]="http://clifford.wikia.com/";
links[5]="http://cyberchase.wikia.com/";
links[6]="http://danieltigerneighborhood.wikia.com/";
links[7]="http://dtrain.wikia.com/";
links[8]="http://fetch.wikia.com/";
links[9]="http://martha-speaks.wikia.com/";
links[10]="http://magicschoolbus.wikia.com/";
links[11]="http://sagwa.wikia.com/";
links[12]="http://ttte.wikia.com/";
links[13]="http://wildkratts.wikia.com/";
links[14]="http://wordgirl.wikia.com/";
window.location=links[myrandom]
}

var obj= "<style>a {color: rgb(0, 108, 176);text-decoration: none;}</style><table style='padding-top: 0.1em; padding-right: 0.1em; padding-bottom: 0.1em; padding-left: 0.1em; margin-right: 0px; margin-left: 0px; margin-top: 1em; width: 100%; border-top-width: 4px; border-right-width: 4px; border-bottom-width: 4px; border-left-width: 4px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(51, 175, 227); border-right-color: rgb(51, 175, 227); border-bottom-color: rgb(51, 175, 227); border-left-color: rgb(51, 175, 227); background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.496094), rgba(255, 255, 255, 0) 5px, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.296875)); background-color: rgb(220, 235, 246); display: inline-table; box-shadow: rgb(56, 79, 88) 2px 2px 2px; -webkit-box-shadow: rgb(56, 79, 88) 2px 2px 2px; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; margin-bottom: 25px; ' cellspacing='2' cellpadding='5'><tbody><tr><td rowspan='2' style='text-align: center; width: 100px; '><p><span title='Click here to visit PBS Kids wiki!'><a class='text' href='http://pbskids.wikia.com/wiki/'>"+images[index]+"</a></span></p><p><br/><a href='http://pbskids.wikia.com/wiki/Special%3AChat' class='extiw' title='w:c:pbskids:Special:Chat'><span title='This will lead you to PBS Kids wiki chatroom!'>Join the Chatroom!</span></a><br/><a href='http://pbskids.wikia.com/wiki/PBS_Kids_Wiki%3AAdd_a_New_Wiki' class='extiw' title='w:c:pbskids:PBS Kids Wiki:Add a New Wiki'><span title='Make a new wiki based on any PBS Kids show that hasn't been issued on wikia and or our wiki! Please don't duplicate an existing wiki.'>Add a New Show!</span></a><br/><a href='http://pbskids.wikia.com/wiki/Reports' class='extiw' title='w:c:pbskids:Reports'><span title='You can report any bugs or glitches about this footer. Also, any community and or personal issues!'>Report an Issue!</span></a></p></td><td rowspan='2' style='text-align: center; width: 200px; '><div style='font-size: 100%; height: 128px; font-weight: bold; text-align: left; overflow-x: auto; overflow-y: auto; padding-right: 10px; '><p><big><b target='_blank'>PBS Kids Wikis! - "+key+"</b></big><br/></p><p><b/></p><p><b>"+cl0+" • "+cl1+" • "+cl2+" • "+cl3+" • "+cl4+" • "+cl5+" • "+cl6+" • "+cl7+" • "+cl8+" • "+cl9+" • "+cl10+" • "+cl11+" • "+cl12+" • "+cl13+" • "+cl14+" • <a href='#' class='extiw' title='Click here if you are not sure where to go!' onClick='randomlinks()'>Choose a Random Wiki!</a></b></p><b/></div></td></tr></tbody></table>";

document.write(obj);
}else{
	var obj= "<p>Widget is only compatible with wikia.com</p>";
	document.write(obj);
}