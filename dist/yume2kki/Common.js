/* Any JavaScript here will be loaded for all users on every page load. */

//Page specific js
switch (mw.config.get('wgPageName')) {
    case 'Randomizers':
		$(document).ready(function() {
			$("#calculatorDiv").empty();
		    $("#calculatorDiv").append('<input type="number" id="calculator"></input>');   
			$('#calculator').keyup(calculateSeason);
			$('#calculator').change(calculateSeason);		    
		}); 
	
		function calculateSeason(){
		    if ($(this).val().match(/^\d+$/)) {
		        var season = 'Unknown';
		        var sleepTimes = parseInt($(this).val());
		        sleepTimes = (sleepTimes + 1) % 554400;
		        var seasonNumber = Math.floor((sleepTimes + 4)/ 3) % 4;
		        switch (seasonNumber){
		            case 0:
		                season = 'Winter';
		                break;
		            case 1:
		                season = 'Spring';
		                break;
		            case 2:
		                season = 'Summer';
		                break;
		            case 3:
		                season = 'Fall';
		                break;                        
		        }
		        var limite = false;
		        var i = 1;
		        while (!limite) {
		            sleepTimes++;
		            seasonNumberTest = (Math.floor((sleepTimes + 4)/ 3)) % 4;
		            if (seasonNumberTest == seasonNumber) i++;
		            else limite = true;
		        }
		        $("#results").empty();
		        $("#results").append('The season in your next dream will be <b>' + season + '</b>. ');
		        if (i == 1) {
		            $("#results").append('This is the last day of the season.');
		        }
		        else {
		            $("#results").append('This season will last for ' + i + ' more days.');            
		        }
		    }
		    else {
		        $(this).val('');
		        $("#results").empty();
		        $("#results").append('Type a valid positive integer on the input field.');         
		    }
		} 
        break;
}


//2kki map frame
mw.hook('wikipage.content').add(function($content) {
    $content.find('.kkiDiv:not(.loaded)').each(function() {
        var $this = $(this);
        $this.html(
            $('<iframe>', {
                border: 0,
                frameborder: 0,
                scrolling: 'no',
                class: 'kkiFrame',
                src: 'https://yume-2kki-explorer.herokuapp.com/',
            })
        ).addClass('loaded');
    });
});

(function () {
    $(".spoiler").click(changeClass);
    
    function changeClass(){
        if ($(this).hasClass("spoiler")) {
            $(this).removeClass("spoiler");
            $(this).addClass("spoilerClicked");
        }
        else {
            $(this).removeClass("spoilerClicked");
            $(this).addClass("spoiler");
        }
    }    
}());


(function () {
    $(".spoilerWarning").click(addClass);
    function addClass(){
        var parent = $(this).parent();
        var content = $(parent).find("div.spoilerContent");
        if ($(content).hasClass("hide")) {
            $(content).removeClass("hide");
            if ($(this).hasClass("hideable")) $(this).addClass("hide");
        }
        else{
            $(content).addClass("hide");
        }
    }    
}());