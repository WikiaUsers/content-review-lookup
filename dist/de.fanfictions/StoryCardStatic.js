$body = $("body");
if ( $body.hasClass("page-Benutzer_MehrBot_Make_Link_To_Box") ) {
  $("head").append("<style>.info-hover-box	{	background: rgb(249, 236, 180);	border: 2px solid rgb(247, 229, 172);	height: 200px;	width:	640px;	left: 0; position: absolute;	display: block;	box-shadow: 0 0 5px 2px rgb(249, 236, 195); text-align: left !important; } .info-hover-box .inner { padding: 10px; } .info-hover-box p { float: left; margin: 0; } .info-hover-box .descr { float: left; margin-right: 10px; width: 300px; height: 155px; overflow-y: hidden; z-index: 12345678; }	</style>");
// width: 640px -- 20px margin -> 620 -- 10 column --> 600px
$( "a[title^='Geschichte']" )
  .mouseenter(function() {

	var geschichtentitel = $(this).attr("title");
	var geschichtentitel_sliced = geschichtentitel.slice(11);
	var geschichtentitel_uebersicht_array = geschichtentitel_sliced.match(/^(.*[\/])/);
	if (geschichtentitel_uebersicht_array === null) {
	geschichtentitel_uebersicht = geschichtentitel_sliced;
	} else {
	var geschichtentitel_uebersicht = geschichtentitel_uebersicht_array[0].slice(0, -1);
	}
// LOG does not work, but geschichtentitel_uebersicht throws correct value
//	console.log(geschichtentitel_uebersicht);
	var geschichtentitel_href = $(this).attr("href");
	var geschichtentitel_href_sliced = geschichtentitel_href.slice(17);
	var geschichtentitel_href_id = geschichtentitel_href_sliced.match(/(.*[\/].*)/);
	var geschichtentitel_href_uebersicht_array = geschichtentitel_href_sliced.match(/^(.*[\/])/);
	if (geschichtentitel_href_uebersicht_array === null) {
	geschichtentitel_href_uebersicht = geschichtentitel_href_sliced;
	} else {
	var geschichtentitel_href_uebersicht = geschichtentitel_href_uebersicht_array[0].slice(0, -1);
    }
	if (geschichtentitel_href_id === null) {
	geschichtentitel_href_id = geschichtentitel_href_sliced.replace(/[/\\\%\.\,\-\:\;\!\?*]/g, "_");
	} else {
	geschichtentitel_href_id = geschichtentitel_href_id[0].replace(/[/\\\%\.\,\-\:\;\!\?*]/g, "_");
	}
	//	alert(geschichtentitel_href_uebersicht);

    var linkheight = $(this).height();
	var calcheight = linkheight + 210;
	var moveheight = calcheight;
        var negative_moveheight = -moveheight;
	
  storyCardContainer = '<div id="" class="info-hover-box ' + geschichtentitel_href_id + '" style="margin-left: 10px; margin-top: -' + moveheight + 'px;"><div class="inner"><div class="heading" style="font-size: 18px; margin-bottom: 5px; border-bottom: 1px solid #F0CF66;">' + geschichtentitel_uebersicht + '</div><div style="clear: both;"></div><div class="descr"><p><b>Über ' + geschichtentitel_uebersicht + ':</b><br><div style="clear: both;"></div><span id="hover_beschreibung">Keine Beschreibung vom Autor angegeben.</span></div><div class="descr"><p><b>Thema:&nbsp;</b></p><br><span id="hover_geschichtenthema">Kein Thema angegeben.</span><br><b>Kategorien:&nbsp;</b><table class="kat_table" style="border-spacing: 0;"><tr><td><span id="hover_geschichtenkategorie1">Keine Kategorie angegeben.</span></td><td><span id="hover_geschichtenkategorie2"></span></td></tr></table><b>Autoren:&nbsp;</b><table class="autor_table" style="border-spacing: 0;"><tr><td><span id="hover_autor1">Keine Autoren angegeben.</span></td><td><span id="hover_autor2"></span></td><td><span id="hover_autor3"></span></td></tr></table></div></div></div>';
  
if ($("div").hasClass(geschichtentitel_href_id)) {
    $("." + geschichtentitel_href_id).fadeIn();
} else {
$(this).after(storyCardContainer);

        var distance_to_top = $(this).offset().top;
        var minimum_height_to_display_correctly = $("#WikiaPageHeader").height() + $("#WikiHeader").height() + 20 + 34;

var distance_to_top_number = new Number(distance_to_top);
var minimum_height_to_display_correctly_number = 380;

        if (+minimum_height_to_display_correctly_number > +distance_to_top) {
        $("." + geschichtentitel_href_id).css("margin-bottom", negative_moveheight).css("margin-top", "");
console.log("operation works");
        } else { console.log("weirdly fails"); }
console.log("distance_to_top " + distance_to_top + " - - " + distance_to_top_number);
console.log("minimum_height_to_display_correctly " + minimum_height_to_display_correctly);
console.log("type of minimum: " + typeof(minimum_height_to_display_correctly_number));

// ##################
// append data to box
// ##################

// THEMA  
$.getJSON("http://de.fanfictions.wikia.com/api.php?format=json&action=parse&disablepp=true&prop=text&page=Vorlage:Thema/" + geschichtentitel_uebersicht + "&callback=?", function(data) {
    // Get the element with id summary and set the inner text to the result.
    thema_value = data.parse.text["*"];
	$('.' + geschichtentitel_href_id + ' #hover_geschichtenthema').html(thema_value);
    //works with title, but not with text. can't use *. 
	
});
// DESCRIPTION
$.getJSON("http://de.fanfictions.wikia.com/api.php?format=json&action=parse&disablepp=true&prop=text&page=Vorlage:Beschreibungen/" + geschichtentitel_uebersicht + "&callback=?", function(data) {
    // Get the element with id summary and set the inner text to the result.
    beschreibung_value = data.parse.text["*"];
	$('.' + geschichtentitel_href_id + ' #hover_beschreibung').html(beschreibung_value);
    //works with title, but not with text. can't use *. 
	
});

// KATEGORIE2 -- vor 1 wegen float: left
$.getJSON("http://de.fanfictions.wikia.com/api.php?format=json&action=parse&disablepp=true&prop=text&page=Vorlage:Kategorien/" + geschichtentitel_uebersicht + "/Kategorie/2&callback=?", function(data) {
    // Get the element with id summary and set the inner text to the result.
    kategorie2_value = data.parse.text["*"];
	$('.' + geschichtentitel_href_id + ' #hover_geschichtenkategorie2').html(kategorie2_value);
    //works with title, but not with text. can't use *. 
	$('.' + geschichtentitel_href_id + ' .kat_table td:nth-child(2n+0)').append(",&nbsp;");
});

// KATEGORIE1
$.getJSON("http://de.fanfictions.wikia.com/api.php?format=json&action=parse&disablepp=true&prop=text&page=Vorlage:Kategorien/" + geschichtentitel_uebersicht + "/Kategorie/1&callback=?", function(data) {
    // Get the element with id summary and set the inner text to the result.
    kategorie1_value = data.parse.text["*"];
	$('.' + geschichtentitel_href_id + ' #hover_geschichtenkategorie1').html(kategorie1_value);
    //works with title, but not with text. can't use *. 
	
});







// AUTOR1
$.getJSON("http://de.fanfictions.wikia.com/api.php?format=json&action=parse&disablepp=true&prop=text&page=Vorlage:Autoren/" + geschichtentitel_uebersicht + "/Autor/1&callback=?", function(data) {
    // Get the element with id summary and set the inner text to the result.
    autor1_value = data.parse.text["*"];
	$('.' + geschichtentitel_href_id + ' #hover_autor1').html(autor1_value);
    //works with title, but not with text. can't use *. 
});

// AUTOR2
$.getJSON("http://de.fanfictions.wikia.com/api.php?format=json&action=parse&disablepp=true&prop=text&page=Vorlage:Autoren/" + geschichtentitel_uebersicht + "/Autor/2&callback=?", function(data) {
    // Get the element with id summary and set the inner text to the result.
    autor2_value = data.parse.text["*"];
	$('.' + geschichtentitel_href_id + ' #hover_autor2').html(autor2_value);
    //works with title, but not with text. can't use *. 
	$('.' + geschichtentitel_href_id + ' .autor_table td:nth-child(0n+1)').append(",&nbsp;");
});

// AUTOR3
$.getJSON("http://de.fanfictions.wikia.com/api.php?format=json&action=parse&disablepp=true&prop=text&page=Vorlage:Autoren/" + geschichtentitel_uebersicht + "/Autor/3&callback=?", function(data) {
    // Get the element with id summary and set the inner text to the result.
    autor3_value = data.parse.text["*"];
	$('.' + geschichtentitel_href_id + ' #hover_autor3').html(autor2_value);
    //works with title, but not with text. can't use *. 
	$('.' + geschichtentitel_href_id + ' .autor_table td:nth-child(0n+2)').append(",&nbsp;");
});


$(".info-hover-box a").unwrap("a");

}
classHref = "." + geschichtentitel_href_id;	// error? wtf
  })
  .mouseleave(function() {
    $(classHref).fadeOut();
  });
}