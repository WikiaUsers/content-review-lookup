/* Any JavaScript here will be loaded for all users on every page load. */

var inceptionYear = 2016;
var currentYear = new Date().getFullYear();

$(function(){
	for(i = inceptionYear; i <= currentYear; i++){
		console.log("Creating handlers for year " + i);
		$('#inceptionPerks' + i).css('font-weight', 'bold');
		$('#inceptionPerks' + i).css('color', '#e2ce97');
		$('#inceptionPerks' + i).css('display', 'inline');
		$('#inceptionPerks' + i).html('Pokaż/Ukryj (tylko) Umiejętności wprowadzone w tym roku &#10060;');
		
		$('#inceptionPerks' + i).hover(function(){
			$(this).css('cursor', 'pointer');
			$(this).css('text-decoration', 'underline');
		}, function(){
			$(this).css('text-decoration', 'none');
		});
		
		$('#inceptionPerks' + i).click(GetInceptionPerksHandler(i));
	}
	/**************************************************************************/
	//MobileViewHovers(); //Currnently not used, as the Mobile version doesn't load Common.js
	SetAppropriateDimensions();
	SetHeadersShadows();
	SetPerkCheckBoxes();
	
	$.each($(".mw-collapsible-text"), function(index, element){
		console.log("element #" + index);
		$(element).click(function(){
			setTimeout(function(){
				SetAppropriateDimensionsCosts();
			},
			1); //Must be delayed because the real height is 0 at the time of executing the script. This is due to table is collapsed (basically height of all TR elements are set to 0)
		});
	});
	
	//I think this needs to try catch block as the .getAttribute() throws the error when you don't have the visual edit button present, thus moving to the end
	CreateEditSourceLink();
});


function GetInceptionPerksHandler(year){
	return function(){
		var inceptionRows = $('.inception-row' + year);
		var switcher = $('#inceptionPerks' + year);
		var rowsDisplayed = inceptionRows.css('display') == 'table-row';
		var text = 'Pokaż/Ukryj (tylko) Umiejętności wprowadzone w tym roku';
		//console.log("rowsDisplayed: " + rowsDisplayed);
		//console.log($('.inception-row' + year));
		//console.log(year);
		
		if(rowsDisplayed){
		inceptionRows.css('display', 'none');
			switcher.html(text + '&#10060;');
			rowsDisplayed = false;
		}else{
			inceptionRows.css('display', 'table-row');
			switcher.html(text + ' &#9989;');
			rowsDisplayed = true;
		}
	};
}
/******************************************************************************/

function SetAppropriateDimensions(){
	var elements =  $(".BPBG-All");
	$.each(elements, function(index, element){
		var elementH = $(element).height(); 
		var elementW = $(element).width();
		//console.log("Looking for element width: " + elementW);
		//console.log("Looking for element height: " + elementH);
		if(elementH * 0.5517 > elementW){
			$(element).width($(element).height() * 0.5517);
		}else{
			$(element).height($(element).width() * 1.8125);
		}
	});
}

function SetHeadersShadows(){
	var elements =  $("table th");
	//console.dir(elements);
	$.each(elements, function(index, element){
		var elementH = $(element).height(); 
		var elementW = $(element).width();
		if(elementH < 80 || elementW < 80){
			//$(element).css("box-shadow", "none");
			$(element).css("box-shadow", "inset 0px 0px 8px 0px rgba(0,0,0,0.8)");
		}
	});
	elements =  $(".fpbox");
	$.each(elements, function(index, element){
		var elementH = $(element).height(); 
		var elementW = $(element).width();
		if(elementH > 1000){
			$(element).css("background-size", "auto");
		}
	});
}

function SetAppropriateDimensionsCosts(){
	var elements =  $.merge($(".ACBG"), $(".ISBG"));
	//console.log(elements);
	$.each(elements, function(index, element){
		var elementH = $(element).height(); 
		var elementW = $(element).width();
		//console.log("Looking for COST element width: " + elementW);
		//console.log("Looking for COST element height: " + elementH);
		if(elementH > elementW){
			$(element).width($(element).height());
		}else{
			$(element).height($(element).width());
		}
	});
}

function CreateEditSourceLink(){
	console.log('CreateEditSourceLink Executed');
	var link = document.querySelectorAll('[data-tracking-label="ca-edit-dropdown"]')[0].getAttribute('href');
	var vanillaEdit = document.querySelectorAll('[data-tracking-label="ca-ve-edit"]')[1];
	var editSourceNode = document.createElement('a');
	editSourceNode.appendChild(document.createTextNode('Edit Source'));
	editSourceNode.setAttribute('href', link);
	editSourceNode.setAttribute('class', 'wds-button wds-is-text page-header__action-button has-label');
	
	vanillaEdit.parentNode.insertBefore(editSourceNode, vanillaEdit.nextSibling);
}

function isMobileDevice() {
    return window.matchMedia("(max-width: 1024px)").matches;
}

function MobileViewHovers(){
	//if(!isMobileDevice){
		////console.log("Preparing tooltips...");
		////$('.mobileView').hide();
		/*
		tooltip = $('.tooltip-value');
		tooltipValue = tooltip.attr('title');
		span = $('<span> (' + tooltipValue + ')</span>');
		span.css(
			{
				'font-size': '7pt',
        	}
    	);
    	
    	tooltip.append(span);*/
	//}
}
function SetPerkCheckBoxes(){
	console.log("Checkboxes Function initiallised");
	$.each(document.getElementsByClassName("switchArea"), 
		function(index, el){
	        var x = document.createElement("INPUT");
	        x.setAttribute("class", "switchBox");
	        x.setAttribute("type", "checkbox");
	        el.parentNode.insertBefore(x, el.nextSibling);
	    }
    );
}
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/