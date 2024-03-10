/* Any JavaScript here will be loaded for all users on every page load. */
// Custom Blocks
var pageMask = document.createElement("div");
var globalDiv = document.createElement("div");

// Custom Tooltips: Position at bottom-right of cursor
window.onmousemove = function(e) {
    $(".hover-content").css("top", e.clientY + 20);
    $(".hover-content").css("left", e.clientX + 20);
};

/* [[Template:Button]] */
function runEvent($element, event) {
	switch (event) {
		case "button-blue-clicked":
			$element.children(".button-blue-middle").text("Clicked");
			break;
		case "button-yellow-clicked":
			$element.children(".button-yellow-middle").text("Clicked");
			break;
		default:
	}
}

$(document).ready(function() {
	// CSS sets the objects to be hidden. JavaScript reverts this.
	$(".hide-if-nojs").removeClass("hide-if-nojs");
	
	$(".remove-if-js").remove();
	$(".hide-if-js").hide();
	
    // Custom Tooltips: Override default tooltip and remove title
	$(".game-ui-tooltip").removeAttr("title");
    $(".game-ui-tooltip").children().removeAttr("title");
    
    // Custom User-Initiated Pop-Up Blocks: Init
	var $body = $(document.body);
	var $pageMask = $(pageMask);
	var $globalDiv = $(globalDiv);
	
	function showGlobalDiv() {
		$pageMask.show();
		$globalDiv.show();
	}
	function hideGlobalDiv() {
		$pageMask.hide();
		$globalDiv.hide();
	}
    
    $pageMask.css({
    	"position": "fixed",
    	"top": "0",
    	"bottom": "0",
    	"height": "100%",
    	"width": "100%",
    	"background-color": "black",
    	"opacity": "0.6",
    });
    $globalDiv.addClass("frame").css({
    	"display": "flex",
    	"align-items": "center",
    	"justify-content": "center",
		"position": "fixed",
		"top": "0",
		"right": "0",
		"bottom": "0",
		"left": "0",
		"margin": "auto",
		"max-width": "90%",
		"z-index": "99",
	}).click(function(e) { if (e.target === this) hideGlobalDiv(); });	// Do not hide if user has clicked on a descendant
	
    $body.append($pageMask);
	$body.append($globalDiv);
	hideGlobalDiv();

	// Custom Infoboxes: Button Clicks
	function invokeLua(module, func, $buttonData, onDone) {
		return new mw.Api().get({
		    action: "parse",
		    format: "json",
		    prop: "text",
		    text: "{{#invoke:" + module + "|" + func + "|" + $buttonData.map(function() { return $(this).text(); }).get().join('|') + "}}",
		    contentmodel: "wikitext"
		}).done(onDone);
	}
	
	$(".button").click(function() {
		var $data = $(this).find(".data");
	});
	$(".game-ui-edit-button").click(function() {
		var $data = $(this).find(".data");
		window.location = $data.eq(0).text();
	});
	$(".game-ui-showstats-button").click(function() {
		var $data = $(this).find(".data");
		
		invokeLua("Statistic", "generateStatisticsBlock", $data, function(output) {
			$globalDiv.html(output.parse.text['*']).find(".game-ui-hidestats-button").click(hideGlobalDiv);
			showGlobalDiv();
		});
	});
	$(".game-ui-showmodifiers-button").click(function() {
		var $data = $(this).find(".data");
		
		invokeLua("Statistic", "generateModifiersBlock", $data, function(output) {
			$globalDiv.html(output.parse.text['*']).find(".game-ui-hidemodifiers-button").click(hideGlobalDiv);
			showGlobalDiv();
		});
	});
	$(".game-ui-showability-button").click(function() {
		var $data = $(this).find(".data");
		
		invokeLua("StatusEffect", "generateAbilityBlock", $data, function(output) {
			$globalDiv.html(output.parse.text['*']).find(".game-ui-hideability-button").click(hideGlobalDiv);
			showGlobalDiv();
		});
	});

	// Parent item calculator
	var ParentItemCalc = function($html) {
		this.init($html);
	};
	$.extend(ParentItemCalc.prototype, {
		init: function($html) {
			this.$html = $html;
			this.refresh();
		},
		
		getSubject: function() { return this.$html.attr("data-fullpagename"); },
		getCurrentLayer: function() { return this.$html.attr("data-current-layer"); },
		getSelectedSlotID: function() { return this.$html.attr("data-selected-slot-id"); },
		getSlots: function() { return this.$html.find(".slot"); },
		getSkin: function() {
			var skin_slot_id = this.$html.attr("data-skin-slot-id");
			for (var $e in this.getSlots()) {
				var id = $e.attr("data-slot-id");
				if (id == skin_slot_id)
					return $e.attr("data-content-fullpagename");
				
				return null;
			}
		},
		getEquipment: function() {
			var result = {};
			this.getSlots().each(function ($e) {
				var id = $e.attr("data-slot-id");
				var fullpagename = $e.attr("data-content-fullpagename");
				result[id] = fullpagename;
			});
			return result;
		},
		getEquipmentSelection: function () { return this.$html.find(".equipment-selection"); },
		getConfigMenu: function () { return this.$html.find(".config-menu"); },
		
		setSubject: function(value) {
			this.$html.attr("data-fullpagename", value);
			this.refresh();
		},
		setCurrentLayer: function(value) {
			this.$html.attr("data-current-layer", value);
			this.refresh();
		},
		setSelectedSlotID: function(value) {
			this.$html.attr("data-selected-slot-id", value);
			this.refresh();
		},
		setSlot: function(id, fullpagename) {
			var updated = false;
			this.getSlots().each(function ($e) {
				if (id == $e.attr("data-slot-id")) {
					$e.attr("data-content-fullpagename", fullpagename);
					updated = true;
				}
			});
			if (updated) this.refresh();
		},

		selectItem: function(baseName, fullPageName) {
			this.$html.find(".select-equipment-right").each(function ($e) {
				if ($e.attr("data-basename") == baseName) {
					$e.show();
			
					if (fullPageName !== null) {
						$e.each(function ($e) {
							if ($e.attr("data-fullpagename") == fullPageName)
								$e.click();
						});
					}
				}
				else {
					$e.hide();
				}
			});
		},
		
		selectSlot: function($slot) {
			this.setSelectedSlotID($slot.attr("data-slot-id"));
			this.selectItem($slot.attr("data-content-basename"), $slot.attr("data-content-fullpagename"));
		},
		
		refresh: function(value) {
			// Update the HTML
			var args = {
				"full_name": this.getSubject(),
				"layer": this.getCurrentLayer(),
			};
			if (this.getSkin() !== null) { args.skin_fullpagename = this.getSkin(); }
			if (this.getSelectedSlotID() !== null) { args.selected_slot_id = this.getSelectedSlotID(); }
			
			var equipment = this.getEquipment();
			Object.keys(equipment).forEach(function(id) {
				args["slot_" + id] = equipment[id];
			});
			
			var apiArgs = [];
			Object.keys(args).forEach(function(id) {
				apiArgs.push(id + "=" + args[id]);
			});
			apiArgs = apiArgs.join('|');
			
			new mw.Api().get({
			    action: "parse",
			    format: "json",
			    prop: "text",
			    text: "{{#invoke:ParentItemCalc|getOverallMenu|" + apiArgs + "}}",
			    contentmodel: "wikitext"
			}).done(function(output) {
				this.$html.html(output.parse.text['*']);
			});
			
			// Set up events
			var calc = this;
			
			this.getSlots().click(function () { calc.selectSlot($(this)); })
				.on("ondragover", function (ev) { ev.preventDefault(); })
				.on("ondrop", function (ev) {
					ev.preventDefault();
					calc.setSlot($(this).attr("data-slot-id"), ev.dataTransfer.getData("fullpagename"));
				});
			
			this.getEquipmentSelection().find(".select-equipment-left").click(function () {
				calc.selectItem($(this).attr("data-basename"), null);
			});
			this.getEquipmentSelection().find(".select-equipment-right").find(".select-item").each(function ($e) {
				$e.attr("draggable", "true").on("dragstart", function (ev) {
					ev.dataTransfer.setData("fullpagename", $e.attr("data-fullpagename"));
				})
			});
			
			this.getConfigMenu().find(".list-factions").click(function () {
				invokeLua("ParentItemCalc", "listFactions", $(), function(output) {
					$globalDiv.html(output.parse.text['*']);
					$globalDiv.find(".return").click(hideGlobalDiv);
					$globalDiv.find(".select-faction").click(function () {
						var $data = $(this).find(".data");
						
						invokeLua("ParentItemCalc", "listShips", $data, function(output) {
							$globalDiv.html(output.parse.text['*']).find(".select-ship").click(function () {
								calc.setSubject($(this).attr("data-fullpagename"));
								hideGlobalDiv();
							});
						});
					});
					showGlobalDiv();
				});
			});
			
			this.getConfigMenu().find(".view-skin").click(function () {
				var $data = $(this).find(".data");
				
				invokeLua("ParentItemCalc", "showSkin", $data, function(output) {
					$globalDiv.html(output.parse.text['*']).find(".return").click(hideGlobalDiv);
					showGlobalDiv();
				});
			});
			
			this.getConfigMenu().find(".toggle-layer").click(function () {
				var $data = $(this).find(".data").text();
				
				if ($data == "0")
					calc.setCurrentLayer("1");
				else if ($data == "1")
					calc.setCurrentLayer("0");
			});
		},
	});
	
	var parentItemCalc = new ParentItemCalc($(".parent-item-calc").first());
	
	
	// [[Template:Button]]
	$(".button-blue").hover(
		function() {
			$(this).children(".button-blue-left").css("background-image", "url(/Special:Redirect/file/GameButtonLeftSelected.png)");
			$(this).children(".button-blue-middle").css("background-image", "url(/Special:Redirect/file/GameButtonMiddleSelected.png)");
			$(this).children(".button-blue-right").css("background-image", "url(/Special:Redirect/file/GameButtonRightSelected.png)");
		}, function() {
			$(this).children(".button-blue-left").css("background-image", "url(/Special:Redirect/file/GameButtonLeft.png)");
			$(this).children(".button-blue-middle").css("background-image", "url(/Special:Redirect/file/GameButtonMiddle.png)");
			$(this).children(".button-blue-right").css("background-image", "url(/Special:Redirect/file/GameButtonRight.png)");
		}
	).click(
		function() {
			/* Keep size constant */
			var width = $(this).width();
			var height = $(this).height();
			
			/* Placeholder */
			runEvent($(this), "button-blue-clicked");
			
			/* Keep size constant */
			$(this).width(width).height(height);
		}
	);
	
	$(".button-yellow").hover(
		function() {
			$(this).children(".button-yellow-left").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonLeftSelected.png)");
			$(this).children(".button-yellow-middle").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonMiddleSelected.png)");
			$(this).children(".button-yellow-right").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonRightSelected.png)");
		}, function() {
			$(this).children(".button-yellow-left").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonLeft.png)");
			$(this).children(".button-yellow-middle").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonMiddle.png)");
			$(this).children(".button-yellow-right").css("background-image", "url(/Special:Redirect/file/SpecialGameButtonRight.png)");
		}
	).click(
		function() {
			/* Keep size constant */
			var width = $(this).width();
			var height = $(this).height();
			
			/* Placeholder */
			runEvent($(this), "button-yellow-clicked");
			
			/* Keep size constant */
			$(this).width(width).height(height);
		}
	);
});