$(function(){
	$('<section class="rail-module"></section>')
		.prependTo('#WikiaRail')
		.load('/index.php?title=Template:RailModule&action=render');
});