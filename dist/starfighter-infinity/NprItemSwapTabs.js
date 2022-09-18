lastUpdatedRaceList = {};
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
    
    if (lastUpdatedRaceList[raceClassName]) {
        $('.nprItemSwapLastUpdated').html(lastUpdatedRaceList[raceClassName]);
    }
}

function loadSwapShopRaceTable(raceNameNormalized) {
    var tab = $('.nprItemSwap' + raceNameNormalized);
    showItemSwapRaceTable(raceNameNormalized);
    if (tab.data('status') != 'loaded') {
        $.ajax({
            method: "GET",
            url: "/wiki/SwapShop" + raceNameNormalized,
            success: function(data){
                var matches = data.match(/<div class="nprItemSwapTabbedDisplay nprItemSwap[^>]*>([\s\S]*?)<p>(\d\d\d\d-\d\d-\d\d.*?)\s*<\/p>/m);
                if (matches) {
                    $('.nprItemSwap' + raceNameNormalized).data('status', 'loaded');
                    $('.nprItemSwap' + raceNameNormalized).html(matches[1]);
                    $('.nprItemSwapLastUpdated').html(matches[2]);
                    lastUpdatedRaceList[raceNameNormalized] = matches[2];
                    $(".nprItemSwapTabLink").click(function(){
                        tabName = $(this).attr('id').substring(0, $(this).attr('id').length - 3);
                        showItemSwapTab(tabName);
                    });
                    showItemSwapRaceTable(raceNameNormalized);
                } else {
                    console.log('Swap Shop table not found in the html returned');
                }
            }
        });
    }
}

$( document ).ready(function() {
	lastUpdatedRaceList["Andromedan"] = $(".nprItemSwapLastUpdated").text();
	$(".nprItemSwapTabLink").click(function(){
        tabName = $(this).attr('id').substring(0, $(this).attr('id').length - 3);
		showItemSwapTab(tabName);
	});
	$(".nprItemSwapMenuItem").click(function(){
		raceName = $(this).text();
		raceClassName = raceName.replaceAll(' ', '');
		loadSwapShopRaceTable(raceClassName);
	});
	if ($('.nprItemSwapTabbedDisplay').length)  loadSwapShopRaceTable('Andromedan');
});