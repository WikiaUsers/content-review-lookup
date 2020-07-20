/*** ------- BEGIN JS ------- ***/

/** -------------------------- **/
/** BEGIN INTRODUCTORY PREFACE **/
/** -------------------------- **/

/*
 ___________________________________________________________________
|                                                                   |
| Greetings, and welcome to Madgascar Wiki, the largest online      |
| database for the Madagascar film franchise that anyone can edit.  |
| You are currently viewing our JavaScript page.                    |
| You may take any code which you want to install to your wiki,     |
| as long as you credit the creator as mentioned.                   |
| If the code has no credit written on it then you are not required |
| to put any credit.                                                |
|                                                                   |
| Thanks,                                                           |
|                                                                   |
|                                                                   |
|                                                                   |
|    -------------                                                  |
|    Brendan Boman                                                  |
|    Bureaucrat & Sysop,                                            |
|    Madagascar Wiki                                                |
|___________________________________________________________________|

*/

/** ------------------------ **/
/** END INTRODUCTORY PREFACE **/
/** BEGIN CREDITS **/
/** ------------------------ **/

/* Credits to Kung Fu Panda Wiki (kungfupanda.fandom.com) for some of the CSS */

/** -------------------------- **/
/** END CREDITS **/
/** BEGIN INTERFACE FORMATTING **/
/** -------------------------- **/

/* Additional Rail Module */
/* Code credit to Kung Fu Panda Wiki */
$(document).ready(function() {
    var newSection = '<section id="smbuttons" class="module"><span style="font-size:16px;font-weight: bold">' +
      'Connect with Us<br><hr>' + '</span>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{SMbuttons}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#smbuttons').append(code);
    });
});

/** ------------------------ **/
/** END INTERFACE FORMATTING **/
/** BEGIN MISC **/
/** ------------------------ **/

/* Refresh Homepage "Quotes" Content */
/* Code credit to Kung Fu Panda Wiki
   via Wikia Community Forums @ w:c:community
       Written by User:Cafeinlove */
$(function(){
	$('.refresh').click(function(){
		var source = "Template:Featured_Quote";
		var container = $("#quotes");
 
		$.ajax({url: "https://madagascar.fandom.com/wiki/" + source + "?action=render"})
			.done(function(data) {
				container.html(data);
		});
	});
});

/** --------------- **/
/** END MISC **/
/** --------------- **/

/*** ------- END JS ------- ***/

/* contact @ User:Brendan_Boman if you have any problems or questions */