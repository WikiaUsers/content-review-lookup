/* Any JavaScript here will be loaded for all users on every page load. */
// Adds a Samba tracking pixel to the community
if(mw.config.get("wgPageName") === "I'm_Sorry_Wiki") { 
	var timestamp = Date.now();
	$("body").append("<a href='https://pixel.mtrcs.samba.tv/v2/vtr/hmi/imsorry52017/fandomdfp/impression?c=" + timestamp + "&sa_ord=%ebuy!&sa_li=%eaid!&sa_cr=%ecid!&sa_pl=200315312'><img src='https://pixel.mtrcs.samba.tv/v2/vtr/hmi/imsorry52017/fandomdfp/impression?c=" + timestamp + "&sa_ord=%ebuy!&sa_li=%eaid!&sa_cr=%ecid!&sa_pl=200315312' border='0' height='1' width='1' alt='Samba Pixel'></a>");
}