(function(){
function $n(ID,root) {return (root||document).getElementById(ID);};
var _$=$n;
function addGlobalStyle(css) {var head, style;head = document.getElementsByTagName('head')[0];if (!head) { return; };style = document.createElement('style');style.type = 'text/css';style.innerHTML = css;head.appendChild(style);};
function click(e) {if(!e && typeof e=='string') e=document.getElementById(e);if(!e) return;var evObj = e.ownerDocument.createEvent('MouseEvents');evObj.initMouseEvent("click",true,true,e.ownerDocument.defaultView,0,0,0,0,0,false,false,false,false,0,null);e.dispatchEvent(evObj);};
function createElement(a,b,c) {if(a=="text") {return document.createTextNode(b);};var ret=document.createElement(a.toLowerCase());if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);else if(",style,accesskey,id,name,src,href,which,rel,action,method,value,data-ft".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);else ret[prop]=b[prop];if(c) c.forEach(function(e) { ret.appendChild(e); });return ret;};
function getDocName() {return document.location.pathname;};
function remove(e) {var node=(typeof e=='string')?$(e):e; if(node) node.parentNode.removeChild(node); node=null;};
function timeStamp(){return (new Date()).getTime();};

function selectNodes(xPath,params){params=(params||{});return (params['doc']||document).evaluate(xPath,(params['node']||document),null,(params['type']||6),null);};
function selectSingleNode(xPath,params){params=params||{}; params['type']=9;return selectNodes(xPath,params).singleNodeValue;};
function forNodes(xPath,params,fx){if(!fx) return;var nodes = selectNodes(xPath,params);if (nodes.snapshotLength) {for (var i=0,node;(node=nodes.snapshotItem(i));i++) {fx(node);}}nodes=null;};

String.prototype.startsWith = function(s) {return (this.match("^"+s)==s)};
String.prototype.endsWith = function(s) {return (this.match(s+"$")==s)};
String.prototype.find = function(s) {return (this.indexOf(s) != -1);};
String.prototype.contains = function(s) {return (this.indexOf(s) != -1);};
String.prototype.noSpaces = function(s) {return (this.replace(/\s+/g,''));};
String.prototype.upperWords = function(s) {return (this+'').replace(/^(.)|\s(.)/g, function($1){return $1.toUpperCase();});};
String.prototype.repeat = function(n) {return new Array(n+1).join(this);};
String.prototype.noLineBreaks = function(s) {return (this.replace(/(\r\n|\n|\r)/gm," "));};
String.prototype.unQuote = function() {return this.replace(/^"|"$/g, '');};
String.prototype.unBracket = function() {return this.replace(/^\[|\]$/g, '');};
String.prototype.trim = function(){return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');};
String.prototype.getUrlParam = function(s) {try{return this.split(s+"=")[1].split("&")[0];} catch(e){return "";}};

String.prototype.addWord= function(word){var words = this.split(" ");if (!words.inArray(word)) return this+" "+word;return this;};		
String.prototype.removeWord= function(word){return this.split(" ").removeByValue(word).join(" ");};
String.prototype.containsWord= function(word){return this.split(" ").inArray(word);};
String.prototype.replaceWord= function(word,word2){return this.split(" ").replace(word,word2).join(" ");};
String.prototype.toggleWord= function(word){if (this.containsWord(word)) return this.removeWord(word); return this.addWord(word);};

Array.prototype.swap = function (x,y) {var b = this[x];this[x] = this[y];this[y] = b;return this;};
Array.prototype.inArray = function(value) {for(var i=this.length-1; i>=0; i--) {if(this[i]==value) return true;} return false;};
Array.prototype.inArrayWhere = function(value) {for(var i=0,l=this.length; i<l; i++) {if(this[i]==value) return i;}return false;};
Array.prototype.last = function() {return this[this.length - 1];};
Array.prototype.removeByValue = function(val) {var i=this.inArrayWhere(val);if(i)this.splice(i,1);return this;};
Array.prototype.replace = function(val, val2) {var i=this.inArrayWhere(val);if(i)this[i]=val2;return this;};
Array.prototype.remove = function(i) {this.splice(i,1); return this;};
Array.prototype.pickRandom = function () {var i=Math.floor(Math.random()*this.length); return this[i];};

var isProtected;
var sections={};

var jsVoid="javascript:void(0)";

var colors = {
	EAborder_green:"#84B73A",	EAborder_blue:"#81ADDC",	EAinner_blue:"#C2DEFF",		EAinner_white:"#FFFDF8",
	EAinner_gold:"#E8A406",		EAborder_gold:"#C69200",	EAborder_yellow:"#FFAD00",	EAinner_yellow:"#FFF202",
	EAborder_dkgray:"#39312C",	EAinner_dkgray:"#62544B",	EAborder_gray:"#776655",	EAinner_gray:"#9A8979",
	EAborder_red:"#AB0000",		EAinner_red:"#D70000",		EAborder_purple:"#9C2BD4",	EAinner_purple:"#DC96F8",
	EAborder_brown:"#663300",	EAinner_brown:"#D4872E",	EAborder_silver:"#969696",	EAinner_silver:"#BFBFBF",
	EAinner_tan:"#FAC158",		EAborder_tan:"#D46111",		EAborder_dkblue:"#3780AE",	EAinner_dkblue:"#5094C1",

	FrVborder_green:"#256E46",	FrVinner_green:"#46B754",	FrVhl_green:"#A6E11D",		FrVborder_silver:"#666666",
	FrVinner_silver:"#999999",	FrVhl_silver:"#C3C3C3",		FrVborder_blue:"#057499",	FrVinner_blue:"#51C2FB",
	FrVhl_blue:"#53C4FB",		FrVinner_red:"#C3463A",		FrVhl_red:"#EA1515",		FrVinner_purple:"#AE81EB",
	FrVhl_purple:"#A35BF9",		FrVinner_yellow:"#FFCC0",	FrVhl_yellow:"#FFCC33",		FrVborder_tan:"#645433",
	FrVinner_tan:"#D5B778",		FrVhl_tan:"#E8D6AA",		FrVinner_black:"#22335A",	FrVborder_black:"#080200",

	RwFborder_green:"#046804",	RwFinner_green:"#4B7C00",	RwFhl_green:"#7DC400",		RwFborder_blue:"#024D7B",
	RwFinner_blue:"#294A7F",	RwFhl_blue:"#5898C6",		RwFborder_silver:"#616566",	RwFinner_silver:"#ABB5BD",
	RwFhl_silver:"#CeD4D6",		RwFborder_red:"#7C0F06",	RwFinner_red:"#A2180C",		RwFhl_red:"#C11E0F",
	RwFborder_gold:"#4E391A",	RwFinner_gold:"#D6AB28",	RwFhl_gold:"#ECD133",		RwFinner_aqua:"#3FDD67",
	RwFhl_aqua:"#63F277",

	TIborder_blue:"#13B9F1",	TIinner_blue:"#A5E1F9",		TIborder_purple:"#600E57",	TIinner_purple:"#C763A9",
	TIborder_red:"#FF0101",		TIinner_red:"#F15A5A",		TIborder_aqua:"#0E857B",	TIinner_aqua:"#00ACA0",
	TIborder_green:"#737B35",	TIinner_green:"#8DC63F",	TIborder_gold:"#7F6E0E",	TIinner_gold:"#F9DF21",
	TIborder_tan:"#BE9834",		TIinner_tan:"#E6D473",		TIborder_brown:"#3F300C",	TIinner_brown:"#C5A84C",

	FBborder_blue:"#3B5998",	FBinner_blue:"#627AAD",		FBhl_blue:"#F2F2F2",
};

var imgs = {
	logo : "http://i43.tinypic.com/2h660py.png",
	icon : "http://i56.tinypic.com/s46edh.jpg",
	fb : "http://i1212.photobucket.com/albums/cc445/gmbha1/facebook.gif",
	plugin : "http://i52.tinypic.com/jkfxmw.png",
	pluginwm : "http://i52.tinypic.com/28vsw01.png",
	filter : "http://i632.photobucket.com/albums/uu45/kirkshulman/main-icon-filter-normal.png",
	noimage : "http://i230.photobucket.com/albums/ee21/trssdetroit8/noimage.jpg",
	warning : "http://i1200.photobucket.com/albums/bb334/Toby99976/Icons%20Symbols%20Warning%20Caution%20Comment%20Minichan/Farm-Fresh_exclamation.png",
	excluded : "http://i51.tinypic.com/fu2stw.png",
	identified : "http://i53.tinypic.com/2n0j6ds.png",
	grid50 : "http://i43.tinypic.com/11aerk7.png",
	tool : "http://i255.photobucket.com/albums/hh126/roballey/Icons/tool_24x24.png",
	movetotop : "http://i1181.photobucket.com/albums/x430/merricksdad/Image23-2.png",
	movetobottom : "http://i1181.photobucket.com/albums/x430/merricksdad/Image17-2.png",
	do2 : "http://i1181.photobucket.com/albums/x430/merricksdad/icon_do-2.png",
	markasfailed : "http://i1181.photobucket.com/albums/x430/merricksdad/Image25-2.png",
	markasaccepted : "http://i1181.photobucket.com/albums/x430/merricksdad/Image24-1.png",
	clean : "http://i1181.photobucket.com/albums/x430/merricksdad/Image15-2.png",
	reidentify : "http://i1181.photobucket.com/albums/x430/merricksdad/Image16-2.png",
	reidentify2 : "http://i1181.photobucket.com/albums/x430/merricksdad/Image14-2.png",
	tag : "http://i1181.photobucket.com/albums/x430/merricksdad/Image19-1.png",
	tack : "http://i1181.photobucket.com/albums/x430/merricksdad/Image21.png",
	likepost : "http://i1181.photobucket.com/albums/x430/merricksdad/Image30.png",
	pause : "http://i1110.photobucket.com/albums/h457/Sangrita84/pause.png",
	stop : "http://i1181.photobucket.com/albums/x430/merricksdad/stop.png",
	play : "http://i1181.photobucket.com/albums/x430/merricksdad/play.png",
	feeds : "http://i1181.photobucket.com/albums/x430/merricksdad/feeds.png",
	classic : "http://i1181.photobucket.com/albums/x430/merricksdad/list.png",
	dev : "http://i1181.photobucket.com/albums/x430/merricksdad/details.png",
	short : "http://i1181.photobucket.com/albums/x430/merricksdad/icons.png",
	priority : "http://i1181.photobucket.com/albums/x430/merricksdad/priority.png",
	check : "http://i1181.photobucket.com/albums/x430/merricksdad/check.png",
	refresh : "http://i1181.photobucket.com/albums/x430/merricksdad/refresh1.png",
	newwindow: "http://i1181.photobucket.com/albums/x430/merricksdad/newwindow.png",
};

var css = ""+
	
	"#WikiHeader {background-color: #3EB5F9; background-image: -moz-linear-gradient(center top , #3EB5F9 0%, #024FC3 100%);}\n"+

	".section_header_holder {max-width: 668px; border-radius: 5px 5px 5px 5px;padding:0 6px 0 6px !important; margin-bottom:6px !important; }\n"+
	".section_kids {border-radius: 0 0 5px 5px;border: 1px solid #000000 !important;border-top:0 !important;padding: 0 6px 6px !important;margin: 0 6px 0 6px !important;}\n"+

	"div.config_var span.config_var {display:inline-block !important; margin-left:10px !important;}\n"+
	"div.config_var {margin:0 !important; padding: 2px 0 2px 0 !important;}\n"+
	".optionblock_label {display:block; font-size:11px !important;}\n"+
	".block_select_all {margin-top:4px; background: #ccffff url('http://i55.tinypic.com/6ih93q.png') no-repeat center;width:17px;height:17px;border-radius: 2px 2px 2px 2px;}\n"+
	".block_select_none {margin-top:4px; background: #ccffff url('http://i55.tinypic.com/2lk2xyw.png') no-repeat center;width:17px;height:17px;border-radius: 2px 2px 2px 2px;}\n"+
	".field_label {font-size:11px !important;}\n"+
	".newopt {background:#027B09 !important;}\n"+
	".link_label, a.external {line-height:19px; position:relative;z-index:1;padding:2px 6px 2px 6px; border-radius: 0px 25px 0px 25px / 0px 100px 0px 100px; text-decoration:none;border: 1px solid black; color:black !important; background:#EFF2F7 !important;}\n"+
	".link_label:hover, a.external:hover, .link_label:active, a.external:active {z-index:1; background:#D8DFEA !important;}\n"+
	"span.field_label:not([class*=\"separator\"]) {margin-right:8px !important;} label.field_label {margin:0 !important;}\n"+
	"span > label.field_label {margin-right:0 !important;}\n"+

	"input[type=\"text\"] {text-align: center !important;color: #CCCCCC !important; background: -moz-linear-gradient(center top , #080200 0%, #22335A 100%) repeat scroll 0 0 transparent !important; border-radius: 4px !important; border: 1px solid #4E483D !important;}\n"+

	".tab_element {display:inline !important;}\n"+
	".tab_header {background:-moz-linear-gradient(center top , #141414 0%, #424141 100%) repeat scroll 0 0 transparent !important;color:#D5D4D4 !important; padding:2px 6px;border:1px solid #000000; border-radius: 5px 5px 0 0; margin:0 !important; font-size: 13px !important; line-height:19px !important; font-weight: 700 !important; text-decoration:none !important;position:relative;z-index:0;}\n"+
	".tab_body {padding: 0 6px 0 6px !important;margin: 0 !important; background:#424141 !important;border-radius: 0 5px 5px 5px;border: 1px solid #000000 !important;display:none;position:relative;z-index:1;top:-1px;}\n"+
	".tab_selected {background:-moz-linear-gradient(center top , #424141 0%, #424141 100%) repeat scroll 0 0 transparent !important;border-bottom:0 !important;color:white !important; z-index:2;}\n"+

	".inline {display:inline-block;}\n"+
	".block {display:block;}\n"+
	".underline {border-bottom:1px solid #70BAFF;}\n"+
	".hidden {display:none;}\n"+
	".highlight {background:#94BC41 !important; color:#000000;}\n"+
	".rotate {-moz-transform: rotate(-90deg);}\n"+

	".text_border_sep {font-family:tahoma; text-shadow: -1px -1px 1px #007195, 1px 1px 1px #007195, 1px -1px 1px #007195, -1px 1px 1px #007195;text-transform:uppercase; font-weight:900 !important;}\n"+
	".text_border_sec {font-family:tahoma; text-shadow: -1px -1px 1px #000000, 1px 1px 1px #000000, 1px -1px 1px #000000, -1px 1px 1px #000000;text-transform:uppercase; font-weight:900 !important;}\n"+

	"p,blockquote,ul {margin-top:0 !important;}\n"+
	".WikiaArticle a.external:after {background-image: none !important;display: none !important;padding:0 !important;}\n"+

	".section_header {font-family:tahoma; text-transform:uppercase; font-weight:900 !important; border:2px solid;border-radius: 5px; color:#FEFEFE !important;display:block;line-height:19px !important;text-decoration:none !important;text-align:left;padding:1px 6px !important;font-size: 15px !important; }\n"+
	".section_header:hover, .section_header:active {font-size:larger !important;}\n"+
	".shadow2 {box-shadow:1px 1px 1px #000000;}\n"+
	".shadow1 {box-shadow:0px 0px 1px #000000;}\n"+

	".sh2 {text-shadow: -1px -1px 1px #39312C, 1px 1px 1px #39312C, 1px -1px 1px #39312C, -1px 1px 1px #39312C;border-color:#39312C; background:#62544B !important; text-decoration:none !important;text-align:center;}\n"+
	".sh2:hover, .sh2:active {background:#776655 !important;}\n"+

	".sh3 {text-shadow: -1px -1px 1px #057499, 1px 1px 1px #057499, 1px -1px 1px #057499, -1px 1px 1px #057499;border-color:#057499; background:#51C2FB !important; }\n"+
	".sh3:hover, .sh3:active {background:#C2DEFF !important;}\n"+

	".sh4 {text-shadow: -1px -1px 1px #256E46, 1px 1px 1px #256E46, 1px -1px 1px #256E46, -1px 1px 1px #256E46;border-color:#256E46; background:#46B754 !important; font-size: 13px !important; text-transform:none !important;}\n"+
	".sh4:hover, .sh4:active {background:#A6E11D !important;}\n"+

	".sh5 {text-shadow: -1px -1px 1px #666666, 1px 1px 1px #666666, 1px -1px 1px #666666, -1px 1px 1px #666666;border-color:#666666; background:#999999 !important; font-size: 13px !important; text-transform:none !important;}\n"+
	".sh5:hover, .sh5:active {background:#C3C3C3 !important;}\n"+

	//".WikiaMainPageBanner {display:none !important;}\n"+
	".WikiaArticle {position:static !important;z-index:auto;}\n"+

	".editsection {float:right !important; margin-right:10px !important; line-height:19px; padding-top:3px;}\n"+

	"#toc,#WikiaSpotlightsModule {display:none !important;}\n"+

	".black a{color:#000000 !important;}\n"+

	"a.altLink {background: gray !important;left:-5px !important;padding: 0 4px 0 5px !important;position: relative !important;z-index: 0 !important;}\n"+

	".fake {display:table;}\n"+

	"#Latest_activity ul li {border-bottom: 1px solid black;margin-bottom: 6px;padding-bottom: 6px;}\n"+
	"#wikia_recent_activity ul li {border-bottom: 1px solid black;margin-bottom: 6px;padding-bottom: 6px;}\n"+

	".activity {padding-bottom:10px;}\n"+
	".activity .title {font-weight:bold;}\n"+
	".activity .comment {margin-left:10px; line-height:12px; font-size:10px; vertical-align:middle;}\n"+
	".activity .who {margin-left:10px; line-height:12px; font-size:10px; vertical-align:middle;}\n"+


	//Wikia 2 layout

	".jsSection {position:relative; letter-spacing:-1px;}\n"+

	".header1 {padding-bottom: 10px; padding-top:10px; display:block; font-family:Arial Black, Impact, Charcoal, sans-serif; font-size:23pt; font-style:normal; text-transform:uppercase;font-weight:bold;}\n"+
	".header2 {padding-bottom: 10px; padding-top:10px; display:block; font-family:Arial Black, Impact, Charcoal, sans-serif; font-size:20pt; font-style:normal; text-transform:normal;font-weight:normal;}\n"+
	".header3 {padding-bottom: 10px; padding-top:10px; display:block; font-family:Arial Black, Impact, Charcoal, sans-serif; font-size:18pt; font-style:normal; text-transform:normal;font-weight:bold;}\n"+
	".header4 {padding-bottom: 10px; padding-top:10px; display:block; font-family:Arial Black, Impact, Charcoal, sans-serif; font-size:16pt; font-style:normal; text-transform:normal;font-weight:bold;}\n"+
	".header5 {padding-bottom: 10px; padding-top:10px; display:block; font-family:Arial Black, Impact, Charcoal, sans-serif; font-size:14pt; font-style:normal; text-transform:normal;font-weight:bold;}\n"+

	".story {display:block;  font-family:Arial, Impact, Charcoal, sans-serif; font-size:12pt; font-style:italic; text-transform:normal;font-weight:normal;}\n"+
	".content {display:block; letter-spacing: 0px; word-spacing:2px; font-family:Arial, Impact, Charcoal, sans-serif; font-size:12pt; font-style:normal; text-transform:normal;font-weight:normal; margin-left:10px; border-left:1px solid black; border-bottom:2px solid black; border-radius:10px; padding:10px; margin-bottom:7px; }\n"+

	"#jsTOC {display:table-cell; background-color: rgba(0, 0, 0, 0.75); border-radius: 0 10px 10px 0; padding: 10px; z-index: 20000001; width:252px;}\n"+
	"#jsBody {display:table-cell; }\n"+

	".tocFloater {display:block; position:fixed;}\n"+
	".tocTitle {display:block; font-family:Arial Black, Impact, Charcoal, sans-serif; font-size:16pt; font-style:normal; text-transform:uppercase;font-weight:normal;}\n"+

	".tocheader1 {background-color:rgba(128,128,128,0.5); display:block; font-family:Arial Black, Impact, Charcoal, sans-serif; font-size:12pt; font-style:normal; text-transform:uppercase; font-weight:bold;}\n"+
	".tocheader2 {text-indent:1em; display:block; font-family:Arial, Impact, Charcoal, sans-serif; font-size:12pt; font-style:normal; text-transform:normal;font-weight:bold;}\n"+
	".tocheader3 {text-indent:2em; display:block; font-family:Arial, Impact, Charcoal, sans-serif; font-size:12pt; font-style:italic; text-transform:normal;font-weight:bold;}\n"+

	".tocheader1:hover {background-color:rgba(128,128,128,0.8);}\n"+
	".tocheader2:hover {background-color:rgba(128,128,128,0.25);}\n"+
	".tocheader3:hover {background-color:rgba(128,128,128,0.25);}\n"+

	".tocPageNumber {display:block; font-family:Arial, Impact, Charcoal, sans-serif; font-size:0.84em; font-style:normal; text-transform:normal;font-weight:bold;}\n"+

	".toolBox {display:block; position:absolute; right:0px; top:0px;}\n"+

	".toolBox.small .toolButton {height:24px;width:24px;}\n"+
	".toolBox.medium .toolButton {height:32px;width:32px;}\n"+
	".toolBox.large .toolButton {height:48px;width:48px;}\n"+
	".toolBox.xlarge .toolButton {height:64px;width:64px;}\n"+

	".toolBox.small .toolButton > a {height:22px;width:22px; top:1px; left:1px;}\n"+
	".toolBox.medium .toolButton > a {height:28px;width:28px; top:2px; left:2px;}\n"+
	".toolBox.large .toolButton > a {height:42px;width:42px; top:3px; left:3px;}\n"+
	".toolBox.xlarge .toolButton > a {height:56px;width:56px; top:4px; left:4px;}\n"+

	".toolBox.small .toolButton > a > img {height:20px;width:20px; top:1px; left:1px;}\n"+
	".toolBox.medium .toolButton > a > img {height:24px;width:24px; top:2px; left:2px;}\n"+
	".toolBox.large .toolButton > a > img {height:36px;width:36px; top:3px; left:3px;}\n"+
	".toolBox.xlarge .toolButton > a > img {height:48px;width:48px; top:4px; left:4px;}\n"+

	".toolBox.inline .toolButton {float:right;}\n"+
	".toolBox.column.right .toolButton {float: right; clear:both;}\n"+
	".toolBox.column.left .toolButton {float: left; clear:both;}\n"+

	".toolButton { border-radius: 7px; display: block; }\n"+
	".toolButton > a { border-radius: 6px; display: block; position: relative; }\n"+
	".toolButton > a > img { border-radius: 5px; position: relative; display:block;}\n"+

	".toolButton.oddBlue {background-image: -moz-linear-gradient(center top , #51D1EA 0%, #00758B 100%);background-color:#54CBE1;}\n"+
	".toolButton.oddBlue > a {background-image: -moz-linear-gradient(center top , white 0%, #54CBE1 100%); background-color:white;}\n"+
	".toolButton.oddBlue > a > img {background-image: -moz-linear-gradient(center top , #54CBE1 0%, #1FAABF 100%); background-color:#54CBE1;}\n"+

	".toolButton.oddGreen {background-image: -moz-linear-gradient(center top , #B7E54F 0%, #5A8F00 100%); background-color:#7DBB00;}\n"+
	".toolButton.oddGreen > a {background-image: -moz-linear-gradient(center top , white 0%, #7DBB00 100%); background-color:white;}\n"+
	".toolButton.oddGreen > a > img {background-image: -moz-linear-gradient(center top , #AAE636 0%, #76AE0D 100%);background-color:#7DBB00;}\n"+

	".toolButton.oddOrange {background-image: -moz-linear-gradient(center top , #FF9968 0%, #832000 100%); background-color:#E83400;}\n"+
	".toolButton.oddOrange > a {background-image: -moz-linear-gradient(center top , white 0%, #E83400 100%); background-color:white;}\n"+
	".toolButton.oddOrange > a > img {background-image: -moz-linear-gradient(center top , #FA9052 0%, #D94213 100%);background-color:#E83400;}\n"+

	".toolButton.oddBlack {background-image: -moz-linear-gradient(center top , #82976E 0%, #090C05 100%); background-color:#2F3825;}\n"+
	".toolButton.oddBlack > a {background-image: -moz-linear-gradient(center top , white 0%, #2F3825 100%); background-color:white;}\n"+
	".toolButton.oddBlack > a > img {background-image: -moz-linear-gradient(center top , #7D8F67 0%, #3F4835 100%); background-color:#2F3825;}\n"+

	".rotateLeft {-webkit-transform: rotate(-90deg); -moz-transform: rotate(-90deg); -o-transform: rotate(-90deg); -khtml-transform: rotate(-90deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);}\n"+
	".rotateRight {-webkit-transform: rotate(90deg); -moz-transform: rotate(90deg); -o-transform: rotate(90deg); -khtml-transform: rotate(90deg); filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);}\n"+

	"";

addGlobalStyle(css);

	function toggleSection() {
		var link = this;
		var img = this.firstChild;
		var section = this.parentNode.parentNode.parentNode.parentNode;
		var content = selectSingleNode("./div[contains(@class,'content')]",{node:section});
		var button = this.parentNode;
		var cur = (link.title=="Collapse");
		content.style.display = (cur)?"none":"block";
		button.className=(cur)?button.className.replaceWord("oddOrange","oddGreen"):button.className.replaceWord("oddGreen","oddOrange");
		img.className=(cur)?img.className.replaceWord("rotateLeft","rotateRight"):img.className.replaceWord("rotateRight","rotateLeft");
		link.title = (cur)?"Expand":"Collapse";
	};

	function makeCollapsibleSections() {
		var sections=selectNodes(".//div[contains(@class,'jsSection collapsible')]");
		if (sections.snapshotLength) for (var i=0,section; (section=sections.snapshotItem(i));i++) {
			var header = selectSingleNode("./div[contains(@class,'header')]",{node:section}),tog;
			header.appendChild(
				createElement("div",{className:"toolBox small inline"},[
					createElement("div",{className:"toolButton oddOrange"},[
						tog=createElement("a",{title:"Collapse",href:jsVoid,onclick:toggleSection},[
							createElement("img",{className:"img rotateLeft", src:imgs.play})
						])
					])
				])
			);
			//collapse by default headings 2 and above
			if (header.className.match(/header[2-9]/)) click (tog);
		}
	};

        function makePolls(){

	//google docs polls
            var polls=selectNodes(".//div[contains(@class,'googleDocsPoll')]");
            if (polls.snapshotLength) {
                for (var poll,i=0;(poll=polls.snapshotItem(i));i++){
                    var src=poll.textContent; //get the href to the poll
                    //create a polling iframe
                    poll.innerHTML="";
                    poll.textContent="Disclaimer: The following is an embedded Google document and is not part of wikia.com. Participating in the poll will transmit data to an external site.";
                    poll.appendChild(createElement("iframe",{
                        src:src, 
                        textContent:"Loading...", 
                        style:"width:100%; height:400px; frameborder:0px; marginheight:0px; marginwidth:0px;"
                    }));
                }
            }

	//polldaddy polls
            var polls=selectNodes(".//div[contains(@class,'pollDaddyPoll')]");
            if (polls.snapshotLength) {
                for (var poll,i=0;(poll=polls.snapshotItem(i));i++){
                    var src=poll.textContent,ins; //get the href to the poll

                    poll.innerHTML="";
                    poll.textContent="Disclaimer: The following is an embedded Polldaddy Poll and is not part of wikia.com. Participating in the poll will transmit data to an external site.";

		    //poll.appendChild(createElement("script",{type:"text/javascript", language:"javascript", charset:"utf-8", src:"http://static.polldaddy.com/p/"+src+".js"}));

                    poll.appendChild(createElement("iframe",{
                        src:"http://polldaddy.com/poll/"+src+"/", 
                        textContent:"Loading...", 
                        style:"width:100%; height:400px; frameborder:0px; marginheight:0px; marginwidth:0px;"
                    }));

                }
            }

        };

	function showBookmark(){
		var name = this.getAttribute("name").split("toc_")[1];
		var node = $n(name);
		if (node) {
			//make sure node is opened to be viewed by selecting all ancestor nodes that are also sections
			//then select their expand buttons if any
			var parents = selectNodes("ancestor::div[contains(@class,'jsSection')]/div[contains(@class,'header')]/div[contains(@class,'toolBox')]/div[contains(@class,'toolButton')]/a[@title='Expand']", {node:node});
			//then click all those expand buttons
			if (parents.snapshotLength) {
				for (var p=0,len=parents.snapshotLength; p<len; p++){
					click(parents.snapshotItem(p));
				}
			}
			//then make sure the node itself is also expanded
			var exp = selectSingleNode("./div[contains(@class,'header')]/div[contains(@class,'toolBox')]/div[contains(@class,'toolButton')]/a[@title='Expand']", {node:node});
			if (exp) click (exp);
			//then scroll up or down to the node bookmark style
			node.scrollIntoView();
		}
	};

	function makeTOC_tree(node, parent, branchName){
		//alert(node.className);
		//append to TOC
		var kids=selectNodes("./div[contains(@class,'content')]/div[contains(@class,'jsSection')]",{node:node}); //get subsections
		var hasKids=(kids.snapshotLength>0);
		var header=selectSingleNode("./div[contains(@class,'header')]",{node:node});
		var level=header.className.match(/header[0-9]/); if (level) level=level[0]; else level=1;
		var title=header.textContent;
		var name=branchName+"/"+title;

		node.id=name;

		parent.appendChild( createElement("div",{className:"toc"+level,textContent:title, name:"toc_"+name, onclick:showBookmark}) );

		//make a container for any kids it might have
		if (hasKids) {
			var next=parent.appendChild( createElement("div",{className:"tocContent"}) ); 

			//fill this subsection with the kids
			for (var i=0,section; (section=kids.snapshotItem(i));i++) {
				makeTOC_tree(section,next,name);
			}
		}
	};

	function makeTOC(){
		//jam the entire existing layout into a column container
		var body=createElement("div",{id:"jsBody"});
		var fx = function(node){body.appendChild(node);};
		forNodes("./*",{node:document.body},fx);
		document.body.appendChild(body);
		fx=null;

		//create the TOC node and basic layout
		var toc;
		document.body.insertBefore(
			createElement("div",{id:"jsTOC"},[
				toc=createElement("div",{className:"tocFloater"},[
					createElement("div",{className:"tocTitle",textContent:"Table of Contents"})
				])
			])
		,body);

		//start adding sections to it
		var sections=selectNodes(".//div[contains(@class,'jsSection')]"); //get all section nodes
		if (sections.snapshotLength) {
			for (var i=0,section; (section=sections.snapshotItem(i)); i++) {
				//make sure this node is top level
				if (!selectSingleNode("ancestor::div[contains(@class,'jsSection')]",{node:section})) {
					makeTOC_tree(section,toc,"");
				}
			}
		}
	};




	function toggle(e) {
		var node=e.nextSibling;
		node.className = node.className.toggleWord('hidden');
		var hidden = node.className.containsWord('hidden');
		sections[getDocName()+"#"+node.id]=hidden;
		var val = JSON.stringify(sections);
		//GM_setValue("sections",val);

		//if (e.textContent=="Latest activity") e.className=(hidden)?e.className.addWord('rotate'):e.className.removeWord('rotate');

		if (!hidden) node.parentNode.scrollIntoView(true);
 	};

	function headersToContainers(){
		//create blocks from headers h2 to h5
		for (var x=2;x<6;x++){

		var h=selectNodes(".//h"+x+"/span[contains(@class,'mw-headline')]");
		if (h) for (var i=0,e;(e=h.snapshotItem(i));i++){try{
			e=e.parentNode;
			var isComment = selectSingleNode(".//ancestor::section[@id='WikiaArticleComments']",{node:e});
			if (!isComment){
			
			//move the header into a separate div
			var top = e.parentNode, sec, header,fake;
			var label = selectSingleNode(".//span[contains(@class,'mw-headline')]",{node:e});
			var edit = selectSingleNode(".//span[contains(@class,'editsection')]",{node:e});
			edit.className = edit.className +(x>2?" black":"");
			var id=label.id;
			var forceshow=label.textContent.contains("#||");
			var labelText=label.textContent.replace("#||","");
			var hidden=true;//sections[getDocName()+"#"+id];
			if (forceshow) hidden=false;
			top.insertBefore(
				createElement("div", {className:"section_header_holder"}, new Array(
					(header=createElement("a", {className:"section_header shadow2 sh"+x,href:'javascript:void(0);',onclick:function(){toggle(this);},textContent:labelText}) ),
					(sec=createElement("div", {id:id,className:'section_kids shadow1'+((hidden)?" hidden":"")}) )
				))
			, e);
			
			//move the siblings into the new collapsible section
			//select the entire block down to the next h2 element
			var s=e.nextSibling;
			while (s && (s.tagName!="H"+x) && s.tagName!="NAV"){
				//console.log(s.tagName);
  				sec.appendChild(s);
				s=e.nextSibling;
  			}

			//move the edit button to the header bar
			header.parentNode.insertBefore(edit,header);

			//delete the header
			top.removeChild(e);

			//cleanup
			s=null;top=null;label=null;edit=null;si=null;sec=null;

			}

			isComment=null;
		}catch(e){console.log(e);}}

		//cleanup
		h=null;i=null;e=null;

		}	
	};

	function moveActivityFeed(){
		var activity = $n('activityFeed'), article = $n('WikiaArticle'), advert = $n('wmAdvertHeader');
		if (advert && article) article.parentNode.insertBefore(advert,article);
		if (activity && article) article.parentNode.insertBefore(activity,article);
		if (activity){
			var nodes = selectNodes(".//td[@class='activityfeed-details-label']",{node:activity});
			if (nodes) for (var i=0,node;(node=nodes.snapshotItem(i));i++) {
				var html=node.innerHTML + node.nextSibling.innerHTML;
				node.parentNode.innerHTML=html;
				node=null;
			}
			nodes=null;

			var node = selectSingleNode(".//div[@id='Latest_activity']/div",{node:activity});
			if (node) node.appendChild(createElement("a",{className:'more', title:'Special:WikiActivity', href:'/wiki/Special:WikiActivity', textContent:'See more >'}));
			node=null;
		}
		activity=null; article=null;
	};

	function moveShortActivityFeed(){
		var activity = selectSingleNode(".//section[@class='WikiaActivityModule module ']");
		if (activity){
			activity.className="";
			var h1 = selectSingleNode("./h1[@class='activity-heading']",{node:activity}), header, sec;
			var ul = selectSingleNode("./ul",{node:activity});
			var more = selectSingleNode("./a",{node:activity});
			if (h1){
				activity.insertBefore(
					(div=createElement("div", {className:"section_header_holder"}, new Array(
						(header=createElement("a", {className:"section_header shadow2 sh2",href:'javascript:void(0);',onclick:function(){toggle(this);},textContent:h1.textContent}) ),
						(sec=createElement("div", {id:'wikia_recent_activity',className:'section_kids shadow1'}) )				
					)) )
				, h1);

				if (ul) sec.appendChild(ul);
				if (more) sec.appendChild(more);

				activity.removeChild(h1);
			}
			h1=null;sec=null;div=null;
		}
		activity=null;
	};

	function dropWikiaNetwork(){
		var nodes = selectNodes(".//footer/section | .//section[@id='WikiaSpotlightsModule'] | .//*[@id='WikiaArticleBottomAd' or @id='toc'] | .//div[@class='FooterAd' or @class='WikiaMainPageBanner']");
		if (nodes) for (var i=0,node;(node=nodes.snapshotItem(i));i++) node.parentNode.removeChild(node);
		nodes=null;
	};

	function addAnchorAltTargets(){
                //first check for plainlinks tags
                forNodes(".//span[contains(@class,'plainlinks')]/a[contains(@class,'external')]",{},function(e){e.className=e.className.replace('external','');});

		forNodes(".//a[contains(@class,'external')]",{},function(e){
			var node = e;
			var node2 = node.cloneNode(true);
			node.parentNode.insertBefore(node2,node);			
			node.target="_blank";
			node.textContent="+";
			node.className += " altLink";
			node.title = "Open in new window";
			node=null;
		});
	};

	function fixRevisionTables(){
		var tables=selectNodes(".//table[contains(@class,'wikitable collapsible')]");
		if (tables) for (var t=0,table;(table=tables.snapshotItem(t));t++) {
			var parent=table.parentNode,header,sec;
			var id=selectSingleNode(".//tr//th",{node:table}).textContent.replace('[hide]','').replace('[show]','');
			var hidden=sections[getDocName()+"#"+id];
			//create a container
			parent.insertBefore(
				createElement("div", {className:"section_header_holder"}, new Array(
					(header=createElement("a", {className:"section_header shadow2 sh2",href:'javascript:void(0);',onclick:function(){toggle(this);},textContent:id}) ),
					(sec=createElement("div", {id:id,className:'section_kids shadow1'+((hidden)?" hidden":"")}) )
				))
			,table);

			//create subsections
			var rows = selectNodes(".//tr",{node:table});
			if (rows) for (var s=0,row;(row=rows.snapshotItem(s));s++){
				if (!row.innerHTML.contains('<th')){
					var cols = selectNodes(".//td",{node:row});
					
					//first column of each row is always title
					var label = cols.snapshotItem(0).textContent;
					id=id+"_"+label;
					var content = cols.snapshotItem(1).innerHTML;
					hidden=sections[getDocName()+"#"+id];
					
					//create the container
					sec.appendChild(
						createElement("div", {className:"section_header_holder"}, new Array(
							createElement("a", {className:"section_header shadow2 sh3",href:'javascript:void(0);',onclick:function(){toggle(this);},textContent:label}) ,
							createElement("div", {id:id,className:'section_kids shadow1'+((hidden)?" hidden":""),innerHTML:content}) 
						))
					);					
					cols=null;label=null;content=null;
				}
				row=null;
			}
			
			//remove the old appearance
			parent.removeChild(table);

			table=null;rows=null;parent=null;hidden=null;id=null;header=null;sec=null;
		}

		tables=null;
	};

	function showRedPhone(){
		var phoneImg="http://i56.tinypic.com/33k3iwk.png";
		var articleBody=$n('WikiaArticle');
		if (articleBody) articleBody.appendChild(
			createElement("a",{href:"http://www.facebook.com/messages/100001252200912",target:"_blank",style:"position:fixed;bottom:2px;left:2px;z-index:9999;"},new Array(
				createElement("img",{src:phoneImg,width:"64"})
			))
		);

	};

        function panelizeActivityFeed(){
            var panel=$n('activityPanel');
            if (panel) {
                var feed=selectSingleNode(".//ul[contains(@class,'activityfeed')]",{node:panel}).parentNode;
                var nodes=selectNodes(".//li[contains(@class,'activity-type')]",{node:panel});
                if (nodes.snapshotLength) {for (var i=0,node;(node=nodes.snapshotItem(i));i++) {
                    //get vars
                    var title=selectSingleNode(".//a[@class='title']",{node:node}).textContent;
                    var url=selectSingleNode(".//a[@class='title']",{node:node}).href;
                    var who=selectSingleNode(".//cite/a",{node:node}).textContent;
                    var whoUrl=selectSingleNode(".//cite/a",{node:node}).href;
                    var time=selectSingleNode(".//cite",{node:node}).textContent.split(who)[1];
                    var comment=selectSingleNode(".//tr/td[not(contains(@class,'activityfeed-details-label'))]",{node:node}); comment=(comment)?comment.textContent:"";
                    if (!comment) {
comment=selectSingleNode(".//time[@class='wall-timeago']//ancestor::p",{node:node}); 
if (comment){
comment.removeChild(comment.lastChild);
comment=(comment)?comment.textContent:"";
}
}

                    //build the new view
                    feed.parentNode.appendChild(newActivity(title,url,who,whoUrl,time,comment));
                }}
                //now delete the old feed data
                if(feed) feed.parentNode.removeChild(feed);               
            }
        };

        function newActivity(title,url,who,whoUrl,time,comment){
            return createElement("div",{className:"activity"},[
                createElement("div",{className:"title"},[
                    createElement("a",{href:url,textContent:title})
                ]),
                createElement("div",{className:"comment",textContent:comment}),
                createElement("div",{className:"who"},[
                    createElement("span",{textContent:time+" by "}),
                    createElement("a",{href:whoUrl,textContent:who})
                ]),
            ]);
        };

	function censorshipProtest(){
		var size=Math.floor(Math.random()*100);
		var x=Math.floor(Math.random()*1500);
		var y=Math.floor(Math.random()*3000);
		var style="font-size:"+size+"px; position:absolute; top:"+y+"px; left:"+x+"px; background-color:black; color:white; display:block; z-index:99999; line-height:"+size+"px;";
		document.body.appendChild(createElement("div",{} ,[
			createElement("a",{href:"http://iplaw.wikia.com/wiki/Take_Action_Now",style:style,textContent:"Censored"})
		]));
		window.setTimeout(censorshipProtest,15000*Math.random());
	};

	function copyReplyButtons(){
		var convs=selectNodes("./li",{node:$n("article-comments-ul")});
          if (convs) for (var c=0,conv,sib; (conv=convs.snapshotItem(c)); c++) {
			if (sib=conv.nextSibling) if (sib.className.contains("sub-comments")) {
				var localReply = selectSingleNode(".//button[contains(@class,'article-comm-reply')]",{node:conv});
				if (localReply) {
					var subCommentButtons = selectNodes(".//div[contains(@class,'buttons')]",{node:sib});
					if (subCommentButtons) { for (var b=0, btn; (btn=subCommentButtons.snapshotItem(b)); b++) {
						var replyClone = localReply.cloneNode(true);
						btn.appendChild(replyClone);
						console.log("replyclone added");
					} } else {console.log("no tool area");}
                    } else {console.log("no reply button");}
               } else {console.log("no sub comments");}
          } else {console.log("no convs");}
     };


	function runStylize(){
		isProtected = (selectSingleNode(".//a[contains(@class,'loginToEditProtectedPage')] | .//a[contains(@data-id,'unprotect')]")!=null);

		//get settings
		//sections=JSON.parse(GM_getValue('sections','{}'));

		//change appearance
		headersToContainers();
		panelizeActivityFeed();
		moveActivityFeed();
		moveShortActivityFeed();
		//dropWikiaNetwork();
		addAnchorAltTargets();
		fixRevisionTables();
		showRedPhone();
                makePolls();
		makeCollapsibleSections();
		//if (selectSingleNode(".//div[contains(@class,'jsSection')]")) window.setTimeout(makeTOC,2000);

		//censorshipProtest();
                copyReplyButtons();
	};



addOnloadHook( runStylize );

});