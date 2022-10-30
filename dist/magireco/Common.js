// function equivalent to jquery ready
$(function() {
    var loc = location.hash.replace("#", "").replace(/\./g, "%");
	var originalHash = location.hash.replace(/\%23/g, "#").replace(/%20/g, "_");
	var hashes = originalHash.split('#');
	
	if (loc !== "") {
    	var i;
	    for (i = 1; i < hashes.length; i++) {
	        $(".tabber .wds-tabs__tab").filter(function() {
	                return ($(this).attr("data-hash") == hashes[i]);
	        }).click();
	    }
		location.hash = originalHash;
	}
	
	$(".anchorLink > a").off("click").click(function() {
	    var loc = $(this).attr('href').replace("#", "").replace(/\./g, "%");
	    var hashes = $(this).attr('href').replace(/\%23/g, "#").replace(/%20/g, "_").split('#');
	
	    if (loc !== "") {
	        var i;
	        var tabs;
	        for (i = 1; i < hashes.length; i++) {
	            tabs = $(".tabber .wds-tabs__tab").filter(function() {
	                return ($(this).attr("data-hash") == hashes[i]);
	            });
	            tabs.click();
	            if (i == 1)
	            {
		            tabs[0].scrollIntoView({
					    behavior: "smooth", // or "auto" or "instant"
					    block: "start", // or "end"
					    inline: "nearest"
					});
	            }
	        }
	    }
	});
	
	// Spoiler Images
    $(".spoiler").addClass("spoilerImageText");
    $(".spoiler img").on("mouseup", function() {
    	$(this).parent().removeClass("spoiler").removeClass("spoilerImageText");
    	$(this).off("mouseup");
    	$(this).wrap('<a href="' + $(this).attr('src') + '" class="image"></a>');
    });
});