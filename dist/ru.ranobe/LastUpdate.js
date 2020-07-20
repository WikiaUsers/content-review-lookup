$.getScript('http://www.myersdaily.org/joseph/javascript/md5.js');
(new mw.Api()).get({action:'parse', page:'MediaWiki:LastUpdate', prop:'wikitext'}).done(function(d){
	pdata={left:{},right:{}}
	var r=[/\|Сторона *= *([^\|\}\n]+)/g, /\|Фон *= *([^\|\}\n]+)/g, /\|Текст *= *([^\|\}\n]+)/g, /\|Ссылка *= *([^\|\}\n]+)/g, /\|Дата *= *([^\|\}\n]+)/g];
	var m;
	while(m=r[0].exec(d.parse.wikitext['*'])){
		m=m[1]=='лево'?'left':'right';
		pdata[m].side=m;
		pdata[m].bkgr=r[1].exec(d.parse.wikitext['*'])[1];
		pdata[m].text=r[2].exec(d.parse.wikitext['*'])[1];
		pdata[m].href=r[3].exec(d.parse.wikitext['*'])[1];
		pdata[m].date=r[4].exec(d.parse.wikitext['*'])[1];
	}
	
	name='Wiki-'+pdata.left.bkgr+'-background.jpg';
	m=md5(name);
	$('head').append('<style>body.background-dynamic.skin-oasis:before { background-image: url("https://images.wikia.nocookie.net/ranobe/ru/images/'+m[0]+'/'+m[0]+m[1]+'/'+name+'") !important; }</style>');
	var o=$('#WikiaPage').offset();
	$('<a>').attr({
		href:pdata.left.href, 
		title:pdata.left.date+': \n'+pdata.left.text
	}).css({
		position:'fixed',
		display:'block',
		left:0,
		top:o.top,
		width:o.left,
		height:$(window).height()/2
	}).addClass('update-clicker').appendTo('body');

	name='Wiki-'+pdata.right.bkgr+'-background.jpg';
	m=md5(name);
	$('head').append('<style>body.background-dynamic.skin-oasis:after { background-image: url("https://images.wikia.nocookie.net/ranobe/ru/images/'+m[0]+'/'+m[0]+m[1]+'/'+name+'") !important; }</style>');
	var o=$('#WikiaPage').offset();
	$('<a>').attr({
		href:pdata.right.href, 
		title:pdata.right.date+': \n'+pdata.right.text
	}).css({
		position:'fixed',
		display:'block',
		right:0,
		top:o.top,
		width:o.left,
		height:$(window).height()/2
	}).addClass('update-clicker').appendTo('body');
	
	$(window).resize(function() {
	  $('.update-clicker').width($('#WikiaPage').offset().left).height($(window).height()/2);
	});
})