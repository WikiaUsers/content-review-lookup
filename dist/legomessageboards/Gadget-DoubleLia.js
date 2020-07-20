/* Hide Header Toolbar - by ShermanTheMythran */
$('.wikia-header-mask').before('<div id="HeaderCollapse" class="expanded"><span>▲</span><style type="text/css">#HeaderCollapse{position:absolute;z-index:-1;right:10px;width:30px;margin:34px 0 0;background:#CFD2DA;color:#305599;text-align:center;border-radius:0 0 5px 5px;-webkit-border-radius:0 0 5px 5px;cursor:pointer;border-width:0 2px 2px;border-style:solid;border-color:#91aacf;transition:margin .5s;-moz-transition:margin .5s;-webkit-transition:margin .5s;-o-transition:margin .5s}#HeaderCollapse span{display:block;transition:transform .5s;-moz-transition:-moz-transform .5s;-webkit-transition:-webkit-transform .5s;-o-transition:-o-transform .5s}.WikiaTopAds{top:34px;padding:20px 0 !important;z-index:-1;transition:top .5s;-moz-transition:top .5s;-webkit-transition:top .5s;-o-transition:top .5s}.WikiaPage{transition:top .5s;-moz-transition:top .5s;-webkit-transition:top .5s;-o-transition:top .5s}#HeaderCollapse.expanded span{transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-ms-transform:scaleX(1);-o-transform:scaleX(1)}#HeaderCollapse.collapsed span{transform:rotateX(180deg);-moz-transform:rotateX(180deg);-webkit-transform:rotateX(180deg);-ms-transform:scaleY(-1);-o-transform:scaleY(-1)}</style></div>');
var collapseHeader = function() {
	$('#HeaderCollapse').removeClass('expanded').addClass('collapsed').unbind().bind('click',expandHeader);
	$('.WikiaHeader').css('position','absolute');
	$.cookie('headerCollapse','collapsed',{expires: 365});
};
var expandHeader = function() {
	$('#HeaderCollapse').removeClass('collapsed').addClass('expanded').unbind().bind('click',collapseHeader);
	$('.WikiaHeader').css('position','fixed');
	$.cookie('headerCollapse',null);
};
$('#HeaderCollapse').click(collapseHeader);
var hcCookie = $.cookie('headerCollapse');
if(hcCookie == "collapsed") {
	$(collapseHeader);
}
 
/* Hide Footer Toolbar - by ShermanTheMythran */
$('.wikia-bar').before('<div id="FooterCollapse" class="expanded"><span>▼</span><style type="text/css">#FooterCollapse{position:absolute;z-index:-1;right:10px;width:30px;bottom:25px;background:#FDFDFD;color:#305599;text-align:center;border-radius:5px 5px 0 0;-webkit-border-radius:5px 5px 0 0;cursor:pointer;border-width:2px 2px 0;border-style:solid;border-color:#91aacf;transition:bottom .5s;-moz-transition:bottom .5s;-webkit-transition:bottom .5s;-o-transition:bottom .5s}#FooterCollapse span{display:block;transition:transform .5s;-moz-transition:-moz-transform .5s;-webkit-transition:-webkit-transform .5s;-o-transition:-o-transform .5s}#FooterCollapse.expanded span{transform:rotateY(0deg);-moz-transform:rotateY(0deg);-webkit-transform:rotateY(0deg);-ms-transform:scaleX(1);-o-transform:scaleX(1)}#FooterCollapse.collapsed span{transform:rotateX(180deg);-moz-transform:rotateX(180deg);-webkit-transform:rotateX(180deg);-ms-transform:scaleY(-1);-o-transform:scaleY(-1)}</style></div>');
var collapseFooter = function() {
	$('#FooterCollapse').removeClass('expanded').addClass('collapsed').unbind().bind('click',expandFooter);
	$('.WikiaBarWrapper').css('position','absolute');
	$.cookie('footerCollapse','collapsed',{expires: 365});
};
var expandFooter = function() {
	$('#FooterCollapse').removeClass('collapsed').addClass('expanded').unbind().bind('click',collapseFooter);
	$('.WikiaBarWrapper').css('position','fixed');
	$.cookie('footerCollapse',null);
};
$('#FooterCollapse').click(collapseFooter);
var fcCookie = $.cookie('footerCollapse');
if(fcCookie == "collapsed") {
	$(collapseFooter);
}

/* Display Clock in Footer Toolbar - by Seaside98 - Runescape (marked for deletion, may be moved to gadget) */
var refreshDate;
function addDate() {
	var UTCDate = ((new Date()).toUTCString()).replace("GMT", "(UTC)");
	$('#showdate').empty().attr('title','Purge the server cache and update the contents of this page.').attr('style','text-decoration:none !important;').attr('href',window.location.href + '?action=purge').html(UTCDate.substring(5));
	window.clearTimeout(refreshDate);
	refreshDate = window.setTimeout(addDate, 1000);
}
$(document).ready(function() {
	$('<li class="Date" id="displayClock" style="float:right"><a id="showdate"></a></li>').appendTo('.WikiaBarWrapper .toolbar .tools');
	addDate();
});

/* Add a Blog under Contribute - by Codyn329 (marked for deletion, may be added under a gadget) */
$(document).ready(function() { 
	$('.WikiHeader .buttons .contribute ul li').first().after('<li><a href= "/wiki/Special:CreateBlogPage">Add a Blog</a></li'); 
});

/* Add Editcount to User Tabs - by Seaside98 (marked for deletion, may be added under a gadget) */
$(document).ready(function() {
	$('.tabs-container > ul').append('<li><a href="/wiki/Special:Editcount/'+wgTitle+'">Editcount</a></li>');
});
 
/* Add Current Diff Link to Edit Menu - by Seaside98 (marked for deletion, may be added under a gadget) */
$('.WikiaPageHeader .WikiaMenuElement').prepend('<li><a href="/wiki/'+ wgPageName +'?diff=cur">Current Diff</a></li>');