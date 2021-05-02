if (mw.config.get('wgTitle') === 'Changelogs') {
	$.ajax("https://starblast.io/changelog.txt")
	.done(function (data) {
		function t(){};
		t.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		function addMonth(str) {
			str = str.split("-");
			return t.months[Number(str[1])-1]+" "+Number(str[2])+", "+str[0];
		}
		function space(n) {
			return new Array(n*2).fill("&nbsp;").join("");
		}
		t.date=data.match(/(\d{4}[-]\d{2}[-]\d{2})/g);
		$("#mw-changelog").html("<div id='mw-changelog_filter' style='position:static;float:right;background:hsla(200,30%,15%,.9)'>Filter by Date: ");
		$("#mw-changelog_filter").append("<select id='mw-changelog-date_filter' style='font-size:1em;padding:3px 5px;color:white;background:hsl(200,60%,15%);border:1px solid hsl(200,60%,10%);vertical-align:middle;box-sizing:border-box;'><option selected>Full Changelogs</option><option>"+t.date.map(function(i){return addMonth(i)}).join("</option><option>")+"</option></select>");
		t.date.unshift("Full_Changelogs");
		t.filter = $("#mw-changelog-date_filter");
		t.filter.on("change",function(e){
			e.preventDefault();
			window.location.hash=t.date[t.filter.prop('selectedIndex')]||"";
		});
		$("#mw-changelog").append(data.replace(/(\d{4}[-]\d{2}[-]\d{2})/g,function(v){return '<h3><span class="mw-headline" id="'+v+'">'+addMonth(v)+'</span></h3>'}).replace(/\n+/g,"\n").replace(/^[^<]\s*(\*|\+|-|–)*\s*.+/gm,function (v) {
			t.sp = 0;
			t.u = v;
			t.u=t.u.replace(/^\s+/g,function(d){return t.sp=d.length, ""});
			if ("*-+–".indexOf(t.u[0])!= -1)
			{
				t.fc=t.u[0];
				t.u=t.u.slice(1,t.u.length).replace(/^\s*/g,"");
			}
			else t.fc = "";
			t.u=t.u[0].toUpperCase()+t.u.slice(1,v.length);
			switch (t.fc)
			{
				case "*":
					return "<ul><li>"+t.u+"</li></ul>";
				case "–":
				case "-":
					return "<p>"+space(2)+"– "+t.u+"</p>";
				case "+":
					return "<p>"+space(3)+"+ "+t.u+"</p>";
				default:
					return "<p>"+space(t.sp)+t.fc+t.u+"</p>";
			}
		}).replace(/<\/ul>(\n|\r)*<ul>/g,""));
		t.filter_container = $("#mw-changelog_filter");
		t.fixmeTop = t.filter_container.offset().top;
		t.fixmeBottom = $("#catlinks").offset().top;
		$(window).scroll(function() {
    	if ($(window).scrollTop() >= t.fixmeTop && $(window).scrollTop() <= t.fixmeBottom) t.filter_container.css({position:'fixed',top:'0.5em',right:parseInt($("#content").css("margin-right"))+parseInt($("#content").css("padding-right"))+"px"});
    	else t.filter_container.css({position:"static",float:"right"});
		});
	})
	.fail(function (e) {$("#mw-changelog").html("<p>An error occured while loading data from the server!</p><p>Please reload the page and try again</p>")});
}

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
		$('<div id="backtotop" title="Back To Top" style="padding: 5px; border: 2px solid darkslategrey;position: fixed; right:20px; bottom:20px; cursor:pointer"><img src="https://raw.githubusercontent.com/Bhpsngum/img-src/master/arrow-up.png" width="30" height="30"></div>').appendTo($(document.body));	
		$("#backtotop").on("click", goToTop);
		hideFade ();
	}
	 
	var ScrollSpeed = 600;
	 
	if( !window.BackToTop  ) {
		addBackToTop (); 
		window.BackToTop = true;
	}
})();