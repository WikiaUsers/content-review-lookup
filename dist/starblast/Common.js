// Changelog auto-update
if ($("#mw-changelog").length > 0) {
	$.ajax("https://starblast.io/changelog.txt")
	.done(function (data) {
		var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		function addMonth(str) {
			str = str.split("-");
			return months[Number(str[1])-1]+" "+Number(str[2])+", "+str[0];
		}
		function space(n) {
			return "&nbsp;".repeat(n*2);
		}
		var date=data.match(/(\d{4}[-]\d{2}[-]\d{2})/g);
		$("#mw-changelog").html("<div id='mw-changelog_filter' style='position:static;float:right;background:hsla(200,30%,15%,.9)'>Filter by Date: ");
		$("#mw-changelog_filter").append("<select id='mw-changelog-date_filter' style='font-size:1em;padding:3px 5px;color:white;background:hsl(200,60%,15%);border:1px solid hsl(200,60%,10%);vertical-align:middle;box-sizing:border-box;'><option selected>Full Changelogs</option><option>"+date.map(function(i){return addMonth(i)}).join("</option><option>")+"</option></select>");
		date.unshift("Full_Changelogs");
		var filter = $("#mw-changelog-date_filter");
		filter.on("change",function(e){
			e.preventDefault();
			window.location.hash=date[filter.prop('selectedIndex')]||"";
		});
		$("#mw-changelog").append(data.replace(/(\d{4}[-]\d{2}[-]\d{2})/g,function(v){return '<h3><span class="mw-headline" id="'+v+'">'+addMonth(v)+'</span></h3>'}).replace(/\n+/g,"\n").replace(/^[^<]\s*(\*|\+|-|–)*\s*.+/gm,function (v) {
			var sp = 0;
			var u = v;
      var fc;
			u = u.replace(/^\s+/g,function(d){return sp=d.length, ""});
			if ("*-+–".indexOf(u[0])!= -1)
			{
				fc = u[0];
				u = u.slice(1,u.length).replace(/^\s*/g,"");
			}
			else fc = "";
			u = u[0].toUpperCase() + u.slice(1,v.length);
			switch (fc)
			{
				case "*":
					return "<ul><li>"+u+"</li></ul>";
				case "–":
				case "-":
					return "<p class='changelog p1'>"+space(2)+"– "+u+"</p>";
				case "+":
					return "<p class='changelog'>"+space(3)+"+ "+u+"</p>";
				default:
					return "<p class='changelog'>"+space(sp) + fc + u+  "</p>";
			}
		}).replace(/<\/ul>(\n|\r)*<ul>/g,""));
	})
	.fail(function (e) {$("#mw-changelog").html("<p>An error occured while loading data from the server!</p><p>Please reload the page and try again</p>")});
}
// backToTop button
(function(){
	function hideFade () {
		$( "#backtotop" ).hide ();
		$( function () {
			$( window ).scroll( function () {
				if ( $( this ).scrollTop () > $(window).innerHeight()/2 ) {
					$( '#backtotop' ).fadeIn ();
				} else {
					$( '#backtotop' ).fadeOut ();
				}
			});
		});
	}
	 
	function goToTop (){
		$( 'body,html' ).animate ({
			scrollTop: 0
		}, ScrollSpeed );
		return false;
	}
	 
	function addBackToTop () {
		$('<a href="javascript:void(0);" id="backtotop" title="Back To Top"></a>').appendTo($(document.body));	
		$("#backtotop").on("click", goToTop);
		hideFade ();
	}
	 
	var ScrollSpeed = 600;
	 
	if( !window.BackToTop  ) {
		addBackToTop (); 
		window.BackToTop = true;
	}
})();

// fix red links for guest user

(function(){
	var element_list = $("span.new");
	for (var i = 0; i < element_list.length; ++i) {
		var e = $(element_list[i]);
		e.attr("href", 'https://starblast.fandom.com/wiki/' + e.attr("title").replace(" (page does not exist)", "").replace(/\s/g, "_") + '?action=edit&redlink=1');
		e.prop("outerHTML", e.prop("outerHTML").replace(/<(\/{0,1})span(>|\s)/g, "<$1a$2"));
	}
})();