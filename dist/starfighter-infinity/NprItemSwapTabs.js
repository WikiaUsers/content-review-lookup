function showItemSwapTab(tabName) {
    $('.nprItemSwapTabContent').hide();
    $('.nprItemSwapTabLink').removeClass('active');
    $('#' + tabName).css('display', 'inline-block');
    $('#' + tabName + "Tab").addClass('active');
}
function showItemSwapRaceTable(raceClassName) {
    $('.nprItemSwapTabbedDisplay').hide();
    tabName = 'nprItemSwap' + raceClassName + 'Castor';
    showItemSwapTab(tabName);
    $('.nprItemSwap' + raceClassName).css('display', 'inline-block');
}

$( document ).ready(function() {
	$(".nprItemSwapTabLink").click(function(){ 
		tabName = $(this).attr('id');
		tabName = tabName.substring(0, tabName.length - 3);
		showItemSwapTab(tabName);
	});
	$(".nprItemSwapMenuItem").click(function(){ 
		raceName = $(this).text();
		raceClassName = raceName.replaceAll(' ', '');
		showItemSwapRaceTable(raceClassName);
	});
});