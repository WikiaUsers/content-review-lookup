$(document).ready(function(){
    $("li#CreatePageDialogFormatContainer input").attr("checked", false);
    $("li#CreatePageDialogBlankContainer input").attr("checked", true);
    $("li#CreatePageDialogBlankContainer").addClass("accent");
    $( "#CategorySelectAdd" ).text("Añadir");
    $("a.subnav-2a[data-canonical='videos']").text('Crear nueva página').attr('href', '/wiki/Especial:CrearPágina');
    $("a.subnav-2a[data-canonical='newfiles']").text('Arreglar una página').attr('href', '/wiki/Categoría:Arreglar');
    $(".wikia-interactive-map-thumbnail .view").text('Clic para ver completo');
    $("#WikiaPage a[href='/wiki/Usuario:Absay']").addClass('absay');
    
    /*********************************************/
    /* Transform a "Poll" into a simple          */
    /* N-rating system widget.                   */
    /*                                           */
    /* By: [[User:Absay]]                        */
    /*                                           */
    /*********************************************/
    function PollToRating() {
        var options = document.querySelectorAll("[id^='wpPollVote']");
        var totalOptions = options.length;
        var optionPercentage = 0;
        var optionVotes = 0;
        var voteAverage = 0;
        var totalAverage = 0;
    
        // Iterate through every option to get the vote averages.
        for (var i = 0; i < totalOptions; i++){
            // Percentage according to number of options.
            optionPercentage = ((i+1)/totalOptions); 
            // Get total votes of the option.
            optionVotes = parseInt(options.item(i).innerHTML);
            // Get vote average.
            voteAverage = optionVotes * optionPercentage;
            // Store sum of average.
            totalAverage += voteAverage;
        }
        var totalVotes = parseFloat($("[id^='wpPollTotal']").text());
    
        // Calculate actual final rating score.
        var ratings = 0;
        ratings = Math.round((totalAverage / totalVotes)*100);
        
        $("#ajax-poll-area").after("<div class='ratingbar'><div class='ratingbar-cur' style='width:"+ratings+"%'></div></div>");
    }
PollToRating();
});

$(window).load(function(){
    $("#WikiaArticle a.wikia-photogallery-add.wikia-button").css('display', 'none');
});

if(!wgUserName){
    document.getElementById("notRegisteredBox").style.display = "block";
}

// Collapsible info
$(".expando-control").on("click", function(){
	var superDiv = $(this).parent().siblings();
	if(!superDiv.is(":visible")){
		superDiv.fadeIn();
		$(this).text("[ocultar]");
	}
	else {
		superDiv.hide();
		$(this).text("[mostrar]");
	}
});