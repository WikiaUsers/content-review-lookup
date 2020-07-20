importArticles({
	type: "script",
	articles: [
		"MediaWiki:Common.js/icons.js", /* Adds icons to page header bottom border */
	]
});

/*Tabs for infobox templates

info1t = info2subtab2 (out of 2 tabs total, 2 subtabs total)
info2t = info3subtab2 (out of 3 tabs total, 2 subtabs total)
info3t1 = info3subtab2 (out of 3 tabs total, 3 subtabs total)
info3t2 = info3subtab3 (out of 3 subtabs total, 3 subtabs total)

3 tabs total, tab 1 has 2 subtabs: tab1a, tab2a
3 tabs total, tab 1 has 3 subtabs: tab1a, tab2a, tab3a
2 tabs total, tab 2 has 2 subtabs: tab1i, tab2i
3 tabs total, tab 3 has 3 subtabs: tab1s, tab2s, tab3s
3 tabs total, tab 3 has 2 subtabs: tab1n, tab2n
*/
$(".tab1").attr("onclick", "$('#info2').hide();$('#info1t').hide();$('#info2t').hide();$('#info3t1').hide();$('#info3t2').hide();$('#info3').hide();$('#info4').hide();$('#info1subtab2').hide();$('#info1subtab3').hide();$('#info1').show();");
$(".tab2").attr("onclick", "$('#info1').hide();$('#info1t').hide();$('#info2t').hide();$('#info3t1').hide();$('#info3t2').hide();$('#info3').hide();$('#info4').hide();$('#info1subtab2').hide();$('#info1subtab3').hide();$('#info2').show();");
$(".tab3").attr("onclick", "$('#info2').hide();$('#info1t').hide();$('#info2t').hide();$('#info3t1').hide();$('#info3t2').hide();$('#info1').hide();$('#info4').hide();$('#info1subtab2').hide();$('#info1subtab3').hide();$('#info3').show();");
$(".tab4").attr("onclick", "$('#info2').hide();$('#info1t').hide();$('#info2t').hide();$('#info3t1').hide();$('#info3t2').hide();$('#info1').hide();$('#info3').hide();$('#info1subtab2').hide();$('#info1subtab3').hide();$('#info4').show();");
$(".tab1a").attr("onclick", "$('#info1subtab2').hide();$('#info1subtab3').hide();$('#info1').show();");
$(".tab2a").attr("onclick", "$('#info1').hide();$('#info1subtab3').hide();$('#info1subtab2').show();");
$(".tab3a").attr("onclick", "$('#info1').hide();$('#info1subtab2').hide();$('#info1subtab3').show();");
$(".tab1n").attr("onclick", "$('#info1').hide();$('#info2').hide();$('#info4').hide();$('#info1t').hide();$('#info2t').hide();$('#info3t1').hide();$('#info3t2').hide();$('info1subtab2').hide();$('info1subtab3').hide();$('#info3').show();");
$(".tab2n").attr("onclick", "$('#info1').hide();$('#info3').hide();$('#info4').hide();$('#info2').hide();$('#info2t').show();");
$(".tab1i").attr("onclick", "$('#info1').hide();$('#info1t').hide();$('#info2').show();");
$(".tab2i").attr("onclick", "$('#info1').hide();$('#info2').hide();$('#info1t').show();");
$(".tab1s").attr("onclick", "$('#info1').hide();$('#info2').hide();$('#info3t1').hide();$('#info3t2').hide();$('#info3').show();");
$(".tab2s").attr("onclick", "$('#info1').hide();$('#info2').hide();$('#info3').hide();$('#info3t2').hide();$('#info3t1').show();");
$(".tab3s").attr("onclick", "$('#info1').hide();$('#info2').hide();$('#info3').hide();$('#info3t1').hide();$('#info3t2').show();");
if($("#infoStart").html() == 1){
$("#info2").hide();$("#info1t").hide();$("#info2t").hide();$("#info3t1").hide();$("#info3t2").hide();$("#info3").hide();$("#info4").hide();$("#info1").show();
}else if($("#infoStart").html() == 2){
$("#info1").hide();$("#info1t").hide();$("#info2t").hide();$("#info3t1").hide();$("#info3t2").hide();$("#info3").hide();$("#info4").hide();$("#info2").show();
}else if($("#infoStart").html() == 3){
$("#info2").hide();$("#info1t").hide();$("#info2t").hide();$("#info3t1").hide();$("#info3t2").hide();$("#info1").hide();$("#info4").hide();$("#info3").show();
}else if($("#infoStart").html() == 4){
$("#info2").hide();$("#info1t").hide();$("#info2t").hide();$("#info3t1").hide();$("#info3t2").hide();$("#info1").hide();$("#info3").hide();$("#info4").show();
}else{
$("#info2").hide();$("#info1t").hide();$("#info2t").hide();$("#info3t1").hide();$("#info3t2").hide();$("#info3").hide();$("#info4").hide();$("#info1").show();
}

/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */
(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)
$("#infoBoxContainer").hoverIntent(
  function() {
    switchFont("metrumatoran");
  }, function() {
    switchFont("GoudyTrajan");
  }
);

function switchFont(font) {
        $(".infoLight  tr:first-of-type td:first-of-type").fadeOut(100);
    setTimeout(function () {
        $(".infoLight  tr:first-of-type td:first-of-type").css("font-family", font);
    }, 100);
    $(".infoLight  tr:first-of-type td:first-of-type").fadeIn(200);
}