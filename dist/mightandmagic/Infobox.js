// Infobox Module by Eladkse
// With thanks to Monchoman45

if(document.getElementById('infobox')) {

function InfoboxModule() {
		$('.WikiaRail form#WikiaSearch').after('<section class="InfoboxModule module" style="padding-top: 8px !important;"><span id="InfoboxModule"></span></section>');
	$('section#WikiaSpotlightsModule').hide();
	$('#infobox').show();
}
 
addOnloadHook(InfoboxModule);

function MoveInfobox() {
  var fooel = document.getElementById('infobox');
  if (fooel!=null) {
    var artel = document.getElementById('InfoboxModule');
    var titel = document.getElementById('top');
    fooel = fooel.parentNode.removeChild(fooel);
    if (artel!=null) {
      artel.parentNode.insertBefore(fooel,artel);
    } else {
      titel.parentNode.insertBefore(fooel,titel);
    }
  }
}

addOnloadHook(MoveInfobox);


function SwitchModules() {
	$('section.InfoboxModule').show();
	$('section.WikiaPagesOnWikiModule').hide();
	$('section.WikiaActivityModule').hide();
	$('section.LatestPhotosModule').hide();
	$('section.WikiaSpotlightsModule').hide();
	$('section.ChatModule').after('<ul class="wikia-menu-button" id="switchrail" style="margin-left:211px"><a onclick="SwitchRail();" data-id="switchrail" style="color:#fff; margin-bottom: 10px;" title="Switches to the standard sidebar modules.">&#160;Show Modules&#160;</a></ul>');
}
 
addOnloadHook(SwitchModules);
 
function SwitchRail() {
	$('section.InfoboxModule').hide();
	$('section.WikiaPagesOnWikiModule').show();
	$('section.WikiaActivityModule').show();
	$('section.LatestPhotosModule').show();
	$('section.WikiaSpotlightsModule').show();
	$('ul#switchrail').replaceWith('<ul class="wikia-menu-button" id="switchinfo" style="margin-left:219px"><a onclick="SwitchInfo();" data-id="switchinfo" style="color:#fff; margin-bottom: 10px;" title="Switches to the infobox module.">&#160;Show Infobox&#160;</a></ul>');
}

function SwitchInfo() {
	$('section.InfoboxModule').show();
	$('section.WikiaPagesOnWikiModule').hide();
	$('section.WikiaActivityModule').hide();
	$('section.LatestPhotosModule').hide();
	$('section.WikiaSpotlightsModule').hide();
	$('ul#switchinfo').replaceWith('<ul class="wikia-menu-button" id="switchrail" style="margin-left:211px"><a onclick="SwitchRail();" data-id="switchrail" style="color:#fff; margin-bottom: 10px;" title="Switches to the standard sidebar modules.">&#160;Show Modules&#160;</a></ul>');
}

}